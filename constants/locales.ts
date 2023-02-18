export const LOCALES = ["es", "en"] as const;

export const LOCALES_NAMES: Record<Locale, string> = {
  es: "Español",
  en: "English",
} as const;

export type Locale = typeof LOCALES[number];
