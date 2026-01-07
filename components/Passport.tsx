
import React from 'react';
import { Recommendation, ScentIdentity } from '../types';

interface Props {
  identity: ScentIdentity;
  rec: Recommendation;
  onReset: () => void;
}

const Passport: React.FC<Props> = ({ identity, rec, onReset }) => {
  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto px-6 py-12 fade-in">
      <div className="border border-gray-200 bg-white p-12 shadow-2xl relative overflow-hidden">
        {/* Abstract Background Element */}
        <div 
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-30"
            style={{ backgroundColor: rec.visualCue }}
        />

        <div className="relative z-10">
          <header className="flex justify-between items-start border-b border-gray-100 pb-8 mb-8">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400">Digital Passport</p>
              <h2 className="text-5xl font-light italic serif mt-2">{identity.name}</h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-widest uppercase text-gray-400">ID</p>
              <p className="text-xs font-mono">{identity.id}</p>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-12 mb-12">
            <div>
              <h4 className="text-[10px] tracking-widest uppercase text-gray-400 mb-2">Created</h4>
              <p className="text-sm font-light">{identity.creationDate}</p>
            </div>
            <div>
              <h4 className="text-[10px] tracking-widest uppercase text-gray-400 mb-2">Batch Status</h4>
              <p className="text-sm font-light">Authentic / First Edition</p>
            </div>
          </div>

          <div className="mb-12">
            <h4 className="text-[10px] tracking-widest uppercase text-gray-400 mb-4">Identity Profile</h4>
            <p className="text-sm font-light leading-relaxed text-gray-600 italic">
                "{identity.description}"
            </p>
          </div>

          <div className="space-y-4 border-t border-gray-100 pt-8">
             <button className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors">
               Reorder Refill
             </button>
             <button className="w-full border border-gray-200 py-4 text-xs tracking-widest uppercase hover:bg-gray-50 transition-colors">
               Evolve Scent
             </button>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button 
            onClick={onReset}
            className="text-[10px] tracking-widest uppercase text-gray-400 hover:text-black transition-colors"
        >
            Delete Identity & Start Over
        </button>
      </div>
    </div>
  );
};

export default Passport;
