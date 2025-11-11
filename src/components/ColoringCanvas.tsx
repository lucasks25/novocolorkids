import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, PencilBrush, FabricImage } from "fabric";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eraser, Download, RotateCcw, Pencil, PaintBucket, Sparkles, Printer, Undo2, Redo2, Maximize2, X, Palette } from "lucide-react";
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
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#FF0000");
  const [activeTool, setActiveTool] = useState<"draw" | "erase" | "fill">("draw");
  const [brushSize, setBrushSize] = useState(10);
  const [clickCount, setClickCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [savedCanvasState, setSavedCanvasState] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [panMode, setPanMode] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const container = isFullscreen ? fullscreenContainerRef.current : containerRef.current;
    if (!container) return;

    const maxWidth = Math.min(container.clientWidth - 32, isFullscreen ? 1200 : 800);
    const maxHeight = isFullscreen ? window.innerHeight - 200 : 600;

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
      
      // Restaurar estado salvo se existir
      if (savedCanvasState) {
        setTimeout(() => {
          const state = JSON.parse(savedCanvasState);
          canvas.loadFromJSON(state).then(() => {
            canvas.renderAll();
          });
        }, 100);
      }
    });

    // Initialize brush
    const pencilBrush = new PencilBrush(canvas);
    pencilBrush.color = activeColor;
    pencilBrush.width = brushSize;
    canvas.freeDrawingBrush = pencilBrush;

    setFabricCanvas(canvas);

    // Save initial state only if there's no saved state
    if (!savedCanvasState) {
      setTimeout(() => {
        if (canvas) {
          const initialState = canvas.toJSON();
          setCanvasHistory([JSON.stringify(initialState)]);
          setHistoryStep(0);
        }
      }, 500);
    }

    // Add event listener to save state after drawing
    canvas.on('path:created', () => {
      saveCanvasState(canvas);
    });

    return () => {
      canvas.dispose();
    };
  }, [imageUrl, isFullscreen, savedCanvasState]);

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
      
      // Update fabric canvas with filled image - mantém a backgroundImage
      const newDataUrl = canvas.toDataURL();
      FabricImage.fromURL(newDataUrl).then((newImg) => {
        // Remove apenas objetos adicionados, não a backgroundImage
        const objects = fabricCanvas.getObjects();
        objects.forEach(obj => fabricCanvas.remove(obj));
        
        // Adiciona a nova imagem com o preenchimento
        newImg.selectable = false;
        newImg.evented = false;
        fabricCanvas.add(newImg);
        fabricCanvas.renderAll();
        
        saveCanvasState(fabricCanvas);
      });
      
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
    
    // Remove apenas os objetos desenhados (paths), mantendo a imagem de fundo
    const objects = fabricCanvas.getObjects();
    objects.forEach((obj) => {
      // Remove apenas se não for a imagem de fundo
      if (obj !== fabricCanvas.backgroundImage) {
        fabricCanvas.remove(obj);
      }
    });
    
    fabricCanvas.renderAll();
    saveCanvasState(fabricCanvas);
    toast.success("Cores removidas! Imagem pronta para colorir novamente!");
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
    
    // Tocar som de aplausos
    const applauseSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3');
    applauseSound.play().catch(err => console.log('Audio play failed:', err));
    
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

  const handleToggleFullscreen = () => {
    if (!fabricCanvas) return;
    
    // Salvar o estado atual antes de mudar
    const currentState = JSON.stringify(fabricCanvas.toJSON());
    setSavedCanvasState(currentState);
    
    setIsFullscreen(!isFullscreen);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setPanMode(false);
  };

  useEffect(() => {
    if (fabricCanvas && isFullscreen) {
      // Aplicar zoom e pan
      const vpt = fabricCanvas.viewportTransform;
      if (vpt) {
        vpt[0] = zoomLevel;
        vpt[3] = zoomLevel;
        vpt[4] = panPosition.x;
        vpt[5] = panPosition.y;
      }
      fabricCanvas.setViewportTransform(vpt || [zoomLevel, 0, 0, zoomLevel, panPosition.x, panPosition.y]);
      fabricCanvas.renderAll();
    }
  }, [zoomLevel, panPosition, fabricCanvas, isFullscreen]);

  // Pan functionality quando com zoom
  useEffect(() => {
    if (!fabricCanvas || !isFullscreen || zoomLevel <= 1) return;

    const handleMouseDown = (e: any) => {
      // Permitir pan se estiver em modo pan OU usando Alt/Ctrl
      if (!panMode && activeTool !== "fill" && !e.e?.altKey && !e.e?.ctrlKey) return;
      
      const evt = e.e;
      setIsPanning(true);
      setLastPanPoint({ x: evt.clientX, y: evt.clientY });
      fabricCanvas.selection = false;
      fabricCanvas.isDrawingMode = false;
    };

    const handleMouseMove = (e: any) => {
      if (!isPanning) return;
      
      const evt = e.e;
      const deltaX = evt.clientX - lastPanPoint.x;
      const deltaY = evt.clientY - lastPanPoint.y;
      
      setPanPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setLastPanPoint({ x: evt.clientX, y: evt.clientY });
    };

    const handleMouseUp = () => {
      setIsPanning(false);
      fabricCanvas.selection = true;
      if (activeTool === "draw" || activeTool === "erase") {
        fabricCanvas.isDrawingMode = !panMode;
      }
    };

    fabricCanvas.on('mouse:down', handleMouseDown);
    fabricCanvas.on('mouse:move', handleMouseMove);
    fabricCanvas.on('mouse:up', handleMouseUp);

    return () => {
      fabricCanvas.off('mouse:down', handleMouseDown);
      fabricCanvas.off('mouse:move', handleMouseMove);
      fabricCanvas.off('mouse:up', handleMouseUp);
    };
  }, [fabricCanvas, isFullscreen, isPanning, lastPanPoint, zoomLevel, activeTool, panMode]);

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
    <>
    {!isFullscreen && (
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
        <Button
          size="lg"
          variant="outline"
          onClick={handleToggleFullscreen}
          className="touch-manipulation"
        >
          <Maximize2 className="w-5 h-5 mr-2" />
          Expandir
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
      {!isFullscreen && (
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
      )}
      
      {isFinished && !isFullscreen && (
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-primary mb-2">🎨 Obra-prima finalizada! 🎉</h2>
          <p className="text-muted-foreground text-lg">Você é um artista incrível!</p>
        </div>
      )}
    </Card>
    )}
    
    {/* Fullscreen Mode */}
    {isFullscreen && (
      <div className="fixed inset-0 z-[9999] bg-background flex flex-col">
        {/* Header with tools */}
        <div className="flex items-center justify-between gap-2 p-3 border-b border-border flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              size="sm"
              variant={activeTool === "draw" ? "default" : "outline"}
              onClick={() => setActiveTool("draw")}
              className="touch-manipulation"
            >
              <Pencil className="w-4 h-4 mr-1" />
              Pincel
            </Button>
            <Button
              size="sm"
              variant={activeTool === "fill" ? "default" : "outline"}
              onClick={() => setActiveTool("fill")}
              className="touch-manipulation"
            >
              <PaintBucket className="w-4 h-4 mr-1" />
              Balde
            </Button>
            <Button
              size="sm"
              variant={activeTool === "erase" ? "default" : "outline"}
              onClick={() => setActiveTool("erase")}
              className="touch-manipulation"
            >
              <Eraser className="w-4 h-4 mr-1" />
              Borracha
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setShowPalette(!showPalette)}
              className="touch-manipulation"
            >
              <Palette className="w-4 h-4 mr-1" />
              Cores
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleUndo}
              disabled={historyStep <= 0}
              className="touch-manipulation"
            >
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRedo}
              disabled={historyStep >= canvasHistory.length - 1}
              className="touch-manipulation"
            >
              <Redo2 className="w-4 h-4" />
            </Button>
            {!isFinished && (
              <Button
                size="sm"
                onClick={handleFinish}
                className="touch-manipulation bg-gradient-to-r from-primary to-purple-600"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Finalizar
              </Button>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleToggleFullscreen}
            className="touch-manipulation"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Zoom Controls */}
        <div className="flex flex-col gap-2 py-2 px-4 border-b border-border">
          <div className="flex items-center gap-2 justify-center flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomOut}
              className="touch-manipulation"
            >
              <span className="text-lg">-</span>
            </Button>
            <span className="text-sm font-medium min-w-[80px] text-center">
              Zoom: {Math.round(zoomLevel * 100)}%
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomIn}
              className="touch-manipulation"
            >
              <span className="text-lg">+</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleZoomReset}
              className="touch-manipulation"
            >
              Reset
            </Button>
            {zoomLevel > 1 && (
              <Button
                size="sm"
                variant={panMode ? "default" : "outline"}
                onClick={() => setPanMode(!panMode)}
                className="touch-manipulation"
              >
                <span className="text-base mr-1">✋</span>
                {panMode ? "Colorir" : "Mover"}
              </Button>
            )}
          </div>
          {zoomLevel > 1 && !panMode && (
            <div className="text-xs text-center text-muted-foreground animate-pulse">
              💡 Clique no botão "Mover" para navegar pela imagem
            </div>
          )}
          {panMode && (
            <div className="text-xs text-center text-primary font-medium animate-pulse">
              👆 Arraste para mover • Clique "Colorir" para voltar a pintar
            </div>
          )}
        </div>
        {activeTool !== "fill" && (
          <div className="flex items-center gap-3 justify-center py-2 px-4 border-b border-border">
            <label className="text-sm font-medium">Tamanho:</label>
            <input
              type="range"
              min="5"
              max="30"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-32 md:w-48 touch-manipulation"
            />
            <span className="text-sm font-bold w-8">{brushSize}</span>
          </div>
        )}
        
        {/* Canvas Area - Full Screen */}
        <div 
          ref={fullscreenContainerRef}
          className="flex-1 flex items-center justify-center bg-muted/30 p-4 overflow-auto relative"
        >
          <div 
            className="flex justify-center items-center"
            style={{ touchAction: "none" }}
          >
            <canvas 
              ref={canvasRef}
              className="max-w-full max-h-full shadow-2xl"
            />
          </div>
        
          {/* Floating Color Palette Popup */}
          {showPalette && (activeTool === "draw" || activeTool === "fill") && (
            <div className="absolute top-4 right-4 bg-card border-2 border-border rounded-xl p-4 shadow-2xl max-w-sm animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-sm">Paleta de Cores</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPalette(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setActiveColor(color);
                      setShowPalette(false);
                    }}
                    className={`w-12 h-12 rounded-lg border-4 transition-transform hover:scale-110 touch-manipulation ${
                      activeColor === color ? "border-primary scale-110 shadow-lg" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Cor ${color}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )}
    </>
  );
};
