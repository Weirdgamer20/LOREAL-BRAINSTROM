
import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 'mood',
    label: 'Which landscape calls to you this morning?',
    options: [
      { value: 'misty-forest', label: 'A forest veiled in silver mist' },
      { value: 'warm-coast', label: 'Sunlight reflecting off salt water' },
      { value: 'quiet-library', label: 'Leather-bound books and rain' },
      { value: 'urban-dusk', label: 'Electric blue light at twilight' }
    ]
  },
  {
    id: 'presence',
    label: 'How do you wish to move through a room?',
    options: [
      { value: 'subtle', label: 'As a gentle, lingering memory' },
      { value: 'magnetic', label: 'A quiet pull of curiosity' },
      { value: 'authoritative', label: 'With structured, classic elegance' },
      { value: 'ethereal', label: 'Weightless and luminous' }
    ]
  },
  {
    id: 'texture',
    label: 'What texture defines your comfort?',
    options: [
      { value: 'silk', label: 'Cool, flowing silk' },
      { value: 'cashmere', label: 'Warm, enveloped cashmere' },
      { value: 'linen', label: 'Crisp, structured linen' },
      { value: 'velvet', label: 'Deep, heavy velvet' }
    ]
  },
  {
    id: 'time',
    label: 'When is your energy most vibrant?',
    options: [
      { value: 'dawn', label: 'The stillness before the sun' },
      { value: 'noon', label: 'The zenith of clarity' },
      { value: 'golden-hour', label: 'The warmth of the descent' },
      { value: 'midnight', label: 'The depth of the unknown' }
    ]
  },
  {
    id: 'aspiration',
    label: 'What do you seek from your signature?',
    options: [
      { value: 'calm', label: 'An inner sanctuary' },
      { value: 'spark', label: 'A creative awakening' },
      { value: 'grounding', label: 'A connection to the earth' },
      { value: 'mystery', label: 'An unspoken dialogue' }
    ]
  }
];

export const THEME = {
  colors: {
    primary: '#1A1A1A',
    secondary: '#F9F8F6',
    accent: '#D4AF37', // Gold
    muted: '#E8E4DF',
    textMuted: '#6B7280'
  }
};
