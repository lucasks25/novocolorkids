// Biblioteca de desenhos offline para quando não houver créditos ou conexão
import catImage from "@/assets/offline/cat.png";
import sunImage from "@/assets/offline/sun.png";
import bearImage from "@/assets/offline/bear.png";
import christmasTreeImage from "@/assets/offline/christmas-tree.png";
import crossImage from "@/assets/offline/cross.png";
import houseImage from "@/assets/offline/house.png";

interface OfflineDrawing {
  url: string;
  category: string;
  mode: "normal" | "christian" | "christmas";
  difficulty: "easy" | "medium";
  name: string;
}

export const offlineDrawings: OfflineDrawing[] = [
  // Desenhos normais - fácil
  {
    url: catImage,
    category: "Animais Fofos",
    mode: "normal",
    difficulty: "easy",
    name: "Gatinho Fofo"
  },
  {
    url: sunImage,
    category: "Natureza",
    mode: "normal",
    difficulty: "easy",
    name: "Sol Sorridente"
  },
  {
    url: bearImage,
    category: "Animais Fofos",
    mode: "normal",
    difficulty: "easy",
    name: "Ursinho com Coração"
  },
  {
    url: houseImage,
    category: "Objetos",
    mode: "normal",
    difficulty: "easy",
    name: "Casinha Feliz"
  },
  
  // Desenhos de Natal - fácil
  {
    url: christmasTreeImage,
    category: "Árvore de Natal",
    mode: "christmas",
    difficulty: "easy",
    name: "Árvore de Natal Decorada"
  },
  
  // Desenhos cristãos - fácil
  {
    url: crossImage,
    category: "Símbolos Cristãos",
    mode: "christian",
    difficulty: "easy",
    name: "Cruz com Flores"
  }
];

export const getRandomOfflineDrawing = (
  mode: "normal" | "christian" | "christmas",
  difficulty: "easy" | "medium"
): OfflineDrawing => {
  // Filtra desenhos por modo e dificuldade
  let filtered = offlineDrawings.filter(
    d => d.mode === mode && d.difficulty === difficulty
  );
  
  // Se não houver desenhos para a dificuldade específica, tenta qualquer dificuldade
  if (filtered.length === 0) {
    filtered = offlineDrawings.filter(d => d.mode === mode);
  }
  
  // Se ainda não houver desenhos para o modo, usa desenhos normais
  if (filtered.length === 0) {
    filtered = offlineDrawings.filter(d => d.mode === "normal");
  }
  
  // Retorna um desenho aleatório
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
};
