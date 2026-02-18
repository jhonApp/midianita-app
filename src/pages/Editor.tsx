import { useState, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronDown,
  Minus,
  Plus,
  Maximize2,
  Share2,
  Type,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AICreatePanel from "@/components/AICreatePanel";
import TemplatesPanel from "@/components/TemplatesPanel";
import EditorSidebar, { type PanelId } from "@/components/EditorSidebar";
import SocialPreviewModal from "@/components/SocialPreviewModal";
import TextBlock, { type TextBlockData } from "@/components/editor/TextBlock";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Editor = () => {
  const [activePanel, setActivePanel] = useState<PanelId>("ai-magic");
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
      <header className="flex h-20 shrink-0 items-center justify-between border-b border-white/5 bg-[#12151c] px-8">
        <div className="flex items-center gap-3">
          {/* Back to Dashboard */}
          <button
            onClick={() => navigate("/dashboard")}
            title="Voltar para o Dashboard"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-colors shrink-0"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-white/10 shrink-0" />

          {/* Blue Logo */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>

          <div>
            <h1 className="text-lg font-bold text-white leading-tight">Summer Campaign</h1>
            <p className="text-sm text-slate-400">AI Creation Mode • Instagram Story</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Collaborator Avatars */}
          <div className="flex -space-x-2">
            <div className="h-10 w-10 rounded-full border-2 border-[#12151c] bg-amber-600 text-sm font-bold text-white flex items-center justify-center">JD</div>
            <div className="h-10 w-10 rounded-full border-2 border-[#12151c] bg-purple-600 text-sm font-bold text-white flex items-center justify-center">AL</div>
          </div>
          <span className="text-sm text-slate-500">+2</span>

          <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-6 h-11 text-sm font-semibold text-white hover:bg-white/[0.06] transition-colors">
            <Share2 className="h-4 w-4" />
            Share
          </button>
          <button className="rounded-lg bg-blue-600 px-8 h-12 text-sm font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30">
            Export
          </button>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold text-white shrink-0">
            {initials}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Editor Sidebar */}
        <EditorSidebar
          activePanel={activePanel}
          onPanelChange={setActivePanel}
          onAddText={addTextBlock}
        />

        {/* Dynamic Left Panel */}
        {activePanel === "ai-magic" && (
          <AICreatePanel onFormatChange={setCanvasRatio} />
        )}
        {activePanel === "templates" && (
          <TemplatesPanel />
        )}

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
          <div className="absolute bottom-5 z-10 flex items-center gap-3 rounded-lg border border-white/[0.06] bg-[#12151c] px-4 py-2">
            <button onClick={() => setZoom((z) => Math.max(10, z - 10))} className="text-slate-500 hover:text-white transition-colors">
              <Minus className="h-5 w-5" />
            </button>
            <span className="w-12 text-center text-sm text-slate-400">{zoom}%</span>
            <button onClick={() => setZoom((z) => Math.min(200, z + 10))} className="text-slate-500 hover:text-white transition-colors">
              <Plus className="h-5 w-5" />
            </button>
            <div className="mx-1 h-5 w-px bg-white/[0.06]" />
            <button className="text-slate-500 hover:text-white transition-colors">
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Inspector Panel */}
        <div className="w-[360px] shrink-0 border-l border-white/[0.06] bg-[#12151c] flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-white/[0.06]">
            <button className="flex-1 border-b-2 border-blue-500 py-4 text-base font-medium text-white">Inspector</button>
            <button onClick={() => setPreviewOpen(true)} className="flex-1 py-4 text-base text-slate-500 hover:text-slate-300 transition-colors">Preview</button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
            {/* Typography */}
            <section>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Typography</h3>
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 h-12 flex items-center justify-between">
                <span className="text-base text-slate-300">Inter (Bold)</span>
                <ChevronDown className="h-5 w-5 text-slate-500" />
              </div>
              <div className="mt-3 flex gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 h-11">
                  <Type className="h-5 w-5 text-slate-500" />
                  <input type="number" defaultValue={128} className="w-16 bg-transparent text-base text-slate-300 outline-none" />
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]">
                  <div className="h-6 w-6 rounded-full bg-white" />
                </div>
              </div>
            </section>

            {/* Layout */}
            <section>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Layout</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 h-11">
                  <span className="text-sm text-slate-500">X</span>
                  <input type="number" defaultValue={32} className="w-full bg-transparent text-base text-slate-300 outline-none" />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 h-11">
                  <span className="text-sm text-slate-500">Y</span>
                  <input type="number" defaultValue={140} className="w-full bg-transparent text-base text-slate-300 outline-none" />
                </div>
              </div>
            </section>
          </div>

          {/* AI Assistant */}
          <div className="border-t border-white/[0.06] p-6">
            <div className="rounded-xl bg-indigo-950/40 border border-indigo-500/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                <span className="text-base font-semibold text-white">AI Assistant</span>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                Optimization suggestion: Increase contrast between headline and background.
              </p>
              <button className="w-full rounded-lg border border-indigo-500/30 bg-indigo-500/10 h-11 text-base text-indigo-300 hover:bg-indigo-500/20 transition-colors">
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
