import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/services-data";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactBlock } from "@/components/ContactBlock";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { canonicalHead } from "@/lib/site";
import { breadcrumbSchema, serviceListSchema } from "@/lib/structured-data";

const TITLE = "Ритуальні послуги у Києві — повний перелік | Ритуал 24";
const DESCRIPTION =
  "Ритуальні послуги в Києві та області: організація похорону під ключ, кремація, морг, вантаж 200, репатріація, труни, вінки, догляд за могилами. Цілодобово.";

export const Route = createFileRoute("/poslugy/")({
  head: () => {
    const canonical = canonicalHead("/poslugy");
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
  component: PoslugyIndex,
});

function PoslugyIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={serviceListSchema(SERVICES)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Головна", path: "/" },
          { name: "Послуги", path: "/poslugy" },
        ])}
      />
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <Breadcrumbs
          crumbs={[
            { name: "Головна", path: "/" },
            { name: "Послуги", path: "/poslugy" },
          ]}
        />
        <div className="mt-6 text-xs uppercase tracking-[0.4em] text-primary">— Наш каталог</div>
        <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.05]">Десять напрямків роботи</h1>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Усе, що може знадобитися родині, — під одним дахом. Один номер, один куратор, одна відповідальність.
        </p>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to="/poslugy/$slug"
              params={{ slug: s.slug }}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm border hairline bg-card"
            >
              <img src={s.heroImage} alt={s.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-110 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-6">
                <div className="font-display text-2xl md:text-3xl leading-tight max-w-[80%]">{s.title}</div>
                <ArrowUpRight size={20} className="absolute right-5 top-5 text-foreground/70 transition group-hover:text-primary group-hover:rotate-45" />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ContactBlock />
      <SiteFooter />
    </div>
  );
}