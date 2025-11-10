import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { X } from "lucide-react";

interface BibleVerse {
  text: string;
  reference: string;
}

const bibleVerses: BibleVerse[] = [
  {
    text: "Deixai vir a mim as criancinhas, e não as impeçais, porque o Reino de Deus é delas.",
    reference: "Marcos 10:14",
  },
  {
    text: "O Senhor é o meu pastor, nada me faltará.",
    reference: "Salmos 23:1",
  },
  {
    text: "Tudo posso naquele que me fortalece.",
    reference: "Filipenses 4:13",
  },
  {
    text: "O amor é paciente, o amor é bondoso.",
    reference: "1 Coríntios 13:4",
  },
  {
    text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.",
    reference: "João 3:16",
  },
  {
    text: "Não temais, porque eu estou convosco.",
    reference: "Isaías 41:10",
  },
  {
    text: "Os que esperam no Senhor renovam as suas forças.",
    reference: "Isaías 40:31",
  },
  {
    text: "Ama o Senhor, teu Deus, de todo o teu coração.",
    reference: "Mateus 22:37",
  },
];

interface BibleVerseCardProps {
  onClose: () => void;
}

export const BibleVerseCard = ({ onClose }: BibleVerseCardProps) => {
  const [verse, setVerse] = useState<BibleVerse | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const randomVerse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
    setVerse(randomVerse);
    
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!verse) return null;

  return (
    <div className={`fixed top-20 right-4 z-50 transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <Card className="max-w-sm p-6 bg-card/95 backdrop-blur-sm border-2 border-primary/20 shadow-2xl relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
        
        <div className="space-y-4 pr-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-12 bg-gradient-to-b from-accent to-secondary rounded-full" />
            <p className="text-lg font-medium text-foreground leading-relaxed italic">
              "{verse.text}"
            </p>
          </div>
          
          <p className="text-sm text-primary font-semibold text-right">
            — {verse.reference}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -left-2 w-8 h-8 bg-accent/20 rounded-full blur-xl" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-secondary/20 rounded-full blur-xl" />
      </Card>
    </div>
  );
};
