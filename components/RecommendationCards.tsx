
import React from 'react';
import { Recommendation } from '../types';

interface Props {
  recommendations: Recommendation[];
  onSelect: (rec: Recommendation) => void;
}

const RecommendationCards: React.FC<Props> = ({ recommendations, onSelect }) => {
  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto px-6 py-12 fade-in">
      <header className="mb-16 text-center">
        <h2 className="text-4xl font-light mb-4">Your Identity Profiles</h2>
        <p className="text-gray-500 max-w-md mx-auto font-light">
          Our algorithm has identified three distinct emotional directions that resonate with your inputs.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recommendations.map((rec) => (
          <div 
            key={rec.id}
            onClick={() => onSelect(rec)}
            className="group cursor-pointer bg-white border border-transparent hover:border-black transition-all duration-500 p-8 flex flex-col items-center text-center h-[500px] justify-between shadow-sm hover:shadow-xl"
          >
            <div 
              className="w-32 h-32 rounded-full mb-8 flex items-center justify-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundColor: rec.visualCue, opacity: 0.2 }}
            >
                <div className="w-16 h-16 rounded-full blur-xl animate-pulse" style={{ backgroundColor: rec.visualCue }} />
            </div>
            
            <div>
              <h3 className="text-2xl mb-2 italic serif">{rec.title}</h3>
              <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-6">{rec.metaphor}</p>
              <p className="text-sm font-light leading-relaxed text-gray-600 line-clamp-4">
                {rec.description}
              </p>
            </div>

            <button className="mt-8 border-b border-black text-xs tracking-widest uppercase py-2 opacity-0 group-hover:opacity-100 transition-all">
              Explore this Path
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCards;
