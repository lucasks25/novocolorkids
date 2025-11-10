import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Download, Loader2, Palette } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import jsPDF from "jspdf";
import { ColoringCanvas } from "./ColoringCanvas";
import { BibleVerseCard } from "./BibleVerseCard";
import { PersistentBanner } from "./PersistentBanner";

interface DrawingGeneratorProps {
  selectedCategory?: string;
  isChristianMode?: boolean;
}

const DrawingGenerator = ({ selectedCategory, isChristianMode = false }: DrawingGeneratorProps) => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showColoring, setShowColoring] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [showBibleVerse, setShowBibleVerse] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
useEffect(() => {
    // Listen for drawing completion to unlock achievement and hide banner
    const handleDrawingComplete = (event: CustomEvent) => {
      if (currentCategory && (window as any).unlockAchievement) {
        (window as any).unlockAchievement(currentCategory);
      }
      setStatusMessage(null);
    };

    window.addEventListener('drawingCompleted', handleDrawingComplete as EventListener);
    return () => {
      window.removeEventListener('drawingCompleted', handleDrawingComplete as EventListener);
    };
  }, [currentCategory]);

  useEffect(() => {
    if (showColoring) {
      setStatusMessage('Colorindo... finalize quando terminar!');
    } else if (generatedImage) {
      setStatusMessage('Desenho pronto! Toque em Colorir ou Baixar.');
    } else {
      setStatusMessage(null);
    }
  }, [showColoring, generatedImage]);

  const generateDrawing = async () => {
    if (!selectedCategory) {
      toast.error("Por favor, selecione uma categoria primeiro!");
      return;
    }

    setStatusMessage("Gerando desenho...");
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-coloring-image', {
        body: { 
          category: selectedCategory,
          isChristianMode: isChristianMode 
        }
      });

      if (error) {
        console.error('Error generating drawing:', error);
        throw error;
      }

      if (data?.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setCurrentCategory(selectedCategory);
        setShowColoring(false);
        toast.success("Desenho gerado com sucesso!");
        
        // Mostrar versículo se estiver em modo cristão
        if (isChristianMode) {
          setTimeout(() => setShowBibleVerse(true), 500);
          setTimeout(() => setShowBibleVerse(false), 8000);
        }
      } else {
        throw new Error("Nenhuma imagem foi gerada");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Erro ao gerar desenho. Tente novamente!");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAsPDF = () => {
    if (!generatedImage) return;

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const img = new Image();
      img.src = generatedImage;
      
      img.onload = () => {
        const imgWidth = 190;
        const imgHeight = (img.height * imgWidth) / img.width;
        const x = (210 - imgWidth) / 2;
        const y = 10;

        pdf.addImage(generatedImage, 'PNG', x, y, imgWidth, imgHeight);
        pdf.save(`desenho-colorindo-alegria-${Date.now()}.pdf`);
        toast.success("PDF baixado com sucesso!");
      };
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error("Erro ao baixar PDF. Tente novamente!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Versículo Bíblico */}
      {showBibleVerse && <BibleVerseCard onClose={() => setShowBibleVerse(false)} />}
      <div className="text-center">
        <Button
          size="lg"
          onClick={generateDrawing}
          disabled={isGenerating || !selectedCategory}
          className="text-xl py-6 px-8 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 w-6 h-6 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 w-6 h-6" />
              Gerar Desenho Agora
            </>
          )}
        </Button>
        {!selectedCategory && (
          <p className="text-sm text-muted-foreground mt-2">
            Selecione uma categoria acima
          </p>
        )}
      </div>

      {generatedImage && !showColoring && (
        <Card className="p-6 space-y-4">
          <img 
            src={generatedImage} 
            alt="Desenho gerado" 
            className="w-full rounded-lg shadow-lg"
          />
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setShowColoring(true)}
              className="text-lg py-5 px-6 rounded-full"
            >
              <Palette className="mr-2 w-5 h-5" />
              Colorir Agora
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={downloadAsPDF}
              className="text-lg py-5 px-6 rounded-full"
            >
              <Download className="mr-2 w-5 h-5" />
              Baixar PDF
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={generateDrawing}
              disabled={isGenerating}
              className="text-lg py-5 px-6 rounded-full"
            >
              <Sparkles className="mr-2 w-5 h-5" />
              Gerar Novo
            </Button>
          </div>
        </Card>
      )}

      {showColoring && generatedImage && (
        <div className="space-y-4">
          <ColoringCanvas imageUrl={generatedImage} />
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowColoring(false)}
              className="text-lg py-5 px-6 rounded-full"
            >
              Voltar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawingGenerator;
