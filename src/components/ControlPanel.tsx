import React from 'react';
import { Thermometer, Droplets, Wind, Compass, Calendar, Layers, ChevronDown, Sparkles } from 'lucide-react';
import { OceanVariable, DepthOption } from '../types/ocean';

interface ControlPanelProps {
  selectedVariable: OceanVariable;
  onSelectVariable: (variable: OceanVariable) => void;
  selectedDepth: DepthOption;
  onSelectDepth: (depth: DepthOption) => void;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onFlyToArabianSea: () => void;
}

const AVAILABLE_DATES = [
  '2026-01-01',
  '2026-01-02',
  '2026-01-03',
  '2026-01-04',
  '2026-01-05',
];

const DEPTH_LEVELS: { depth: DepthOption; label: string; sub: string }[] = [
  { depth: 0, label: 'Surface Zone', sub: '0 m' },
  { depth: 100, label: 'Epipelagic Zone', sub: '100 m' },
  { depth: 500, label: 'Mesopelagic Zone', sub: '500 m' },
  { depth: 1000, label: 'Bathypelagic Zone', sub: '1000 m' },
];

export const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedVariable,
  onSelectVariable,
  selectedDepth,
  onSelectDepth,
  selectedDate,
  onSelectDate,
  onFlyToArabianSea,
}) => {
  return (
    <aside className="w-80 glass-bento border-r border-white/10 p-5 flex flex-col space-y-6 overflow-y-auto z-20 shrink-0">
      {/* Bento Module 1: Fast Camera Navigation */}
      <div className="glass-bento-card p-4 rounded-2xl border border-white/10 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">Fast Focus</h3>
          </div>
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 opacity-80" />
        </div>
        <button
          onClick={onFlyToArabianSea}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-slate-800 via-cyan-950 to-slate-900 hover:from-cyan-900 hover:to-slate-800 text-white font-bold text-xs tracking-wider border border-cyan-500/30 hover:border-cyan-400 shadow-lg shadow-cyan-950/40 flex items-center justify-center space-x-2 transition-all transform active:scale-95"
        >
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>Explore Arabian Sea</span>
        </button>
      </div>

      {/* Bento Module 2: Variable Selector */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 px-1">
          <Layers className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300">Ocean Parameter</h2>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {/* Temperature Button */}
          <button
            onClick={() => onSelectVariable('temperature')}
            className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between text-left ${
              selectedVariable === 'temperature'
                ? 'bg-slate-900 border-red-500/60 text-white shadow-lg shadow-red-500/10'
                : 'glass-bento-card text-slate-400 hover:border-white/20 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-xl ${selectedVariable === 'temperature' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-900 text-slate-400'}`}>
                <Thermometer className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wide">Temperature</p>
                <p className="text-[10px] text-slate-400 font-mono">Thermal Profile (°C)</p>
              </div>
            </div>
            {selectedVariable === 'temperature' && (
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
            )}
          </button>

          {/* Salinity Button */}
          <button
            onClick={() => onSelectVariable('salinity')}
            className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between text-left ${
              selectedVariable === 'salinity'
                ? 'bg-slate-900 border-cyan-500/60 text-white shadow-lg shadow-cyan-500/10'
                : 'glass-bento-card text-slate-400 hover:border-white/20 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-xl ${selectedVariable === 'salinity' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-slate-900 text-slate-400'}`}>
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wide">Salinity</p>
                <p className="text-[10px] text-slate-400 font-mono">Salt Concentration (PSU)</p>
              </div>
            </div>
            {selectedVariable === 'salinity' && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            )}
          </button>

          {/* Currents Button */}
          <button
            onClick={() => onSelectVariable('currents')}
            className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between text-left ${
              selectedVariable === 'currents'
                ? 'bg-slate-900 border-blue-500/60 text-white shadow-lg shadow-blue-500/10'
                : 'glass-bento-card text-slate-400 hover:border-white/20 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-xl ${selectedVariable === 'currents' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-slate-900 text-slate-400'}`}>
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wide">Ocean Currents</p>
                <p className="text-[10px] text-slate-400 font-mono">Velocity Vector (m/s)</p>
              </div>
            </div>
            {selectedVariable === 'currents' && (
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            )}
          </button>
        </div>
      </div>

      {/* Bento Module 3: Vertical Depth Column */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300">Depth Level</h2>
          </div>
          <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
            {selectedDepth} m
          </span>
        </div>

        <div className="glass-bento-card p-3.5 rounded-2xl border border-white/10 space-y-2">
          {DEPTH_LEVELS.map((item, idx) => {
            const isSelected = selectedDepth === item.depth;
            return (
              <React.Fragment key={item.depth}>
                <button
                  onClick={() => onSelectDepth(item.depth)}
                  className={`w-full p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950/60 border-white/5 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyan-400 glow-neon-blue' : 'bg-slate-600'}`}></span>
                    <span>{item.label}</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400">{item.sub}</span>
                </button>
                {idx < DEPTH_LEVELS.length - 1 && (
                  <div className="flex justify-center my-0.5">
                    <ChevronDown className="w-3 h-3 text-slate-600" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Bento Module 4: Time Selector */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 px-1">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300">Observation Date</h2>
        </div>

        <div className="glass-bento-card p-3.5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
            <span>Selected Date:</span>
            <span className="font-mono font-bold text-cyan-400">{selectedDate}</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {AVAILABLE_DATES.map((date) => (
              <button
                key={date}
                onClick={() => onSelectDate(date)}
                className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all flex items-center justify-between ${
                  selectedDate === date
                    ? 'bg-slate-900 border-cyan-500/60 text-cyan-300 font-bold'
                    : 'bg-slate-950/50 border-white/5 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <span>📅 {date}</span>
                {selectedDate === date && (
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30">
                    Active
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
