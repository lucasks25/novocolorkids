// Biblioteca de desenhos offline para quando não houver créditos ou conexão
import catImage from "@/assets/offline/cat.png";
import sunImage from "@/assets/offline/sun.png";
import bearImage from "@/assets/offline/bear.png";
import christmasTreeImage from "@/assets/offline/christmas-tree.png";
import crossImage from "@/assets/offline/cross.png";
import houseImage from "@/assets/offline/house.png";
import dogImage from "@/assets/offline/dog.png";
import bunnyImage from "@/assets/offline/bunny.png";
import butterflyImage from "@/assets/offline/butterfly-easy.png";
import foxImage from "@/assets/offline/fox-medium.png";
import flowerImage from "@/assets/offline/flower-easy.png";
import rainbowImage from "@/assets/offline/rainbow-easy.png";
import gardenImage from "@/assets/offline/garden-medium.png";
import doctorImage from "@/assets/offline/doctor-easy.png";
import firefighterImage from "@/assets/offline/firefighter-easy.png";
import teacherImage from "@/assets/offline/teacher-medium.png";
import snowmanImage from "@/assets/offline/snowman-easy.png";
import santaImage from "@/assets/offline/santa-easy.png";
import nativityImage from "@/assets/offline/nativity-medium.png";
import bibleImage from "@/assets/offline/bible-easy.png";
import prayerImage from "@/assets/offline/prayer-easy.png";
import jesusChildrenImage from "@/assets/offline/jesus-children-medium.png";
import carImage from "@/assets/offline/car-easy.png";
import rocketImage from "@/assets/offline/rocket-easy.png";
import cakeImage from "@/assets/offline/cake-easy.png";
import angelImage from "@/assets/offline/angel-easy.png";
import churchImage from "@/assets/offline/church-easy.png";
import noahsArkImage from "@/assets/offline/noahs-ark-easy.png";

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
    url: dogImage,
    category: "Animais Fofos",
    mode: "normal",
    difficulty: "easy",
    name: "Cachorrinho Feliz"
  },
  {
    url: bunnyImage,
    category: "Animais Fofos",
    mode: "normal",
    difficulty: "easy",
    name: "Coelhinho com Cenoura"
  },
  {
    url: bearImage,
    category: "Animais Fofos",
    mode: "normal",
    difficulty: "easy",
    name: "Ursinho com Coração"
  },
  {
    url: butterflyImage,
    category: "Animais Fofos",
    mode: "normal",
    difficulty: "easy",
    name: "Borboleta Colorida"
  },
  {
    url: sunImage,
    category: "Natureza",
    mode: "normal",
    difficulty: "easy",
    name: "Sol Sorridente"
  },
  {
    url: flowerImage,
    category: "Natureza",
    mode: "normal",
    difficulty: "easy",
    name: "Flor Feliz"
  },
  {
    url: rainbowImage,
    category: "Natureza",
    mode: "normal",
    difficulty: "easy",
    name: "Arco-Íris"
  },
  {
    url: houseImage,
    category: "Objetos",
    mode: "normal",
    difficulty: "easy",
    name: "Casinha Feliz"
  },
  {
    url: doctorImage,
    category: "Profissões",
    mode: "normal",
    difficulty: "easy",
    name: "Médico Amigo"
  },
  {
    url: firefighterImage,
    category: "Profissões",
    mode: "normal",
    difficulty: "easy",
    name: "Bombeiro Corajoso"
  },
  {
    url: carImage,
    category: "Transportes",
    mode: "normal",
    difficulty: "easy",
    name: "Carrinho Feliz"
  },
  {
    url: rocketImage,
    category: "Espaço",
    mode: "normal",
    difficulty: "easy",
    name: "Foguete Espacial"
  },
  {
    url: cakeImage,
    category: "Festas",
    mode: "normal",
    difficulty: "easy",
    name: "Bolo de Aniversário"
  },
  
  // Desenhos normais - médio
  {
    url: foxImage,
    category: "Animais Fofos",
    mode: "normal",
    difficulty: "medium",
    name: "Raposa na Floresta"
  },
  {
    url: gardenImage,
    category: "Natureza",
    mode: "normal",
    difficulty: "medium",
    name: "Jardim Encantado"
  },
  {
    url: teacherImage,
    category: "Profissões",
    mode: "normal",
    difficulty: "medium",
    name: "Professora na Sala"
  },
  
  // Desenhos de Natal - fácil
  {
    url: christmasTreeImage,
    category: "Árvore de Natal",
    mode: "christmas",
    difficulty: "easy",
    name: "Árvore de Natal Decorada"
  },
  {
    url: snowmanImage,
    category: "Enfeites Natalinos",
    mode: "christmas",
    difficulty: "easy",
    name: "Boneco de Neve"
  },
  {
    url: santaImage,
    category: "Personagens Natalinos",
    mode: "christmas",
    difficulty: "easy",
    name: "Papai Noel"
  },
  
  // Desenhos de Natal - médio
  {
    url: nativityImage,
    category: "Presépio",
    mode: "christmas",
    difficulty: "medium",
    name: "Presépio Completo"
  },
  
  // Desenhos cristãos - fácil
  {
    url: crossImage,
    category: "Símbolos Cristãos",
    mode: "christian",
    difficulty: "easy",
    name: "Cruz com Flores"
  },
  {
    url: bibleImage,
    category: "Símbolos Cristãos",
    mode: "christian",
    difficulty: "easy",
    name: "Bíblia Sagrada"
  },
  {
    url: prayerImage,
    category: "Oração",
    mode: "christian",
    difficulty: "easy",
    name: "Mãos em Oração"
  },
  {
    url: angelImage,
    category: "Personagens da Bíblia",
    mode: "christian",
    difficulty: "easy",
    name: "Anjo Feliz"
  },
  {
    url: churchImage,
    category: "Templo e Igreja",
    mode: "christian",
    difficulty: "easy",
    name: "Igreja Simples"
  },
  {
    url: noahsArkImage,
    category: "Histórias Bíblicas",
    mode: "christian",
    difficulty: "easy",
    name: "Arca de Noé"
  },
  
  // Desenhos cristãos - médio
  {
    url: jesusChildrenImage,
    category: "História Bíblica",
    mode: "christian",
    difficulty: "medium",
    name: "Jesus com Crianças"
  }
];

export const getRandomOfflineDrawing = (
  mode: "normal" | "christian" | "christmas",
  difficulty: "easy" | "medium",
  category?: string
): OfflineDrawing => {
  // Primeiro tenta filtrar por modo, dificuldade E categoria
  let filtered = offlineDrawings.filter(
    d => d.mode === mode && d.difficulty === difficulty && 
    (!category || d.category === category)
  );
  
  // Se não encontrou com a categoria exata, tenta pelo menos o modo e dificuldade
  if (filtered.length === 0 && category) {
    console.log('Nenhum desenho offline encontrado para categoria:', category, 'Tentando sem categoria específica');
    filtered = offlineDrawings.filter(
      d => d.mode === mode && d.difficulty === difficulty
    );
  }
  
  // Se ainda não houver desenhos para a dificuldade específica, tenta qualquer dificuldade do modo
  if (filtered.length === 0) {
    console.log('Nenhum desenho offline encontrado para dificuldade:', difficulty, 'Tentando qualquer dificuldade');
    filtered = offlineDrawings.filter(d => d.mode === mode);
  }
  
  // Se ainda não houver desenhos para o modo, usa desenhos normais
  if (filtered.length === 0) {
    console.log('Nenhum desenho offline encontrado para modo:', mode, 'Usando modo normal');
    filtered = offlineDrawings.filter(d => d.mode === "normal");
  }
  
  // Retorna um desenho aleatório
  const randomIndex = Math.floor(Math.random() * filtered.length);
  const selected = filtered[randomIndex];
  console.log('Desenho offline selecionado:', selected.name, 'Categoria:', selected.category);
  return selected;
};
