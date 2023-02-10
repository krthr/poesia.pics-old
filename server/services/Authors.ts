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

function getRandomSample<T>(arr: T[], size: number) {
  const shuffled = arr.slice(0);
  let i = arr.length;

  while (i--) {
    const index = Math.floor((i + 1) * Math.random());
    const temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(0, size);
}

export function getRandomAuthors() {
  const authors = getRandomSample(AUTHORS, 7).join(", ");
  return authors;
}
