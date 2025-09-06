# OptiRoute - AI-Powered Resource Allocation Platform

## Overview

OptiRoute is an advanced AI-powered platform designed to optimize resource allocation across multiple domains. The application leverages machine learning algorithms to provide data-driven solutions for hospitals, disaster relief operations, food distribution networks, and housing allocation systems.

## Features

- **Hospital Resource Optimizer**: AI-driven hospital resource management system that optimizes bed allocation, patient routing, staff scheduling, and ensures equity.
- **Disaster Relief Optimizer**: AI-powered disaster response planning tool that forecasts needs, optimizes delivery routes, avoids duplication, and detects community needs.
- **Hunger & Waste Optimizer**: AI-driven food distribution system that forecasts demand, matches surplus to need, optimizes perishables, and maximizes impact.
- **Smart Shelter Allocation**: AI-powered housing allocation system that forecasts demand, dynamically allocates units, prioritizes needs, and optimizes impact.

## Live Demo

The application is running at http://localhost:5173/ during development.

## Frontend Technical Documentation

### Technology Stack

- **React**: Frontend library for building user interfaces
- **Vite**: Build tool and development server
- **React Router**: For navigation and routing
- **Material UI**: Component library for consistent design
- **Chart.js & React-Chartjs-2**: For data visualization
- **MUI X Data Grid**: For interactive data tables

### Project Structure

```
src/
├── assets/           # Static assets like images
├── components/       # Reusable UI components
│   ├── layout/       # Layout components (Navbar, Sidebar)
│   └── shared/       # Shared components (DashboardCard, ChartComponent, DataTable)
├── pages/            # Page components for each route
│   ├── Dashboard.jsx                # Main dashboard
│   ├── HospitalResourceOptimizer.jsx # Hospital resource optimization
│   ├── DisasterReliefOptimizer.jsx   # Disaster relief optimization
│   ├── HungerWasteOptimizer.jsx      # Food distribution optimization
│   └── SmartShelterAllocation.jsx    # Housing allocation optimization
├── App.jsx           # Main application component with routing
├── main.jsx          # Application entry point
├── theme.js          # MUI theme configuration
└── index.css         # Global styles
```

### Key Components

#### Layout Components

- **Layout.jsx**: Main layout wrapper that includes Navbar and Sidebar
- **Navbar.jsx**: Top navigation bar with app title and mobile menu toggle
- **Sidebar.jsx**: Navigation sidebar with links to all modules

#### Shared Components

- **DashboardCard.jsx**: Reusable card component for feature highlights and metrics
- **ChartComponent.jsx**: Wrapper for Chart.js with support for multiple chart types
- **DataTable.jsx**: Wrapper for MUI X Data Grid with common configurations

### Routing

The application uses React Router for navigation with the following routes:

- `/` or `/dashboard`: Main dashboard with overview of all modules
- `/hospital-optimizer`: Hospital Resource Optimizer module
- `/disaster-relief`: Disaster Relief Optimizer module
- `/hunger-waste`: Hunger & Waste Optimizer module
- `/shelter-allocation`: Smart Shelter Allocation module

### Theming

The application uses a custom dark blue theme defined in `theme.js` with the following key characteristics:

- Dark mode with deep blue background colors
- Blue primary color palette
- Light blue secondary color palette
- Custom typography settings
- Consistent component styling

### Data Visualization

The application uses Chart.js for data visualization with the following chart types:

- Line charts for time-series data
- Bar charts for comparative data
- Doughnut/Pie charts for distribution data

### Responsive Design

The application is fully responsive with the following features:

- Mobile-friendly navigation with collapsible sidebar
- Responsive grid layouts using MUI Grid
- Adaptive component sizing
- Touch-friendly UI elements

## Backend Implementation Plan

### Proposed Technology Stack

- **Node.js & Express**: For API development
- **MongoDB**: For flexible document storage
- **Mongoose**: For MongoDB object modeling
- **JWT**: For authentication
- **Socket.IO**: For real-time updates (optional)
- **Redis**: For caching (optional)

### API Architecture

We recommend implementing a RESTful API with the following structure:

```
/api
├── /auth              # Authentication endpoints
├── /users             # User management
├── /hospital          # Hospital resource optimization
├── /disaster          # Disaster relief optimization
├── /food              # Food distribution optimization
├── /shelter           # Housing allocation optimization
└── /analytics         # Cross-module analytics
```

### Data Models

#### Core Models

1. **User Model**
   - Authentication information
   - Role-based permissions
   - Profile data

2. **Organization Model**
   - Organization details
   - Subscription information
   - Module access permissions

#### Module-Specific Models

1. **Hospital Module**
   - Hospital facilities
   - Bed inventory
   - Staff schedules
   - Patient data

2. **Disaster Relief Module**
   - Disaster events
   - Resource inventory
   - Distribution routes
   - Need assessments

3. **Food Distribution Module**
   - Food inventory
   - Distribution centers
   - Recipient data
   - Perishability tracking

4. **Shelter Module**
   - Housing inventory
   - Applicant data
   - Allocation history
   - Prioritization criteria

### AI/ML Implementation

For each module, we recommend implementing the following AI/ML components:

1. **Predictive Models**
   - Time-series forecasting for demand prediction
   - Classification models for prioritization
   - Regression models for impact assessment

2. **Optimization Algorithms**
   - Resource allocation optimization
   - Route optimization
   - Scheduling optimization

3. **Recommendation Systems**
   - Matching algorithms for resource-to-need pairing
   - Decision support systems

### Authentication & Authorization

- JWT-based authentication
- Role-based access control
- Organization-level permissions
- Module-specific access controls

### Deployment Strategy

1. **Development Environment**
   - Local development with Docker
   - MongoDB Atlas for database

2. **Staging Environment**
   - CI/CD pipeline with GitHub Actions
   - Containerized deployment

3. **Production Environment**
   - Kubernetes for orchestration
   - Cloud provider (AWS, Azure, or GCP)
   - Load balancing and auto-scaling
   - Monitoring and logging

### API Documentation

Implement comprehensive API documentation using:
- Swagger/OpenAPI for interactive documentation
- Markdown-based documentation for conceptual guides

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/optiroute.git
   cd optiroute
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:5173

## Future Enhancements

- Implement authentication and user roles
- Connect to backend services
- Add real-time data updates
- Implement advanced AI models
- Add mobile applications

## License

This project is licensed under the MIT License - see the LICENSE file for details.
