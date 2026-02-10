import { useState, useCallback, useRef } from "react";
import {
  Camera,
  LayoutGrid,
  Type,
  Image,
  Mountain,
  Sparkles,
  Settings,
  ChevronDown,
  Minus,
  Plus,
  Maximize2,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AICreatePanel from "@/components/AICreatePanel";
import SocialPreviewModal from "@/components/SocialPreviewModal";
import TextBlock, { type TextBlockData } from "@/components/editor/TextBlock";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ICON_NAV = [
  { icon: Camera, label: "Captura", action: null },
  { icon: LayoutGrid, label: "Elementos", action: null },
  { icon: Type, label: "Texto", action: "addText" },
  { icon: Image, label: "Imagens", action: null },
  { icon: Mountain, label: "Fundos", action: null },
  { icon: Sparkles, label: "AI Create", active: true, action: null },
];

const Editor = () => {
  const [canvasRatio, setCanvasRatio] = useState("9/16");
  const [zoom, setZoom] = useState(85);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [textBlocks, setTextBlocks] = useState<TextBlockData[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const initials = user?.name ? user.name.substring(0, 2).toUpperCase() : "MM";

  const addTextBlock = useCallback(() => {
    const newBlock: TextBlockData = {
      id: crypto.randomUUID(),
      text: "Seu Título Aqui",
      x: 80,
      y: 150,
      fontSize: 48,
      fontFamily: "Inter, sans-serif",
      color: "#FFFFFF",
      bold: true,
      italic: false,
      underline: false,
      align: "center",
    };
    setTextBlocks(prev => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
  }, []);

  const updateTextBlock = useCallback((id: string, updates: Partial<TextBlockData>) => {
    setTextBlocks(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  }, []);

  const deleteTextBlock = useCallback((id: string) => {
    setTextBlocks(prev => prev.filter(b => b.id !== id));
    setSelectedBlockId(null);
  }, []);

  return (
    <div className="flex h-screen flex-col bg-[#0B0E14]">
      {/* Top Bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#12151c] px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </button>
          <div>
            <h1 className="text-sm font-semibold text-white">Summer Campaign</h1>
            <p className="text-[11px] text-slate-500">AI Creation Mode • Instagram Story</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Avatars */}
          <div className="flex -space-x-2">
            <div className="h-7 w-7 rounded-full border-2 border-[#12151c] bg-amber-600 text-[10px] font-bold text-white flex items-center justify-center">JD</div>
            <div className="h-7 w-7 rounded-full border-2 border-[#12151c] bg-purple-600 text-[10px] font-bold text-white flex items-center justify-center">AL</div>
          </div>
          <span className="text-xs text-slate-500">+2</span>

          <button className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-sm text-white hover:bg-white/[0.06] transition-colors">
            <Share2 className="mr-1.5 inline h-3.5 w-3.5" />
            Share
          </button>
          <button className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors">
            Export
          </button>
          <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-[11px] font-bold text-white">
            {initials}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Icon Sidebar */}
        <div className="flex w-14 shrink-0 flex-col items-center gap-1 border-r border-white/[0.06] bg-[#12151c] py-3">
          {ICON_NAV.map((item, i) => (
            <button
              key={i}
              onClick={() => item.action === "addText" ? addTextBlock() : undefined}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                item.active
                  ? "bg-blue-600/20 text-blue-400"
                  : "text-slate-500 hover:bg-white/[0.05] hover:text-slate-300"
              )}
              title={item.label}
            >
              <item.icon className="h-5 w-5" />
            </button>
          ))}
          <div className="flex-1" />
          <button className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-white/[0.05] hover:text-slate-300 transition-colors" title="Configurações">
            <Settings className="h-5 w-5" />
          </button>
        </div>

        {/* AI Create Panel */}
        <AICreatePanel onFormatChange={setCanvasRatio} />

        {/* Canvas Area */}
        <div className="relative flex flex-1 flex-col items-center justify-center bg-[#0B0E14] overflow-hidden" onClick={() => setSelectedBlockId(null)}>
          {/* Dot grid background */}
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }} />

          {/* Canvas */}
          <div
            ref={canvasRef}
            className="relative z-10 overflow-visible rounded-lg bg-gradient-to-b from-slate-700 to-slate-900 shadow-2xl shadow-black/50"
            style={{
              aspectRatio: canvasRatio,
              height: "70vh",
              maxWidth: "90%",
            }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                alt="Canvas preview"
                className="h-full w-full object-cover"
              />
              {/* Overlay content */}
              <div className="absolute inset-0 flex flex-col items-center justify-between p-8">
                <div />
                <h2 className="text-center text-5xl font-black uppercase leading-none text-white drop-shadow-lg">
                  NEW<br />ADVEN<br />TURE
                </h2>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-white/60 text-lg">⌃</span>
                  <span className="rounded border border-white/30 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                    Swipe Up
                  </span>
                </div>
              </div>
            </div>

            {/* Text Blocks Layer */}
            {textBlocks.map(block => (
              <TextBlock
                key={block.id}
                data={block}
                isSelected={selectedBlockId === block.id}
                onSelect={() => setSelectedBlockId(block.id)}
                onUpdate={(updates) => updateTextBlock(block.id, updates)}
                onDelete={() => deleteTextBlock(block.id)}
                containerRef={canvasRef}
              />
            ))}
          </div>

          {/* Zoom controls */}
          <div className="absolute bottom-5 z-10 flex items-center gap-2 rounded-lg border border-white/[0.06] bg-[#12151c] px-3 py-1.5">
            <button onClick={() => setZoom((z) => Math.max(10, z - 10))} className="text-slate-500 hover:text-white transition-colors">
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center text-xs text-slate-400">{zoom}%</span>
            <button onClick={() => setZoom((z) => Math.min(200, z + 10))} className="text-slate-500 hover:text-white transition-colors">
              <Plus className="h-4 w-4" />
            </button>
            <div className="mx-1 h-4 w-px bg-white/[0.06]" />
            <button className="text-slate-500 hover:text-white transition-colors">
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Inspector Panel */}
        <div className="w-[280px] shrink-0 border-l border-white/[0.06] bg-[#12151c] flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-white/[0.06]">
            <button className="flex-1 border-b-2 border-blue-500 py-3 text-sm font-medium text-white">Inspector</button>
            <button onClick={() => setPreviewOpen(true)} className="flex-1 py-3 text-sm text-slate-500 hover:text-slate-300 transition-colors">Preview</button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Typography */}
            <section>
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">Typography</h3>
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 flex items-center justify-between">
                <span className="text-sm text-slate-300">Inter (Bold)</span>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </div>
              <div className="mt-2 flex gap-2">
                <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2">
                  <Type className="h-4 w-4 text-slate-500" />
                  <input type="number" defaultValue={128} className="w-12 bg-transparent text-sm text-slate-300 outline-none" />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]">
                  <div className="h-5 w-5 rounded-full bg-white" />
                </div>
              </div>
            </section>

            {/* Layout */}
            <section>
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">Layout</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2">
                  <span className="text-xs text-slate-500">X</span>
                  <input type="number" defaultValue={32} className="w-full bg-transparent text-sm text-slate-300 outline-none" />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2">
                  <span className="text-xs text-slate-500">Y</span>
                  <input type="number" defaultValue={140} className="w-full bg-transparent text-sm text-slate-300 outline-none" />
                </div>
              </div>
            </section>
          </div>

          {/* AI Assistant */}
          <div className="border-t border-white/[0.06] p-4">
            <div className="rounded-xl bg-indigo-950/40 border border-indigo-500/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span className="text-sm font-semibold text-white">AI Assistant</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Optimization suggestion: Increase contrast between headline and background.
              </p>
              <button className="w-full rounded-lg border border-indigo-500/30 bg-indigo-500/10 py-2 text-sm text-indigo-300 hover:bg-indigo-500/20 transition-colors">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Preview Modal */}
      <SocialPreviewModal open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </div>
  );
};

export default Editor;
