import { Locale } from 'App/Constants/Locales'
import { Mood } from 'App/Constants/Moods'
import { sampleSize } from 'lodash'

type Authors = Record<Locale, Record<Mood, string[]>>

const EN_AUTHORS = [
  'William Shakespeare',
  'John Keats',
  'John Milton',
  'William Wordsworth',
  'John Donne',
  'Percy Bysshe Shelley',
  'William Blake',
  'Geoffrey Chaucer',
  'Alfred Tennyson, 1st Baron Tennyson',
  'Dylan Thomas',
  'Christina Rossetti',
  'George Gordon Byron',
  'T. S. Eliot',
  'W. H. Auden',
]

const ES_AUTHORS = [
  'Pessoa',
  'Gustavo Adolfo Bécquer',
  'Nicanor Parra',
  'Jorge Luis Borges',
  'Rubén Darío',
  'Octavio Paz',
  'Piedad Bonnett',
  'Gabriel García Márquez',
  'Alejandra Pizarnik',
  // 'Sor Juana Inés de La Cruz',
  'Julio Cortázar',
  'Pablo Neruda',
  'Raúl Gómez Jattin',
]

const AUTHORS: Authors = {
  en: {
    default: EN_AUTHORS,
    erotic: EN_AUTHORS,
    fun: EN_AUTHORS,
    melancholic: EN_AUTHORS,
    romantic: EN_AUTHORS,
  },
  es: {
    default: ES_AUTHORS,
    erotic: [
      ...ES_AUTHORS,
      'Marques de Sade',
      'León de Greiff',
      'Charles Bukowski',
      'León de Greiff',
      'Federico García Lorca',
    ],
    fun: ES_AUTHORS,
    melancholic: [...ES_AUTHORS, 'León de Greiff', 'Charles Bukowski', 'Federico García Lorca'],
    romantic: [...ES_AUTHORS, 'Mario Benedetti'],
  },
}

export function getRandomAuthors(locale: Locale = 'es', mode: Mood = 'default') {
  return sampleSize(AUTHORS[locale][mode], 5)
}
