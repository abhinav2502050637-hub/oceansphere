import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { Globe } from './components/Globe';
import { DataPanel } from './components/DataPanel';
import { OceanAI } from './components/OceanAI';
import { EducationPanel } from './components/EducationPanel';
import {
  OceanVariable,
  DepthOption,
  Location,
  OceanDataResponse,
  ObservationMarker,
  GridPoint,
} from './types/ocean';
import { fetchOceanData, fetchObservations, fetchGridData } from './services/api';

export const App: React.FC = () => {
  // App Core State
  const [selectedVariable, setSelectedVariable] = useState<OceanVariable>('temperature');
  const [selectedDepth, setSelectedDepth] = useState<DepthOption>(0);
  const [selectedDate, setSelectedDate] = useState<string>('2026-01-03');
  
  // Default focused location: Arabian Sea (lat: 15.2, lon: 65.3)
  const [selectedLocation, setSelectedLocation] = useState<Location>({
    latitude: 15.2,
    longitude: 65.3,
  });

  const [oceanData, setOceanData] = useState<OceanDataResponse | null>(null);
  const [observations, setObservations] = useState<ObservationMarker[]>([]);
  const [gridPoints, setGridPoints] = useState<GridPoint[]>([]);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [flyToTrigger, setFlyToTrigger] = useState<number>(0);
  const [educationOpen, setEducationOpen] = useState<boolean>(false);
  const [backendOnline, setBackendOnline] = useState<boolean>(true);

  // Load ocean data whenever coordinates, depth, or date changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchOceanData(
      selectedLocation.latitude,
      selectedLocation.longitude,
      selectedDepth,
      selectedDate
    ).then((data) => {
      if (isMounted) {
        setOceanData(data);
        setLoading(false);
        if (data.dataset_notice?.includes('Fallback')) {
          setBackendOnline(false);
        } else {
          setBackendOnline(true);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedLocation, selectedDepth, selectedDate]);

  // Load in-situ float markers and grid points when depth/date changes
  useEffect(() => {
    fetchObservations(selectedDepth, selectedDate).then(setObservations);
    fetchGridData(selectedVariable, selectedDepth, selectedDate).then(setGridPoints);
  }, [selectedVariable, selectedDepth, selectedDate]);

  const handleFlyToArabianSea = () => {
    setSelectedLocation({ latitude: 15.5, longitude: 65.5 });
    setFlyToTrigger((prev) => prev + 1);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header Bar */}
      <Header
        onOpenEducation={() => setEducationOpen(true)}
        backendOnline={backendOnline}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT PANEL: Controls (Variable, Depth, Time, Fly-to) */}
        <ControlPanel
          selectedVariable={selectedVariable}
          onSelectVariable={setSelectedVariable}
          selectedDepth={selectedDepth}
          onSelectDepth={setSelectedDepth}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onFlyToArabianSea={handleFlyToArabianSea}
        />

        {/* CENTER: Interactive 3D Earth Globe */}
        <main className="flex-1 relative bg-slate-950">
          <Globe
            selectedLocation={selectedLocation}
            onSelectLocation={(lat, lon) => setSelectedLocation({ latitude: lat, longitude: lon })}
            observations={observations}
            gridPoints={gridPoints}
            selectedVariable={selectedVariable}
            flyToArabianSeaTrigger={flyToTrigger}
          />
        </main>

        {/* RIGHT PANEL: Selected Location & Model vs Observation Data */}
        <DataPanel
          oceanData={oceanData}
          loading={loading}
          selectedVariable={selectedVariable}
          selectedDepth={selectedDepth}
          selectedDate={selectedDate}
        />
      </div>

      {/* FLOATING ASSISTANT: 🤖 Ocean AI */}
      <OceanAI oceanData={oceanData} />

      {/* MODAL: Learn Mode Educational Cards */}
      <EducationPanel
        isOpen={educationOpen}
        onClose={() => setEducationOpen(false)}
      />
    </div>
  );
};

export default App;
