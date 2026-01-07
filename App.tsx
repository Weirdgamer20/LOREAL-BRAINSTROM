
import React, { useState, useEffect } from 'react';
import { AppState, UserResponses, Recommendation, ScentIdentity } from './types';
import QuestionFlow from './components/QuestionFlow';
import RecommendationCards from './components/RecommendationCards';
import RefinementModule from './components/RefinementModule';
import Passport from './components/Passport';
import { generateScentRecommendations, createScentIdentity } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.WELCOME);
  const [responses, setResponses] = useState<UserResponses | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null);
  const [finalIdentity, setFinalIdentity] = useState<ScentIdentity | null>(null);
  const [loading, setLoading] = useState(false);

  const startQuiz = () => setState(AppState.QUIZ);

  const handleQuizComplete = async (res: UserResponses) => {
    setResponses(res);
    setLoading(true);
    setState(AppState.ANALYSIS);
    
    // Simulate luxury processing time
    const [recs] = await Promise.all([
        generateScentRecommendations(res),
        new Promise(resolve => setTimeout(resolve, 3000))
    ]);
    
    setRecommendations(recs);
    setLoading(false);
    setState(AppState.RECOMMENDATIONS);
  };

  const handleRecSelect = (rec: Recommendation) => {
    setSelectedRec(rec);
    setState(AppState.REFINE);
  };

  const handleFinalize = async (refinements: any) => {
    if (!selectedRec) return;
    setLoading(true);
    
    const description = await createScentIdentity(selectedRec, refinements);
    
    const identity: ScentIdentity = {
        id: Math.random().toString(36).substring(2, 9).toUpperCase(),
        name: selectedRec.title,
        description: description,
        abstractNotes: [selectedRec.metaphor],
        refinementState: refinements,
        creationDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    setFinalIdentity(identity);
    setLoading(false);
    setState(AppState.PASSPORT);
  };

  const reset = () => {
      setState(AppState.WELCOME);
      setResponses(null);
      setRecommendations([]);
      setSelectedRec(null);
      setFinalIdentity(null);
  };

  return (
    <div className="min-h-screen luxury-gradient text-gray-900 overflow-x-hidden selection:bg-black selection:text-white">
      {/* Navigation / Brand Header */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto cursor-pointer" onClick={reset}>
           <h1 className="text-xl tracking-[0.3em] uppercase font-light">Ether Signature</h1>
        </div>
        <div className="pointer-events-auto">
            <button className="text-[10px] tracking-widest uppercase border border-gray-200 px-4 py-2 hover:bg-black hover:text-white transition-all bg-white/50 backdrop-blur-sm">
              Menu
            </button>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        {state === AppState.WELCOME && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 fade-in">
            <span className="text-xs tracking-[0.5em] uppercase text-gray-400 mb-8">Personal Identity Perfume</span>
            <h2 className="text-5xl md:text-7xl font-light mb-12 max-w-4xl leading-tight">
              A fragrance that is not a scent, <br />
              <span className="italic serif">but a reflection of being.</span>
            </h2>
            <button 
              onClick={startQuiz}
              className="group relative px-12 py-6 overflow-hidden"
            >
              <span className="relative z-10 text-xs tracking-[0.4em] uppercase transition-colors group-hover:text-white">
                Begin Discovery
              </span>
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="absolute inset-0 border border-black" />
            </button>
            <p className="mt-12 text-[10px] tracking-[0.2em] uppercase text-gray-400 max-w-xs leading-relaxed">
              Anonymous by design. <br /> Private by luxury standards.
            </p>
          </div>
        )}

        {state === AppState.QUIZ && <QuestionFlow onComplete={handleQuizComplete} />}

        {state === AppState.ANALYSIS && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] fade-in px-6 text-center">
            <div className="w-px h-24 bg-gray-200 mb-12 animate-pulse" />
            <h3 className="text-2xl font-light italic serif mb-4 animate-pulse">Consulting the Archives</h3>
            <p className="text-xs tracking-widest uppercase text-gray-400 max-w-xs">
              Synthesizing emotional data with master perfumer logic...
            </p>
          </div>
        )}

        {state === AppState.RECOMMENDATIONS && (
          <RecommendationCards 
            recommendations={recommendations} 
            onSelect={handleRecSelect} 
          />
        )}

        {state === AppState.REFINE && selectedRec && (
          <RefinementModule 
            selection={selectedRec} 
            onConfirm={handleFinalize} 
          />
        )}

        {state === AppState.PASSPORT && finalIdentity && selectedRec && (
          <Passport 
            identity={finalIdentity} 
            rec={selectedRec} 
            onReset={reset} 
          />
        )}

        {loading && state !== AppState.ANALYSIS && (
             <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex items-center justify-center fade-in">
                 <div className="text-center">
                    <div className="w-8 h-8 border-t border-black rounded-full animate-spin mb-4 mx-auto" />
                    <p className="text-[10px] tracking-[0.3em] uppercase">Refining Identity</p>
                 </div>
             </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-8 z-40 pointer-events-none flex justify-between items-end">
        <div className="pointer-events-auto">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                © 2025 Ether Labs
            </p>
        </div>
        <div className="pointer-events-auto text-right">
             <p className="text-[10px] text-gray-400 uppercase tracking-widest hover:text-black cursor-pointer transition-colors">
                Privacy as Luxury
             </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
