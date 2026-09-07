import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, HelpCircle } from 'lucide-react';
import { OceanDataResponse, ChatMessage } from '../types/ocean';

interface OceanAIProps {
  oceanData: OceanDataResponse | null;
}

const PRESET_QUESTIONS = [
  'Why is the temperature lower at this depth?',
  'What is salinity?',
  'Why is there a difference between the model and observation?',
  'Why are currents important?',
];

export const OceanAI: React.FC<OceanAIProps> = ({ oceanData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Greetings. I am Ocean AI 🤖, your marine data intelligence assistant. Query me regarding temperature stratification, salinity profiles, numerical modeling physics, or in-situ Argo float observations.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const generateScientificResponse = (query: string): string => {
    const q = query.toLowerCase();
    const lat = oceanData?.location.latitude ?? 15.2;
    const lon = oceanData?.location.longitude ?? 65.3;
    const depth = oceanData?.depth ?? 0;
    const temp = oceanData?.model.temperature ?? 28.4;
    const sal = oceanData?.model.salinity ?? 35.3;
    const diffTemp = oceanData?.difference.temperature ?? 0.5;

    if (q.includes('temperature') || q.includes('lower') || q.includes('depth') || q.includes('cold')) {
      return `At your selected depth of ${depth}m at (${lat}°, ${lon}°), the ocean temperature is ${temp}°C. Solar radiation is absorbed primarily within the top 100 meters (Epipelagic zone). Below this layer lies the Thermocline—a steep gradient where temperature drops rapidly as dense, cold polar water mass flows underneath.`;
    }

    if (q.includes('salinity') || q.includes('salt') || q.includes('psu')) {
      return `Salinity measures dissolved inorganic salt content in Practical Salinity Units (PSU). At this location, the model registers ${sal} PSU. Salinity is governed by evaporation rates, freshwater river runoff, precipitation, and thermohaline circulation.`;
    }

    if (q.includes('difference') || q.includes('model') || q.includes('observation') || q.includes('bias') || q.includes('error')) {
      return `Currently, there is a temperature difference of ${diffTemp}°C between the numerical ocean model (${temp}°C) and the in-situ Argo float observation. Numerical models compute fluid dynamics across discrete grid cells, whereas Argo floats record precise in-situ profiles. Data assimilation methods reconcile these differences!`;
    }

    if (q.includes('current') || q.includes('speed') || q.includes('direction') || q.includes('flow')) {
      return `Ocean currents at this location flow at ${oceanData?.model.current_speed ?? 0.7} m/s towards ${oceanData?.model.current_direction ?? 120}°. Currents drive global climate by regulating heat transport between equatorial and polar oceanic basins.`;
    }

    return `Active Telemetry Context at (${lat}° N, ${lon}° E), depth ${depth}m: Model Temperature is ${temp}°C, Salinity is ${sal} PSU. Integrating numerical models with in-situ Argo observation data optimizes forecast precision for monsoon dynamics and marine heatwaves.`;
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');

    setTimeout(() => {
      const responseText = generateScientificResponse(text);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-3 px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-2xl border border-cyan-500/40 glow-neon-blue transition-all transform hover:scale-105 active:scale-95 group"
        >
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/40">
            <Bot className="w-5 h-5 text-cyan-300 group-hover:rotate-12 transition-transform" />
          </div>
          <span className="text-xs font-mono tracking-wider">🤖 Ocean AI</span>
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
        </button>
      )}

      {isOpen && (
        <div className="w-96 h-[530px] glass-bento rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="px-4 py-3 bg-[#121212] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center space-x-1.5 font-heading">
                  <span>Ocean AI Core</span>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h3>
                <p className="text-[10px] text-slate-400 font-mono">Local Intelligence Engine</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Telemetry Context Bar */}
          <div className="px-4 py-1.5 bg-slate-950 border-b border-white/5 text-[10px] text-cyan-400 font-mono flex items-center justify-between">
            <span>Lat: {oceanData?.location.latitude ?? 15.2}°</span>
            <span>Lon: {oceanData?.location.longitude ?? 65.3}°</span>
            <span>Depth: {oceanData?.depth ?? 0}m</span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-slate-800 text-white rounded-br-none border border-cyan-500/40 shadow-md font-mono'
                      : 'bg-slate-900/90 text-slate-200 border border-white/10 rounded-bl-none shadow-md font-sans'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 font-mono">{msg.timestamp}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Preset Chips */}
          <div className="px-3 py-2.5 bg-slate-950/80 border-t border-white/5 space-y-1.5">
            <p className="text-[10px] font-semibold text-slate-400 flex items-center space-x-1 font-mono">
              <HelpCircle className="w-3 h-3 text-cyan-400" />
              <span>Suggested Queries:</span>
            </p>
            <div className="flex flex-wrap gap-1">
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="text-[10px] font-mono bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 px-2.5 py-1 rounded-lg border border-white/10 transition-colors text-left truncate max-w-full"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 bg-[#121212] border-t border-white/10 flex items-center space-x-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Ocean AI a question..."
              className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 bg-slate-800 hover:bg-cyan-950 text-cyan-300 rounded-xl border border-cyan-500/40 transition-colors shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
