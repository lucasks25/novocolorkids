import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, PencilBrush, FabricImage } from "fabric";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eraser, Download, RotateCcw, Pencil, PaintBucket, Sparkles, Printer, Undo2, Redo2 } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface ColoringCanvasProps {
  imageUrl: string;
}

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

export const ColoringCanvas = ({ imageUrl }: ColoringCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#FF0000");
  const [activeTool, setActiveTool] = useState<"draw" | "erase" | "fill">("draw");
  const [brushSize, setBrushSize] = useState(10);
  const [clickCount, setClickCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
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
    });

    // Load background image
    FabricImage.fromURL(imageUrl, { crossOrigin: "anonymous" }).then((img) => {
      const scale = Math.min(maxWidth / img.width!, maxHeight / img.height!);
      const scaledWidth = img.width! * scale;
      const scaledHeight = img.height! * scale;
      
      canvas.setDimensions({
        width: scaledWidth,
        height: scaledHeight
      });

      img.scaleToWidth(scaledWidth);
      img.scaleToHeight(scaledHeight);
      img.selectable = false;
      img.evented = false;
      
      canvas.backgroundImage = img;
      canvas.renderAll();
    });

    // Initialize brush
    const pencilBrush = new PencilBrush(canvas);
    pencilBrush.color = activeColor;
    pencilBrush.width = brushSize;
    canvas.freeDrawingBrush = pencilBrush;

    setFabricCanvas(canvas);

    // Save initial state
    setTimeout(() => {
      if (canvas) {
        const initialState = canvas.toJSON();
        setCanvasHistory([JSON.stringify(initialState)]);
        setHistoryStep(0);
      }
    }, 500);

    // Add event listener to save state after drawing
    canvas.on('path:created', () => {
      saveCanvasState(canvas);
    });

    return () => {
      canvas.dispose();
    };
  }, [imageUrl]);

  useEffect(() => {
    if (!fabricCanvas) return;

    if (activeTool === "fill") {
      fabricCanvas.isDrawingMode = false;
      fabricCanvas.selection = false;
      
      const handleCanvasClick = (e: any) => {
        if (!e.pointer) return;
        
        // Prevent default to avoid scrolling/moving
        e.e?.preventDefault?.();
        
        setClickCount(prev => {
          const newCount = prev + 1;
          
          if (newCount === 2) {
            // Perform fill on second click
            fillArea(e.pointer.x, e.pointer.y);
            return 0;
          } else {
            // Show toast in popup instead of text below
            toast.info("Clique novamente para confirmar o preenchimento", {
              duration: 2000,
            });
            return newCount;
          }
        });
      };
      
      fabricCanvas.on('mouse:down', handleCanvasClick);
      fabricCanvas.selection = false;
      fabricCanvas.hoverCursor = 'crosshair';
      fabricCanvas.defaultCursor = 'crosshair';
      
      return () => {
        fabricCanvas.off('mouse:down', handleCanvasClick);
      };
    } else {
      fabricCanvas.isDrawingMode = true;
      setClickCount(0);
      
      if (activeTool === "draw") {
        const pencilBrush = new PencilBrush(fabricCanvas);
        pencilBrush.color = activeColor;
        pencilBrush.width = brushSize;
        fabricCanvas.freeDrawingBrush = pencilBrush;
      } else {
        const eraserBrush = new PencilBrush(fabricCanvas);
        eraserBrush.color = "#FFFFFF";
        eraserBrush.width = brushSize * 2;
        fabricCanvas.freeDrawingBrush = eraserBrush;
      }
    }
  }, [activeTool, activeColor, brushSize, fabricCanvas]);

  const fillArea = (x: number, y: number) => {
    if (!fabricCanvas || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Get current canvas as image data
    const dataUrl = fabricCanvas.toDataURL();
    const img = new Image();
    img.src = dataUrl;
    
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      const targetColor = getColorAtPixel(pixels, x, y, canvas.width);
      const fillColor = hexToRgb(activeColor);
      
      if (colorsMatch(targetColor, fillColor)) {
        toast.info("Área já pintada com essa cor!");
        return;
      }
      
      floodFill(pixels, x, y, canvas.width, canvas.height, targetColor, fillColor);
      ctx.putImageData(imageData, 0, 0);
      
      // Update fabric canvas with filled image
      const newDataUrl = canvas.toDataURL();
      FabricImage.fromURL(newDataUrl).then((newImg) => {
        fabricCanvas.clear();
        fabricCanvas.backgroundImage = fabricCanvas.backgroundImage;
        newImg.selectable = false;
        newImg.evented = false;
        fabricCanvas.add(newImg);
        fabricCanvas.renderAll();
      });
      
      if (fabricCanvas) {
        saveCanvasState(fabricCanvas);
      }
      
      toast.success("Área preenchida!");
    };
  };

  const getColorAtPixel = (pixels: Uint8ClampedArray, x: number, y: number, width: number) => {
    const index = (Math.floor(y) * width + Math.floor(x)) * 4;
    return {
      r: pixels[index],
      g: pixels[index + 1],
      b: pixels[index + 2],
      a: pixels[index + 3]
    };
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: 255
    } : { r: 0, g: 0, b: 0, a: 255 };
  };

  const colorsMatch = (a: any, b: any, tolerance = 10) => {
    return Math.abs(a.r - b.r) < tolerance &&
           Math.abs(a.g - b.g) < tolerance &&
           Math.abs(a.b - b.b) < tolerance;
  };

  const floodFill = (
    pixels: Uint8ClampedArray,
    x: number,
    y: number,
    width: number,
    height: number,
    targetColor: any,
    fillColor: any
  ) => {
    const stack = [[Math.floor(x), Math.floor(y)]];
    const visited = new Set<string>();
    
    while (stack.length > 0) {
      const [cx, cy] = stack.pop()!;
      const key = `${cx},${cy}`;
      
      if (visited.has(key)) continue;
      if (cx < 0 || cx >= width || cy < 0 || cy >= height) continue;
      
      const currentColor = getColorAtPixel(pixels, cx, cy, width);
      if (!colorsMatch(currentColor, targetColor)) continue;
      
      visited.add(key);
      
      const index = (cy * width + cx) * 4;
      pixels[index] = fillColor.r;
      pixels[index + 1] = fillColor.g;
      pixels[index + 2] = fillColor.b;
      pixels[index + 3] = fillColor.a;
      
      stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
    }
  };

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
      toast.info("Desfeito!");
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
      toast.info("Refeito!");
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.getObjects().forEach((obj) => {
      fabricCanvas.remove(obj);
    });
    fabricCanvas.renderAll();
    saveCanvasState(fabricCanvas);
    toast.success("Desenho limpo!");
  };

  const handleDownload = () => {
    if (!fabricCanvas) return;
    
    const dataURL = fabricCanvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2
    });
    
    const link = document.createElement("a");
    link.download = `desenho-colorido-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
    
    toast.success("Desenho baixado!");
  };

  const handleFinish = () => {
    setIsFinished(true);
    
    // Trigger confetti animation
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
    
    // Dispatch event for achievement system
    window.dispatchEvent(new CustomEvent('drawingCompleted'));
    
    toast.success("🎉 Parabéns! Que desenho lindo!");
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
              body {
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
              }
              img {
                max-width: 100%;
                max-height: 100vh;
              }
              @media print {
                body {
                  margin: 0;
                }
                img {
                  max-width: 100%;
                  height: auto;
                }
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
    <Card className="p-4 space-y-4">
      {/* Tools */}
      <div className="flex flex-wrap gap-2 items-center justify-center">
        <Button
          size="lg"
          variant="outline"
          onClick={handleUndo}
          disabled={historyStep <= 0}
          className="touch-manipulation"
          title="Desfazer"
        >
          <Undo2 className="w-5 h-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={handleRedo}
          disabled={historyStep >= canvasHistory.length - 1}
          className="touch-manipulation"
          title="Refazer"
        >
          <Redo2 className="w-5 h-5" />
        </Button>
        <Button
          size="lg"
          variant={activeTool === "draw" ? "default" : "outline"}
          onClick={() => setActiveTool("draw")}
          className="touch-manipulation"
        >
          <Pencil className="w-5 h-5 mr-2" />
          Pincel
        </Button>
        <Button
          size="lg"
          variant={activeTool === "fill" ? "default" : "outline"}
          onClick={() => setActiveTool("fill")}
          className="touch-manipulation"
        >
          <PaintBucket className="w-5 h-5 mr-2" />
          Balde
        </Button>
        <Button
          size="lg"
          variant={activeTool === "erase" ? "default" : "outline"}
          onClick={() => setActiveTool("erase")}
          className="touch-manipulation"
        >
          <Eraser className="w-5 h-5 mr-2" />
          Borracha
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={handleClear}
          className="touch-manipulation"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Limpar
        </Button>
        <Button
          size="lg"
          variant="secondary"
          onClick={handleDownload}
          className="touch-manipulation"
        >
          <Download className="w-5 h-5 mr-2" />
          Baixar
        </Button>
        {isFinished && (
          <Button
            size="lg"
            variant="secondary"
            onClick={handlePrint}
            className="touch-manipulation"
          >
            <Printer className="w-5 h-5 mr-2" />
            Imprimir
          </Button>
        )}
        {!isFinished && (
          <Button
            size="lg"
            onClick={handleFinish}
            className="touch-manipulation bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Finalizar
          </Button>
        )}
      </div>

      {/* Brush Size */}
      {activeTool !== "fill" && (
        <div className="flex items-center gap-4 justify-center">
          <label className="text-sm font-medium">Tamanho:</label>
          <input
            type="range"
            min="5"
            max="30"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-32 touch-manipulation"
          />
          <span className="text-sm w-8">{brushSize}</span>
        </div>
      )}

      {/* Color Palette */}
      {(activeTool === "draw" || activeTool === "fill") && (
        <div className="flex flex-wrap gap-2 justify-center p-4 bg-muted rounded-lg max-h-64 overflow-y-auto">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setActiveColor(color)}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 transition-transform hover:scale-110 touch-manipulation ${
                activeColor === color ? "border-primary scale-110 shadow-lg" : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Cor ${color}`}
            />
          ))}
        </div>
      )}

      {/* Canvas */}
      <div 
        ref={containerRef}
        className={`flex justify-center items-center bg-background rounded-lg border-2 border-border overflow-visible touch-manipulation transition-all duration-500 ${
          isFinished ? "shadow-2xl shadow-primary/50" : ""
        }`}
        style={{ touchAction: "none" }}
      >
        <canvas 
          ref={canvasRef}
        />
      </div>
      
      {isFinished && (
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-primary mb-2">🎨 Obra-prima finalizada! 🎉</h2>
          <p className="text-muted-foreground text-lg">Você é um artista incrível!</p>
        </div>
      )}
    </Card>
  );
};
