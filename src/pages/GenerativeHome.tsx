import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles, Church, Users, BookOpen, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Starter template cards
const STARTER_TEMPLATES = [
  {
    id: "sunday-service",
    title: "Sunday Service",
    description: "Create slides and social posts for worship and announcements.",
    icon: Church,
    gradient: "from-blue-500/20 to-purple-500/20",
    iconColor: "text-blue-400",
  },
  {
    id: "youth-event",
    title: "Youth Event",
    description: "Design high-energy flyers and stories for your youth ministry.",
    icon: Users,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    id: "verse-day",
    title: "Verse of the Day",
    description: "Generate beautiful scripture visuals for daily inspiration.",
    icon: BookOpen,
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
];

// Recent work items (placeholder data)
const RECENT_WORK = [
  {
    id: 1,
    title: "Sunday Worship Slides",
    thumbnail: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=300&fit=crop",
    date: "2 days ago",
  },
  {
    id: 2,
    title: "Youth Night Flyer",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop",
    date: "5 days ago",
  },
  {
    id: 3,
    title: "Psalm 23 Social",
    thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
    date: "1 week ago",
  },
  {
    id: 4,
    title: "Food Drive Banner",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop",
    date: "1 week ago",
  },
];

const GenerativeHome = () => {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGenerate = () => {
    if (prompt.trim()) {
      // Navigate to synthesis/loading state with the prompt
      navigate("/ai-synthesis", { state: { prompt } });
    }
  };

  const handleTemplateClick = (template: typeof STARTER_TEMPLATES[0]) => {
    // Pre-fill the prompt based on template
    const templatePrompts = {
      "sunday-service": "Create a modern worship slide for Sunday service",
      "youth-event": "Design a high-energy flyer for youth night event",
      "verse-day": "Generate a beautiful visual for Psalm 23:1",
    };
    setPrompt(templatePrompts[template.id as keyof typeof templatePrompts] || "");
  };

  return (
    <div className="flex-1 w-full h-full overflow-y-auto bg-[#0B0E14] scrollbar-custom">
      {/* Header */}
      <header className="border-b border-white/[0.06] px-8 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-foreground"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">Midianita</span>
          </div>

          {/* Nav Links & Avatar */}
          <div className="flex items-center gap-6">
            <button className="text-sm text-slate-400 hover:text-white transition-colors">
              Templates
            </button>
            <button className="text-sm text-slate-400 hover:text-white transition-colors">
              Library
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : "MM"}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-8">
            Design for <span className="text-blue-500">Ministry</span>
          </h1>

          {/* Glassmorphic Search Bar */}
          <div className="relative max-w-3xl mx-auto">
            <div className="relative flex items-center bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl hover:border-white/20 transition-colors">
              <Search className="absolute left-6 h-5 w-5 text-slate-500" />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="What are we designing for your ministry today?"
                className="flex-1 bg-transparent border-none outline-none pl-14 pr-4 py-4 text-base text-white placeholder:text-slate-500"
              />
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-white font-semibold transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                Generate
              </button>
            </div>
          </div>
        </div>

        {/* Starter Templates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {STARTER_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateClick(template)}
              className="group text-left p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05] transition-all"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${template.gradient} mb-4`}>
                <template.icon className={`h-6 w-6 ${template.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{template.title}</h3>
              <p className="text-sm text-slate-400">{template.description}</p>
            </button>
          ))}
        </div>

        {/* Recent Work */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm uppercase tracking-wider text-slate-500 font-semibold">
              RECENT WORK
            </h2>
            <button className="text-sm text-blue-500 hover:text-blue-400 transition-colors">
              View all
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {RECENT_WORK.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer rounded-xl overflow-hidden border border-white/[0.06] hover:border-white/20 transition-colors"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-800">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 bg-white/[0.02]">
                  <p className="text-sm font-medium text-white truncate">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.date}</p>
                </div>
              </div>
            ))}

            {/* New Project Card */}
            <button className="group rounded-xl border-2 border-dashed border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.05] transition-all aspect-[4/3] flex flex-col items-center justify-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors mb-3">
                <Plus className="h-6 w-6 text-slate-400 group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm text-slate-400 group-hover:text-white transition-colors font-medium">
                New Project
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GenerativeHome;
