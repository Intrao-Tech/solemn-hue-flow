import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MapPin, Mail, Clock, UserCheck, KeyRound, ArrowRight, ArrowUpRight } from "lucide-react";
import heroAngel from "@/assets/hero-angel.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactBlock } from "@/components/ContactBlock";
import { SERVICES } from "@/lib/services-data";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader floating />

      {/* HERO */}
      <section className="relative isolate overflow-hidden grain">
        <div className="absolute inset-0 -z-10">
          <img src={heroAngel} alt="" className="h-full w-full object-cover object-center slow-pan" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-vignette)" }} />
        </div>

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-center px-6 pt-[140px] pb-16 text-center reveal">
          <div className="mb-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            <span className="h-px w-10 bg-primary/60" />
            повний комплекс ритуальних послуг
            <span className="h-px w-10 bg-primary/60" />
          </div>
          <h1 className="font-display text-5xl leading-[1.05] text-balance md:text-7xl lg:text-[5.5rem]">
            Ми нічого не можемо <em className="text-primary not-italic">змінити</em>,<br />
            ми можемо лише <em className="italic">допомогти</em>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-base text-muted-foreground">
            Цілодобова похоронна служба у Києві. Беремо на себе все — від першого дзвінка до поминальної трапези.
          </p>
          <a href="#contact" className="group mt-10 inline-flex items-center gap-3 rounded-sm bg-primary px-8 py-4 text-xs uppercase tracking-[0.22em] text-primary-foreground transition hover:gap-5">
            Замовити консультацію
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="border-y hairline">
        <div className="mx-auto grid max-w-7xl gap-px sm:grid-cols-3 px-6 lg:px-12">
          {[
            { icon: <Clock size={22} />, title: "Цілодобово 24/7", text: "Приймаємо дзвінки будь-якої години — без вихідних і свят." },
            { icon: <UserCheck size={22} />, title: "Виїзд агентства", text: "Безкоштовно прибуваємо за адресою. Виїзд протягом 30 хвилин." },
            { icon: <KeyRound size={22} />, title: "Все під ключ", text: "Від оформлення документів до поминального обіду — в одних руках." },
          ].map((f) => (
            <div key={f.title} className="px-2 py-10 sm:px-8 text-left">
              <div className="text-primary">{f.icon}</div>
              <div className="mt-4 font-display text-xl">{f.title}</div>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12 mb-14">
          <div className="md:col-span-5">
            <div className="text-xs uppercase tracking-[0.4em] text-primary">— Наш каталог</div>
            <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[1.05]">
              Дев'ять<br />напрямків роботи
            </h2>
          </div>
          <p className="md:col-span-7 md:pt-12 text-lg text-muted-foreground max-w-md">
            Усе, що може знадобитися родині, — під одним дахом. Без перекладання між підрядниками й між службами.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px]">
          {SERVICES.map((s, i) => {
            const sizes = [
              "row-span-2",
              "",
              "",
              "lg:col-span-2",
              "",
              "row-span-2",
              "",
              "",
              "lg:col-span-2",
            ];
            return (
              <Link
                key={s.slug}
                to="/poslugy/$slug"
                params={{ slug: s.slug }}
                className={`group relative overflow-hidden rounded-sm border hairline bg-card ${sizes[i] ?? ""}`}
              >
                <img src={s.heroImage} alt={s.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-110 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-5">
                  <div className="font-display text-xl md:text-2xl leading-tight pr-8">{s.shortTitle}</div>
                  <ArrowUpRight size={18} className="absolute right-4 top-4 text-foreground/70 transition group-hover:text-primary group-hover:rotate-45" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-[color:var(--paper)] text-[color:var(--paper-foreground)]">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">— Про нас</div>
          <div className="mt-8 grid gap-12 md:grid-cols-12">
            <p className="md:col-span-6 font-display text-2xl md:text-3xl leading-snug">
              Десять років в Берківцях. Ми не починали цей бізнес з амбіції стати найбільшими — починали з того, щоб бути людьми, які прийдуть у найважчу мить.
            </p>
            <div className="md:col-span-6 grid grid-cols-2 gap-x-6 gap-y-10">
              {[
                ["10+", "років роботи"],
                ["2000+", "родин, яким допомогли"],
                ["8", "кладовищ Києва"],
                ["30 хв", "середній час виїзду"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-6xl md:text-7xl">{v}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.25em] text-[color:var(--paper-muted)]">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-14 max-w-3xl text-[color:var(--paper-muted)]">
            Працюємо повним циклом — від першого виїзду до поминального обіду. Одна команда, одна відповідальність, один номер з підтримкою.
          </p>
        </div>
      </section>

      <ContactBlock />

      {/* CONTACTS */}
      <section id="contacts" className="relative mx-auto max-w-7xl px-6 py-28 lg:px-12">
        <div className="text-xs uppercase tracking-[0.4em] text-primary">— Контакти</div>
        <h2 className="mt-4 font-display text-4xl md:text-6xl">Завжди на зв'язку</h2>

        <div className="relative mt-12 overflow-hidden rounded-sm border hairline">
          <iframe
            title="Карта"
            src="https://www.openstreetmap.org/export/embed.html?bbox=30.42%2C50.46%2C30.52%2C50.50&layer=mapnik"
            className="h-[520px] w-full grayscale contrast-125 brightness-50"
            loading="lazy"
          />
          <div className="absolute left-4 top-4 sm:left-10 sm:top-10 max-w-sm rounded-sm bg-background/95 backdrop-blur border hairline p-8 shadow-[var(--shadow-elegant)]">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Контакти</div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex gap-3"><MapPin size={16} className="text-primary mt-0.5" /> м. Київ, вул. Стеценка, 18</div>
              <a href="tel:+380442091175" className="flex gap-3 hover:text-primary"><Phone size={16} className="text-primary mt-0.5" /> +38 (044) 209 11 75</a>
              <a href="tel:+380672723377" className="flex gap-3 hover:text-primary"><Phone size={16} className="text-primary mt-0.5" /> +38 (067) 272 33 77</a>
              <a href="mailto:ritualberkovtsy@gmail.com" className="flex gap-3 hover:text-primary"><Mail size={16} className="text-primary mt-0.5" /> ritualberkovtsy@gmail.com</a>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Працюємо цілодобово
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
