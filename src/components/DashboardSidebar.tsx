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
    <aside className="flex h-screen w-[220px] shrink-0 flex-col border-r border-white/[0.06] bg-[#0d1117]">
      {/* Logo */}
      <div className="px-5 pt-6 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <span className="text-base font-bold text-white">Midianita</span>
            <p className="text-[11px] text-slate-500">AI Church Design</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-6 flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end={item.url === "/dashboard"}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white"
            activeClassName="bg-primary/15 text-primary font-medium"
          >
            <item.icon className="h-[18px] w-[18px]" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-white/[0.06] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {user?.name || "Min. Mídia"}
            </p>
            <p className="text-[11px] text-slate-500">Admin</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-500 hover:text-white transition-colors"
            title="Sair"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
