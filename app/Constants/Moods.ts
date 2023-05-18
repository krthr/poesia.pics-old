export const MOODS = ['default', 'romantic', 'erotic', 'melancholic', 'fun'] as const

export const MOODS_DICT: Record<Mood, object> = {
  default: {
    label: 'La IA elige 🤖',
    key: 'default',
    color: 'gray-700',
    icon: 'ph:robot',
  },
  romantic: {
    label: 'Romance ❤️‍🔥',
    key: 'romantic',
    color: 'red-500',
    icon: 'ph:heart',
  },
  erotic: {
    label: 'Erotismo 🥵',
    key: 'erotic',
    color: 'orange-500',
    icon: 'ph:fire',
  },
  melancholic: {
    label: 'Melancolía 😥',
    key: 'melancholic',
    color: 'sky-900',
    icon: 'ph:mask-sad',
  },
  fun: {
    label: 'Diversión 😂',
    key: 'fun',
    color: 'emerald-500',
    icon: 'ph:mask-happy',
  },
} as const

export const MOODS_LIST = Object.values(MOODS_DICT)

export type Mood = (typeof MOODS)[number]
