import Logger from '@ioc:Adonis/Core/Logger'
import { readFile } from 'node:fs/promises'

import { createCompletion } from 'App/Services/OpenAiService'
import { getImageCaption } from 'App/Services/ReplicateService'
import { getRandomAuthors } from 'App/Utils/Authors'
import { processImage } from 'App/Services/ImageService'
import { Mood } from 'App/Constants/Moods'
import { Locale } from 'App/Constants/Locales'

const MODES: Record<Mood, string> = {
  erotic: 'an erotic',
  romantic: 'a romantic',
  melancholic: 'a melancholic',
  fun: 'a fun',
  default: 'a',
} as const

const LANGS: Record<Locale, string> = {
  es: 'Spanish',
  en: 'English',
} as const

export async function generatePoem(imagePath: string, lang: Locale = 'es', mood: Mood = 'default') {
  const buff = await readFile(imagePath)

  const processedImage = await processImage(buff)
  const caption = await getImageCaption(processedImage.base64)

  const author = getRandomAuthors(lang, mood).join(', ')

  const promp = [
    `You are a poet with similar style to `,
    author,
    `Write ${MODES[mood]} prose poem`,
    `of maximum two paragraphs in ${LANGS[lang]}, inspired by`,
    caption,
  ].join(' ')

  Logger.info({ caption, mood, lang, author, promp }, 'generating poem')

  const poem = await createCompletion(promp)

  return {
    author,
    caption,
    image: processedImage.base64,
    mood,
    poem,
    promp,
  }
}
