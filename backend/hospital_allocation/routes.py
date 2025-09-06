import os
import pickle
import pandas as pd
import numpy as np
from math import radians, cos, sin, asin, sqrt
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import random
from huggingface_hub import hf_hub_download
from typing import List, Dict, Any
from datetime import datetime, timedelta

# Create an API Router for this module
router = APIRouter()

# --- Define the input data format using Pydantic ---
class PatientInput(BaseModel):
    patient_lon: float
    patient_lat: float
    severity: int

class DoctorInput(BaseModel):
    doctor_id: str
    name: str
    specialization: str
    available_hours: List[str]
    hospital_id: str
    experience_years: int

class HospitalInput(BaseModel):
    hospital_id: str
    name: str
    total_beds: int
    icu_beds: int
    available_beds: int
    available_icu_beds: int
    latitude: float
    longitude: float
    specialties: List[str]
    admin_id: str

class HospitalUpdateInput(BaseModel):
    available_beds: int
    available_icu_beds: int
    current_occupancy: int

# --- Load all necessary data and models from your Model Hub repository ---
# This will run only once when the server starts
gbm = None
clf = None
infra = None
try:
    # IMPORTANT: Replace "your-username" with your actual Hugging Face username
    repo_id = "kesavan2006/chennai-hospital-optimizer-models" 

    # Download each file and get its local path
    gbm_path = hf_hub_download(repo_id=repo_id, filename="hospital_nextday_lgbm.pkl")
    clf_path = hf_hub_download(repo_id=repo_id, filename="hospital_suitability_lgbm.pkl")
    infra_path = hf_hub_download(repo_id=repo_id, filename="chennai_infra_used.csv")
    
    # Load the models and data from the downloaded paths
    # Note: Using pickle since that's what was used to save them
    with open(gbm_path, "rb") as f:
        gbm = pickle.load(f)
    with open(clf_path, "rb") as f:
        clf = pickle.load(f)
    infra = pd.read_csv(infra_path)

except Exception as e:
    print(f"Error loading files from Hugging Face Hub: {e}")
    print("Please check your repo_id and file names.")
    # Exit gracefully if files are missing
    gbm, clf, infra = None, None, None

# --- Helper Function for Haversine Distance ---
def haversine(lon1, lat1, lon2, lat2):
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    return 6371 * c

# --- The API endpoint using the Router decorator ---
@router.post("/find_hospital")
def find_hospital(patient: PatientInput):
    if gbm is None or clf is None or infra is None:
        return {"error": "Models or data not loaded."}, 500
        
    req_icu = True if patient.severity >= 4 else False
    
    # Simulating real-time data for the prediction logic
    latest_rows_data = infra.copy()
    latest_rows_data['occupied'] = np.random.randint(10, 80, size=len(latest_rows_data))
    
    X_live = pd.DataFrame({
        'occ_lag1': latest_rows_data['occupied'],
        'occ_lag7': latest_rows_data['occupied'].shift(7).fillna(latest_rows_data['occupied'] * 0.95),
        'occ_roll7': latest_rows_data['occupied'].rolling(window=7, min_periods=1).mean().shift(1).fillna(0),
        'adm_roll7': np.random.uniform(0, 10, size=len(infra)),
        'adm_lag1': np.random.uniform(0, 10, size=len(infra)),
        'dis_lag1': np.random.uniform(0, 10, size=len(infra)),
        'dow': pd.to_datetime('today').dayofweek,
        'total_beds': infra['total_beds']
    })
    
    features = ['occ_lag1','occ_lag7','occ_roll7','adm_roll7','adm_lag1','dis_lag1','dow','total_beds']
    X_live = X_live[features].fillna(0)
    
    pred_next_occ = gbm.predict(X_live)
    latest_rows_data['pred_next_occupied'] = pred_next_occ
    latest_rows_data['pred_beds_available'] = latest_rows_data['total_beds'] - latest_rows_data['pred_next_occupied']
    latest_rows_data['staffed_rate'] = np.random.uniform(0.8,1.2,size=len(latest_rows_data))
    latest_rows_data['wait_time_est'] = latest_rows_data['pred_next_occupied'] / (latest_rows_data['total_beds'] * latest_rows_data['staffed_rate'] + 1e-6)
    
    rows = []
    for idx, h in latest_rows_data.iterrows():
        dist = haversine(patient.patient_lon, patient.patient_lat, h['longitude'], h['latitude'])
        
        suit_features_dict = {
            "dist_km": dist,
            "pred_beds_available": max(0, h['pred_beds_available']),
            "wait_time_est": h['wait_time_est'],
            "severity": patient.severity,
            "req_icu": int(req_icu),
            "hospital_total_beds": h['total_beds'],
            "hospital_icu_beds": h['icu_beds']
        }
        rows.append(suit_features_dict)

    candidates_df = pd.DataFrame(rows)
    
    suit_features = ['dist_km','pred_beds_available','wait_time_est','severity','req_icu','hospital_total_beds','hospital_icu_beds']
    candidates_df['ml_prob'] = clf.predict(candidates_df[suit_features])
    
    ranked_hospitals = candidates_df.sort_values('ml_prob', ascending=False).head(5)
    
    output = []
    for _, row in ranked_hospitals.iterrows():
        hospital_info = infra.loc[row.name]
        output.append({
            "hospital_name": hospital_info['facility_name'],
            "distance_km": round(row['dist_km'], 2),
            "predicted_beds_available": int(max(0, round(row['pred_beds_available']))),
            "suitability_score": round(row['ml_prob'], 3),
            "hospital_latitude": hospital_info['latitude'],
            "hospital_longitude": hospital_info['longitude']
        })
    
    return output

# --- In-memory storage for demo purposes (in production, use a database) ---
hospitals_db = {}
doctors_db = {}
patients_db = {}

# --- Hospital Management Endpoints ---
@router.post("/hospitals")
def create_hospital(hospital: HospitalInput):
    """Create a new hospital entry"""
    hospitals_db[hospital.hospital_id] = {
        **hospital.dict(),
        "created_at": datetime.now().isoformat(),
        "last_updated": datetime.now().isoformat()
    }
    return {"message": "Hospital created successfully", "hospital_id": hospital.hospital_id}

@router.get("/hospitals")
def get_all_hospitals():
    """Get all hospitals"""
    return {"hospitals": list(hospitals_db.values())}

@router.get("/hospitals/{hospital_id}")
def get_hospital(hospital_id: str):
    """Get specific hospital details"""
    if hospital_id not in hospitals_db:
        raise HTTPException(status_code=404, detail="Hospital not found")
    return hospitals_db[hospital_id]

@router.put("/hospitals/{hospital_id}")
def update_hospital(hospital_id: str, update_data: HospitalUpdateInput):
    """Update hospital availability"""
    if hospital_id not in hospitals_db:
        raise HTTPException(status_code=404, detail="Hospital not found")
    
    hospitals_db[hospital_id].update({
        **update_data.dict(),
        "last_updated": datetime.now().isoformat()
    })
    return {"message": "Hospital updated successfully"}

@router.delete("/hospitals/{hospital_id}")
def delete_hospital(hospital_id: str):
    """Delete a hospital"""
    if hospital_id not in hospitals_db:
        raise HTTPException(status_code=404, detail="Hospital not found")
    
    del hospitals_db[hospital_id]
    return {"message": "Hospital deleted successfully"}

# --- Doctor Management Endpoints ---
@router.post("/doctors")
def create_doctor(doctor: DoctorInput):
    """Create a new doctor entry"""
    doctors_db[doctor.doctor_id] = {
        **doctor.dict(),
        "created_at": datetime.now().isoformat(),
        "last_updated": datetime.now().isoformat(),
        "status": "available"
    }
    return {"message": "Doctor created successfully", "doctor_id": doctor.doctor_id}

@router.get("/doctors")
def get_all_doctors():
    """Get all doctors"""
    return {"doctors": list(doctors_db.values())}

@router.get("/doctors/{doctor_id}")
def get_doctor(doctor_id: str):
    """Get specific doctor details"""
    if doctor_id not in doctors_db:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return doctors_db[doctor_id]

@router.get("/doctors/hospital/{hospital_id}")
def get_doctors_by_hospital(hospital_id: str):
    """Get all doctors in a specific hospital"""
    hospital_doctors = [doc for doc in doctors_db.values() if doc["hospital_id"] == hospital_id]
    return {"doctors": hospital_doctors}

@router.put("/doctors/{doctor_id}/availability")
def update_doctor_availability(doctor_id: str, available_hours: List[str]):
    """Update doctor's available hours"""
    if doctor_id not in doctors_db:
        raise HTTPException(status_code=404, detail="Doctor not found")
    
    doctors_db[doctor_id]["available_hours"] = available_hours
    doctors_db[doctor_id]["last_updated"] = datetime.now().isoformat()
    return {"message": "Doctor availability updated successfully"}

@router.put("/doctors/{doctor_id}/status")
def update_doctor_status(doctor_id: str, status: str):
    """Update doctor's status (available, busy, off-duty)"""
    if doctor_id not in doctors_db:
        raise HTTPException(status_code=404, detail="Doctor not found")
    
    valid_statuses = ["available", "busy", "off-duty"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    doctors_db[doctor_id]["status"] = status
    doctors_db[doctor_id]["last_updated"] = datetime.now().isoformat()
    return {"message": "Doctor status updated successfully"}

# --- Patient Management Endpoints ---
@router.post("/patients")
def create_patient(patient: PatientInput):
    """Create a new patient entry"""
    patient_id = f"P{len(patients_db) + 1:06d}"
    patients_db[patient_id] = {
        **patient.dict(),
        "patient_id": patient_id,
        "created_at": datetime.now().isoformat(),
        "status": "waiting",
        "assigned_hospital": None,
        "assigned_doctor": None
    }
    return {"message": "Patient created successfully", "patient_id": patient_id}

@router.get("/patients")
def get_all_patients():
    """Get all patients"""
    return {"patients": list(patients_db.values())}

@router.get("/patients/{patient_id}")
def get_patient(patient_id: str):
    """Get specific patient details"""
    if patient_id not in patients_db:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patients_db[patient_id]

# --- Analytics and Dashboard Endpoints ---
@router.get("/dashboard/stats")
def get_dashboard_stats():
    """Get dashboard statistics"""
    total_hospitals = len(hospitals_db)
    total_doctors = len(doctors_db)
    total_patients = len(patients_db)
    
    available_beds = sum(h["available_beds"] for h in hospitals_db.values())
    total_beds = sum(h["total_beds"] for h in hospitals_db.values())
    occupancy_rate = ((total_beds - available_beds) / total_beds * 100) if total_beds > 0 else 0
    
    available_doctors = len([d for d in doctors_db.values() if d["status"] == "available"])
    busy_doctors = len([d for d in doctors_db.values() if d["status"] == "busy"])
    
    waiting_patients = len([p for p in patients_db.values() if p["status"] == "waiting"])
    
    return {
        "total_hospitals": total_hospitals,
        "total_doctors": total_doctors,
        "total_patients": total_patients,
        "available_beds": available_beds,
        "total_beds": total_beds,
        "occupancy_rate": round(occupancy_rate, 2),
        "available_doctors": available_doctors,
        "busy_doctors": busy_doctors,
        "waiting_patients": waiting_patients
    }

@router.get("/dashboard/occupancy-trends")
def get_occupancy_trends():
    """Get occupancy trends for the last 24 hours"""
    # Simulate hourly data for the last 24 hours
    hours = []
    occupancy_data = []
    
    for i in range(24):
        hour = (datetime.now() - timedelta(hours=23-i)).strftime("%H:00")
        hours.append(hour)
        # Simulate realistic occupancy data
        base_occupancy = 60 + random.randint(-10, 20)
        occupancy_data.append(max(0, min(100, base_occupancy)))
    
    return {
        "hours": hours,
        "occupancy_percentages": occupancy_data
    }

@router.get("/dashboard/specialty-distribution")
def get_specialty_distribution():
    """Get doctor distribution by specialty"""
    specialty_count = {}
    for doctor in doctors_db.values():
        specialty = doctor["specialization"]
        specialty_count[specialty] = specialty_count.get(specialty, 0) + 1
    
    return {
        "specialties": list(specialty_count.keys()),
        "counts": list(specialty_count.values())
    }