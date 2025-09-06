import os
import pickle
import pandas as pd
import numpy as np
from math import radians, cos, sin, asin, sqrt
from fastapi import APIRouter
from pydantic import BaseModel
import random
from huggingface_hub import hf_hub_download

# Create an API Router for this module
router = APIRouter()

# --- Define the input data format using Pydantic ---
class PatientInput(BaseModel):
    patient_lon: float
    patient_lat: float
    severity: int

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