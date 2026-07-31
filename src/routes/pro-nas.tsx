import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactBlock } from "@/components/ContactBlock";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { canonicalHead } from "@/lib/site";
import { aboutPageSchema, breadcrumbSchema } from "@/lib/structured-data";
import heroAngel from "@/assets/hero-angel.webp";

const TITLE = "Про нас — ритуальна служба у Києві | Ритуал 24 Берківці";
const DESCRIPTION =
  "Десять років поряд із родинами у найважчий час: понад 2000 родин, 28 кладовищ Києва, повний цикл ритуальних послуг і виїзд агента за 30 хвилин. Цілодобово.";

export const Route = createFileRoute("/pro-nas")({
  head: () => {
    const canonical = canonicalHead("/pro-nas");
    return {
      links: canonical.links,
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        ...canonical.meta,
      ],
    };
  },
  component: ProNas,
});

function ProNas() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={aboutPageSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Головна", path: "/" },
          { name: "Про нас", path: "/pro-nas" },
        ])}
      />
      <SiteHeader />
      <section className="relative isolate overflow-hidden grain">
        <div className="absolute inset-0 -z-10">
          <img src={heroAngel} alt="" className="h-full w-full object-cover slow-pan" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12 reveal">
          <Breadcrumbs
            crumbs={[
              { name: "Головна", path: "/" },
              { name: "Про нас", path: "/pro-nas" },
            ]}
          />
          <div className="mt-6 text-xs uppercase tracking-[0.4em] text-primary">— Про нас</div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[1.05] max-w-4xl">
            Десять років поряд із <em className="text-primary not-italic">тими</em>, кому найважче
          </h1>
        </div>
      </section>

      <section className="bg-[color:var(--paper)] text-[color:var(--paper-foreground)]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12 grid gap-12 md:grid-cols-12">
          <p className="md:col-span-7 font-display text-2xl md:text-3xl leading-snug">
            Десять років в Берківцях. Ми не починали цей бізнес з амбіції стати найбільшими — починали з того, щоб бути людьми, які прийдуть у найважчу мить.
          </p>
          <div className="md:col-span-5 grid grid-cols-2 gap-x-6 gap-y-10">
            {[
              ["10+", "років роботи"],
              ["28", "кладовищ Києва"],
              ["2000+", "родин"],
              ["30 хв", "середній виїзд"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-5xl md:text-6xl">{v}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.25em] text-[color:var(--paper-muted)]">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactBlock />
      <SiteFooter />
    </div>
  );
}