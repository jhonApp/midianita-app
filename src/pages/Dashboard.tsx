import { useState } from "react";
import {
  Plus,
  CalendarCheck,
  FileText,
  Heart,
  TrendingUp,
  MoreHorizontal,
  CalendarDays,
  Pencil,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const STATS = [
  {
    label: "Scheduled Posts",
    value: "8 Posts",
    sub: "📈 +2 this week",
    subColor: "text-emerald-400",
    icon: CalendarCheck,
    iconBg: "bg-emerald-500/15 text-emerald-400",
  },
  {
    label: "Drafts",
    value: "3 Drafts",
    sub: "🟠 Pending review",
    subColor: "text-amber-400",
    icon: FileText,
    iconBg: "bg-blue-500/15 text-blue-400",
  },
  {
    label: "Engagement",
    value: "+12%",
    sub: "📊 vs last month",
    subColor: "text-emerald-400",
    icon: Heart,
    iconBg: "bg-pink-500/15 text-pink-400",
  },
];

const TABS = ["Todos", "Agendados", "Pendentes", "Histórico"];

const WORKSPACE_ITEMS = [
  {
    title: "Culto de Jovens - Sábado",
    desc: "Venha participar do nosso encontro neste sábado às 19h.",
    badge: "Agendado",
    badgeColor: "bg-emerald-500",
    image:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&h=400&fit=crop",
    schedule: "Sat, 19:00",
  },
  {
    title: "Versículo do Dia",
    desc: "Design minimalista para Salmos 23.",
    badge: "Agendado",
    badgeColor: "bg-emerald-500",
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&h=400&fit=crop",
    schedule: "Sun, 08:00",
  },
  {
    title: "Conferência 2024",
    desc: "Adaptação do banner principal para story.",
    badge: "Rascunho",
    badgeColor: "bg-amber-500",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop",
    isDraft: true,
  },
];

const INSPIRATIONS = [
  "https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&h=500&fit=crop",
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Todos");
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Olá, {user?.name || "Ministério de Mídia"} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Here's what's happening with your church's socials today.
          </p>
        </div>
        <button onClick={() => navigate("/editor")} className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Create New
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">{stat.label}</span>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.iconBg}`}
              >
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
            <p className={`mt-1 text-xs ${stat.subColor}`}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* My Workspace */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">My Workspace</h2>
          <button className="text-sm text-primary hover:underline">
            View all
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WORKSPACE_ITEMS.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03]"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-44 w-full object-cover"
                />
                <span
                  className={`absolute right-3 top-3 rounded-md px-2.5 py-1 text-[11px] font-semibold text-white ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{item.desc}</p>

                {item.isDraft ? (
                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary/15 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/25">
                    <Pencil className="h-3.5 w-3.5" />
                    Continuar Editando
                  </button>
                ) : (
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {item.schedule}
                    </div>
                    <button className="text-slate-500 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inspirations */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Inspirações da Comunidade
          </h2>
          <div className="flex items-center gap-3">
            <button className="text-slate-500 hover:text-white">
              <SlidersHorizontal className="h-4 w-4" />
            </button>
            <button className="text-slate-500 hover:text-white">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {INSPIRATIONS.map((src, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl"
            >
              <img
                src={src}
                alt=""
                className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
