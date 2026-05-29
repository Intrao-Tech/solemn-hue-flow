import { Link } from "@tanstack/react-router";
import { Phone, Send, Instagram } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12 lg:px-12">
        <div className="md:col-span-4">
          <div className="font-display text-2xl">Ритуал<span className="text-primary">24</span> Березівці</div>
          <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">похоронна служба</div>
          <p className="mt-6 max-w-sm text-sm text-muted-foreground">
            Ми нічого не можемо змінити, ми можемо лише допомогти.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">м. Київ, вул. Стеценка, 18</p>
        </div>
        <nav className="md:col-span-3 text-sm space-y-2">
          <Link to="/" className="block text-muted-foreground hover:text-primary transition">Головна</Link>
          <Link to="/pro-nas" className="block text-muted-foreground hover:text-primary transition">Про нас</Link>
          <Link to="/poslugy" className="block text-muted-foreground hover:text-primary transition">Послуги</Link>
          <Link to="/" hash="about" className="block text-muted-foreground hover:text-primary transition">Наші переваги</Link>
          <Link to="/" hash="contact" className="block text-muted-foreground hover:text-primary transition">Зворотний зв'язок</Link>
          <Link to="/" hash="contacts" className="block text-muted-foreground hover:text-primary transition">Контакти</Link>
        </nav>
        <div className="md:col-span-3 text-sm space-y-2 text-muted-foreground">
          <a href="tel:+380442091175" className="block hover:text-primary">+38 (044) 209 11 75</a>
          <a href="tel:+380672723377" className="block hover:text-primary">+38 (067) 272 33 77</a>
          <div>E-MAIL: ritualberlovtsy@gmail.com</div>
          <div className="uppercase tracking-[0.2em] text-xs mt-3">Працюємо цілодобово</div>
          <div className="mt-3 flex gap-2">
            <a href="#" aria-label="Telegram" className="rounded-full border hairline p-2 hover:border-primary hover:text-primary transition"><Send size={14} /></a>
            <a href="#" aria-label="Instagram" className="rounded-full border hairline p-2 hover:border-primary hover:text-primary transition"><Instagram size={14} /></a>
            <a href="tel:+380442091175" aria-label="Phone" className="rounded-full border hairline p-2 hover:border-primary hover:text-primary transition"><Phone size={14} /></a>
          </div>
        </div>
        <div className="md:col-span-2 flex md:justify-end items-start">
          <a href="tel:+380442091175" className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-xs uppercase tracking-[0.22em] text-primary-foreground hover:opacity-90 transition">
            Зателефонуйте мені
          </a>
        </div>
      </div>
      <div className="border-t hairline">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-xs text-muted-foreground lg:px-12">
          <div>© {new Date().getFullYear()} Ритуал 24 Березівці</div>
          <div className="uppercase tracking-[0.25em]">Memento · Vivere</div>
        </div>
      </div>
    </footer>
  );
}