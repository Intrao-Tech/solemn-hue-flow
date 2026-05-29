import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Головна" },
  { to: "/pro-nas", label: "Про нас", hash: "#about" },
  { to: "/poslugy", label: "Послуги", hash: "#catalog" },
  { to: "/", label: "Наші переваги", hash: "#about" },
  { to: "/", label: "Зворотний зв'язок", hash: "#contact" },
  { to: "/", label: "Контакти", hash: "#contacts" },
];

export function TopBanner() {
  return (
    <div className="border-b hairline bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground lg:px-12">
        <div>м. Київ, вул. Стеценка, 18</div>
        <div className="hidden md:block">
          <span className="h-1.5 w-1.5 mr-2 inline-block rounded-full bg-primary animate-pulse" />
          Цілодобово на зв'язку
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+380442091175" className="hover:text-primary transition">+38 (044) 209 11 75</a>
          <a href="tel:+380672723377" className="hidden sm:inline hover:text-primary transition">+38 (067) 272 33 77</a>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader({ floating = false }: { floating?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={floating ? "absolute inset-x-0 top-0 z-30" : "relative z-30 border-b hairline"}>
      <TopBanner />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <Link to="/" className="font-display text-2xl leading-none">
          Ритуал<span className="text-primary">24</span>
          <span className="ml-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">Березівці</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9 text-[12px] uppercase tracking-[0.22em]">
          {NAV.map((n, i) => (
            <Link
              key={i}
              to={n.to}
              hash={n.hash?.slice(1)}
              className="text-muted-foreground hover:text-primary transition"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <a href="tel:+380442091175" className="hidden md:inline-flex items-center gap-2 rounded-sm border hairline px-4 py-2.5 text-xs uppercase tracking-[0.22em] hover:border-primary hover:text-primary transition">
          <Phone size={14} /> Зателефонуйте мені
        </a>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground/80" aria-label="Меню">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t hairline bg-background/95 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4 text-sm uppercase tracking-[0.22em]">
            {NAV.map((n, i) => (
              <Link key={i} to={n.to} hash={n.hash?.slice(1)} onClick={() => setOpen(false)} className="py-2 text-muted-foreground hover:text-primary">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}