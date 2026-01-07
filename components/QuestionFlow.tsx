
import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { UserResponses } from '../types';

interface Props {
  onComplete: (responses: UserResponses) => void;
}

const QuestionFlow: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<UserResponses>({});

  const currentQuestion = QUESTIONS[step];

  const handleSelect = (value: string) => {
    const newResponses = { ...responses, [currentQuestion.id]: value };
    setResponses(newResponses);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(newResponses);
    }
  };

  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto px-6 py-12 fade-in">
      <div className="mb-12">
        <div className="h-0.5 w-full bg-gray-200">
          <div 
            className="h-full bg-black transition-all duration-700 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[10px] tracking-widest uppercase mt-4 text-gray-400">
          Step {step + 1} of {QUESTIONS.length}
        </p>
      </div>

      <h2 className="text-3xl md:text-4xl font-light mb-12 leading-tight">
        {currentQuestion.label}
      </h2>

      <div className="space-y-4">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className="w-full text-left p-6 border border-gray-100 bg-white hover:border-black transition-all duration-300 group flex justify-between items-center"
          >
            <span className="text-lg font-light group-hover:pl-2 transition-all duration-300">
              {option.label}
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-auto pt-12 text-center">
        <button 
          onClick={() => step > 0 && setStep(step - 1)}
          disabled={step === 0}
          className={`text-xs tracking-widest uppercase ${step === 0 ? 'opacity-0' : 'opacity-40 hover:opacity-100'} transition-opacity`}
        >
          Previous
        </button>
      </div>
    </div>
  );
};

export default QuestionFlow;
