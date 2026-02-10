import { AnimatePresence, motion } from "framer-motion";
import { X, Share2, Download, Heart, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  prompt: string;
  tags: string[];
  date: string;
  format?: string;
  quality?: string;
  model?: string;
  palette?: string[];
}

interface ImageDetailModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

const ImageDetailModal = ({ item, onClose }: ImageDetailModalProps) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative flex w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white/70 transition-colors hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left — Image */}
          <div className="flex w-[60%] items-center justify-center bg-black p-6">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="max-h-[80vh] w-full rounded-lg object-contain"
            />
          </div>

          {/* Right — Details */}
          <div className="flex w-[40%] flex-col gap-5 overflow-y-auto bg-secondary p-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">{item.title}</h2>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {item.category} • {item.date}
                </p>
              </div>
              <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            {/* Prompt */}
            <div className="rounded-lg bg-background p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Prompt
                </span>
                <button className="text-muted-foreground hover:text-foreground">
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="font-mono text-sm italic leading-relaxed text-muted-foreground">
                {item.prompt}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Formato", value: item.format || "1080×1080" },
                { label: "Qualidade", value: item.quality || "Alta (HD)" },
                { label: "IA Modelo", value: item.model || "Midianita v2" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg bg-background p-3"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {stat.value}
                  </p>
                </div>
              ))}
              <div className="rounded-lg bg-background p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Paleta
                </p>
                <div className="mt-2 flex gap-1.5">
                  {(item.palette || ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B"]).map(
                    (color, i) => (
                      <span
                        key={i}
                        className="h-5 w-5 rounded-full border border-white/10"
                        style={{ backgroundColor: color }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-background px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-col gap-3">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Reutilizar este Estilo
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Baixar
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageDetailModal;
