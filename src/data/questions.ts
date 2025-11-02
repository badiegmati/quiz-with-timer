export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Ou se trouve les entreprises Corsair ?",
    options: ["Paris", "Californie", "Roma", "London"],
    correctAnswer: "Californie"
  },
  {
    id: 2,
    question: "En quelle année Corsair a-t-elle été fondée ?",
    options: ["1994", "2000", "1999", "1995"],
    correctAnswer: "1994"
  },
  {
    id: 3,
    question: "Qui est le fondateur de Corsair ?",
    options: ["Don Lieberman", "Andy Paul", "John Beekley", "les trois"],
    correctAnswer: "les trois"
  },
  {
    id: 4,
    question: "Quel est le prix public du clavier mécanique haut de gamme K70 RGB PRO de Corsair ?",
    options: ["99€", "98€", "100€", "97€"],
    correctAnswer: "99€"
  },
  {
    id: 5,
    question: "Quelle est notre produit gaming dernier cri ?",
    options: ["fervex ", "vortex", "FLOW", "gripex"],
    correctAnswer: "vortex"
  },
  {
    id: 6,
    question: "Quelle est l’Accessoire dernier cri ?",
    options: ["blow", "plow", "flow", "aucun"],
    correctAnswer: "flow"
  },
  {
    id: 7,
    question: "Quellle est le nom de notre  souris dans la video explicatif?",
    options: ["dark core rgb pro max ", "bbj", "rpg", "dark core rgb pro "],
    correctAnswer: "dark core rgb pro "
  },
  {
    id: 8,
    question: "quelle est la plage de taille de RAM (mémoire vive) proposée en options?",
    options: ["12GB jusqu'à 64GB", "RTX 4070 jusqu'à RTX 4090", "5600MHz à 7200MHz", "1TB ou 2TB"],
    correctAnswer: "12GB jusqu'à 64GB"
  },
  {
    id: 9,
    question: "Quel produit a initialement rendu la société Corsair célèbre au début de son histoire?",
    options: ["Boîtiers PC", "Modules de mémoire vive (RAM) haute performance", "Claviers mécaniques", "Blocs d'alimentation (PSU)"],
    correctAnswer: "Modules de mémoire vive (RAM) haute performance"
  },
  {
    id: 10,
    question: "Quelle ligne de produits de mémoire vive (RAM) de Corsair est connue pour ses barres de diffusion de chaleur très hautes et ses performances extrêmes, comme les Dominator Platinum ?",
    options: ["Mac Memory", "Vengeance", "Dominator", "ValueSelect"],
    correctAnswer: "Dominator"
  }
];

export function getRandomQuestions(count: number = 5): Question[] {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, quizQuestions.length));
}
