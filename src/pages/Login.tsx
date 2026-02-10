import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Star, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
const MASONRY_IMAGES_COL_1 = ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop"];
const MASONRY_IMAGES_COL_2 = ["https://images.unsplash.com/photo-1621574539437-4b7b480f6dd7?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1507643179173-39db3ffde235?q=80&w=1000&auto=format&fit=crop"];
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate("/dashboard", {
        replace: true
      });
    } else {
      toast.error("Credenciais inválidas");
    }
  };
  return <div className="flex min-h-screen bg-background">
      {/* --- LADO ESQUERDO: FORMULÁRIO --- */}
      <div className="relative flex w-full flex-col justify-center px-8 sm:px-16 lg:w-1/2 lg:px-24">
        {/* Logo Area */}
        <div className="mx-auto w-full max-w-md">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground">Midianita</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              Sua criatividade,
              <br />
              potencializada.
            </h1>
            <p className="text-muted-foreground">
              Acesse sua conta para criar designs incríveis para sua igreja em segundos com IA.
            </p>
          </div>

          {/* Google Button */}
          <button type="button" className="mb-6 flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-secondary px-4 py-3 font-medium text-foreground transition-colors hover:bg-secondary/80">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continuar com Google
          </button>

          {/* Divider */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium text-muted-foreground">ou entre com e-mail</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[hsl(var(--login-label))]">
                E-mail
              </label>
              <input id="email" type="email" placeholder="pastor@igreja.com" value={email} onChange={e => setEmail(e.target.value)} required className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-[hsl(var(--login-label))]">
                  Senha
                </label>
                <button type="button" className="text-sm text-primary hover:underline">
                  Esqueceu?
                </button>
              </div>
              <div className="relative">
                <input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required className="w-full rounded-xl border border-border bg-secondary px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50">
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              Entrar na Plataforma
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Ainda não tem uma conta?{" "}
            <button className="font-semibold text-foreground hover:underline">
              Cadastre-se
            </button>
          </p>
        </div>
      </div>

      {/* --- LADO DIREITO: VISUAL MASONRY GRID --- */}
      <div className="relative hidden overflow-hidden lg:block lg:w-1/2">
        {/* Glow Effects */}
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[128px]" />

        {/* Masonry Container */}
        <div className="flex h-full items-center justify-center p-8">
          <div className="-rotate-12 flex gap-6">
            {/* Coluna 1 */}
            <div className="-mt-24 flex flex-col gap-6">
              {MASONRY_IMAGES_COL_1.map((src, i) => <div key={i} className="relative overflow-hidden rounded-2xl shadow-2xl opacity-50">
                  <img src={src} alt="" className="h-72 w-56 object-cover" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
                </div>)}
            </div>

            {/* Coluna 2 */}
            <div className="mt-12 flex flex-col gap-6">
              {MASONRY_IMAGES_COL_2.map((src, i) => <div key={i} className="relative overflow-hidden rounded-2xl shadow-2xl opacity-50">
                  <img src={src} alt="" className="h-72 w-56 object-cover" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
                </div>)}
            </div>
          </div>
        </div>

        {/* Card Flutuante (Testimonial) */}
        <div className="absolute bottom-1/3 left-1/2 z-10 -translate-x-1/2">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/80 shadow-2xl backdrop-blur-xl px-[30px] py-[35px]">
            {/* Shine decorativo */}
            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />

            <div className="relative space-y-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="max-w-xs text-sm italic text-foreground/90">
                "Gerei a arte do culto de domingo em 30 segundos. A qualidade é impressionante."
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                  PM
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Pr. Marcos</p>
                  <p className="text-xs text-muted-foreground">Igreja Batista Central</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Login;