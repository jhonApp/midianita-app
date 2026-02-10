import { useState, useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  type DragStartEvent,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  GripVertical,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  CalendarDays,
} from "lucide-react";
import { toast } from "sonner";

// --- Types ---
interface DraftItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  platform: string;
}

interface ScheduledPost {
  id: string;
  title: string;
  date: number; // day of month
  time: string;
  color: string;
}

// --- Mock Data ---
const INITIAL_DRAFTS: DraftItem[] = [
  {
    id: "draft-1",
    title: "Culto de Jovens",
    category: "Evento • Jovens",
    imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=200&h=200&fit=crop",
    platform: "Instagram",
  },
  {
    id: "draft-2",
    title: "Versículo do Dia",
    category: "Devocional • Feed",
    imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=200&h=200&fit=crop",
    platform: "Instagram",
  },
  {
    id: "draft-3",
    title: "Conferência 2024",
    category: "Evento • Story",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
    platform: "Instagram",
  },
  {
    id: "draft-4",
    title: "Louvor & Adoração",
    category: "Música • Reels",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop",
    platform: "TikTok",
  },
];

const INITIAL_SCHEDULED: ScheduledPost[] = [
  { id: "sched-1", title: "Culto Dominical", date: 5, time: "08:00", color: "bg-emerald-500" },
  { id: "sched-2", title: "Oração Online", date: 8, time: "20:00", color: "bg-blue-500" },
  { id: "sched-3", title: "Célula Jovens", date: 12, time: "19:30", color: "bg-violet-500" },
  { id: "sched-4", title: "Ensaio Louvor", date: 18, time: "18:00", color: "bg-amber-500" },
  { id: "sched-5", title: "Estudo Bíblico", date: 22, time: "20:00", color: "bg-emerald-500" },
  { id: "sched-6", title: "Live Worship", date: 26, time: "21:00", color: "bg-pink-500" },
];

const WEEKDAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const ACTIVITY = [
  { text: "Culto Dominical agendado para Dom, 08:00", time: "2h atrás" },
  { text: "Versículo do Dia publicado", time: "5h atrás" },
  { text: "Novo rascunho criado", time: "1 dia atrás" },
];

// --- Draggable Draft Card ---
function DraftCard({ item }: { item: DraftItem }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
    data: item,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 transition-all ${
        isDragging ? "opacity-40 scale-95" : "hover:border-white/10"
      }`}
    >
      <button
        {...listeners}
        {...attributes}
        className="cursor-grab text-slate-600 hover:text-slate-400 active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <img
        src={item.imageUrl}
        alt={item.title}
        className="h-10 w-10 rounded-lg object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{item.title}</p>
        <p className="text-[11px] uppercase tracking-wide text-slate-500">
          {item.category}
        </p>
      </div>
    </div>
  );
}

// --- Droppable Day Cell ---
function DayCell({
  day,
  isToday,
  isCurrentMonth,
  posts,
}: {
  day: number;
  isToday: boolean;
  isCurrentMonth: boolean;
  posts: ScheduledPost[];
}) {
  const droppableId = `day-${day}`;
  const { setNodeRef, isOver } = useDroppable({ id: droppableId });

  return (
    <div
      ref={setNodeRef}
      className={`relative min-h-[100px] border-b border-r border-white/[0.04] p-1.5 transition-colors ${
        !isCurrentMonth ? "opacity-30" : ""
      } ${isOver ? "bg-blue-500/10" : ""}`}
    >
      <span
        className={`mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${
          isToday
            ? "bg-primary font-bold text-primary-foreground"
            : "text-slate-400"
        }`}
      >
        {day}
      </span>

      {isOver && (
        <div className="absolute inset-1 flex items-center justify-center rounded-lg border-2 border-dashed border-blue-500/60 bg-blue-500/5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
            Solte para agendar
          </span>
        </div>
      )}

      <div className="space-y-1">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`flex items-center gap-1.5 rounded-md px-1.5 py-1 ${post.color}/15`}
          >
            <div className={`h-1.5 w-1.5 rounded-full ${post.color}`} />
            <span className="truncate text-[10px] font-medium text-slate-300">
              {post.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Drag Overlay Card ---
function DragOverlayCard({ item }: { item: DraftItem }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-[#0B0E14] p-3 shadow-2xl shadow-primary/20">
      <GripVertical className="h-4 w-4 text-primary" />
      <img
        src={item.imageUrl}
        alt={item.title}
        className="h-10 w-10 rounded-lg object-cover"
      />
      <div>
        <p className="text-sm font-medium text-white">{item.title}</p>
        <p className="text-[11px] uppercase tracking-wide text-slate-500">
          {item.category}
        </p>
      </div>
    </div>
  );
}

// --- Main Schedule Page ---
const Schedule = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [drafts, setDrafts] = useState<DraftItem[]>(INITIAL_DRAFTS);
  const [scheduled, setScheduled] = useState<ScheduledPost[]>(INITIAL_SCHEDULED);
  const [activeDraft, setActiveDraft] = useState<DraftItem | null>(null);
  const [view, setView] = useState<"month" | "week">("month");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Calendar grid computation
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days: { day: number; isCurrentMonth: boolean }[] = [];

    // Previous month padding
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isCurrentMonth: false });
    }
    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }
    // Next month padding
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }
    return days;
  }, [currentMonth, currentYear]);

  const isToday = (day: number, isCurrent: boolean) =>
    isCurrent &&
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const getPostsForDay = (day: number) =>
    scheduled.filter((p) => p.date === day);

  const handleDragStart = (event: DragStartEvent) => {
    const draft = drafts.find((d) => d.id === event.active.id);
    if (draft) setActiveDraft(draft);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDraft(null);
    const { active, over } = event;
    if (!over) return;

    const dayMatch = String(over.id).match(/^day-(\d+)$/);
    if (!dayMatch) return;

    const day = parseInt(dayMatch[1], 10);
    const draft = drafts.find((d) => d.id === active.id);
    if (!draft) return;

    // Remove from drafts
    setDrafts((prev) => prev.filter((d) => d.id !== draft.id));

    // Add to scheduled
    const colors = ["bg-emerald-500", "bg-blue-500", "bg-violet-500", "bg-amber-500", "bg-pink-500"];
    setScheduled((prev) => [
      ...prev,
      {
        id: draft.id,
        title: draft.title,
        date: day,
        time: "19:00",
        color: colors[Math.floor(Math.random() * colors.length)],
      },
    ]);

    toast.success(`Agendado com sucesso para ${day} de ${MONTHS[currentMonth]}!`, {
      description: draft.title,
    });
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-[calc(100vh-4rem)] gap-6">
        {/* Left - Drafts Dock */}
        <div className="w-72 shrink-0 space-y-4 overflow-y-auto">
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Rascunhos Pendentes
            </h2>
            <p className="text-xs text-slate-600">{drafts.length} itens</p>
          </div>

          <div className="space-y-2">
            {drafts.map((item) => (
              <DraftCard key={item.id} item={item} />
            ))}
            {drafts.length === 0 && (
              <p className="py-8 text-center text-xs text-slate-600">
                Nenhum rascunho pendente
              </p>
            )}
          </div>
        </div>

        {/* Center - Calendar */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Calendar Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={prevMonth}
                className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <h2 className="text-lg font-semibold text-white">
                {MONTHS[currentMonth]} {currentYear}
              </h2>
              <button
                onClick={nextMonth}
                className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex rounded-lg border border-white/[0.06] bg-white/[0.03]">
              {(["month", "week"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-1.5 text-xs font-medium transition-colors ${
                    view === v
                      ? "bg-white/10 text-white"
                      : "text-slate-500 hover:text-white"
                  }`}
                >
                  {v === "month" ? "Mês" : "Semana"}
                </button>
              ))}
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 border-b border-white/[0.06]">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="py-2 text-center text-[11px] font-semibold uppercase tracking-widest text-slate-500"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid flex-1 grid-cols-7 overflow-y-auto">
            {calendarDays.map((cell, i) => (
              <DayCell
                key={i}
                day={cell.day}
                isCurrentMonth={cell.isCurrentMonth}
                isToday={isToday(cell.day, cell.isCurrentMonth)}
                posts={cell.isCurrentMonth ? getPostsForDay(cell.day) : []}
              />
            ))}
          </div>
        </div>

        {/* Right - Widgets */}
        <div className="w-64 shrink-0 space-y-5 overflow-y-auto">
          {/* AI Suggestion */}
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.08] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-300">
                Sugestão IA
              </span>
            </div>
            <p className="text-sm text-slate-300">
              Melhor horário para postar: <strong className="text-white">Terça, 19:00</strong>
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Baseado no engajamento dos últimos 30 dias.
            </p>
            <button className="mt-3 w-full rounded-lg bg-indigo-500/20 py-2 text-xs font-semibold text-indigo-300 transition-colors hover:bg-indigo-500/30">
              Aplicar Sugestão
            </button>
          </div>

          {/* Goals */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Metas do Mês
            </h3>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <TrendingUp className="h-3 w-3" /> Engajamento
                  </span>
                  <span className="text-emerald-400">78%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06]">
                  <div className="h-full w-[78%] rounded-full bg-emerald-500" />
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Users className="h-3 w-3" /> Novos Seguidores
                  </span>
                  <span className="text-blue-400">45%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06]">
                  <div className="h-full w-[45%] rounded-full bg-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Atividade Recente
            </h3>
            <div className="space-y-3">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex gap-2.5">
                  <Clock className="mt-0.5 h-3 w-3 shrink-0 text-slate-600" />
                  <div>
                    <p className="text-xs text-slate-400">{a.text}</p>
                    <p className="text-[10px] text-slate-600">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeDraft ? <DragOverlayCard item={activeDraft} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Schedule;
