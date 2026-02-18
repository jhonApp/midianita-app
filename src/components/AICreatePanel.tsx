import { useState } from "react";
import {
  Smartphone,
  Square,
  Monitor,
  CloudUpload,
  X,
  Pipette,
  Pencil,
  Plus,
  Sparkles,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FORMATS = [
  { id: "story", label: "Story (9:16)", icon: Smartphone, ratio: "9/16" },
  { id: "feed", label: "Feed (1:1)", icon: Square, ratio: "1/1" },
  { id: "pres", label: "Pres (16:9)", icon: Monitor, ratio: "16/9" },
] as const;

const STYLE_PRESETS = [
  {
    id: "neon",
    label: "Neon",
    colors: ["#6366f1", "#a855f7", "#06b6d4"],
  },
  {
    id: "classico",
    label: "Clássico",
    colors: ["#c9a44a", "#1e1e1e", "#ffffff"],
  },
  {
    id: "pastel",
    label: "Pastel",
    colors: ["#fda4af", "#c4b5fd", "#a5f3fc"],
  },
  {
    id: "moderno",
    label: "Moderno",
    colors: ["#3976ef", "#ffffff", "#0f172a"],
  },
];

const MOCK_UPLOADS = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
];

interface AICreatePanelProps {
  onFormatChange?: (ratio: string) => void;
  onGenerate?: () => void;
}

const AICreatePanel = ({ onFormatChange, onGenerate }: AICreatePanelProps) => {
  const [selectedFormat, setSelectedFormat] = useState("story");
  const [selectedPreset, setSelectedPreset] = useState("classico");
  const [uploads, setUploads] = useState<string[]>(MOCK_UPLOADS);
  const [customColors, setCustomColors] = useState(["#3976EF", "#FFFFFF"]);
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormatSelect = (id: string, ratio: string) => {
    setSelectedFormat(id);
    onFormatChange?.(ratio);
  };

  const handleRemoveUpload = (index: number) => {
    setUploads((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      onGenerate?.();
    }, 2500);
  };

  return (
    <div className="flex h-full w-[360px] shrink-0 flex-col border-r border-white/[0.06] bg-[#1a1d24]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-400" />
          <span className="text-base font-semibold text-white">AI Create</span>
        </div>
        <button className="text-slate-500 hover:text-white transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin">
        {/* FORMAT SELECTION */}
        <section>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
            Formato
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {FORMATS.map((fmt) => (
              <button
                key={fmt.id}
                onClick={() => handleFormatSelect(fmt.id, fmt.ratio)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border p-4 h-24 transition-all text-sm",
                  selectedFormat === fmt.id
                    ? "border-blue-500 bg-blue-600/20 text-blue-400"
                    : "border-white/[0.06] bg-white/[0.03] text-slate-400 hover:border-white/10 hover:text-slate-300"
                )}
              >
                <fmt.icon className="h-6 w-6" />
                <span className="whitespace-nowrap">{fmt.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* REFERENCE FILES */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Arquivos de Referência
            </h3>
            <span className="text-sm text-slate-600">
              {uploads.length}/5
            </span>
          </div>

          {/* Dropzone */}
          <label className="flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-dashed border-slate-700 bg-white/[0.02] px-4 h-32 justify-center transition-colors hover:border-slate-600">
            <CloudUpload className="h-8 w-8 text-slate-500" />
            <p className="text-center text-sm text-slate-500">
              Arraste imagens ou{" "}
              <span className="font-medium text-blue-400">faça upload</span>
            </p>
            <input type="file" className="hidden" accept="image/*" multiple />
          </label>

          {/* Thumbnails */}
          {uploads.length > 0 && (
            <div className="mt-4 flex gap-3">
              {uploads.map((url, i) => (
                <div key={i} className="group relative">
                  <img
                    src={url}
                    alt="upload"
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <button
                    onClick={() => handleRemoveUpload(i)}
                    className="absolute -right-1.5 -top-1.5 hidden h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white group-hover:flex"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* BRANDING & COLORS */}
        <section>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
            Branding & Cores
          </h3>

          {/* Extract button */}
          <button className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 h-11 text-base text-slate-300 transition-colors hover:bg-white/[0.06]">
            <Pipette className="h-5 w-5" />
            Extrair da Imagem
          </button>

          {/* Style presets */}
          <p className="mb-3 text-sm text-slate-500">Estilos Predefinidos</p>
          <div className="mb-4 flex flex-wrap gap-3">
            {STYLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPreset(preset.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all",
                  selectedPreset === preset.id
                    ? "border-blue-500 bg-blue-600/20 text-blue-400"
                    : "border-white/[0.08] text-slate-400 hover:border-white/15"
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Custom colors */}
          <div className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 h-12">
            <div
              className="h-10 w-10 shrink-0 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${customColors[0]}, ${customColors[1]})`,
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Customizado
              </p>
              <p className="truncate text-sm text-slate-400 font-mono">
                {customColors.join(", ")}
              </p>
            </div>
            <button className="text-slate-500 hover:text-white transition-colors">
              <Pencil className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* DESCRIPTION */}
        <section>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
            Descrição do Projeto
          </h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva o que você deseja criar..."
            rows={4}
            className="w-full resize-none rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-base text-slate-300 placeholder:text-slate-600 focus:border-blue-500/50 focus:outline-none focus:ring-0 transition-colors"
          />
        </section>
      </div>

      {/* GENERATE BUTTON - Fixed bottom */}
      <div className="border-t border-white/[0.06] p-6">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 h-14 text-lg font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:shadow-blue-600/30 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Gerar Variações
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AICreatePanel;
