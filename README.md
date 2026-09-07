# 🌊 OceanVision AI — OceanSphere

An interactive 3D Indian Ocean intelligence platform for visualizing ocean conditions, real-world observations, and model-vs-observation analysis.

## 🚀 Live Demo

🌐 **Frontend:** https://oceansphere-iota.vercel.app

🔗 **Backend API:** https://oceansphere-backend.onrender.com

---

## 🎯 Project Overview

**OceanVision AI (OceanSphere)** is a web-based ocean intelligence platform focused on the Indian Ocean.

It provides an interactive 3D environment to explore ocean parameters across **location, depth, and time**, while combining numerical ocean model outputs with real-world observations.

### Key Parameters

- 🌡️ Temperature
- 🧂 Salinity
- 🌊 Ocean Currents
- 📏 Mixed Layer Depth
- 📍 Observation Locations
- 📊 Model vs Observation Comparison
- 🗺️ Spatial Ocean Data
- ⏱️ Time-based Exploration

---

## 🛠️ Tech Stack

### Frontend

- **React.js** — Component-based user interface
- **TypeScript** — Type-safe development
- **Three.js** — 3D visualization
- **React Three Fiber** — React integration with Three.js
- **Vite** — Frontend development and build tool
- **HTML5 / CSS3** — Structure and styling
- **Fetch API** — Communication with backend services

### Backend

- **Python** — Backend and data processing
- **FastAPI** — REST API framework
- **Uvicorn** — ASGI server
- **NumPy** — Numerical computation
- **Pandas** — Data processing
- **Xarray** — Multidimensional scientific data processing

### Data Formats

- **JSON** — API and prototype data
- **CSV** — Tabular ocean data
- **NetCDF** — Scientific ocean/model datasets

### Deployment & Version Control

- **GitHub** — Source code management
- **Vercel** — Frontend deployment
- **Render** — Backend deployment

---

## 🏗️ System Architecture

```text
                    OCEAN DATA SOURCES
                           │
          ┌────────────────┼────────────────┐
          │                │                │
       INCOIS            Argo        NOAA / Copernicus
          │                │                │
          └────────────────┼────────────────┘
                           ▼
                  DATA INGESTION & QC
                           │
                           ▼
                 DATA PROCESSING LAYER
                NumPy / Pandas / Xarray
                           │
                           ▼
                    FASTAPI BACKEND
                           │
              ┌────────────┼────────────┐
              │            │            │
         /ocean-data  /observations  /grid-data
              │            │            │
              └────────────┼────────────┘
                           ▼
                  REACT + TYPESCRIPT
                           │
                  React Three Fiber
                           │
                       THREE.JS
                           ▼
                     🌍 3D GLOBE
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
        Temperature     Salinity      Currents
             │             │             │
             └─────────────┼─────────────┘
                           ▼
               MODEL vs OBSERVATION
                  COMPARISON & ANALYSIS

🌐 Deployment Architecture
                       USER
                         │
                         ▼
                ┌─────────────────┐
                │     VERCEL      │
                │ React +          │
                │ TypeScript       │
                │ Three.js / R3F   │
                └────────┬────────┘
                         │
                      REST API
                         │
                         ▼
                ┌─────────────────┐
                │     RENDER      │
                │ FastAPI +       │
                │ Python          │
                └────────┬────────┘
                         │
                         ▼
                  Ocean Data Layer
🔄 Data Flow
Ocean Data
    ↓
Data Ingestion
    ↓
Quality Control
    ↓
Data Processing
    ↓
FastAPI REST API
    ↓
React Frontend
    ↓
Three.js / WebGL Visualization
    ↓
Interactive 3D Ocean Analysis
Processing Pipeline
Ocean model and observation data are collected.
Data is cleaned and quality-controlled.
Variables, coordinates, depth and time are standardized.
Scientific data is processed using Python libraries.
FastAPI exposes processed data through REST APIs.
React retrieves the data from the backend.
Three.js / React Three Fiber renders the visualization.
Users explore ocean conditions interactively.
Model and observation values can be compared for validation.
📡 API Endpoints
Endpoint	Purpose
/health	Backend health check
/ocean-data	Ocean model and observation data
/observations	Observation points
/grid-data	Model grid visualization data
✨ Key Features
🌍 Interactive 3D Earth visualization
🌊 Indian Ocean focused exploration
🌡️ Temperature visualization
🧂 Salinity visualization
🧭 Current visualization
📍 Observation markers
🔬 Model-observation comparison
📊 Ocean data analysis
⏱️ Depth and time-based exploration
☁️ Cloud-deployed architecture
🔮 Future Scope
Integration with live INCOIS datasets
Expanded Argo observation datasets
NOAA and Copernicus data integration
PostgreSQL / PostGIS geospatial database
Supabase cloud infrastructure
Real-time ocean monitoring
Advanced model error statistics
Machine-learning-based anomaly detection
Ocean forecasting
High-resolution 4D ocean visualization
👥 Project

Smart India Hackathon 2026

Project Name

OceanVision AI — OceanSphere

Objective

To provide an intuitive and interactive platform for exploring, visualizing and validating Indian Ocean data by combining numerical ocean models with real-world observations.
