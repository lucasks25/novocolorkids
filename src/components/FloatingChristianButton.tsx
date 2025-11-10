import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface FloatingChristianButtonProps {
  isChristianMode: boolean;
  onToggle: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export const FloatingChristianButton = ({ isChristianMode, onToggle }: FloatingChristianButtonProps) => {
  const [showFullScreenAnimation, setShowFullScreenAnimation] = useState(false);
  const [animationParticles, setAnimationParticles] = useState<Particle[]>([]);

  const handleClick = () => {
    setShowFullScreenAnimation(true);
    
    setTimeout(() => {
      onToggle();
      setShowFullScreenAnimation(false);
      toast.success(
        isChristianMode 
          ? "Modo normal ativado!" 
          : "✝️ Modo Cristão ativado! Desenhos com Jesus, parábolas e valores cristãos"
      );
    }, 1500);
  };

  return (
    <>
      {/* Animação de transição em tela cheia */}
      {showFullScreenAnimation && (
        <div className="fixed inset-0 z-[9999] bg-background overflow-hidden">
          {/* Fundo com gradiente animado */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 animate-fade-in" />
          
          {/* Símbolo central com animação */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {!isChristianMode ? (
                // Cruz para ATIVAR modo cristão
                <div className="relative w-56 h-72 animate-symbol-entrance">
                  {/* Cruz principal com gradiente dourado celestial */}
                  <div className="absolute left-1/2 top-20 -translate-x-1/2 w-14 h-48 bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-500 rounded-2xl shadow-2xl shadow-amber-400/60 animate-glow-pulse" 
                       style={{ boxShadow: '0 0 60px rgba(251, 191, 36, 0.8), 0 0 120px rgba(251, 191, 36, 0.4), inset 0 2px 20px rgba(255, 255, 255, 0.5)' }} />
                  <div className="absolute left-1/2 top-28 -translate-x-1/2 w-40 h-14 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 rounded-2xl shadow-2xl shadow-amber-400/60 animate-glow-pulse" 
                       style={{ boxShadow: '0 0 60px rgba(251, 191, 36, 0.8), 0 0 120px rgba(251, 191, 36, 0.4), inset 0 2px 20px rgba(255, 255, 255, 0.5)' }} />
                  
                  {/* Raios de luz celestiais */}
                  <div className="absolute inset-0 -z-10">
                    {[...Array(24)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute left-1/2 top-1/2 origin-bottom"
                        style={{
                          width: '4px',
                          height: '200px',
                          background: `linear-gradient(to top, transparent, rgba(251, 191, 36, ${0.3 + (i % 3) * 0.15}), transparent)`,
                          transform: `rotate(${i * 15}deg) translateY(-50%)`,
                          animation: `ray-pulse 3s ease-in-out ${i * 0.08}s infinite`,
                          filter: 'blur(1px)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                // Paleta de pintura para VOLTAR ao modo normal
                <div className="relative w-56 h-56 animate-symbol-entrance">
                  {/* Paleta circular com cores vibrantes */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 opacity-95 shadow-2xl animate-spin-slow" 
                       style={{ boxShadow: '0 0 80px rgba(219, 39, 119, 0.6), 0 0 120px rgba(147, 51, 234, 0.4)' }} />
                  
                  {/* Bolinhas de tinta coloridas na paleta */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`paint-${i}`}
                      className="absolute w-12 h-12 rounded-full animate-bounce"
                      style={{
                        left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 35}%`,
                        top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 35}%`,
                        transform: 'translate(-50%, -50%)',
                        background: `hsl(${i * 45}, 80%, 60%)`,
                        boxShadow: `0 0 20px hsla(${i * 45}, 80%, 60%, 0.8)`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '1.5s',
                      }}
                    />
                  ))}
                  
                  {/* Pincel animado */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 animate-brush-dance">
                    <div className="w-6 h-36 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full shadow-lg" />
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full absolute -top-10 left-1/2 -translate-x-1/2 shadow-xl animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleClick}
        variant={isChristianMode ? "default" : "outline"}
        size="lg"
        className={`group relative overflow-hidden transition-all duration-300 ${
          isChristianMode 
            ? 'bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 shadow-lg hover:shadow-xl' 
            : 'border-2 border-primary hover:bg-primary/10 hover:shadow-lg'
        }`}
      >
        <span className="relative z-10 flex items-center gap-2 font-bold text-base">
          <span className="text-2xl">{isChristianMode ? "🎨" : "✝️"}</span>
          <span>{isChristianMode ? "Normal" : "Cristão"}</span>
        </span>
        
        {/* Efeito de brilho animado */}
        <div className={`absolute inset-0 -z-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity ${
          isChristianMode 
            ? 'from-accent/30 to-secondary/30' 
            : 'from-primary/20 to-primary/10'
        }`} />
      </Button>
    </>
  );
};
