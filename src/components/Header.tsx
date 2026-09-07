import React from 'react';
import { Waves, BookOpen, Activity, ShieldCheck, Cpu } from 'lucide-react';

interface HeaderProps {
  onOpenEducation: () => void;
  backendOnline: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEducation, backendOnline }) => {
  return (
    <header className="h-16 px-6 glass-bento border-b border-white/10 flex items-center justify-between z-30 relative shrink-0">
      {/* Brand & Corporate Logo */}
      <div className="flex items-center space-x-3.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950 p-0.5 shadow-lg border border-white/10 flex items-center justify-center group">
          <div className="w-full h-full bg-[#121212] rounded-[10px] flex items-center justify-center group-hover:bg-slate-900 transition-colors">
            <Waves className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2.5">
            <h1 className="text-xl font-extrabold tracking-tight text-metallic">
              OceanSphere
            </h1>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-widest">
              SIH26067
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium tracking-wide">
            3D Ocean Intelligence & Data Assimilation Enterprise System
          </p>
        </div>
      </div>

      {/* Corporate Telemetry Badges & Action Bar */}
      <div className="hidden lg:flex items-center space-x-4">
        {/* Prototype Dataset Pill */}
        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs shadow-inner">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="text-slate-400 font-medium">Dataset:</span>
          <span className="text-slate-200 font-semibold tracking-wide">Prototype Demonstration Dataset</span>
        </div>

        {/* API Connection Telemetry */}
        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs shadow-inner">
          <Activity className={`w-3.5 h-3.5 ${backendOnline ? 'text-cyan-400' : 'text-amber-400'}`} />
          <span className="text-slate-400 font-medium">Telemetry:</span>
          <span className={`font-mono font-bold ${backendOnline ? 'text-cyan-400' : 'text-amber-400'}`}>
            {backendOnline ? 'FastAPI Connected (8000)' : 'Fallback Mode'}
          </span>
        </div>

        {/* Learn Mode Action */}
        <button
          onClick={onOpenEducation}
          className="flex items-center space-x-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-slate-800 via-slate-800 to-slate-900 hover:from-cyan-950 hover:to-slate-900 text-slate-200 hover:text-cyan-300 text-xs font-bold border border-white/10 hover:border-cyan-500/40 shadow-lg transition-all transform active:scale-95"
        >
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span className="tracking-wide">Learn Mode</span>
        </button>
      </div>
    </header>
  );
};
