import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Download, Palette, Heart, Rocket, Trees, Car, Briefcase, Cake, PenTool } from "lucide-react";
import DrawingGenerator from "@/components/DrawingGenerator";
import { FreeDrawCanvas } from "@/components/FreeDrawCanvas";
import { FloatingChristianButton } from "@/components/FloatingChristianButton";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isChristianMode, setIsChristianMode] = useState(false);
  const generatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-christian-mode', String(isChristianMode));
  }, [isChristianMode]);
  
  const scrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const normalCategories = [
    { name: "Animais Fofos", icon: Heart, color: "fun-pink" },
    { name: "Natureza", icon: Trees, color: "fun-green" },
    { name: "Transportes", icon: Car, color: "fun-blue" },
    { name: "Espaço", icon: Rocket, color: "fun-yellow" },
    { name: "Profissões", icon: Briefcase, color: "fun-pink" },
    { name: "Festas", icon: Cake, color: "fun-yellow" },
  ];

  const christianCategories = [
    { name: "Histórias Bíblicas", icon: Heart, color: "fun-pink" },
    { name: "Personagens da Bíblia", icon: Sparkles, color: "fun-yellow" },
    { name: "Símbolos Cristãos", icon: Palette, color: "fun-blue" },
    { name: "Versículos", icon: Briefcase, color: "fun-green" },
    { name: "Templo e Igreja", icon: Rocket, color: "fun-pink" },
    { name: "Valores Cristãos", icon: Heart, color: "fun-yellow" },
  ];

  const categories = isChristianMode ? christianCategories : normalCategories;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-8 transition-colors duration-500">
      {/* Header */}
      <header className="container mx-auto px-3 md:px-4 py-4 md:py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-foreground">
              {isChristianMode ? "✝️ Desenhos Cristãos" : "Colorindo Alegria"}
            </h1>
          </div>
          
          <FloatingChristianButton 
            isChristianMode={isChristianMode} 
            onToggle={() => setIsChristianMode(!isChristianMode)} 
          />
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-3 md:px-4 py-8 md:py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
          {/* Badge de Eleito */}
          <div className="inline-block">
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold text-xs md:text-sm px-4 py-1.5 rounded-full shadow-lg">
              ⭐ #1 em Desenhos Infantis 2025
            </div>
          </div>

          {/* Mascot Area */}
          <div className="flex justify-center">
            <div className="relative">
              {isChristianMode ? (
                // Cruz para modo cristão
                <div className="relative w-20 h-28 md:w-28 md:h-36 lg:w-36 lg:h-44">
                  {/* Cruz vertical */}
                  <div className="absolute left-1/2 top-4 -translate-x-1/2 w-6 md:w-10 lg:w-12 h-20 md:h-28 lg:h-36 bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-500 rounded-xl shadow-2xl" />
                  {/* Cruz horizontal */}
                  <div className="absolute left-1/2 top-8 md:top-10 lg:top-12 -translate-x-1/2 w-16 md:w-24 lg:w-32 h-6 md:h-10 lg:h-12 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 rounded-xl shadow-2xl" />
                  {/* Estrelas estáticas nas diagonais */}
                  <Sparkles className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                  <Sparkles className="absolute -bottom-1 -left-1 w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                </div>
              ) : (
                // Paleta para modo normal
                <div className="relative">
                  <div className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 bg-gradient-to-br from-fun-yellow to-primary rounded-full flex items-center justify-center shadow-2xl">
                    <Palette className="w-10 h-10 md:w-14 md:h-14 lg:w-18 lg:h-18 text-white" strokeWidth={2} />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 text-fun-yellow animate-pulse" />
                  <Sparkles className="absolute -bottom-1 -left-1 w-4 h-4 md:w-5 md:h-5 text-fun-pink animate-pulse" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight px-2">
              {isChristianMode 
                ? "Desenhos Cristãos para Colorir" 
                : "Desenhos Mágicos para Crianças"
              }
            </h2>
            
            <p className="text-base md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto px-4">
              {isChristianMode 
                ? "Ensine valores eternos através da arte" 
                : "Crie, imprima e divirta-se colorindo"
              }
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-2 md:pt-4 px-4">
            <Button 
              size="lg" 
              onClick={scrollToGenerator}
              className="text-base md:text-xl py-5 md:py-6 px-6 md:px-8 rounded-full shadow-lg hover:scale-105 transition-transform touch-manipulation"
            >
              <Sparkles className="mr-2 w-5 h-5 md:w-6 md:h-6" />
              Começar Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-3 md:px-4 py-8 md:py-16">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8 text-foreground px-2">
          {isChristianMode ? "Temas Bíblicos" : "Escolha sua Categoria"}
        </h3>
        {selectedCategory && (
          <p className="text-center text-sm md:text-lg text-muted-foreground mb-6 md:mb-8 px-4">
            Categoria: <span className="font-bold text-primary">{selectedCategory}</span>
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;
            return (
              <Card
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`p-4 md:p-8 cursor-pointer transition-all duration-300 border-2 hover:shadow-2xl group relative touch-manipulation ${
                  isSelected 
                    ? 'border-primary ring-2 md:ring-4 ring-primary/20 scale-105 bg-primary/5' 
                    : 'border-border hover:border-primary/50 hover:scale-105'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" />
                  </div>
                )}
                <div className="flex flex-col items-center gap-2 md:gap-4 text-center">
                  <div className={`w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isSelected ? 'bg-primary rotate-6' : 'bg-muted group-hover:bg-primary/20 group-hover:rotate-6'
                  }`}>
                    <Icon className={`w-6 h-6 md:w-10 md:h-10 transition-colors ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`} />
                  </div>
                  <span className={`font-bold text-xs md:text-base transition-colors ${
                    isSelected ? 'text-primary' : 'text-foreground'
                  }`}>
                    {category.name}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Drawing Generator Section */}
      <section ref={generatorRef} className="container mx-auto px-3 md:px-4 py-8 md:py-16 scroll-mt-4">
        <Tabs defaultValue="template" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 h-12 md:h-14">
            <TabsTrigger value="template" className="text-sm md:text-base touch-manipulation">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Com Modelo
            </TabsTrigger>
            <TabsTrigger value="free" className="text-sm md:text-base touch-manipulation">
              <PenTool className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Desenho Livre
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="template" className="space-y-6">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-12 text-foreground px-2">
              Gere seu Desenho
            </h3>
            <DrawingGenerator 
              key={isChristianMode ? 'christian' : 'normal'} 
              selectedCategory={selectedCategory} 
              isChristianMode={isChristianMode} 
            />
          </TabsContent>
          
          <TabsContent value="free" className="space-y-6">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-12 text-foreground px-2">
              Desenhe Livremente
            </h3>
            <FreeDrawCanvas />
          </TabsContent>
        </Tabs>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-3 md:px-4 py-8 md:py-16 my-4 md:my-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center bg-card/50 rounded-2xl md:rounded-3xl p-6 md:p-8">
          <div className="space-y-3 md:space-y-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-fun-blue rounded-full mx-auto flex items-center justify-center">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h4 className="text-lg md:text-2xl font-bold text-foreground">Fácil de Usar</h4>
            <p className="text-muted-foreground text-sm md:text-lg">
              Interface amigável perfeita para celular e tablet
            </p>
          </div>
          <div className="space-y-3 md:space-y-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-fun-green rounded-full mx-auto flex items-center justify-center">
              <Download className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h4 className="text-lg md:text-2xl font-bold text-foreground">Baixe e Imprima</h4>
            <p className="text-muted-foreground text-sm md:text-lg">
              Desenhos em alta qualidade prontos para colorir
            </p>
          </div>
          <div className="space-y-3 md:space-y-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-fun-pink rounded-full mx-auto flex items-center justify-center">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h4 className="text-lg md:text-2xl font-bold text-foreground">100% Seguro</h4>
            <p className="text-muted-foreground text-sm md:text-lg">
              Conteúdo educativo apropriado para todas as idades
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-3 md:px-4 py-8 md:py-12 mt-8 md:mt-16 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            <span className="font-bold text-sm md:text-base text-foreground">
              {isChristianMode ? "Desenhos Cristãos" : "Colorindo Alegria"}
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors touch-manipulation">Sobre</a>
            <a href="#" className="hover:text-primary transition-colors touch-manipulation">Contato</a>
            <a href="#" className="hover:text-primary transition-colors touch-manipulation">Privacidade</a>
          </div>
        </div>
        <div className="text-center mt-6 md:mt-8 text-xs md:text-sm text-muted-foreground">
          <p>© 2025 Colorindo Alegria - Diversão e Aprendizado</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
