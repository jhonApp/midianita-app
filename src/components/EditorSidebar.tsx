import {
  Sparkles,
  LayoutGrid,
  Type,
  Image,
  Shapes,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type PanelId = "ai-magic" | "templates" | "text" | "media" | "elements";

interface ToolItem {
  id: PanelId;
  icon: typeof Sparkles;
  label: string;
}

const EDITOR_TOOLS: ToolItem[] = [
  { id: "ai-magic",   icon: Sparkles,    label: "IA Mágica"  },
  { id: "templates",  icon: LayoutGrid,  label: "Templates"  },
  { id: "text",       icon: Type,        label: "Texto"      },
  { id: "media",      icon: Image,       label: "Mídia"      },
  { id: "elements",   icon: Shapes,      label: "Elementos"  },
];

interface EditorSidebarProps {
  activePanel: PanelId;
  onPanelChange: (panel: PanelId) => void;
  onAddText?: () => void;
}

const EditorSidebar = ({ activePanel, onPanelChange, onAddText }: EditorSidebarProps) => {
  const handleClick = (tool: ToolItem) => {
    onPanelChange(tool.id);
    if (tool.id === "text") {
      onAddText?.();
    }
  };

  return (
    <div className="flex w-24 shrink-0 flex-col items-center border-r border-white/5 bg-[#0B0E14] py-6 gap-6">
      {/* Main Tools */}
      {EDITOR_TOOLS.map((item) => {
        const isActive = activePanel === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleClick(item)}
            className={cn(
              "flex flex-col items-center justify-center gap-2 rounded-xl px-3 py-3 transition-all w-20",
              isActive
                ? "bg-blue-600/10 text-blue-400"
                : "text-slate-500 hover:bg-white/5 hover:text-white"
            )}
            title={item.label}
          >
            <item.icon
              className="h-7 w-7"
              style={
                isActive
                  ? { filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))" }
                  : undefined
              }
            />
            <span
              className={cn(
                "text-[10px] font-medium uppercase tracking-wide text-center leading-tight",
                isActive ? "text-white" : "text-slate-500"
              )}
            >
              {item.label}
            </span>
          </button>
        );
      })}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer: Settings */}
      <button
        className="flex flex-col items-center justify-center gap-2 rounded-xl px-3 py-3 text-slate-500 transition-all hover:bg-white/5 hover:text-white w-20"
        title="Ajustes"
      >
        <Settings className="h-7 w-7" />
        <span className="text-[10px] font-medium uppercase tracking-wide text-center leading-tight">
          Ajustes
        </span>
      </button>
    </div>
  );
};

export default EditorSidebar;
