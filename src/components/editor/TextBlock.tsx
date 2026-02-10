import { useState, useRef, useEffect, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronDown,
  GripVertical,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface TextBlockData {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  align: "left" | "center" | "right";
}

const FONTS = [
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Playfair", value: "'Playfair Display', serif" },
  { label: "Mono", value: "'JetBrains Mono', monospace" },
];

const PRESET_COLORS = ["#FFFFFF", "#3976EF", "#000000", "#F59E0B", "#EF4444", "#10B981"];

interface TextBlockProps {
  data: TextBlockData;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<TextBlockData>) => void;
  onDelete: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

const TextBlock = ({ data, isSelected, onSelect, onUpdate, onDelete, containerRef }: TextBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, startX: 0, startY: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isEditing) return;
    e.preventDefault();
    e.stopPropagation();
    onSelect();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, startX: data.x, startY: data.y };
  }, [isEditing, data.x, data.y, onSelect]);

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      onUpdate({ x: dragStart.current.startX + dx, y: dragStart.current.startY + dy });
    };
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, onUpdate]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    onSelect();
    setTimeout(() => textRef.current?.focus(), 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (textRef.current) {
      onUpdate({ text: textRef.current.innerText || "Seu Título Aqui" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsEditing(false);
      textRef.current?.blur();
    }
  };

  const currentFontLabel = FONTS.find(f => f.value === data.fontFamily)?.label || "Inter";

  return (
    <>
      {/* Floating Toolbar */}
      {isSelected && !isDragging && (
        <div
          className="absolute z-[60] flex items-center gap-1 rounded-lg border border-white/10 bg-[#1a1d24] px-2 py-1.5 shadow-xl shadow-black/40"
          style={{ left: data.x, top: data.y - 52 }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* Font selector */}
          <div className="relative">
            <button
              onClick={() => { setShowFontMenu(!showFontMenu); setShowColorPicker(false); }}
              className="flex items-center gap-1 rounded px-2 py-1 text-xs text-slate-300 hover:bg-white/10"
            >
              {currentFontLabel}
              <ChevronDown className="h-3 w-3" />
            </button>
            {showFontMenu && (
              <div className="absolute top-full left-0 mt-1 w-40 rounded-lg border border-white/10 bg-[#1a1d24] py-1 shadow-xl z-[70]">
                {FONTS.map(f => (
                  <button
                    key={f.value}
                    onClick={() => { onUpdate({ fontFamily: f.value }); setShowFontMenu(false); }}
                    className={cn("w-full px-3 py-1.5 text-left text-xs hover:bg-white/10",
                      data.fontFamily === f.value ? "text-blue-400" : "text-slate-300"
                    )}
                    style={{ fontFamily: f.value }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-white/10" />

          {/* Font size */}
          <button onClick={() => onUpdate({ fontSize: Math.max(12, data.fontSize - 2) })} className="px-1 text-xs text-slate-400 hover:text-white">−</button>
          <span className="w-7 text-center text-xs text-slate-300">{data.fontSize}</span>
          <button onClick={() => onUpdate({ fontSize: Math.min(200, data.fontSize + 2) })} className="px-1 text-xs text-slate-400 hover:text-white">+</button>

          <div className="h-4 w-px bg-white/10" />

          {/* Color */}
          <div className="relative">
            <button
              onClick={() => { setShowColorPicker(!showColorPicker); setShowFontMenu(false); }}
              className="flex h-6 w-6 items-center justify-center rounded hover:bg-white/10"
            >
              <div className="h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: data.color }} />
            </button>
            {showColorPicker && (
              <div className="absolute top-full right-0 mt-1 flex gap-1.5 rounded-lg border border-white/10 bg-[#1a1d24] p-2 shadow-xl z-[70]">
                {PRESET_COLORS.map(c => (
                  <button
                    key={c}
                    onClick={() => { onUpdate({ color: c }); setShowColorPicker(false); }}
                    className={cn("h-6 w-6 rounded-full border-2 transition-transform hover:scale-110",
                      data.color === c ? "border-blue-400 scale-110" : "border-white/20"
                    )}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-white/10" />

          {/* Bold/Italic/Underline */}
          <button onClick={() => onUpdate({ bold: !data.bold })} className={cn("rounded p-1 hover:bg-white/10", data.bold ? "text-blue-400" : "text-slate-400")}>
            <Bold className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => onUpdate({ italic: !data.italic })} className={cn("rounded p-1 hover:bg-white/10", data.italic ? "text-blue-400" : "text-slate-400")}>
            <Italic className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => onUpdate({ underline: !data.underline })} className={cn("rounded p-1 hover:bg-white/10", data.underline ? "text-blue-400" : "text-slate-400")}>
            <Underline className="h-3.5 w-3.5" />
          </button>

          <div className="h-4 w-px bg-white/10" />

          {/* Alignment */}
          <button onClick={() => onUpdate({ align: "left" })} className={cn("rounded p-1 hover:bg-white/10", data.align === "left" ? "text-blue-400" : "text-slate-400")}>
            <AlignLeft className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => onUpdate({ align: "center" })} className={cn("rounded p-1 hover:bg-white/10", data.align === "center" ? "text-blue-400" : "text-slate-400")}>
            <AlignCenter className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => onUpdate({ align: "right" })} className={cn("rounded p-1 hover:bg-white/10", data.align === "right" ? "text-blue-400" : "text-slate-400")}>
            <AlignRight className="h-3.5 w-3.5" />
          </button>

          <div className="h-4 w-px bg-white/10" />

          {/* Delete */}
          <button onClick={onDelete} className="rounded p-1 text-slate-400 hover:bg-red-500/20 hover:text-red-400">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Text Block */}
      <div
        className={cn(
          "absolute select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab",
          isSelected && "ring-2 ring-blue-500/60 ring-offset-1 ring-offset-transparent rounded",
          isEditing && "cursor-text ring-blue-400"
        )}
        style={{
          left: data.x,
          top: data.y,
          zIndex: 50,
          minWidth: 60,
          maxWidth: 500,
        }}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
      >
        <div
          ref={textRef}
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="whitespace-pre-wrap break-words px-2 py-1 outline-none"
          style={{
            fontSize: data.fontSize,
            fontFamily: data.fontFamily,
            color: data.color,
            fontWeight: data.bold ? "bold" : "normal",
            fontStyle: data.italic ? "italic" : "normal",
            textDecoration: data.underline ? "underline" : "none",
            textAlign: data.align,
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          {data.text}
        </div>
      </div>
    </>
  );
};

export default TextBlock;
