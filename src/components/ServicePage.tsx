import { useState } from "react";
import { ArrowRight, Plus, Minus, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ContactBlock } from "./ContactBlock";
import type { ServiceConfig } from "@/lib/services-data";

export function ServicePage({ service }: { service: ServiceConfig }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader floating />

      {/* HERO */}
      <section className="relative isolate overflow-hidden grain pt-[120px]">
        <div className="absolute inset-0 -z-10">
          <img src={service.heroImage} alt="" className="h-full w-full object-cover object-center slow-pan" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-vignette)" }} />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-12 lg:pb-32 lg:pt-24 reveal">
          <div className="grid gap-12 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <div className="mb-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
                <span className="h-px w-8 bg-primary/60" /> послуги
              </div>
              <h1 className="font-display text-5xl leading-[1.05] md:text-7xl">{service.title}</h1>
            </div>
            <p className="md:col-span-5 text-muted-foreground text-base leading-relaxed">{service.intro}</p>
          </div>
          <div className="mt-10">
            <a href="#contact" className="group inline-flex items-center gap-3 rounded-sm bg-primary px-8 py-4 text-xs uppercase tracking-[0.22em] text-primary-foreground hover:gap-5 transition-all">
              {service.ctaLabel ?? "Зателефонуйте мені"} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="border-y hairline">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <div className="grid gap-12 md:grid-cols-12">
            <h2 className="md:col-span-4 font-display text-4xl md:text-5xl leading-tight">Як це відбувається</h2>
            <ol className="md:col-span-8 divide-y hairline">
              {service.steps.map((s, i) => (
                <li key={i} className="grid grid-cols-[auto,1fr] gap-8 py-6 border-t first:border-t-0 hairline">
                  <span className="font-display text-3xl text-primary tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[15px] text-muted-foreground self-center max-w-2xl">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* INCLUDES */}
      <IncludesSection service={service} />

      {/* ASSORTMENT (optional) */}
      {service.assortment && <AssortmentSection assortment={service.assortment} />}

      {/* FAQ */}
      <FaqSection items={service.faq} />

      {/* CONTACT BLOCK */}
      <ContactBlock activeSlug={service.slug} leadCopy={`Залишилось питання або хочете замовити ${service.shortTitle.toLowerCase()}? Залиште заявку — зателефонуємо.`} />

      <SiteFooter />
    </div>
  );
}

function IncludesSection({ service }: { service: ServiceConfig }) {
  const { includes } = service;
  const light = includes.light;
  return (
    <section
      className={light ? "bg-[color:var(--paper)] text-[color:var(--paper-foreground)]" : ""}
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12 items-end">
          <div className="md:col-span-6">
            <h2 className="font-display text-4xl md:text-5xl leading-tight">{includes.title}</h2>
            {includes.intro && (
              <p className={`mt-5 max-w-xl ${light ? "text-[color:var(--paper-muted)]" : "text-muted-foreground"}`}>
                {includes.intro}
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-12">
          {includes.lead && (
            <div className={`md:col-span-4 rounded-sm p-7 flex flex-col justify-between ${light ? "bg-foreground/5 border" : "bg-card border hairline"}`} style={light ? { borderColor: "var(--paper-border)" } : undefined}>
              <div>
                <div className="font-display text-2xl leading-snug">{includes.lead.title}</div>
                <ul className="mt-5 space-y-2 text-sm">
                  {includes.lead.lines.map((l) => (
                    <li key={l} className={`flex gap-2 ${light ? "text-[color:var(--paper-muted)]" : "text-muted-foreground"}`}>
                      <span className="text-primary">•</span> {l}
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#contact" className="mt-8 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-xs uppercase tracking-[0.22em] text-primary-foreground hover:opacity-90 transition">
                Викликати агента
              </a>
            </div>
          )}

          <div className={`grid gap-3 sm:grid-cols-2 ${includes.lead ? "md:col-span-8" : "md:col-span-12 md:grid-cols-4"}`}>
            {includes.cards.map((c, i) => (
              <article
                key={i}
                className={`rounded-sm p-6 transition hover:-translate-y-0.5 ${light ? "bg-foreground/5 border hover:border-primary" : "bg-card border hairline hover:border-primary"}`}
                style={light ? { borderColor: "var(--paper-border)" } : undefined}
              >
                <div className="text-xs uppercase tracking-[0.25em] text-primary">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-3 font-display text-xl leading-snug">{c.title}</div>
                {c.bullets.length > 0 && (
                  <ul className={`mt-3 space-y-1 text-sm ${light ? "text-[color:var(--paper-muted)]" : "text-muted-foreground"}`}>
                    {c.bullets.map((b) => (
                      <li key={b} className="flex gap-2"><span className="text-primary">•</span> {b}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AssortmentSection({ assortment }: { assortment: NonNullable<ServiceConfig["assortment"]> }) {
  return (
    <section className="border-t hairline">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="text-xs uppercase tracking-[0.4em] text-primary">— Каталог</div>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">{assortment.title}</h2>
        <p className="mt-4 max-w-xl text-muted-foreground">{assortment.intro}</p>

        <div className={`mt-12 grid gap-4 ${assortment.items.length === 3 ? "md:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
          {assortment.items.map((it) => (
            <article key={it.title} className="group relative overflow-hidden rounded-sm border hairline bg-card">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={it.img} alt={it.title} loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-110 group-hover:opacity-100" />
              </div>
              <div className="p-5">
                <div className="font-display text-xl">{it.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{it.subtitle}</div>
              </div>
              <ArrowUpRight size={18} className="absolute right-4 top-4 text-foreground/70 transition group-hover:text-primary group-hover:rotate-45" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t hairline">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          <h2 className="md:col-span-4 font-display text-4xl md:text-5xl leading-tight">Поширені запитання</h2>
          <ul className="md:col-span-8 divide-y hairline border-t border-b hairline">
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <li key={i}>
                  <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                    <span className="text-[15px] md:text-base">{it.q}</span>
                    <span className="text-primary">{isOpen ? <Minus size={18} /> : <Plus size={18} />}</span>
                  </button>
                  {isOpen && <p className="pb-6 pr-10 text-sm text-muted-foreground max-w-3xl">{it.a}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}