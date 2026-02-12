import { useState } from "react";
import {
  Plus,
  Sparkles,
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
    value: "8",
    sub: "+2 this week",
    subColor: "text-emerald-400",
    icon: CalendarCheck,
    iconBg: "bg-emerald-500/15 text-emerald-400",
  },
  {
    label: "Drafts",
    value: "3",
    sub: "Pending review",
    subColor: "text-amber-400",
    icon: FileText,
    iconBg: "bg-blue-500/15 text-blue-400",
  },
  {
    label: "Engagement",
    value: "+12%",
    sub: "vs last month",
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
    <div className="flex-1 w-full max-w-[1800px] mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            Olá, {user?.name || "Ministério de Mídia"} <span className="text-5xl">👋</span>
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            Here's what's happening with your church's socials today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Primary: AI Creation Button */}
          <button 
            onClick={() => navigate("/ai-create")} 
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 h-12 text-base font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
          >
            <Sparkles className="h-5 w-5" />
            ✨ Criar com IA
          </button>
          
          {/* Secondary: Blank Canvas Button */}
          <button 
            onClick={() => navigate("/editor")} 
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-transparent px-6 h-12 text-base font-semibold text-white transition-colors hover:bg-white/5"
          >
            <Plus className="h-5 w-5" />
            Criar em Branco
          </button>
        </div>
      </div>

      {/* Stats - KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="relative rounded-2xl border border-white/[0.06] bg-[#1c1f26] p-8 overflow-hidden"
          >
            {/* Background Icon */}
            <div className="absolute top-4 right-4 opacity-10">
              <stat.icon className="h-24 w-24" />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm uppercase tracking-wider text-slate-400 font-medium">
                  {stat.label}
                </span>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-5xl font-bold text-white mb-2">{stat.value}</p>
              <p className={`text-base ${stat.subColor}`}>{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* My Workspace */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">My Workspace</h2>
          <button className="text-base text-primary hover:underline">
            View all
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {WORKSPACE_ITEMS.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#1c1f26] hover:border-white/10 transition-colors"
            >
              <div className="relative aspect-video">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute right-3 top-3 rounded-md px-3 py-1.5 text-xs font-semibold text-white ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.desc}</p>

                {item.isDraft ? (
                  <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary/15 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/25">
                    <Pencil className="h-4 w-4" />
                    Continuar Editando
                  </button>
                ) : (
                  <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      {item.schedule}
                    </div>
                    <button className="text-slate-500 hover:text-white">
                      <MoreHorizontal className="h-5 w-5" />
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
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Inspirações da Comunidade
          </h2>
          <div className="flex items-center gap-3">
            <button className="text-slate-500 hover:text-white">
              <SlidersHorizontal className="h-5 w-5" />
            </button>
            <button className="text-slate-500 hover:text-white">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {INSPIRATIONS.map((src, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-white/[0.06] hover:border-white/10 transition-colors"
            >
              <img
                src={src}
                alt=""
                className="w-full h-full aspect-[4/5] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
