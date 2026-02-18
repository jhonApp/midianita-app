import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Square,
  Layers,
  Smartphone,
  Sparkles,
  BookOpen,
  Calendar,
  Bell,
  MessageSquare,
  Sun,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FormatId = "post" | "carousel" | "story";

const FORMATS = [
  {
    id: "post" as FormatId,
    icon: Square,
    label: "Post Único",
    description: "Imagem estática 1:1 ou 4:5",
  },
  {
    id: "carousel" as FormatId,
    icon: Layers,
    label: "Carrossel",
    description: "Sequência de slides deslizáveis",
  },
  {
    id: "story" as FormatId,
    icon: Smartphone,
    label: "Story / Reels",
    description: "Formato vertical 9:16",
  },
];

const POST_DIMENSIONS = ["Quadrado (1:1)", "Retrato (4:5)"];
const CAROUSEL_SLIDES = ["4 Slides", "7 Slides", "10 Slides"];
const LANGUAGES = ["Português (Brasil)", "English", "Español"];

const EXAMPLE_PROMPTS = [
  { id: 1, icon: BookOpen,      text: "Resumo da Pregação de Domingo sobre Fé." },
  { id: 2, icon: Users,         text: "Convite para o Culto de Jovens (Sábado)." },
  { id: 3, icon: Sun,           text: "Versículo do Dia: Salmos 23." },
  { id: 4, icon: Calendar,      text: "Agenda da Semana da Igreja." },
  { id: 5, icon: Bell,          text: "Aviso importante: Escola Bíblica." },
  { id: 6, icon: MessageSquare, text: "Carrossel explicativo: 5 passos para orar." },
];

const GenerativeHome = () => {
  const navigate = useNavigate();
  const [selectedFormat, setSelectedFormat] = useState<FormatId>("post");
  const [selectedDimension, setSelectedDimension] = useState("Quadrado (1:1)");
  const [selectedSlides, setSelectedSlides] = useState("7 Slides");
  const [selectedLanguage, setSelectedLanguage] = useState("Português (Brasil)");
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    if (prompt.trim()) {
      navigate("/ai-synthesis", { state: { prompt, format: selectedFormat } });
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#0B0E14] overflow-y-auto scrollbar-thin">

      {/* Header */}
      <header className="shrink-0 border-b border-white/5">
        <div className="relative max-w-6xl mx-auto flex items-center justify-center px-10 py-10">
          {/* Back button — absolutely pinned left */}
          <button
            onClick={() => navigate("/dashboard")}
            className="absolute left-0 flex items-center gap-2 rounded-lg px-4 py-2 text-slate-400 hover:bg-white/5 hover:text-white transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="text-lg font-medium">Voltar</span>
          </button>

          {/* Title block — perfectly centered */}
          <div className="text-center flex flex-col gap-3">
            <h1 className="text-5xl font-extrabold text-white tracking-tight">Novo Design</h1>
            <p className="text-xl text-slate-400">O que você gostaria de criar hoje?</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-10 py-14 flex flex-col gap-10">

        {/* 1. Format Selector — massive cards */}
        <section className="grid grid-cols-3 gap-6">
          {FORMATS.map((fmt) => {
            const isActive = selectedFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                onClick={() => setSelectedFormat(fmt.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-4 rounded-2xl border h-44 transition-all duration-200",
                  isActive
                    ? "border-blue-500 bg-blue-500/10 shadow-xl shadow-blue-500/10"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                )}
              >
                <div
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-2xl transition-colors",
                    isActive ? "bg-blue-500/20" : "bg-white/5"
                  )}
                >
                  <fmt.icon
                    className={cn(
                      "h-8 w-8 transition-colors",
                      isActive ? "text-blue-400" : "text-slate-400"
                    )}
                  />
                </div>
                <div className="text-center px-4">
                  <p className={cn(
                    "text-xl font-bold transition-colors",
                    isActive ? "text-white" : "text-slate-300"
                  )}>
                    {fmt.label}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">{fmt.description}</p>
                </div>
              </button>
            );
          })}
        </section>

        {/* 2. Parameters Bar */}
        <section className="flex flex-wrap items-center gap-3">
          {/* Dimension — Post only */}
          {selectedFormat === "post" && (
            <div className="relative">
              <select
                value={selectedDimension}
                onChange={(e) => setSelectedDimension(e.target.value)}
                className="appearance-none cursor-pointer rounded-full border border-white/10 bg-white/5 px-6 h-12 pr-10 text-sm text-slate-300 hover:bg-white/10 hover:border-white/20 transition-colors outline-none"
              >
                {POST_DIMENSIONS.map((d) => (
                  <option key={d} value={d} className="bg-[#1a1d24]">{d}</option>
                ))}
              </select>
              <ChevronLeft className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 -rotate-90 text-slate-500" />
            </div>
          )}

          {/* Locked 9:16 — Story */}
          {selectedFormat === "story" && (
            <span className="flex items-center rounded-full border border-white/10 bg-white/5 px-6 h-12 text-sm text-slate-400 cursor-default">
              9:16 (Story / Reels)
            </span>
          )}

          {/* Slides — Carousel only */}
          {selectedFormat === "carousel" && (
            <div className="relative">
              <select
                value={selectedSlides}
                onChange={(e) => setSelectedSlides(e.target.value)}
                className="appearance-none cursor-pointer rounded-full border border-white/10 bg-white/5 px-6 h-12 pr-10 text-sm text-slate-300 hover:bg-white/10 hover:border-white/20 transition-colors outline-none"
              >
                {CAROUSEL_SLIDES.map((s) => (
                  <option key={s} value={s} className="bg-[#1a1d24]">{s}</option>
                ))}
              </select>
              <ChevronLeft className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 -rotate-90 text-slate-500" />
            </div>
          )}

          {/* Language — always */}
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="appearance-none cursor-pointer rounded-full border border-white/10 bg-white/5 px-6 h-12 pr-10 text-sm text-slate-300 hover:bg-white/10 hover:border-white/20 transition-colors outline-none"
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l} className="bg-[#1a1d24]">{l}</option>
              ))}
            </select>
            <ChevronLeft className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 -rotate-90 text-slate-500" />
          </div>
        </section>

        {/* 3. Prompt Input — centerpiece */}
        <section>
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-white/20 focus-within:border-blue-500/40 transition-colors">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate();
              }}
              placeholder="Descreva o tema, versículo ou ideia do post..."
              rows={6}
              className="w-full resize-none bg-transparent px-8 pt-8 pb-20 text-2xl text-white placeholder:text-slate-700 outline-none scrollbar-thin leading-relaxed"
            />
            <div className="absolute bottom-5 right-5 flex items-center gap-3">
              <span className="text-xs text-slate-600 hidden sm:block">⌘ + Enter para gerar</span>
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 h-12 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Sparkles className="h-5 w-5" />
                Gerar com IA
              </button>
            </div>
          </div>
        </section>

        {/* 4. Example Prompts */}
        <section className="pb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-5">
            Exemplos de prompts
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {EXAMPLE_PROMPTS.map((example) => (
              <button
                key={example.id}
                onClick={() => setPrompt(example.text)}
                className="group flex items-start gap-4 rounded-xl border border-white/5 bg-white/5 p-6 text-left hover:bg-white/10 hover:border-white/15 transition-all cursor-pointer"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors mt-0.5">
                  <example.icon className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                </div>
                <span className="text-base text-slate-400 group-hover:text-slate-200 transition-colors leading-snug">
                  {example.text}
                </span>
              </button>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default GenerativeHome;
