import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ALL_SERVICES_LINKS } from "@/lib/services-data";
import mourner from "@/assets/mourner.jpg";

function Field({ placeholder, type = "text", as = "input" }: { placeholder: string; type?: string; as?: "input" | "textarea" | "select" }) {
  const cls = "w-full rounded-sm border hairline bg-background/40 px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground/80 backdrop-blur-sm transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
  if (as === "textarea") return <textarea placeholder={placeholder} rows={4} className={cls} />;
  if (as === "select")
    return (
      <select className={`${cls} appearance-none`}>
        <option>{placeholder}</option>
        {ALL_SERVICES_LINKS.map((s) => <option key={s.slug}>{s.title}</option>)}
      </select>
    );
  return <input type={type} placeholder={placeholder} className={cls} />;
}

export function ContactBlock({ activeSlug, leadCopy }: { activeSlug?: string; leadCopy?: string }) {
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
          <form className="lg:col-span-7 space-y-3" onSubmit={(e) => e.preventDefault()}>
            <Field placeholder="Ваше ім'я" />
            <Field placeholder="Ваш телефон" type="tel" />
            <Field placeholder="Послуга" as="select" />
            <Field placeholder="Коментар" as="textarea" />
            <button type="submit" className="group mt-3 flex w-full items-center justify-between rounded-sm bg-primary px-6 py-5 text-xs uppercase tracking-[0.22em] text-primary-foreground hover:opacity-90 transition">
              <span>Зателефонуйте мені</span>
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