import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Головна" },
  { to: "/pro-nas", label: "Про нас" },
  { to: "/poslugy", label: "Послуги" },
  { to: "/", label: "Контакти", hash: "#contacts" },
];

/**
 * Contrast note: this strip used muted-foreground at 11px, uppercase, with
 * 0.3em tracking. That colour is 5.3:1 on the background — technically AA, but
 * at that size and letter-spacing it read as washed out. Legibility here is
 * three things at once, so all three changed: colour to foreground/75 (8.7:1),
 * 11px to 12px, and tracking 0.3em to 0.2em.
 *
 * The phone number is the page's primary conversion path for a grieving caller,
 * so it is deliberately the loudest element in the strip: accent colour
 * (7.7:1), larger, medium weight and near-normal tracking, since wide tracking
 * makes digit groups hard to scan.
 */
export function TopBanner() {
  return (
    <div className="border-b hairline bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 text-xs uppercase tracking-[0.2em] text-foreground/90 lg:px-12">
        <div>м. Київ, вул. Стеценка, 18</div>
        <div className="hidden md:block">
          <span className="h-1.5 w-1.5 mr-2 inline-block rounded-full bg-primary animate-pulse" />
          Цілодобово на зв'язку
        </div>
        <div className="flex items-center gap-4">
          <a
            href="tel:+380672723377"
            className="whitespace-nowrap text-[13px] font-medium tracking-[0.1em] text-primary transition hover:text-foreground"
          >
            +38 (067) 272 33 77
          </a>
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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-5 lg:px-12">
        <Link to="/" className="flex items-baseline gap-2 font-display text-2xl leading-none shrink-0">
          <span>Ритуал<span className="text-primary">24</span></span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/85">Берківці</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.18em]">
          {NAV.map((n, i) => (
            <Link
              key={i}
              to={n.to}
              hash={n.hash?.slice(1)}
              className="text-foreground hover:text-primary transition"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <a href="tel:+380672723377" className="hidden md:inline-flex shrink-0 items-center gap-2 rounded-sm border hairline px-4 py-2.5 text-xs uppercase tracking-[0.18em] hover:border-primary hover:text-primary transition">
          <Phone size={14} /> Зателефонувати
        </a>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground/80" aria-label="Меню">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t hairline bg-background/95 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4 text-sm uppercase tracking-[0.22em]">
            {NAV.map((n, i) => (
              <Link key={i} to={n.to} hash={n.hash?.slice(1)} onClick={() => setOpen(false)} className="py-2 text-foreground hover:text-primary">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}