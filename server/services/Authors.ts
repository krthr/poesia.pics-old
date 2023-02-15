import { sampleSize } from "lodash-es";

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
  "W. H. Auden"
]

const LANG_AUTHORS: Record<string, Array<string>> = {
  es: ES_AUTHORS,
  en: EN_AUTHORS
}

export function getRandomAuthors(locale:string='es') {
  return sampleSize(LANG_AUTHORS[locale], 7);
}
