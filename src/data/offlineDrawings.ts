// Biblioteca de desenhos offline
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

// Novas imagens
import dog1 from "@/assets/offline/dog-1.png";
import cat2 from "@/assets/offline/cat-2.png";
import bunny2 from "@/assets/offline/bunny-2.png";
import bear2 from "@/assets/offline/bear-2.png";
import elephantEasy from "@/assets/offline/elephant-easy.png";
import lionEasy from "@/assets/offline/lion-easy.png";
import giraffeEasy from "@/assets/offline/giraffe-easy.png";
import monkeyEasy from "@/assets/offline/monkey-easy.png";
import dolphinEasy from "@/assets/offline/dolphin-easy.png";
import penguinEasy from "@/assets/offline/penguin-easy.png";
import turtleEasy from "@/assets/offline/turtle-easy.png";
import pigEasy from "@/assets/offline/pig-easy.png";
import cowEasy from "@/assets/offline/cow-easy.png";
import horseEasy from "@/assets/offline/horse-easy.png";
import sheepEasy from "@/assets/offline/sheep-easy.png";
import chickenEasy from "@/assets/offline/chicken-easy.png";
import duckEasy from "@/assets/offline/duck-easy.png";
import treeEasy from "@/assets/offline/tree-easy.png";
import sunflowerEasy from "@/assets/offline/sunflower-easy.png";
import roseEasy from "@/assets/offline/rose-easy.png";
import santa2 from "@/assets/offline/santa-2.png";
import christmasTree2 from "@/assets/offline/christmas-tree-2.png";
import snowman2 from "@/assets/offline/snowman-2.png";
import jesusChildren2 from "@/assets/offline/jesus-children-2.png";
import prayer2 from "@/assets/offline/prayer-2.png";
import church2 from "@/assets/offline/church-2.png";
import rainbow2 from "@/assets/offline/rainbow-2.png";
import angel2 from "@/assets/offline/angel-2.png";
import fishEasy from "@/assets/offline/fish-easy.png";
import whaleEasy from "@/assets/offline/whale-easy.png";

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
  },
  
  // Animais adicionais - fácil
  { url: dog1, category: "Animais Fofos", mode: "normal", difficulty: "easy", name: "Cachorro Feliz 2" },
  { url: cat2, category: "Animais Fofos", mode: "normal", difficulty: "easy", name: "Gato Brincalhão" },
  { url: bunny2, category: "Animais Fofos", mode: "normal", difficulty: "easy", name: "Coelho Pulando" },
  { url: bear2, category: "Animais Fofos", mode: "normal", difficulty: "easy", name: "Urso Sorridente" },
  { url: elephantEasy, category: "Animais Fofos", mode: "normal", difficulty: "easy", name: "Elefante Amigável" },
  { url: lionEasy, category: "Animais Fofos", mode: "normal", difficulty: "easy", name: "Leão Feliz" },
  { url: giraffeEasy, category: "Animais Fofos", mode: "normal", difficulty: "easy", name: "Girafa Fofa" },
  { url: monkeyEasy, category: "Animais Fofos", mode: "normal", difficulty: "easy", name: "Macaco Divertido" },
  { url: dolphinEasy, category: "Animais Fofos", mode: "normal", difficulty: "easy", name: "Golfinho Saltando" },
  { url: penguinEasy, category: "Animais Fofos", mode: "normal", difficulty: "easy", name: "Pinguim Fofo" },
  { url: turtleEasy, category: "Animais Fofos", mode: "normal", difficulty: "easy", name: "Tartaruga Sorridente" },
  { url: pigEasy, category: "Animais da Fazenda", mode: "normal", difficulty: "easy", name: "Porquinho" },
  { url: cowEasy, category: "Animais da Fazenda", mode: "normal", difficulty: "easy", name: "Vaquinha" },
  { url: horseEasy, category: "Animais da Fazenda", mode: "normal", difficulty: "easy", name: "Cavalinho" },
  { url: sheepEasy, category: "Animais da Fazenda", mode: "normal", difficulty: "easy", name: "Ovelhinha" },
  { url: chickenEasy, category: "Animais da Fazenda", mode: "normal", difficulty: "easy", name: "Galinha" },
  { url: duckEasy, category: "Animais da Fazenda", mode: "normal", difficulty: "easy", name: "Patinho" },
  { url: fishEasy, category: "Animais Marinhos", mode: "normal", difficulty: "easy", name: "Peixinho" },
  { url: whaleEasy, category: "Animais Marinhos", mode: "normal", difficulty: "easy", name: "Baleia Sorridente" },
  
  // Natureza adicional
  { url: treeEasy, category: "Natureza", mode: "normal", difficulty: "easy", name: "Árvore Bonita" },
  { url: sunflowerEasy, category: "Natureza", mode: "normal", difficulty: "easy", name: "Girassol Feliz" },
  { url: roseEasy, category: "Natureza", mode: "normal", difficulty: "easy", name: "Rosa Linda" },
  
  // Natal adicional
  { url: santa2, category: "Papai Noel", mode: "christmas", difficulty: "easy", name: "Rosto do Papai Noel" },
  { url: christmasTree2, category: "Árvore de Natal", mode: "christmas", difficulty: "easy", name: "Árvore Decorada" },
  { url: snowman2, category: "Boneco de Neve", mode: "christmas", difficulty: "easy", name: "Boneco com Cachecol" },
  
  // Cristãos adicionais
  { url: jesusChildren2, category: "História Bíblica", mode: "christian", difficulty: "easy", name: "Jesus e as Crianças 2" },
  { url: prayer2, category: "Oração", mode: "christian", difficulty: "easy", name: "Mãos com Cruz" },
  { url: church2, category: "Templo e Igreja", mode: "christian", difficulty: "easy", name: "Igreja Bonita" },
  { url: rainbow2, category: "Símbolos Cristãos", mode: "christian", difficulty: "easy", name: "Arco-íris com Nuvens" },
  { url: angel2, category: "Personagens da Bíblia", mode: "christian", difficulty: "easy", name: "Anjinho Fofo" }
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
