import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Send,
  Music,
  Search,
  Home,
  User,
  Film,
  ShoppingBag,
  X,
  ChevronLeft,
  Plus,
  ThumbsUp,
  Smartphone,
  Square,
  Monitor,
  RectangleVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

type Platform = "instagram" | "tiktok" | "facebook";
type PreviewFormat = "story" | "feed" | "feed45" | "pinterest" | "landscape";

interface SocialPreviewModalProps {
  open: boolean;
  onClose: () => void;
  imageUrl?: string;
}

const PLATFORMS: { id: Platform; label: string }[] = [
  { id: "tiktok", label: "TikTok" },
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
];

const FORMATS: { id: PreviewFormat; label: string; icon: React.ElementType }[] = [
  { id: "story", label: "Story 9:16", icon: Smartphone },
  { id: "feed", label: "Feed 1:1", icon: Square },
  { id: "feed45", label: "Feed 4:5", icon: RectangleVertical },
  { id: "pinterest", label: "Pin 2:3", icon: RectangleVertical },
  { id: "landscape", label: "Landscape 16:9", icon: Monitor },
];

/* ──────────────────────────────────────────────
   Instagram Overlay
   ────────────────────────────────────────────── */
const InstagramOverlay = ({ caption }: { caption: string }) => (
  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-white z-10">
    {/* Top bar */}
    <div className="flex items-center justify-between px-4 pt-12 pb-2">
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-[2px]">
          <div className="h-full w-full rounded-full bg-black/60 backdrop-blur flex items-center justify-center">
            <span className="text-[8px] font-bold">MI</span>
          </div>
        </div>
        <div>
          <span className="text-[11px] font-semibold">midianita.app</span>
          <span className="ml-1.5 text-[9px] text-white/50">• 2h</span>
        </div>
      </div>
      <MoreHorizontal className="h-5 w-5 text-white/80" />
    </div>

    {/* Right action column */}
    <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5">
      <button className="flex flex-col items-center gap-1">
        <Heart className="h-6 w-6" />
        <span className="text-[10px]">2.4k</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <MessageCircle className="h-6 w-6" />
        <span className="text-[10px]">184</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <Send className="h-6 w-6" />
      </button>
      <button className="flex flex-col items-center gap-1">
        <Bookmark className="h-6 w-6" />
      </button>
    </div>

    {/* Bottom reply bar */}
    <div className="px-4 pb-7">
      {caption && (
        <p className="text-[11px] text-white/80 mb-3 leading-relaxed line-clamp-2">
          <span className="font-semibold text-white">midianita.app</span>{" "}
          {caption}
        </p>
      )}
      <div className="flex items-center gap-3">
        <div className="flex-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2">
          <span className="text-[11px] text-white/40">Envie uma mensagem</span>
        </div>
        <Heart className="h-5 w-5 text-white/60" />
        <Send className="h-5 w-5 text-white/60" />
      </div>
    </div>
  </div>
);

/* ──────────────────────────────────────────────
   TikTok Overlay
   ────────────────────────────────────────────── */
const TikTokOverlay = ({ caption }: { caption: string }) => (
  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-white z-10">
    {/* Top bar */}
    <div className="flex items-center justify-between px-4 pt-12 pb-2">
      <ChevronLeft className="h-5 w-5" />
      <div className="flex items-center gap-4">
        <span className="text-[12px] text-white/50">Seguindo</span>
        <span className="text-[12px] font-semibold border-b-2 border-white pb-0.5">Para você</span>
      </div>
      <Search className="h-5 w-5" />
    </div>

    {/* Right action column */}
    <div className="absolute right-3 bottom-20 flex flex-col items-center gap-4">
      <div className="relative">
        <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur border-2 border-white flex items-center justify-center">
          <span className="text-[9px] font-bold">MI</span>
        </div>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-rose-500 flex items-center justify-center">
          <Plus className="h-2.5 w-2.5" />
        </div>
      </div>
      <button className="flex flex-col items-center gap-1">
        <Heart className="h-7 w-7" fill="white" />
        <span className="text-[10px]">18.2k</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <MessageCircle className="h-7 w-7" />
        <span className="text-[10px]">342</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <Bookmark className="h-7 w-7" />
        <span className="text-[10px]">1.2k</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <Share2 className="h-7 w-7" />
        <span className="text-[10px]">Share</span>
      </button>
      {/* Music disc */}
      <div
        className="mt-1 h-10 w-10 rounded-full border-2 border-white/30 bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center animate-spin"
        style={{ animationDuration: "3s" }}
      >
        <Music className="h-4 w-4 text-white/80" />
      </div>
    </div>

    {/* Bottom description */}
    <div className="px-4 pb-4 pr-20">
      <p className="text-[12px] font-semibold mb-1">@midianita.app</p>
      {caption && (
        <p className="text-[11px] text-white/80 leading-relaxed line-clamp-2 mb-2">
          {caption}
        </p>
      )}
      <div className="flex items-center gap-2 mt-2">
        <Music className="h-3 w-3 text-white/60" />
        <div className="overflow-hidden max-w-[60%]">
          <p className="text-[10px] text-white/60 whitespace-nowrap animate-marquee">
            🎵 Som original — midianita.app
          </p>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-around mt-3 -mx-4 bg-black/60 backdrop-blur px-2 py-2.5 border-t border-white/5">
        <Home className="h-5 w-5" />
        <Search className="h-5 w-5 text-white/40" />
        <div className="h-8 w-10 rounded-lg bg-gradient-to-r from-cyan-400 to-rose-400 flex items-center justify-center">
          <Plus className="h-5 w-5 text-black" />
        </div>
        <MessageCircle className="h-5 w-5 text-white/40" />
        <User className="h-5 w-5 text-white/40" />
      </div>
    </div>
  </div>
);

/* ──────────────────────────────────────────────
   Facebook Overlay
   ────────────────────────────────────────────── */
const FacebookOverlay = ({ caption }: { caption: string }) => (
  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-white z-10">
    {/* Top bar */}
    <div className="px-4 pt-12 pb-2">
      <div className="flex items-center justify-between mb-3">
        <ChevronLeft className="h-5 w-5" />
        <span className="text-[12px] font-semibold">Your Story</span>
        <MoreHorizontal className="h-5 w-5" />
      </div>
      <div className="flex gap-1">
        <div className="flex-1 h-[2px] rounded-full bg-white/80" />
        <div className="flex-1 h-[2px] rounded-full bg-white/30" />
        <div className="flex-1 h-[2px] rounded-full bg-white/30" />
      </div>
    </div>

    {/* Bottom reactions */}
    <div className="px-4 pb-6">
      {caption && (
        <p className="text-[11px] text-white/80 mb-3 leading-relaxed line-clamp-2">
          {caption}
        </p>
      )}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex -space-x-1">
          <span className="text-sm">👍</span>
          <span className="text-sm">❤️</span>
          <span className="text-sm">😂</span>
        </div>
        <span className="text-[10px] text-white/50">324 reactions</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2">
          <span className="text-[11px] text-white/40">Reply to story…</span>
        </div>
        <ThumbsUp className="h-5 w-5 text-white/60" />
        <Heart className="h-5 w-5 text-white/60" />
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-around mt-3 -mx-4 bg-black/60 backdrop-blur px-2 py-2.5 border-t border-white/5">
        <Home className="h-5 w-5" />
        <Film className="h-5 w-5 text-white/40" />
        <ShoppingBag className="h-5 w-5 text-white/40" />
        <MessageCircle className="h-5 w-5 text-white/40" />
        <User className="h-5 w-5 text-white/40" />
      </div>
    </div>
  </div>
);

/* ──────────────────────────────────────────────
   Content layer — adjusts aspect ratio INSIDE the
   fixed phone frame based on the selected format.
   ────────────────────────────────────────────── */
const aspectClass: Record<string, string> = {
  feed: "aspect-square",
  feed45: "aspect-[4/5]",
  pinterest: "aspect-[2/3]",
  landscape: "aspect-video",
};

/* Instagram Feed Layout */
const InstagramFeedLayout = ({
  format,
  imageUrl,
  caption,
}: {
  format: PreviewFormat;
  imageUrl: string;
  caption: string;
}) => (
  <div className="absolute inset-0 flex flex-col bg-black text-white">
    <div className="flex items-center justify-between px-3 pt-12 pb-2">
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-[2px]">
          <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
            <span className="text-[8px] font-bold">MI</span>
          </div>
        </div>
        <span className="text-[12px] font-semibold">midianita.app</span>
      </div>
      <MoreHorizontal className="h-5 w-5 text-white/70" />
    </div>
    <div className="w-full">
      <img src={imageUrl} alt="Preview" className={cn("w-full object-cover", aspectClass[format])} />
    </div>
    <div className="flex items-center justify-between px-4 py-2.5">
      <div className="flex items-center gap-4">
        <Heart className="h-6 w-6" />
        <MessageCircle className="h-6 w-6" />
        <Send className="h-6 w-6" />
      </div>
      <Bookmark className="h-6 w-6" />
    </div>
    <div className="px-4 space-y-1">
      <p className="text-[11px] font-semibold">Liked by <span className="font-bold">thousands</span> and others</p>
      {caption && (
        <p className="text-[11px] leading-relaxed line-clamp-2">
          <span className="font-semibold">midianita.app</span>{" "}
          <span className="text-white/70">{caption}</span>
        </p>
      )}
      <p className="text-[10px] text-white/40 pt-0.5">2 hours ago</p>
    </div>
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around py-3 border-t border-white/10 bg-black">
      <Home className="h-6 w-6" />
      <Search className="h-6 w-6 text-white/50" />
      <Plus className="h-6 w-6 text-white/50" />
      <Film className="h-6 w-6 text-white/50" />
      <User className="h-6 w-6 text-white/50" />
    </div>
  </div>
);

/* TikTok Feed Layout */
const TikTokFeedLayout = ({
  format,
  imageUrl,
  caption,
}: {
  format: PreviewFormat;
  imageUrl: string;
  caption: string;
}) => (
  <div className="absolute inset-0 flex flex-col bg-black text-white">
    {/* Top tabs */}
    <div className="flex items-center justify-between px-4 pt-12 pb-2">
      <ChevronLeft className="h-5 w-5" />
      <div className="flex items-center gap-4">
        <span className="text-[12px] text-white/50">Seguindo</span>
        <span className="text-[12px] font-semibold border-b-2 border-white pb-0.5">Para você</span>
      </div>
      <Search className="h-5 w-5" />
    </div>

    {/* Image */}
    <div className="w-full">
      <img src={imageUrl} alt="Preview" className={cn("w-full object-cover", aspectClass[format])} />
    </div>

    {/* Right action column — overlaid on image area */}
    <div className="absolute right-3 flex flex-col items-center gap-4" style={{ top: "45%" }}>
      <div className="relative">
        <div className="h-9 w-9 rounded-full bg-white/20 backdrop-blur border-2 border-white flex items-center justify-center">
          <span className="text-[8px] font-bold">MI</span>
        </div>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-rose-500 flex items-center justify-center">
          <Plus className="h-2.5 w-2.5" />
        </div>
      </div>
      <button className="flex flex-col items-center gap-0.5">
        <Heart className="h-6 w-6" fill="white" />
        <span className="text-[9px]">18.2k</span>
      </button>
      <button className="flex flex-col items-center gap-0.5">
        <MessageCircle className="h-6 w-6" />
        <span className="text-[9px]">342</span>
      </button>
      <button className="flex flex-col items-center gap-0.5">
        <Bookmark className="h-6 w-6" />
        <span className="text-[9px]">1.2k</span>
      </button>
      <button className="flex flex-col items-center gap-0.5">
        <Share2 className="h-6 w-6" />
        <span className="text-[9px]">Share</span>
      </button>
    </div>

    {/* Bottom description */}
    <div className="px-4 pt-2 pr-16">
      <p className="text-[12px] font-semibold mb-0.5">@midianita.app</p>
      {caption && (
        <p className="text-[11px] text-white/80 leading-relaxed line-clamp-2">{caption}</p>
      )}
      <div className="flex items-center gap-2 mt-1.5">
        <Music className="h-3 w-3 text-white/60" />
        <p className="text-[10px] text-white/60">🎵 Som original — midianita.app</p>
      </div>
    </div>

    {/* Bottom nav */}
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around py-3 bg-black border-t border-white/5">
      <Home className="h-5 w-5" />
      <Search className="h-5 w-5 text-white/40" />
      <div className="h-7 w-9 rounded-md bg-gradient-to-r from-cyan-400 to-rose-400 flex items-center justify-center">
        <Plus className="h-4 w-4 text-black" />
      </div>
      <MessageCircle className="h-5 w-5 text-white/40" />
      <User className="h-5 w-5 text-white/40" />
    </div>
  </div>
);

/* Facebook Feed Layout */
const FacebookFeedLayout = ({
  format,
  imageUrl,
  caption,
}: {
  format: PreviewFormat;
  imageUrl: string;
  caption: string;
}) => (
  <div className="absolute inset-0 flex flex-col bg-[#1c1e21] text-white">
    {/* Top bar */}
    <div className="flex items-center justify-between px-3 pt-12 pb-2 bg-[#242526]">
      <span className="text-[14px] font-bold text-blue-500">facebook</span>
      <div className="flex items-center gap-3">
        <Plus className="h-5 w-5 text-white/70" />
        <Search className="h-5 w-5 text-white/70" />
        <MessageCircle className="h-5 w-5 text-white/70" />
      </div>
    </div>

    {/* Post header */}
    <div className="flex items-center gap-2.5 px-3 py-2.5">
      <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center">
        <span className="text-[10px] font-bold">MI</span>
      </div>
      <div>
        <p className="text-[12px] font-semibold">Midianita App</p>
        <p className="text-[10px] text-white/40">2h · 🌐</p>
      </div>
      <MoreHorizontal className="h-5 w-5 text-white/50 ml-auto" />
    </div>

    {/* Caption above image */}
    {caption && (
      <p className="px-3 pb-2 text-[12px] text-white/80 leading-relaxed line-clamp-2">{caption}</p>
    )}

    {/* Image */}
    <div className="w-full">
      <img src={imageUrl} alt="Preview" className={cn("w-full object-cover", aspectClass[format])} />
    </div>

    {/* Reactions bar */}
    <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10">
      <div className="flex items-center gap-1">
        <span className="text-sm">👍❤️</span>
        <span className="text-[10px] text-white/50">324</span>
      </div>
      <span className="text-[10px] text-white/40">42 comments · 12 shares</span>
    </div>

    {/* Action buttons */}
    <div className="flex items-center justify-around px-2 py-2 border-b border-white/10">
      <button className="flex items-center gap-1.5">
        <ThumbsUp className="h-5 w-5 text-white/60" />
        <span className="text-[11px] text-white/60">Like</span>
      </button>
      <button className="flex items-center gap-1.5">
        <MessageCircle className="h-5 w-5 text-white/60" />
        <span className="text-[11px] text-white/60">Comment</span>
      </button>
      <button className="flex items-center gap-1.5">
        <Share2 className="h-5 w-5 text-white/60" />
        <span className="text-[11px] text-white/60">Share</span>
      </button>
    </div>

    {/* Bottom nav */}
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around py-3 bg-[#242526] border-t border-white/10">
      <Home className="h-5 w-5 text-blue-500" />
      <Film className="h-5 w-5 text-white/40" />
      <ShoppingBag className="h-5 w-5 text-white/40" />
      <MessageCircle className="h-5 w-5 text-white/40" />
      <User className="h-5 w-5 text-white/40" />
    </div>
  </div>
);

const ContentLayer = ({
  format,
  imageUrl,
  caption,
  platform,
}: {
  format: PreviewFormat;
  imageUrl: string;
  caption: string;
  platform: Platform;
}) => {
  if (format === "story") {
    return <img src={imageUrl} alt="Preview" className="absolute inset-0 h-full w-full object-cover" />;
  }

  if (platform === "tiktok") return <TikTokFeedLayout format={format} imageUrl={imageUrl} caption={caption} />;
  if (platform === "facebook") return <FacebookFeedLayout format={format} imageUrl={imageUrl} caption={caption} />;
  return <InstagramFeedLayout format={format} imageUrl={imageUrl} caption={caption} />;
};

/* ──────────────────────────────────────────────
   Main Modal
   ────────────────────────────────────────────── */
const SocialPreviewModal = ({
  open,
  onClose,
  imageUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
}: SocialPreviewModalProps) => {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [format, setFormat] = useState<PreviewFormat>("story");
  const [showOverlay, setShowOverlay] = useState(true);
  const [caption, setCaption] = useState("");

  if (!open) return null;

  const showPlatformOverlay = showOverlay && format === "story";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-sm">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 rounded-full bg-white/10 p-2 text-white/60 hover:bg-white/20 hover:text-white transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="flex w-full max-w-[1100px] gap-8 px-6">
        {/* ── Left Controls ─────────────────────── */}
        <div className="flex w-72 shrink-0 flex-col gap-5 py-4 overflow-y-auto max-h-[90vh] pr-1">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Social Preview</h2>
            <p className="text-sm text-slate-400">
              Verifique como seu design aparece nas redes sociais.
            </p>
          </div>

          {/* Platform Switcher */}
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Plataforma
            </label>
            <div className="flex rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={cn(
                    "flex-1 rounded-lg py-2 text-xs font-medium transition-all",
                    platform === p.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Format Grid */}
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Formato
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {FORMATS.map((f) => {
                const Icon = f.icon;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-lg border px-2 py-2.5 text-[10px] font-medium transition-all",
                      format === f.id
                        ? "border-blue-500/50 bg-blue-600/15 text-blue-400"
                        : "border-white/[0.06] bg-white/[0.02] text-slate-500 hover:text-slate-300 hover:border-white/[0.12]"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Show Overlay Toggle */}
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Visibilidade
            </label>
            <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
              <div>
                <p className="text-sm text-white">Show UI Overlay</p>
                <p className="text-[11px] text-slate-500">Ícones nativos da plataforma</p>
              </div>
              <Switch
                checked={showOverlay}
                onCheckedChange={setShowOverlay}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
            {showOverlay && format !== "story" && (
              <p className="mt-1.5 text-[10px] text-amber-400/70">
                Overlay visível apenas no formato Story.
              </p>
            )}
          </div>

          {/* Caption */}
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Legenda Preview
            </label>
            <Textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Digite uma legenda para testar…"
              className="min-h-[90px] resize-none rounded-xl border-white/[0.08] bg-white/[0.03] text-sm text-slate-300 placeholder:text-slate-600 focus-visible:ring-blue-600/40"
            />
            <p className="mt-1 text-right text-[10px] text-slate-600">
              {caption.length}/2200
            </p>
          </div>

          {/* Safe Zone Warning */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-4">
            <p className="text-xs font-semibold text-amber-400 mb-1">⚠️ Zona Segura</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Elementos importantes devem estar no centro do design. As bordas superior e inferior são cobertas por botões da plataforma.
            </p>
          </div>
        </div>

        {/* ── Right — Static Phone Frame ────────── */}
        <div className="flex flex-1 items-center justify-center">
          <div className="relative">
            {/* STATIC phone frame — never changes size */}
            <div
              className="relative overflow-hidden rounded-[3rem] border-[8px] border-gray-800 bg-black shadow-2xl shadow-black/60"
              style={{ width: 340, height: 700 }}
            >
              {/* Notch */}
              <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2">
                <div className="h-7 w-[120px] rounded-b-2xl bg-black" />
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-1.5 left-1/2 z-30 -translate-x-1/2">
                <div className="h-[5px] w-[120px] rounded-full bg-white/15" />
              </div>

              {/* Dynamic content layer */}
              <ContentLayer format={format} imageUrl={imageUrl} caption={caption} platform={platform} />

              {/* Platform overlays — only shown on Story format */}
              {showPlatformOverlay && platform === "instagram" && (
                <InstagramOverlay caption={caption} />
              )}
              {showPlatformOverlay && platform === "tiktok" && (
                <TikTokOverlay caption={caption} />
              )}
              {showPlatformOverlay && platform === "facebook" && (
                <FacebookOverlay caption={caption} />
              )}
            </div>

            {/* Label beneath phone */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="rounded-full bg-white/5 border border-white/[0.08] px-4 py-1.5 text-xs text-slate-400 capitalize">
                {platform} • {FORMATS.find((f) => f.id === format)?.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPreviewModal;
