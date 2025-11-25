import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Download, Palette, Heart, Rocket, Trees, Car, Briefcase, Cake, PenTool, Gift, Candy, TreePine, Star } from "lucide-react";
import DrawingGenerator from "@/components/DrawingGenerator";
import { SimpleDrawCanvas } from "@/components/SimpleDrawCanvas";
import { FloatingChristianButton } from "@/components/FloatingChristianButton";
import { SnowEffect } from "@/components/SnowEffect";
import heroImage from "@/assets/hero-image.png";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isChristianMode, setIsChristianMode] = useState(false);
  const [isChristmasMode, setIsChristmasMode] = useState(false);
  const generatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-christian-mode', String(isChristianMode));
    document.documentElement.setAttribute('data-christmas-mode', String(isChristmasMode));
  }, [isChristianMode, isChristmasMode]);
  
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

  const christmasCategories = [
    { name: "Papai Noel", icon: Gift, color: "fun-pink" },
    { name: "Árvore de Natal", icon: TreePine, color: "fun-green" },
    { name: "Presentes", icon: Gift, color: "fun-yellow" },
    { name: "Renas", icon: Heart, color: "fun-pink" },
    { name: "Bonecos de Neve", icon: Sparkles, color: "fun-blue" },
    { name: "Enfeites Natalinos", icon: Candy, color: "fun-pink" },
  ];

  const categories = isChristmasMode ? christmasCategories : (isChristianMode ? christianCategories : normalCategories);

  return (
    <div className={`min-h-screen pb-8 transition-colors duration-500 ${
      isChristmasMode 
        ? 'bg-gradient-to-b from-red-50 via-white to-green-50' 
        : 'bg-gradient-to-b from-background to-muted'
    }`}>
      {isChristmasMode && <SnowEffect />}
      
      {/* Header */}
      <header className="container mx-auto px-3 md:px-4 py-4 md:py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isChristmasMode ? (
              <Gift className="w-6 h-6 md:w-8 md:h-8 text-red-600 animate-bounce" />
            ) : (
              <Palette className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            )}
            <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-foreground">
              {isChristmasMode ? "🎄 Natal Mágico" : (isChristianMode ? "✝️ Desenhos Cristãos" : "Colorindo Alegria")}
            </h1>
          </div>
          
          <FloatingChristianButton 
            isChristianMode={isChristianMode}
            isChristmasMode={isChristmasMode}
            onToggleChristian={() => {
              setIsChristianMode(!isChristianMode);
              if (!isChristianMode) setIsChristmasMode(false);
            }}
            onToggleChristmas={() => {
              setIsChristmasMode(!isChristmasMode);
              if (!isChristmasMode) {
                setIsChristianMode(false);
              }
            }}
          />
        </nav>
      </header>

      {/* Hero Section - Nova versão com imagem 3D */}
      <section className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Badge de Eleito */}
          <div className="text-center mb-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-black font-extrabold text-xs md:text-sm px-5 py-2 rounded-full shadow-xl border-2 border-yellow-600">
              <Star className="w-4 h-4" />
              ELEITA A MELHOR PLATAFORMA DE PINTURA DE 2025
              <Star className="w-4 h-4" />
            </div>
          </div>

          {/* Layout com Imagem Hero e Texto */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Imagem Hero 3D */}
            <div className="order-2 md:order-1 animate-scale-in" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Criança feliz criando arte mágica em tablet" 
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
                {/* Sparkle effects */}
                <div className="absolute -top-2 -right-2 w-8 h-8 md:w-12 md:h-12 bg-fun-yellow rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 md:w-10 md:h-10 bg-fun-pink rounded-full flex items-center justify-center animate-pulse shadow-lg" style={{ animationDelay: "0.5s" }}>
                  <Heart className="w-3 h-3 md:w-5 md:h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Texto Emocional */}
            <div className="order-1 md:order-2 text-center md:text-left space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
                {isChristmasMode
                  ? "Crie Memórias Mágicas de Natal" 
                  : (isChristianMode 
                    ? "Cultive a Fé Através da Arte" 
                    : "Onde Pequenas Mãos Criam Grandes Sonhos")
                }
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.5s", animationFillMode: "backwards" }}>
                {isChristmasMode
                  ? "Cada desenho colorido é uma lembrança especial do Natal em família" 
                  : (isChristianMode 
                    ? "Ensine valores eternos enquanto seu pequeno artista colore histórias de amor e esperança" 
                    : "Transforme a imaginação do seu filho em obras de arte para guardar para sempre")
                }
              </p>

              {/* Features rápidas */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 animate-fade-in" style={{ animationDelay: "0.7s", animationFillMode: "backwards" }}>
                <span className="inline-flex items-center gap-1 bg-fun-green/20 text-fun-green px-3 py-1 rounded-full text-sm font-medium">
                  <Heart className="w-4 h-4" /> 100% Seguro
                </span>
                <span className="inline-flex items-center gap-1 bg-fun-blue/20 text-fun-blue px-3 py-1 rounded-full text-sm font-medium">
                  <Download className="w-4 h-4" /> Baixe e Imprima
                </span>
                <span className="inline-flex items-center gap-1 bg-fun-pink/20 text-fun-pink px-3 py-1 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" /> Infinitos Desenhos
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-2 animate-fade-in" style={{ animationDelay: "0.9s", animationFillMode: "backwards" }}>
                <Button
                  size="lg" 
                  onClick={scrollToGenerator}
                  className="text-lg py-6 px-8 rounded-full shadow-xl hover:scale-105 transition-transform touch-manipulation bg-gradient-to-r from-primary to-primary/80"
                >
                  <Sparkles className="mr-2 w-5 h-5" />
                  Comece a Criar Memórias
                </Button>
              </div>

              <p className="text-sm text-muted-foreground/70 animate-fade-in" style={{ animationDelay: "1.1s", animationFillMode: "backwards" }}>
                ✨ Gratuito • Sem cadastro • Diversão instantânea
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-3 md:px-4 py-8 md:py-16">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 text-foreground px-2">
          {isChristmasMode ? "Aventuras Natalinas" : (isChristianMode ? "Histórias de Fé" : "Escolha a Aventura")}
        </h3>
        <p className="text-center text-muted-foreground mb-6 md:mb-8">
          {isChristmasMode 
            ? "Qual cena mágica seu pequeno quer colorir hoje?" 
            : (isChristianMode 
              ? "Qual história bíblica vamos conhecer hoje?" 
              : "Qual mundo mágico seu artista quer explorar?")}
        </p>
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
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2 text-foreground px-2">
              A Galeria de Arte do Seu Pequeno
            </h3>
            <p className="text-center text-muted-foreground mb-6 md:mb-12">
              Cada obra-prima começa com um toque mágico
            </p>
            <DrawingGenerator 
              key={isChristmasMode ? 'christmas' : (isChristianMode ? 'christian' : 'normal')} 
              selectedCategory={selectedCategory} 
              isChristianMode={isChristianMode}
              isChristmasMode={isChristmasMode}
            />
          </TabsContent>
          
          <TabsContent value="free" className="space-y-6">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2 text-foreground px-2">
              O Cantinho da Imaginação
            </h3>
            <p className="text-center text-muted-foreground mb-6 md:mb-12">
              Aqui, não existem regras - apenas criatividade sem limites
            </p>
            <SimpleDrawCanvas />
          </TabsContent>
        </Tabs>
      </section>

      {/* Features Section - Textos emocionais */}
      <section className="container mx-auto px-3 md:px-4 py-8 md:py-16 my-4 md:my-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center bg-card/50 rounded-2xl md:rounded-3xl p-6 md:p-8">
          <div className="space-y-3 md:space-y-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-fun-blue rounded-full mx-auto flex items-center justify-center">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h4 className="text-lg md:text-2xl font-bold text-foreground">Feito para Crianças</h4>
            <p className="text-muted-foreground text-sm md:text-lg">
              Interface tão fácil que até os pequeninos criam obras-primas sozinhos
            </p>
          </div>
          <div className="space-y-3 md:space-y-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-fun-green rounded-full mx-auto flex items-center justify-center">
              <Download className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h4 className="text-lg md:text-2xl font-bold text-foreground">Tesouro para Guardar</h4>
            <p className="text-muted-foreground text-sm md:text-lg">
              Baixe, imprima e transforme em memórias que duram para sempre
            </p>
          </div>
          <div className="space-y-3 md:space-y-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-fun-pink rounded-full mx-auto flex items-center justify-center">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h4 className="text-lg md:text-2xl font-bold text-foreground">Ambiente Seguro</h4>
            <p className="text-muted-foreground text-sm md:text-lg">
              Conteúdo 100% apropriado - você pode deixar seu filho explorar tranquilo
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
          <p>© 2025 Colorindo Alegria - Onde cada desenho é uma memória especial ❤️</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;