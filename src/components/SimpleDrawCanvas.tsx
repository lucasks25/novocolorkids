import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Eraser, Download, RotateCcw, Pencil, Sparkles, Printer, Undo2, Redo2 } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

const COLORS = [
  "#FF0000", "#FF4500", "#FF6B00", "#FF8C00", "#FFA500",
  "#FFD700", "#FFFF00", "#9ACD32", "#32CD32", "#00FF00",
  "#00FA9A", "#00CED1", "#1E90FF", "#0000FF", "#4169E1",
  "#8B00FF", "#9370DB", "#BA55D3", "#FF1493", "#FF69B4",
  "#FFC0CB", "#FFB6C1", "#F08080", "#CD5C5C", "#8B4513",
  "#D2691E", "#F4A460", "#DEB887", "#F5DEB3", "#FFDEAD",
  "#FFE4B5", "#FAEBD7", "#FAF0E6", "#FFF8DC", "#FFFACD",
  "#000000", "#2F4F4F", "#696969", "#808080", "#A9A9A9",
  "#C0C0C0", "#D3D3D3", "#DCDCDC", "#F5F5F5", "#FFFFFF"
];

export const SimpleDrawCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeColor, setActiveColor] = useState("#000000");
  const [activeTool, setActiveTool] = useState<"draw" | "erase">("draw");
  const [brushSize, setBrushSize] = useState(5);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    const maxWidth = Math.min(container.clientWidth - 32, 800);
    const maxHeight = 600;

    canvas.width = maxWidth;
    canvas.height = maxHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Save initial state
      saveState();
    }
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL();
    setCanvasHistory((prev) => {
      const newHistory = prev.slice(0, historyStep + 1);
      newHistory.push(dataUrl);
      return newHistory;
    });
    setHistoryStep((prev) => prev + 1);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x: number, y: number;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x: number, y: number;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineWidth = activeTool === "erase" ? brushSize * 2 : brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = activeTool === "erase" ? "#FFFFFF" : activeColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.closePath();
          saveState();
        }
      }
    }
  };

  const handleUndo = () => {
    if (historyStep > 0) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      restoreState(canvasHistory[newStep]);
    }
  };

  const handleRedo = () => {
    if (historyStep < canvasHistory.length - 1) {
      const newStep = historyStep + 1;
      setHistoryStep(newStep);
      restoreState(canvasHistory[newStep]);
    }
  };

  const restoreState = (dataUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
    toast.success("Tela limpa!");
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `desenho-livre-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    toast.success("Desenho baixado!");
  };

  const handleFinish = () => {
    const applauseSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3');
    applauseSound.play().catch(err => console.log('Audio play failed:', err));

    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ['#FF0000', '#FFD700', '#00FF00', '#0000FF', '#FF1493'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    toast.success("🎉 Que obra de arte incrível!");
  };

  const handlePrint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Imprimir Desenho</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
              img { max-width: 100%; max-height: 100vh; }
              @media print {
                body { margin: 0; }
                img { max-width: 100%; height: auto; }
              }
            </style>
          </head>
          <body>
            <img src="${dataURL}" onload="window.print(); window.close();" />
          </body>
        </html>
      `);
      printWindow.document.close();
    }

    toast.success("Preparando impressão!");
  };

  return (
    <Card className="p-3 md:p-6 space-y-4">
      {/* Tools */}
      <div className="flex flex-wrap gap-2 items-center justify-center">
        <Button
          size="sm"
          variant="outline"
          onClick={handleUndo}
          disabled={historyStep <= 0}
          className="touch-manipulation h-10 md:h-11"
        >
          <Undo2 className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleRedo}
          disabled={historyStep >= canvasHistory.length - 1}
          className="touch-manipulation h-10 md:h-11"
        >
          <Redo2 className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
        <Button
          size="sm"
          variant={activeTool === "draw" ? "default" : "outline"}
          onClick={() => setActiveTool("draw")}
          className="touch-manipulation h-10 md:h-11"
        >
          <Pencil className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
          <span className="text-xs md:text-sm">Pincel</span>
        </Button>
        <Button
          size="sm"
          variant={activeTool === "erase" ? "default" : "outline"}
          onClick={() => setActiveTool("erase")}
          className="touch-manipulation h-10 md:h-11"
        >
          <Eraser className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
          <span className="text-xs md:text-sm">Borracha</span>
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleClear}
          className="touch-manipulation h-10 md:h-11"
        >
          <RotateCcw className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
          <span className="text-xs md:text-sm">Limpar</span>
        </Button>
      </div>

      {/* Brush Size Slider */}
      <div className="flex flex-col gap-2 items-center justify-center max-w-md mx-auto">
        <div className="flex items-center gap-3 w-full">
          <span className="text-sm font-medium whitespace-nowrap">Espessura:</span>
          <Slider
            value={[brushSize]}
            onValueChange={(value) => setBrushSize(value[0])}
            min={1}
            max={30}
            step={1}
            className="flex-1"
          />
          <div className="w-12 h-12 rounded-full border-4 border-primary flex items-center justify-center bg-muted">
            <span className="text-sm font-bold text-primary">{brushSize}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Ajuste a espessura do pincel ou borracha</p>
      </div>

      {/* Color Palette */}
      <div className="grid grid-cols-10 gap-1 md:gap-2 max-w-2xl mx-auto">
        {COLORS.map((color) => (
          <button
            key={color}
            onClick={() => setActiveColor(color)}
            className={`w-7 h-7 md:w-9 md:h-9 rounded-lg transition-all touch-manipulation ${
              activeColor === color
                ? "ring-4 ring-primary scale-110"
                : "hover:scale-105 ring-2 ring-border"
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="flex justify-center bg-muted/30 rounded-lg p-2 md:p-4 overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="border-4 border-border rounded-lg shadow-lg bg-white touch-none cursor-crosshair"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
        <Button
          size="sm"
          variant="secondary"
          onClick={handleDownload}
          className="touch-manipulation h-10 md:h-11"
        >
          <Download className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
          <span className="text-xs md:text-sm">Baixar</span>
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handlePrint}
          className="touch-manipulation h-10 md:h-11"
        >
          <Printer className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
          <span className="text-xs md:text-sm">Imprimir</span>
        </Button>
        <Button
          size="sm"
          onClick={handleFinish}
          className="touch-manipulation bg-gradient-to-r from-primary to-purple-600 h-10 md:h-11"
        >
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
          <span className="text-xs md:text-sm">Finalizar</span>
        </Button>
      </div>
    </Card>
  );
};
