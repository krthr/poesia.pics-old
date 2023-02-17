import { sampleSize } from "lodash-es";
import { Locale } from "@/constants/locales";
import { Mood } from "@/constants/moods";

type Authors = Record<Locale, Record<Mood, string[]>>;

const EN_AUTHORS = [
  "William Shakespeare",
  "John Keats",
  "John Milton",
  "William Wordsworth",
  "John Donne",
  "Percy Bysshe Shelley",
  "William Blake",
  "Geoffrey Chaucer",
  "Alfred Tennyson, 1st Baron Tennyson",
  "Dylan Thomas",
  "Christina Rossetti",
  "George Gordon Byron",
  "T. S. Eliot",
  "W. H. Auden",
];

const ES_AUTHORS = [
  // ideas de johandra
  "Pessoa",
  "Gustavo Adolfo Bécquer",
  "Nicanor Parra",
  "Jorge Luis Borges",
  "Rubén Darío",
  // "Mario Benedetti",
  "Octavio Paz",
  "Piedad Bonnett",
  "Gabriel García Márquez",
  "Alejandra Pizarnik",
  "Sor Juana Inés de La Cruz",

  // ideas de @Ipso_Factum
  "Marques de Sade",
  // "León de Greiff",
  // "Charles Bukowski",
  "Julio Cortázar",
  // "Federico García Lorca",
  "Pablo Neruda",
];

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
    erotic: ES_AUTHORS,
    fun: ES_AUTHORS,
    melancholic: ES_AUTHORS,
    romantic: ES_AUTHORS,
  },
};

export function getRandomAuthors(
  locale: Locale = "es",
  mode: Mood = "default"
) {
  return sampleSize(AUTHORS[locale][mode], 7);
}
