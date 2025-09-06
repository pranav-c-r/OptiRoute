# OptiRoute – AI-Powered Resource Allocation Platform

## Overview

OptiRoute is an AI-driven platform designed to intelligently allocate critical resources across healthcare, disaster relief, food distribution, and housing. Using predictive analytics and optimization algorithms, the system ensures resources reach the right people, at the right time, with minimal waste and maximum impact.

---

## Problem Domains

1. **Healthcare – Hospital Bed & Doctor Allocation**  
   Patients died during COVID-19 due to poor bed allocation, while doctors were overworked in some hospitals and idle in others. Ambulances were misrouted, and inequity in access worsened outcomes.

2. **Humanitarian Aid – Disaster Relief Resource Allocation**  
   Relief distribution often suffers from uneven supply, half-empty trucks, duplicated aid, and neglected remote communities.

3. **Food & Supply Chain – Hunger and Waste Crisis**  
   Millions of tons of food go to waste due to misaligned supply chains, hurting farmers and increasing environmental damage.

4. **Public Housing & Shelter Allocation Crisis**  
   Government houses remain vacant while families live on streets due to mismanagement, poor planning, and inequality.

---

## Our Solution

OptiRoute uses **machine learning, optimization algorithms, and real-time updates** to transform chaotic manual allocation into intelligent, fair, and efficient ecosystems.

### Key Capabilities
- **Predictive AI**: Forecasts patient inflow, disaster needs, food demand, and housing vacancies.  
- **Smart Matching**: Dynamically pairs patients, families, food, and supplies with the best-fit resource.  
- **Optimization at Scale**: Efficient use of trucks, staff, beds, and units.  
- **Equity & Prioritization**: Vulnerable populations are flagged and prioritized.  
- **Dynamic Adaptation**: Real-time updates continuously adjust allocation.  
- **Impact Simulation**: Tests multiple allocation scenarios for maximum lives saved and waste reduced.

---

## Features

### 1. AI-Driven Hospital Resource Optimizer
- Predictive bed & ICU availability  
- Smart patient routing  
- Dynamic staff scheduling  
- Risk & equity alerts  

### 2. AI-Powered Disaster Relief Optimizer
- Demand forecasting for shelters  
- Optimal delivery routing  
- Duplication avoidance  
- Community needs detection  

### 3. AI-Driven Hunger & Waste Optimizer
- Demand forecasting for food  
- Surplus-to-need smart distribution  
- Perishables optimization  
- Impact maximization  

### 4. Smart Shelter Allocation System
- Forecasting housing demand  
- Dynamic reallocation of units  
- Needs-based prioritization  
- Occupancy & satisfaction optimization  

---

## Technical Architecture

### Backend
- **Framework**: FastAPI  
- **Microservices**:
  - Forecasting: XGBoost, Prophet, Scikit-learn  
  - Optimization: OR-Tools, PuLP, NetworkX  
  - Explainability: SHAP, LIME  
- **Background Jobs**: Celery + Redis  
- **Realtime Updates**: FastAPI WebSockets  
- **Data Validation**: Pydantic  

### Frontend
- **Framework**: Next.js  
- **Styling**: Tailwind CSS  
- **UI Components**: Shadcn/UI, Radix UI  
- **Charts & Metrics**: Recharts, Chart.js  
- **State Management**: Zustand + React Query / SWR  
- **Realtime**: WebSockets  
- **Auth**: Firebase Authentication  
- **File Storage**: Firebase Storage  

### Databases
- **MongoDB** – Primary NoSQL database (flexible schemas)  
- **Firebase Firestore** – Live dashboards & session data  
- **Redis** – Caching & pub-sub  

### Machine Learning Stack
- Scikit-learn  
- PyTorch  
- TensorFlow  
- Pandas, NumPy  

### Hosting
- **Frontend**: Vercel  
- **Backend**: Lightning-AI  
- **Models**: Hugging Face  

---

## Deployment Strategy

- **Frontend**: Deployed on Vercel  
- **Backend**: Hosted on Lightning-AI with microservices  
- **ML Models**: Hosted on Hugging Face  
- **Database**: MongoDB Atlas + Firebase Firestore  
- **Realtime Communication**: WebSockets + Redis  

---

## Impact & Benefits

- **Efficient Allocation**: Critical resources reach those who need them most.  
- **Data-Driven Decisions**: ML reduces human error and improves fairness.  
- **Real-Time Monitoring**: Dashboards provide live visibility.  
- **Social Benefit**: Improves community trust and resilience during crises.  

---

## Future Scope

- Improved ML models with larger datasets  
- Multi-resource allocation (combined optimization across domains)  
- Geographic scaling across regions  
- Smarter prioritization (age, health, urgency factors)  
- Advanced analytics dashboards  

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)  
- Python (v3.9+)  
- npm / yarn  
- MongoDB & Firebase setup  

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/optiroute.git
   cd optiroute
