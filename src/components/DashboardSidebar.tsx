import { Home, Image, CalendarDays, Lightbulb, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Gallery", url: "/dashboard/gallery", icon: Image },
  { title: "Schedule", url: "/dashboard/schedule", icon: CalendarDays },
  { title: "Inspiration", url: "/dashboard/inspiration", icon: Lightbulb },
];

const DashboardSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.substring(0, 2).toUpperCase()
    : "MM";

  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-white/[0.06] bg-[#0d1117] py-8">
      {/* Logo */}
      <div className="px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <span className="text-2xl font-bold text-white">Midianita</span>
            <p className="text-xs text-slate-500">AI Church Design</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-8 flex-1 space-y-2 px-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end={item.url === "/dashboard"}
            className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white"
            activeClassName="bg-primary/15 text-primary font-semibold"
          >
            <item.icon className="h-6 w-6" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-white/10 pt-6 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-base font-semibold text-white">
              {user?.name || "Min. Mídia"}
            </p>
            <p className="text-sm text-slate-400">Admin</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-500 hover:text-white transition-colors"
            title="Sair"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
