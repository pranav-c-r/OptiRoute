// API service for backend communication
const API_BASE_URL = 'http://localhost:8000';

// Hospital Allocation API
export const hospitalAPI = {
  // Hospital Management
  createHospital: async (hospitalData) => {
    const response = await fetch(`${API_BASE_URL}/hospital/hospitals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hospitalData)
    });
    return response.json();
  },

  getHospitals: async () => {
    const response = await fetch(`${API_BASE_URL}/hospital/hospitals`);
    return response.json();
  },

  getHospital: async (hospitalId) => {
    const response = await fetch(`${API_BASE_URL}/hospital/hospitals/${hospitalId}`);
    return response.json();
  },

  updateHospital: async (hospitalId, updateData) => {
    const response = await fetch(`${API_BASE_URL}/hospital/hospitals/${hospitalId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    return response.json();
  },

  deleteHospital: async (hospitalId) => {
    const response = await fetch(`${API_BASE_URL}/hospital/hospitals/${hospitalId}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Doctor Management
  createDoctor: async (doctorData) => {
    const response = await fetch(`${API_BASE_URL}/hospital/doctors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctorData)
    });
    return response.json();
  },

  getDoctors: async () => {
    const response = await fetch(`${API_BASE_URL}/hospital/doctors`);
    return response.json();
  },

  getDoctor: async (doctorId) => {
    const response = await fetch(`${API_BASE_URL}/hospital/doctors/${doctorId}`);
    return response.json();
  },

  getDoctorsByHospital: async (hospitalId) => {
    const response = await fetch(`${API_BASE_URL}/hospital/doctors/hospital/${hospitalId}`);
    return response.json();
  },

  updateDoctorAvailability: async (doctorId, availableHours) => {
    const response = await fetch(`${API_BASE_URL}/hospital/doctors/${doctorId}/availability`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(availableHours)
    });
    return response.json();
  },

  updateDoctorStatus: async (doctorId, status) => {
    const response = await fetch(`${API_BASE_URL}/hospital/doctors/${doctorId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response.json();
  },

  // Patient Management
  createPatient: async (patientData) => {
    const response = await fetch(`${API_BASE_URL}/hospital/patients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData)
    });
    return response.json();
  },

  getPatients: async () => {
    const response = await fetch(`${API_BASE_URL}/hospital/patients`);
    return response.json();
  },

  getPatient: async (patientId) => {
    const response = await fetch(`${API_BASE_URL}/hospital/patients/${patientId}`);
    return response.json();
  },

  // Hospital Finding
  findHospital: async (patientData) => {
    const response = await fetch(`${API_BASE_URL}/hospital/find_hospital`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData)
    });
    return response.json();
  },

  // Dashboard Analytics
  getDashboardStats: async () => {
    const response = await fetch(`${API_BASE_URL}/hospital/dashboard/stats`);
    return response.json();
  },

  getOccupancyTrends: async () => {
    const response = await fetch(`${API_BASE_URL}/hospital/dashboard/occupancy-trends`);
    return response.json();
  },

  getSpecialtyDistribution: async () => {
    const response = await fetch(`${API_BASE_URL}/hospital/dashboard/specialty-distribution`);
    return response.json();
  }
};

// Waste Optimizer API
export const wasteOptimizerAPI = {
  // Generate allocation plan
  generatePlan: async (inputData) => {
    const response = await fetch(`${API_BASE_URL}/waste-optimizer/generate_plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputData)
    });
    return response.json();
  },

  // System status
  getSystemStatus: async () => {
    const response = await fetch(`${API_BASE_URL}/waste-optimizer/system_status`);
    return response.json();
  },

  // Data endpoints
  getInventory: async () => {
    const response = await fetch(`${API_BASE_URL}/waste-optimizer/inventory`);
    return response.json();
  },

  getDemand: async () => {
    const response = await fetch(`${API_BASE_URL}/waste-optimizer/demand`);
    return response.json();
  },

  getLogistics: async () => {
    const response = await fetch(`${API_BASE_URL}/waste-optimizer/logistics`);
    return response.json();
  },

  getStorage: async () => {
    const response = await fetch(`${API_BASE_URL}/waste-optimizer/storage`);
    return response.json();
  },

  getFarmers: async () => {
    const response = await fetch(`${API_BASE_URL}/waste-optimizer/farmers`);
    return response.json();
  },

  // Dashboard Analytics
  getDashboardStats: async () => {
    const response = await fetch(`${API_BASE_URL}/waste-optimizer/dashboard/stats`);
    return response.json();
  },

  getInventoryFlow: async () => {
    const response = await fetch(`${API_BASE_URL}/waste-optimizer/dashboard/inventory-flow`);
    return response.json();
  },

  getNetworkStatus: async () => {
    const response = await fetch(`${API_BASE_URL}/waste-optimizer/dashboard/network-status`);
    return response.json();
  },

  getWasteReduction: async () => {
    const response = await fetch(`${API_BASE_URL}/waste-optimizer/dashboard/waste-reduction`);
    return response.json();
  }
};

import { database } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const addDoctorInfoToFirebase = async (uid, doctorInfo) => {
  try {
    await setDoc(doc(database, 'doctors', uid), doctorInfo, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const addHospitalInfoToFirebase = async (uid, hospitalInfo) => {
  try {
    await setDoc(doc(database, 'hospitals', uid), hospitalInfo, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const addFarmerInfoToFirebase = async (uid, farmerInfo) => {
  try {
    await setDoc(doc(database, 'farmers', uid), farmerInfo, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const addWarehouseInfoToFirebase = async (uid, warehouseInfo) => {
  try {
    await setDoc(doc(database, 'warehouses', uid), warehouseInfo, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const addLogisticsInfoToFirebase = async (uid, logisticsInfo) => {
  try {
    await setDoc(doc(database, 'logistics', uid), logisticsInfo, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Utility function for error handling
export const handleApiError = (error) => {
  console.error('API Error:', error);
  return {
    success: false,
    error: error.message || 'An unexpected error occurred'
  };
};
