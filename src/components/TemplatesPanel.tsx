import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "culto", label: "Culto Domingo" },
  { id: "jovens", label: "Jovens" },
  { id: "ceia", label: "Santa Ceia" },
  { id: "versiculos", label: "Versículos" },
  { id: "evangelismo", label: "Evangelismo" },
];

const MOCK_TEMPLATES = [
  {
    id: "1",
    label: "Série Neons",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&q=80",
    pro: false,
  },
  {
    id: "2",
    label: "Culto Domingo",
    image: "https://images.unsplash.com/photo-1438232992991-995b671e4668?w=400&q=80",
    pro: true,
  },
  {
    id: "3",
    label: "Jovens Fire",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80",
    pro: false,
  },
  {
    id: "4",
    label: "Santa Ceia",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    pro: true,
  },
  {
    id: "5",
    label: "Versículo Gold",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&q=80",
    pro: false,
  },
  {
    id: "6",
    label: "Evangelismo",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
    pro: true,
  },
  {
    id: "7",
    label: "Adoração",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    pro: false,
  },
  {
    id: "8",
    label: "Série Dark",
    image: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?w=400&q=80",
    pro: true,
  },
];

interface TemplatesPanelProps {
  onApply?: (templateId: string) => void;
}

const TemplatesPanel = ({ onApply }: TemplatesPanelProps) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = MOCK_TEMPLATES.filter((t) =>
    t.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full w-[360px] shrink-0 flex-col border-r border-white/5 bg-[#0B0E14]">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-white/5">
        <h2 className="text-xl font-bold text-white mb-4">Templates</h2>

        {/* Search */}
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 h-12 focus-within:border-blue-500/50 transition-colors">
          <Search className="h-5 w-5 shrink-0 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar temas (ex: Culto, Jovens)"
            className="flex-1 bg-transparent text-sm text-slate-300 placeholder:text-slate-600 outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto px-6 py-4 shrink-0 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-all shrink-0",
              activeCategory === cat.id
                ? "border-blue-500 bg-blue-600/20 text-blue-400"
                : "border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-600">
            <Search className="h-8 w-8 mb-2" />
            <p className="text-sm">Nenhum template encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((template) => (
              <button
                key={template.id}
                onClick={() => onApply?.(template.id)}
                className="group relative flex flex-col gap-2 text-left"
              >
                {/* Card Image */}
                <div className="relative overflow-hidden rounded-xl aspect-[9/16] bg-slate-800">
                  <img
                    src={template.image}
                    alt={template.label}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* PRO Badge */}
                  {template.pro && (
                    <div className="absolute top-2 right-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
                      Pro
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                      Aplicar
                    </span>
                  </div>
                </div>

                {/* Label */}
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors px-0.5">
                  {template.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesPanel;
