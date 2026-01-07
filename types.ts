
export enum AppState {
  WELCOME = 'WELCOME',
  QUIZ = 'QUIZ',
  ANALYSIS = 'ANALYSIS',
  RECOMMENDATIONS = 'RECOMMENDATIONS',
  REFINE = 'REFINE',
  PASSPORT = 'PASSPORT'
}

export interface Question {
  id: string;
  label: string;
  options: { value: string; label: string; image?: string }[];
}

export interface UserResponses {
  [key: string]: string;
}

export interface ScentIdentity {
  name: string;
  description: string;
  abstractNotes: string[];
  refinementState: {
    intensity: number; // 0-100
    warmth: number;    // 0-100
    brightness: number; // 0-100
  };
  creationDate: string;
  id: string;
}

export interface Recommendation {
  id: string;
  title: string;
  metaphor: string;
  description: string;
  visualCue: string; // Color hex or abstract description
}
