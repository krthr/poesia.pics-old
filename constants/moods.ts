export const MOODS = [
  "default",
  "romantic",
  "erotic",
  "melancholic",
  "fun",
] as const;

export type Mood = typeof MOODS[number];
