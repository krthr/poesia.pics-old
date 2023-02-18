export const MOODS = {
  default: {
    key: "default",
    color: "gray-700",
    icon: "ph:robot",
  },
  romantic: {
    key: "romantic",
    color: "red-500",
    icon: "ph:heart",
  },
  erotic: {
    key: "erotic",
    color: "orange-500",
    icon: "ph:fire",
  },
  melancholic: {
    key: "melancholic",
    color: "sky-900",
    icon: "ph:mask-sad",
  },
  fun: {
    key: "fun",
    color: "emerald-500",
    icon: "ph:mask-happy",
  },
} as const;

export type Mood = keyof typeof MOODS;
