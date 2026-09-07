import React from 'react';
import { MapPin, Info } from 'lucide-react';
import { OceanDataResponse, OceanVariable, DepthOption } from '../types/ocean';
import { ComparisonPanel } from './ComparisonPanel';

interface DataPanelProps {
  oceanData: OceanDataResponse | null;
  loading: boolean;
  selectedVariable: OceanVariable;
  selectedDepth: DepthOption;
  selectedDate: string;
}

export const DataPanel: React.FC<DataPanelProps> = ({
  oceanData,
  loading,
  selectedVariable,
  selectedDepth,
  selectedDate,
}) => {
  return (
    <aside className="w-96 glass-bento border-l border-white/10 p-5 flex flex-col space-y-5 overflow-y-auto z-20 shrink-0">
      {/* Bento Card: Selected Coordinates */}
      <div className="glass-bento-card p-4 rounded-2xl border border-cyan-500/30 shadow-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-cyan-400">
            <MapPin className="w-4 h-4 animate-bounce" />
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-white">📍 Selected Coordinates</h2>
          </div>
          <span className="text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
            {selectedDate}
          </span>
        </div>

        {oceanData ? (
          <div className="grid grid-cols-2 gap-2.5 pt-1 font-mono text-xs">
            <div className="bg-slate-950/80 p-3 rounded-xl border border-white/10">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Latitude</span>
              <span className="font-bold text-white text-base">
                {oceanData.location.latitude >= 0
                  ? `${oceanData.location.latitude}° N`
                  : `${Math.abs(oceanData.location.latitude)}° S`}
              </span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-white/10">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Longitude</span>
              <span className="font-bold text-white text-base">
                {oceanData.location.longitude >= 0
                  ? `${oceanData.location.longitude}° E`
                  : `${Math.abs(oceanData.location.longitude)}° W`}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-400 py-2 font-mono">
            Click anywhere on the interactive 3D Earth to query coordinates.
          </div>
        )}
      </div>

      {/* Bento Card: Variable Legend */}
      <div className="glass-bento-card p-4 rounded-2xl border border-white/10 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">
              Variable Scale Legend
            </h3>
          </div>
          <span className="text-[11px] font-mono font-bold text-cyan-400 capitalize bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
            {selectedVariable}
          </span>
        </div>

        {selectedVariable === 'temperature' && (
          <div className="space-y-2 pt-1">
            <div className="h-3.5 w-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 via-amber-400 to-red-600 shadow-inner"></div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Cold (5°C)</span>
              <span>18°C</span>
              <span>Warm (32°C)</span>
            </div>
          </div>
        )}

        {selectedVariable === 'salinity' && (
          <div className="space-y-2 pt-1">
            <div className="h-3.5 w-full rounded-full bg-gradient-to-r from-teal-700 via-cyan-500 to-orange-500 shadow-inner"></div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Low (32 PSU)</span>
              <span>35 PSU</span>
              <span>High (38 PSU)</span>
            </div>
          </div>
        )}

        {selectedVariable === 'currents' && (
          <div className="space-y-2 pt-1">
            <div className="h-3.5 w-full rounded-full bg-gradient-to-r from-indigo-800 via-blue-500 to-cyan-300 shadow-inner"></div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Slow (0.1 m/s)</span>
              <span>0.8 m/s</span>
              <span>Fast (2.0 m/s)</span>
            </div>
          </div>
        )}
      </div>

      {/* Model vs Observation Comparison Component */}
      <ComparisonPanel oceanData={oceanData} loading={loading} />
    </aside>
  );
};
