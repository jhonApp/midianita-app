import { useState } from "react";
import { Search, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import ImageDetailModal, { type GalleryItem } from "@/components/ImageDetailModal";

// ── Mock Data ──────────────────────────────────────────────
const MOCK_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Culto de Adoração — Série Profética",
    category: "Culto",
    imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
    prompt: "Crie uma arte de culto com tons dourados e atmosfera celestial, incluindo raios de luz e elementos proféticos modernos.",
    tags: ["culto", "adoração", "profético"],
    date: "12 Jan 2025",
    format: "1080×1080",
    quality: "Alta (HD)",
    model: "Midianita v2",
    palette: ["#F59E0B", "#D97706", "#92400E", "#1E1B4B"],
  },
  {
    id: "2",
    title: "Encontro de Jovens — Glow Night",
    category: "Jovens",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    prompt: "Arte neon vibrante para encontro de jovens com tema festa glow, cores elétricas azul e roxo, estilo urbano.",
    tags: ["jovens", "neon", "evento"],
    date: "08 Jan 2025",
    format: "1080×1920",
    quality: "Alta (HD)",
    model: "Midianita v2",
    palette: ["#3B82F6", "#8B5CF6", "#EC4899", "#06B6D4"],
  },
  {
    id: "3",
    title: "Versículo do Dia — Salmos 23",
    category: "Versículo",
    imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80",
    prompt: "Design clean e minimalista com Salmos 23, fundo com montanhas suaves e degradê suave do azul ao roxo.",
    tags: ["versículo", "salmos", "minimalista"],
    date: "05 Jan 2025",
    format: "1080×1080",
    quality: "Alta (HD)",
    model: "Midianita v2",
    palette: ["#6366F1", "#A78BFA", "#C4B5FD", "#E0E7FF"],
  },
  {
    id: "4",
    title: "Conferência de Mulheres 2025",
    category: "Evento",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    prompt: "Arte elegante para conferência de mulheres com tons rosa e dourado, tipografia sofisticada e elementos florais.",
    tags: ["evento", "mulheres", "conferência"],
    date: "02 Jan 2025",
    format: "1080×1080",
    quality: "Alta (HD)",
    model: "Midianita v2",
    palette: ["#EC4899", "#F472B6", "#F9A8D4", "#FDE68A"],
  },
  {
    id: "5",
    title: "EBD — Estudo Bíblico Dominical",
    category: "Culto",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    prompt: "Arte acadêmica e acolhedora para escola bíblica dominical, com livro aberto e iluminação quente.",
    tags: ["ebd", "estudo", "bíblico"],
    date: "28 Dez 2024",
    format: "1080×1080",
    quality: "Alta (HD)",
    model: "Midianita v2",
    palette: ["#D97706", "#B45309", "#78350F", "#FEF3C7"],
  },
  {
    id: "6",
    title: "Retiro Espiritual — Monte Sinai",
    category: "Evento",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    prompt: "Paisagem montanhosa épica ao nascer do sol com atmosfera espiritual, tons quentes e frios contrastando.",
    tags: ["retiro", "natureza", "espiritual"],
    date: "20 Dez 2024",
    format: "1920×1080",
    quality: "Ultra (4K)",
    model: "Midianita v2",
    palette: ["#F97316", "#7C3AED", "#1E3A5F", "#FBBF24"],
  },
];

const CATEGORIES = ["Cultos", "Jovens", "Eventos", "Versículos"];
const FORMATS = ["Feed", "Story", "Banner", "Slides"];
const COLORS = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#EF4444"];

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filtered = MOCK_GALLERY_ITEMS.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="flex h-full min-h-screen">
      {/* ── Filter Sidebar ── */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card p-5 lg:flex">
        <h2 className="mb-6 text-lg font-bold text-foreground">Filtros</h2>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Categorias
          </h3>
          <div className="space-y-2.5">
            {CATEGORIES.map((cat) => (
              <label
                key={cat}
                className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Checkbox
                  checked={selectedCategories.includes(cat)}
                  onCheckedChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Formats */}
        <div className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Formato
          </h3>
          <div className="flex flex-wrap gap-2">
            {FORMATS.map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(selectedFormat === fmt ? null : fmt)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  selectedFormat === fmt
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Cor dominante
          </h3>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                className="h-7 w-7 rounded-full border-2 border-transparent transition-all hover:scale-110 hover:border-white/30"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Credits Widget */}
        <div className="mt-auto rounded-xl bg-secondary p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Créditos</span>
            <span className="text-xs font-bold text-foreground">85/100</span>
          </div>
          <Progress value={85} className="h-2" />
          <p className="mt-2 text-[11px] text-muted-foreground">
            15 créditos restantes este mês
          </p>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-5">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar artes, prompts ou tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-border p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-md p-2 transition-colors ${
                viewMode === "grid" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-md p-2 transition-colors ${
                viewMode === "list" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-5">
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
                : "flex flex-col gap-3"
            }
          >
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-3.5">
                  <h3 className="truncate text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {item.category} • {item.tags[0]}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Search className="mb-3 h-10 w-10 opacity-30" />
              <p className="text-sm">Nenhuma arte encontrada.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Detail Modal ── */}
      {selectedItem && (
        <ImageDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
};

export default Gallery;
