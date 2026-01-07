
import React, { useState } from 'react';
import { Recommendation } from '../types';

interface Props {
  selection: Recommendation;
  onConfirm: (refinements: { intensity: number; warmth: number; brightness: number }) => void;
}

const RefinementModule: React.FC<Props> = ({ selection, onConfirm }) => {
  const [refinements, setRefinements] = useState({
    intensity: 50,
    warmth: 50,
    brightness: 50
  });

  const handleChange = (key: string, val: number) => {
    setRefinements(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto px-6 py-12 fade-in">
      <div className="text-center mb-16">
        <span className="text-[10px] tracking-widest uppercase text-gray-400">Refining</span>
        <h2 className="text-4xl font-light mt-2 italic serif">{selection.title}</h2>
      </div>

      <div className="space-y-16">
        <Slider 
          label="Presence" 
          low="Subtle" 
          high="Commanding" 
          value={refinements.intensity} 
          onChange={(v) => handleChange('intensity', v)} 
        />
        <Slider 
          label="Emotional Temperature" 
          low="Cool & Crisp" 
          high="Deep & Warm" 
          value={refinements.warmth} 
          onChange={(v) => handleChange('warmth', v)} 
        />
        <Slider 
          label="Luminosity" 
          low="Shadowed" 
          high="Bright" 
          value={refinements.brightness} 
          onChange={(v) => handleChange('brightness', v)} 
        />
      </div>

      <div className="mt-auto pt-24 text-center">
        <button 
          onClick={() => onConfirm(refinements)}
          className="w-full bg-black text-white py-6 tracking-widest uppercase text-xs hover:bg-gray-900 transition-colors"
        >
          Finalize Signature
        </button>
        <p className="mt-6 text-[10px] text-gray-400 uppercase tracking-widest">
            A master perfumer logic will validate these proportions.
        </p>
      </div>
    </div>
  );
};

const Slider = ({ label, low, high, value, onChange }: { 
    label: string, 
    low: string, 
    high: string, 
    value: number, 
    onChange: (v: number) => void 
}) => (
  <div className="flex flex-col space-y-4">
    <div className="flex justify-between items-end">
      <label className="text-sm tracking-widest uppercase">{label}</label>
      <span className="text-[10px] text-gray-400">{value}%</span>
    </div>
    <input 
      type="range" 
      min="0" 
      max="100" 
      value={value} 
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-[1px] bg-gray-200 appearance-none cursor-pointer accent-black"
    />
    <div className="flex justify-between">
      <span className="text-[10px] uppercase tracking-widest text-gray-400">{low}</span>
      <span className="text-[10px] uppercase tracking-widest text-gray-400">{high}</span>
    </div>
  </div>
);

export default RefinementModule;
