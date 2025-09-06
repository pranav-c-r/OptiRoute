# Backend Detailed Report

## Overview
The backend is built using FastAPI (Python), providing RESTful endpoints for hospital resource and food waste optimization. It serves real-time data, analytics, and AI-driven recommendations to the frontend.

## Main Modules
- **hospital_allocation**: Handles hospital resource management, patient routing, dashboard stats, occupancy trends, specialty distribution, hospital and doctor data, and patient alerts.
- **waste-optimizer**: Manages food supply/waste optimization, inventory, demand, logistics, storage, farmer data, and AI-powered allocation plan generation.

## Endpoints
- **Hospital Resource Optimizer**
  - `/getDashboardStats`: Returns hospital dashboard statistics.
  - `/getOccupancyTrends`: Returns real-time bed occupancy data.
  - `/getSpecialtyDistribution`: Returns staff distribution by specialty.
  - `/getHospitals`: Returns hospital network details.
  - `/getDoctors`: Returns doctor details.
  - `/getPatients`: Returns patient alerts and emergency cases.
  - `/findHospital`: Returns recommended hospitals for a patient based on location and severity.

- **Food Waste Optimizer**
  - `/getDashboardStats`: Returns food supply dashboard statistics.
  - `/getInventory`: Returns food bank inventory data.
  - `/getDemand`: Returns demand signals and requirements.
  - `/getLogistics`: Returns food distribution routes and logistics.
  - `/getStorage`: Returns storage and surplus data.
  - `/getFarmers`: Returns farmer and supplier data.
  - `/generatePlan`: Generates AI-powered allocation plans based on surplus, demand, and priorities.

## Data Flow
- **Request Handling**: Endpoints accept JSON payloads and return structured responses for frontend consumption.
- **Simulated/Real Data**: Data is either simulated or fetched from databases, depending on deployment.
- **AI/ML Integration**: Some endpoints use machine learning models for predictions and recommendations (e.g., bed availability, patient routing, plan generation).

## Error Handling
- Returns appropriate error messages and status codes for failed requests.
- Validates input data and handles edge cases (e.g., no recommended hospitals found).

## Extensibility
- Modular structure allows easy addition of new endpoints or features.
- New optimization modules can be added under `backend/` as needed.

---

# How to Extend or Debug
- Add new endpoints in the relevant module (`hospital_allocation/routes.py`, `waste-optimizer/routes.py`).
- Update response formats to match frontend requirements.
- Use FastAPI's built-in error handling and logging for debugging.
- Integrate new ML models or data sources as needed.
