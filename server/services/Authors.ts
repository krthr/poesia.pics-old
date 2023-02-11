import { sampleSize } from "lodash-es";

const AUTHORS = [
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

export function getRandomAuthors() {
  return sampleSize(AUTHORS, 7);
}
