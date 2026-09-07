import React from 'react';
import { X, BookOpen, Cpu, Radio, Anchor, Thermometer, Droplets } from 'lucide-react';

interface EducationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const LEARN_CARDS = [
  {
    icon: Cpu,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    title: 'What is a Numerical Ocean Model?',
    description:
      'Numerical ocean models (e.g. NEMO, MOM6, HYCOM) solve Navier-Stokes fluid dynamics and thermodynamic equations on high-resolution 3D spatial grids to predict global sea surface temperature, currents, and ocean circulation.',
  },
  {
    icon: Radio,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/30',
    title: 'What are In-Situ Observations?',
    description:
      'In-situ observations represent direct, real-world physical measurements taken within the marine environment using autonomous profiling floats, moorings, shipboard CTD sensors, and drift buoys.',
  },
  {
    icon: Anchor,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    title: 'What is an Argo Float?',
    description:
      'Argo floats are autonomous robotic instruments deployed throughout global oceans. They sink to depths of 2,000 meters, surface every 10 days measuring temperature/salinity profiles, and transmit data via satellite.',
  },
  {
    icon: Thermometer,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    title: 'Why does Temperature Change with Depth?',
    description:
      'Solar radiation warms only the uppermost surface ocean layer (0–100m). Below this lies the Thermocline—a sharp transition zone where temperature rapidly drops as cold, dense polar bottom water flows underneath.',
  },
  {
    icon: Droplets,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    title: 'What is Salinity?',
    description:
      'Salinity quantifies the total concentration of dissolved inorganic salts in seawater (in PSU). Driven by evaporation, rainfall, river inflow, and ice melt, salinity dictates seawater density and global thermohaline ocean currents.',
  },
];

export const EducationPanel: React.FC<EducationPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl glass-bento rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#121212] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide font-heading">
                Ocean Science Education Mode
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Key Concepts in Physical Oceanography & Data Assimilation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {LEARN_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border ${card.border} glass-bento-card hover:bg-slate-900 transition-all space-y-3 shadow-lg`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-xl ${card.bg} ${card.color} border border-white/5`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-wide font-heading">{card.title}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
