import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const NAV_LINKS = ["Funcionalidades", "Galeria", "Planos"];

const AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
];

const Landing = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0F]">
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] w-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,_hsl(225,80%,50%,0.12),_hsl(270,60%,40%,0.06),_transparent_70%)] blur-3xl" />
      </div>

      {/* ─── NAV ─── */}
      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-foreground"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">Midianita</span>
        </Link>

        {/* Center links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden text-sm text-slate-400 transition-colors hover:text-white sm:block"
          >
            Entrar
          </Link>
          <Link
            to="/login"
            className="relative rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.06]"
          >
            {/* Glow border effect */}
            <span className="pointer-events-none absolute -inset-px rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-60 blur-sm" />
            <span className="relative">Começar Grátis</span>
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <main className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-20 pb-32 text-center sm:pt-28">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </span>
          <span className="text-sm text-slate-300">
            Nova IA Generativa v2.0
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
            Design Profissional para sua Igreja em Segundos.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          Diga adeus à tela em branco. A primeira IA treinada para criar artes
          de cultos, eventos e versículos.
        </p>

        {/* CTA Buttons */}
        <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row">
          <button className="relative rounded-xl border border-white/10 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.1]">
            <span className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-60 blur-sm" />
            <span className="relative">Criar minha primeira arte</span>
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-7 py-3.5 text-sm font-medium text-slate-300 transition-all hover:border-white/20 hover:text-white">
            <Play className="h-4 w-4 fill-current" />
            Ver demo
          </button>
        </div>

        {/* Social Proof */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2.5">
            {AVATARS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-9 w-9 rounded-full border-2 border-[#0A0A0F] object-cover"
              />
            ))}
          </div>
          <span className="text-sm text-slate-400">
            Usado por{" "}
            <span className="font-medium text-slate-300">+500 ministérios</span>
          </span>
        </div>
      </main>
    </div>
  );
};

export default Landing;
