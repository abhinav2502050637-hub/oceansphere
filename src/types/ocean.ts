export type OceanVariable = 'temperature' | 'salinity' | 'currents';

export type DepthOption = 0 | 100 | 500 | 1000;

export interface Location {
  latitude: number;
  longitude: number;
}

export interface ModelMetrics {
  temperature: number;
  salinity: number;
  current_speed: number;
  current_direction: number;
}

export interface ObservationMetrics {
  id?: string;
  name?: string;
  temperature: number;
  salinity: number;
  latitude?: number;
  longitude?: number;
}

export interface DifferenceMetrics {
  temperature: number;
  salinity: number;
}

export interface OceanDataResponse {
  location: Location;
  depth: DepthOption;
  date: string;
  model: ModelMetrics;
  observation: ObservationMetrics;
  difference: DifferenceMetrics;
  dataset_notice?: string;
}

export interface ObservationMarker {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  depth: number;
  date: string;
  temperature: number;
  salinity: number;
}

export interface GridPoint {
  latitude: number;
  longitude: number;
  depth: number;
  temperature: number;
  salinity: number;
  current_speed: number;
  current_direction: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
