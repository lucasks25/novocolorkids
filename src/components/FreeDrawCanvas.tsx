import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, PencilBrush } from "fabric";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eraser, Download, RotateCcw, Pencil, Sparkles, Printer, Undo2, Redo2, PaintBucket } from "lucide-react";
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

export const FreeDrawCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [activeTool, setActiveTool] = useState<"draw" | "erase">("draw");
  const [brushSize, setBrushSize] = useState(5);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const maxWidth = Math.min(container.clientWidth - 32, 800);
    const maxHeight = 600;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: maxWidth,
      height: maxHeight,
      isDrawingMode: true,
      backgroundColor: '#FFFFFF',
      renderOnAddRemove: true,
      preserveObjectStacking: true
    });

    const pencilBrush = new PencilBrush(canvas);
    pencilBrush.color = activeColor;
    pencilBrush.width = brushSize;
    pencilBrush.strokeLineCap = 'round';
    pencilBrush.strokeLineJoin = 'round';
    canvas.freeDrawingBrush = pencilBrush;

    setFabricCanvas(canvas);

    // Salvar estado inicial depois do canvas estar pronto
    setTimeout(() => {
      if (canvas) {
        const initialState = canvas.toJSON();
        setCanvasHistory([JSON.stringify(initialState)]);
        setHistoryStep(0);
      }
    }, 100);

    // Salvar estado quando path é criado
    canvas.on('path:created', (e) => {
      console.log('Path created, saving state');
      saveCanvasState(canvas);
    });

    return () => {
      canvas.off('path:created');
      canvas.dispose();
    };
  }, []); // Mantém vazio para executar apenas uma vez

  useEffect(() => {
    if (!fabricCanvas) return;

    console.log('FreeDrawCanvas: Updating brush settings', { activeTool, activeColor, brushSize });
    
    // Sempre manter o modo de desenho ativado
    fabricCanvas.isDrawingMode = true;
    fabricCanvas.selection = false; // Desabilita seleção de objetos
    
    if (activeTool === "draw") {
      const pencilBrush = new PencilBrush(fabricCanvas);
      pencilBrush.color = activeColor;
      pencilBrush.width = brushSize;
      // Configurações importantes para evitar que o desenho desapareça
      pencilBrush.strokeLineCap = 'round';
      pencilBrush.strokeLineJoin = 'round';
      fabricCanvas.freeDrawingBrush = pencilBrush;
      console.log('FreeDrawCanvas: Set pencil brush', { color: activeColor, width: brushSize });
    } else {
      const eraserBrush = new PencilBrush(fabricCanvas);
      eraserBrush.color = "#FFFFFF";
      eraserBrush.width = brushSize * 2;
      eraserBrush.strokeLineCap = 'round';
      eraserBrush.strokeLineJoin = 'round';
      fabricCanvas.freeDrawingBrush = eraserBrush;
      console.log('FreeDrawCanvas: Set eraser brush', { width: brushSize * 2 });
    }
    
    // Força o render para aplicar as mudanças
    fabricCanvas.renderAll();
  }, [activeTool, activeColor, brushSize, fabricCanvas]);

  const saveCanvasState = (canvas: FabricCanvas) => {
    const json = JSON.stringify(canvas.toJSON());
    setCanvasHistory((prev) => {
      const newHistory = prev.slice(0, historyStep + 1);
      newHistory.push(json);
      return newHistory;
    });
    setHistoryStep((prev) => prev + 1);
  };

  const handleUndo = () => {
    if (historyStep > 0 && fabricCanvas) {
      const newStep = historyStep - 1;
      setHistoryStep(newStep);
      const state = JSON.parse(canvasHistory[newStep]);
      fabricCanvas.loadFromJSON(state).then(() => {
        fabricCanvas.renderAll();
      });
    }
  };

  const handleRedo = () => {
    if (historyStep < canvasHistory.length - 1 && fabricCanvas) {
      const newStep = historyStep + 1;
      setHistoryStep(newStep);
      const state = JSON.parse(canvasHistory[newStep]);
      fabricCanvas.loadFromJSON(state).then(() => {
        fabricCanvas.renderAll();
      });
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = '#FFFFFF';
    fabricCanvas.renderAll();
    saveCanvasState(fabricCanvas);
    toast.success("Tela limpa!");
  };

  const handleDownload = () => {
    if (!fabricCanvas) return;
    
    const dataURL = fabricCanvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2
    });
    
    const link = document.createElement("a");
    link.download = `desenho-livre-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
    
    toast.success("Desenho baixado!");
  };

  const handleFinish = () => {
    // Tocar som de aplausos
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
    if (!fabricCanvas) return;
    
    const dataURL = fabricCanvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2
    });
    
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

      {/* Brush Size */}
      <div className="flex items-center gap-3 justify-center">
        <span className="text-sm font-medium">Espessura:</span>
        <input
          type="range"
          min="1"
          max="30"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="w-32 md:w-48 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary touch-manipulation"
        />
        <span className="text-sm font-bold w-8">{brushSize}</span>
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
        <canvas ref={canvasRef} className="border-4 border-border rounded-lg shadow-lg bg-white touch-none" />
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
