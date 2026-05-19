import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Menu, Search, ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import heroAngel from "@/assets/hero-angel.jpg";
import lilies from "@/assets/lilies.jpg";
import cemetery from "@/assets/cemetery.jpg";
import candle from "@/assets/candle.jpg";
import wreath from "@/assets/wreath.jpg";
import mourner from "@/assets/mourner.jpg";
import monument from "@/assets/monument.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  { title: "Кремація з гідністю", img: candle, tag: "01 / Кремація" },
  { title: "Кладовище під ключ", img: monument, tag: "02 / Поховання" },
  { title: "Організація похорону", img: cemetery, tag: "03 / Церемонія" },
  { title: "Послуги моргу", img: lilies, tag: "04 / Підготовка" },
  { title: "Поминальні обіди", img: wreath, tag: "05 / Пам'ять" },
];

function Index() {
  const [slide, setSlide] = useState(0);
  const next = () => setSlide((s) => (s + 1) % services.length);
  const prev = () => setSlide((s) => (s - 1 + services.length) % services.length);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative isolate overflow-hidden grain">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroAngel}
            alt="Кам'яний ангел"
            className="h-full w-full object-cover object-center slow-pan"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-vignette)" }} />
        </div>

        {/* Top bar */}
        <header className="relative z-10 mx-auto flex max-w-7xl items-start justify-between px-6 pt-8 lg:px-12">
          <div className="text-sm leading-tight tracking-wide">
            <div className="font-display text-lg">Ритуал<span className="text-primary">24</span> Березівці</div>
            <div className="text-muted-foreground text-xs uppercase tracking-[0.2em]">похоронна служба</div>
            <div className="mt-3 text-xs text-muted-foreground">м. Київ, вул. Стеценка, 18</div>
          </div>

          <div className="hidden md:block text-right text-sm">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Телефонуйте 24/7</div>
            <a href="tel:+380442091175" className="mt-2 block font-display text-xl text-foreground hover:text-primary transition-colors">+38 (044) 209 11 75</a>
            <a href="tel:+380672723377" className="block font-display text-xl text-foreground hover:text-primary transition-colors">+38 (067) 272 33 77</a>
          </div>

          <div className="flex flex-col gap-3 rounded-full border hairline bg-background/40 p-3 backdrop-blur-md">
            <button className="text-foreground/80 hover:text-primary transition" aria-label="Зателефонувати"><Phone size={18} /></button>
            <button className="text-foreground/80 hover:text-primary transition" aria-label="Меню"><Menu size={18} /></button>
            <button className="text-foreground/80 hover:text-primary transition" aria-label="Пошук"><Search size={18} /></button>
          </div>
        </header>

        {/* Hero copy */}
        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
          <div className="reveal">
            <div className="mb-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              <span className="h-px w-10 bg-primary/60" />
              з 2014 року поряд
              <span className="h-px w-10 bg-primary/60" />
            </div>
            <h1 className="font-display text-5xl leading-[1.05] text-balance md:text-7xl lg:text-8xl">
              Ми нічого не можемо <em className="text-primary not-italic">змінити</em>,<br />
              ми можемо лише <em className="italic">допомогти</em>
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-base text-muted-foreground">
              Цілодобова похоронна служба у Києві. Беремо на себе все — від першого дзвінка до поминальної трапези.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="#contact" className="group inline-flex items-center gap-3 rounded-sm bg-primary px-8 py-4 text-sm uppercase tracking-[0.2em] text-primary-foreground transition hover:gap-5">
                Замовити консультацію
                <ArrowRight size={16} className="transition" />
              </a>
              <a href="#catalog" className="text-sm uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition">Наш каталог →</a>
            </div>
          </div>
        </div>

        {/* Services slider */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 lg:px-12">
          <div className="flex items-end justify-between border-t hairline pt-8">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {String(slide + 1).padStart(2, "0")} <span className="mx-2 opacity-50">/</span> {String(services.length).padStart(2, "0")}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className="rounded-full border hairline p-3 hover:border-primary hover:text-primary transition"><ArrowLeft size={16} /></button>
              <button onClick={next} className="rounded-full border hairline p-3 hover:border-primary hover:text-primary transition"><ArrowRight size={16} /></button>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {services.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setSlide(i)}
                className={`group relative aspect-[4/5] overflow-hidden rounded-sm border transition-all duration-500 ${i === slide ? "border-primary scale-[1.02]" : "border-transparent hover:border-primary/50"}`}
              >
                <img src={s.img} alt={s.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" width={400} height={500} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{s.tag}</div>
                  <div className="mt-1 font-display text-lg leading-tight">{s.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="relative mx-auto max-w-7xl px-6 py-32 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-xs uppercase tracking-[0.4em] text-primary">— Наш каталог</div>
            <h2 className="mt-6 font-display text-5xl leading-[1.05] md:text-6xl">
              Дванадцять<br />напрямків роботи
            </h2>
          </div>
          <p className="md:col-span-7 md:pt-12 text-lg text-muted-foreground max-w-md">
            Усе, що може знадобитися родині — під одним дахом, без перекладання між підрядниками. Ми супроводжуємо понад дві тисячі родин на рік.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-3 md:grid-cols-3">
          <CatalogCard tag="Догляд" title="Догляд та прибирання могил" img={cemetery} />
          <CatalogCard tag="Монументи" title="Виготовлення пам'ятників" img={monument} large />
          <CatalogCard tag="Флористика" title="Траурні вінки та квіти" img={wreath} />
          <CatalogCard tag="Кремація" title="Кремація та урни" img={candle} />
          <CatalogCard tag="Місця" title="Місця на кладовищі та колумбарії" img={mourner} wide />
        </div>

        <a href="#contact" className="group mt-8 inline-flex items-center gap-3 rounded-sm border hairline px-6 py-3 text-sm uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition">
          Перейти до каталогу <ArrowUpRight size={16} className="transition group-hover:rotate-45" />
        </a>
      </section>

      {/* ABOUT */}
      <section className="border-y hairline bg-card/40">
        <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">— Про нас</div>
          <div className="mt-10 grid gap-12 md:grid-cols-12">
            <p className="md:col-span-5 font-display text-2xl leading-snug md:text-3xl">
              Десять років в Березівцях. Ми не починали цей бізнес з амбіції стати найбільшими — починали з того, щоб бути людьми, які прийдуть до найважчого, що буває кому-небудь. За цей час нас супроводжували понад дві тисячі родин.
            </p>
            <div className="md:col-span-7 grid grid-cols-2 gap-x-6 gap-y-12">
              <Stat value="10+" label="років роботи" />
              <Stat value="8" label="кладовищ Києва" />
              <Stat value="2000+" label="родин, яким допомогли" />
              <Stat value="30 хв" label="середній час виїзду" />
            </div>
          </div>
          <p className="mt-16 max-w-3xl text-muted-foreground">
            Знаємо специфіку всіх кладовищ району, документообіг кожної інстанції, контакти священників різних конфесій. Знаємо тонкощі, про які не пишуть у регламентах — і саме вони часто визначають, чи буде церемонія такою, як хотіла родина.
          </p>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Працюємо повним циклом — від першого виїзду до поминального обіду. Одна команда, одна відповідальність, один номер з підтримкою.
          </p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={mourner} alt="" className="h-full w-full object-cover" loading="lazy" width={1600} height={900} />
          <div className="absolute inset-0 bg-background/85" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-vignette)" }} />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-[0.4em] text-primary">— Зворотній зв'язок</div>
              <h2 className="mt-6 font-display text-5xl leading-[1.05] md:text-6xl">
                Залиште номер<br />— зателефонуємо<br /><em className="text-primary not-italic">за 15 хвилин</em>
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                Проконсультуємо, розрахуємо точну вартість, відповімо на запитання. Без скриптів та зайвих питань.
              </p>
            </div>

            <form className="space-y-3 self-end" onSubmit={(e) => e.preventDefault()}>
              <Field placeholder="Ваше ім'я" />
              <Field placeholder="Ваш телефон" type="tel" />
              <Field placeholder="Ваш e-mail (за бажанням)" type="email" />
              <button type="submit" className="group mt-4 flex w-full items-center justify-between rounded-sm bg-primary px-6 py-5 text-sm uppercase tracking-[0.2em] text-primary-foreground hover:gap-2 transition-all">
                <span>Зателефонуйте мені</span>
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section className="mx-auto max-w-7xl px-6 py-32 lg:px-12">
        <div className="text-xs uppercase tracking-[0.4em] text-primary">— Контакти</div>
        <h2 className="mt-6 font-display text-5xl md:text-6xl">Завжди на зв'язку</h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <ContactCard icon={<MapPin size={20} />} title="Адреса" lines={["м. Київ, вул. Стеценка, 18", "Працюємо цілодобово"]} />
          <ContactCard icon={<Phone size={20} />} title="Телефони" lines={["+38 (044) 209 11 75", "+38 (067) 272 33 77"]} highlight />
          <ContactCard icon={<Mail size={20} />} title="Пошта" lines={["ritualberlovtsy@gmail.com", "Відповідаємо за 1 годину"]} />
        </div>

        <div className="mt-8 overflow-hidden rounded-sm border hairline">
          <iframe
            title="Карта"
            src="https://www.openstreetmap.org/export/embed.html?bbox=30.42%2C50.46%2C30.52%2C50.50&layer=mapnik"
            className="h-[420px] w-full grayscale contrast-125 brightness-50"
            loading="lazy"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t hairline bg-card/30">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12 lg:px-12">
          <div className="md:col-span-4">
            <div className="font-display text-2xl">Ритуал<span className="text-primary">24</span> Березівці</div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">похоронна служба</div>
            <p className="mt-6 max-w-sm text-sm text-muted-foreground">
              Ми нічого не можемо змінити, ми можемо лише допомогти.
            </p>
          </div>
          <nav className="md:col-span-3 text-sm space-y-2">
            {["Головна", "Про нас", "Послуги", "Наші переваги", "Зворотній зв'язок", "Контакти"].map((l) => (
              <a key={l} href="#" className="block text-muted-foreground hover:text-primary transition">{l}</a>
            ))}
          </nav>
          <div className="md:col-span-5 text-sm space-y-2 text-muted-foreground">
            <div>+38 (044) 209 11 75</div>
            <div>+38 (067) 272 33 77</div>
            <div>E-MAIL: ritualberlovtsy@gmail.com</div>
            <div>ПРАЦЮЄМО ЦІЛОДОБОВО</div>
            <div>м. Київ, вул. Стеценка, 18</div>
          </div>
        </div>
        <div className="border-t hairline">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12 text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} Ритуал 24 Березівці</div>
            <div className="uppercase tracking-[0.25em]">Memento · Vivere</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CatalogCard({ tag, title, img, large, wide }: { tag: string; title: string; img: string; large?: boolean; wide?: boolean }) {
  return (
    <article className={`group relative overflow-hidden rounded-sm border hairline bg-card ${large ? "md:row-span-2 aspect-[3/4] md:aspect-auto" : wide ? "md:col-span-2 aspect-[16/9] md:aspect-[2/1]" : "aspect-square"}`}>
      <img src={img} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-90" loading="lazy" width={600} height={600} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-6">
        <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{tag}</div>
        <div className="mt-2 font-display text-2xl leading-tight md:text-3xl">{title}</div>
        <ArrowUpRight size={20} className="absolute right-6 top-6 text-foreground/60 transition group-hover:text-primary group-hover:rotate-45" />
      </div>
    </article>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-6xl text-foreground md:text-7xl">{value}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
    </div>
  );
}

function Field({ placeholder, type = "text" }: { placeholder: string; type?: string }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-sm border hairline bg-background/40 px-6 py-5 text-sm text-foreground placeholder:text-muted-foreground/80 backdrop-blur-sm transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    />
  );
}

function ContactCard({ icon, title, lines, highlight }: { icon: React.ReactNode; title: string; lines: string[]; highlight?: boolean }) {
  return (
    <div className={`group relative overflow-hidden rounded-sm border p-8 transition hover:border-primary ${highlight ? "border-primary/40 bg-primary/5" : "hairline bg-card/40"}`}>
      <div className="text-primary">{icon}</div>
      <div className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">{title}</div>
      <div className="mt-3 space-y-1">
        {lines.map((l) => <div key={l} className="font-display text-xl text-foreground">{l}</div>)}
      </div>
    </div>
  );
}
