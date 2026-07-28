import { useState, type SyntheticEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { ALL_SERVICES_LINKS } from "@/lib/services-data";
import mourner from "@/assets/mourner.jpg";

const FIELD_CLASS =
  "w-full rounded-sm border hairline bg-background/40 px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground/80 backdrop-blur-sm transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

type Lead = { name: string; phone: string; service: string; comment: string };

const emptyLead = (service = ""): Lead => ({ name: "", phone: "", service, comment: "" });

export function ContactBlock({ activeSlug, leadCopy }: { activeSlug?: string; leadCopy?: string }) {
  // On a service page the relevant service is preselected, so the lead arrives
  // already labelled without the visitor picking it again.
  const defaultService = ALL_SERVICES_LINKS.find((s) => s.slug === activeSlug)?.title ?? "";
  const [lead, setLead] = useState<Lead>(() => emptyLead(defaultService));
  // Honeypot: invisible to humans, bots fill it; the server drops those silently.
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);

  const set = <K extends keyof Lead>(key: K, value: Lead[K]) =>
    setLead((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...lead,
          website,
          page: typeof window === "undefined" ? "" : window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast.success("Дякуємо! Ми зателефонуємо вам найближчим часом.");
      setLead(emptyLead(defaultService));
    } catch {
      toast.error("Не вдалося надіслати заявку. Зателефонуйте нам: +38 (044) 209 11 75");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={mourner} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-background/90" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-vignette)" }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
        <div className="text-xs uppercase tracking-[0.4em] text-primary">— Зворотний зв'язок</div>
        <h2 className="mt-4 font-display text-4xl md:text-5xl max-w-2xl">
          {leadCopy ?? "Залиште номер — зателефонуємо за 15 хвилин"}
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <form onSubmit={onSubmit} className="lg:col-span-7 space-y-3">
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <input
              required
              placeholder="Ваше ім'я"
              value={lead.name}
              onChange={(e) => set("name", e.target.value)}
              className={FIELD_CLASS}
            />
            <input
              required
              type="tel"
              placeholder="Ваш телефон"
              value={lead.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={FIELD_CLASS}
            />
            <select
              value={lead.service}
              onChange={(e) => set("service", e.target.value)}
              className={`${FIELD_CLASS} appearance-none`}
            >
              <option value="">Послуга</option>
              {ALL_SERVICES_LINKS.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
            <textarea
              rows={4}
              placeholder="Коментар"
              value={lead.comment}
              onChange={(e) => set("comment", e.target.value)}
              className={FIELD_CLASS}
            />
            <button
              type="submit"
              disabled={sending}
              className="group mt-3 flex w-full items-center justify-between rounded-sm bg-primary px-6 py-5 text-xs uppercase tracking-[0.22em] text-primary-foreground hover:opacity-90 transition disabled:opacity-60 disabled:pointer-events-none"
            >
              <span>{sending ? "Надсилаємо…" : "Зателефонуйте мені"}</span>
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </button>
          </form>

          <aside className="lg:col-span-5 rounded-sm bg-[color:var(--paper)] p-8 text-[color:var(--paper-foreground)]">
            <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--paper-muted)]">Наші послуги</div>
            <ul className="mt-5 divide-y" style={{ borderColor: "var(--paper-border)" }}>
              {ALL_SERVICES_LINKS.map((s) => {
                const active = s.slug === activeSlug;
                return (
                  <li key={s.slug} className="border-t first:border-t-0" style={{ borderColor: "var(--paper-border)" }}>
                    <Link
                      to="/poslugy/$slug"
                      params={{ slug: s.slug }}
                      className={`flex items-center justify-between py-3 text-[15px] transition hover:text-primary ${active ? "text-primary" : ""}`}
                    >
                      <span>{active ? "· " : ""}{s.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
