# Frontend Detailed Report

## Overview
The frontend is built using React and Material-UI, providing a modern, responsive interface for hospital resource and food waste optimization. It communicates with the backend via a service layer (`src/services/api.js`) and displays real-time data, analytics, and AI-driven recommendations.

## Main Features
- **Dashboard Cards**: Summarize predictive bed availability, smart patient routing, dynamic staff scheduling, and risk/equity alerts.
- **Charts**: Visualize bed occupancy, available beds at nearest hospitals, staff by department, and more using Chart.js.
- **Tables**: Display hospital network details and emergency/critical patient alerts using a custom DataTable component.
- **Dialogs**: Patient search and AI plan generation dialogs for interactive user input and results.

- **Error Handling**: Alerts and feedback for failed API calls or empty results.
- **Geolocation**: Automatically fetches patient location for routing.

## Data Flow
- **API Service Layer**: All backend communication is handled via `hospitalAPI` and `wasteOptimizerAPI` in `src/services/api.js`.
- **State Management**: React hooks (`useState`, `useEffect`) manage loading, error, and data states.
- **Data Mapping**: Backend data is mapped to charts, tables, and dialogs for clear visualization.

## HospitalResourceOptimizer.jsx
- Loads dashboard stats, occupancy trends, specialty distribution, hospitals, doctors, and patients from backend.
- Patient search dialog uses geolocation and severity to recommend hospitals, displaying distance, available beds, suitability score, and location.
- All backend fields are displayed; errors and empty results are handled gracefully.

## HungerWasteOptimizer.jsx
- Loads stats, inventory, demand, logistics, storage, farmers, and plan generation data from backend.
- Displays food bank network status, waste reduction impact, distribution routes, and AI-generated allocation plans.
- All backend fields are mapped to frontend components; error handling and user feedback are present.

## Error Handling & User Feedback
- Alerts for failed API calls or empty results.
- Loading indicators for async operations.
- Debug logging for API responses.

## Extensibility
- Modular components for charts, tables, and dialogs.
- Easy to add new endpoints or data visualizations via the API service layer.

---

# How to Extend or Debug
- Add new API endpoints in `src/services/api.js` and update relevant pages/components.
- Use debug logs and error alerts to trace issues.
- All data mapping is done in the main page components for clarity.
