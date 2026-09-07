import axios from 'axios';
import { DepthOption, OceanDataResponse, ObservationMarker, GridPoint, OceanVariable } from '../types/ocean';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchOceanData = async (
  latitude: number,
  longitude: number,
  depth: DepthOption,
  date: string
): Promise<OceanDataResponse> => {
  try {
    const response = await api.get<OceanDataResponse>('/ocean-data', {
      params: { latitude, longitude, depth, date },
    });
    return response.data;
  } catch (error) {
    console.warn('Backend API connection failed, returning prototype fallback data:', error);
    
    // Calculate intelligent depth-decay fallback values for offline state
    const tempSurface = 28.5 - Math.abs(latitude - 15) * 0.2;
    const tempFactor = depth === 0 ? 1 : depth === 100 ? 0.8 : depth === 500 ? 0.4 : 0.24;
    const tempModel = Number((tempSurface * tempFactor).toFixed(2));
    const tempObs = Number((tempModel - 0.5).toFixed(2));

    const salModel = Number((36.0 - (depth / 1000) * 1.1).toFixed(2));
    const salObs = Number((salModel - 0.2).toFixed(2));

    return {
      location: {
        latitude: Number(latitude.toFixed(2)),
        longitude: Number(longitude.toFixed(2)),
      },
      depth,
      date,
      model: {
        temperature: tempModel,
        salinity: salModel,
        current_speed: Number((0.8 - depth / 2000).toFixed(2)),
        current_direction: 125,
      },
      observation: {
        id: 'ARGO-OFFLINE-FALLBACK',
        name: 'Argo Float 2901551 (Fallback)',
        temperature: tempObs,
        salinity: salObs,
      },
      difference: {
        temperature: 0.5,
        salinity: 0.2,
      },
      dataset_notice: 'Prototype Demonstration Dataset (Local Fallback Mode)',
    };
  }
};

export const fetchObservations = async (
  depth: DepthOption,
  date: string
): Promise<ObservationMarker[]> => {
  try {
    const response = await api.get<ObservationMarker[]>('/observations', {
      params: { depth, date },
    });
    return response.data;
  } catch (error) {
    console.warn('Backend API offline for observations, returning fallback float markers:', error);
    return [
      {
        id: 'ARGO-2901551',
        name: 'Argo Float 2901551 (Arabian Sea)',
        latitude: 15.3,
        longitude: 65.4,
        depth,
        date,
        temperature: 27.9,
        salinity: 36.1,
      },
      {
        id: 'ARGO-2901842',
        name: 'Argo Float 2901842 (South Arabian Sea)',
        latitude: 12.1,
        longitude: 68.2,
        depth,
        date,
        temperature: 28.8,
        salinity: 35.7,
      },
      {
        id: 'ARGO-2902104',
        name: 'Argo Float 2902104 (Lakshadweep Basin)',
        latitude: 10.2,
        longitude: 72.1,
        depth,
        date,
        temperature: 29.2,
        salinity: 35.4,
      },
      {
        id: 'INCOIS-BUOY-04',
        name: 'NIOT OMNI Buoy BD04 (Bay of Bengal)',
        latitude: 13.1,
        longitude: 80.6,
        depth,
        date,
        temperature: 28.0,
        salinity: 33.6,
      },
    ];
  }
};

export const fetchGridData = async (
  variable: OceanVariable,
  depth: DepthOption,
  date: string
): Promise<GridPoint[]> => {
  try {
    const response = await api.get<GridPoint[]>('/grid-data', {
      params: { variable, depth, date },
    });
    return response.data;
  } catch (error) {
    console.warn('Backend API offline for grid data, returning fallback grid points:', error);
    return [
      { latitude: 15.2, longitude: 65.3, depth, temperature: 28.4, salinity: 36.3, current_speed: 0.78, current_direction: 130 },
      { latitude: 12.0, longitude: 68.0, depth, temperature: 29.1, salinity: 35.9, current_speed: 0.65, current_direction: 160 },
      { latitude: 18.0, longitude: 64.0, depth, temperature: 27.2, salinity: 36.7, current_speed: 0.92, current_direction: 200 },
      { latitude: 10.0, longitude: 72.0, depth, temperature: 29.5, salinity: 35.6, current_speed: 0.60, current_direction: 180 },
      { latitude: 15.0, longitude: 73.0, depth, temperature: 28.8, salinity: 35.8, current_speed: 0.70, current_direction: 175 },
      { latitude: 8.0, longitude: 77.5, depth, temperature: 29.8, salinity: 35.4, current_speed: 0.85, current_direction: 220 },
      { latitude: 13.0, longitude: 80.5, depth, temperature: 28.2, salinity: 33.8, current_speed: 0.72, current_direction: 45 },
      { latitude: 16.0, longitude: 85.0, depth, temperature: 27.9, salinity: 33.2, current_speed: 0.68, current_direction: 60 },
    ];
  }
};
