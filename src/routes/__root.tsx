import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { ALL_SERVICES_LINKS } from "@/lib/services-data";
import { SITE_DESCRIPTION, SITE_LANG, SITE_LOCALE, SITE_NAME, SITE_TAGLINE, absoluteUrl } from "@/lib/site";

import appCss from "../styles.css?url";

const OG_IMAGE = absoluteUrl("/og-image.jpg");

/**
 * Error and 404 screens carry the site header and footer so a visitor who lands
 * on one keeps the navigation, the phone number and the internal links instead
 * of hitting a dead end — the SEO audit flags a bare 404 as a crawl trap.
 */
function ErrorShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-24 text-center lg:px-12">{children}</main>
      <SiteFooter />
    </div>
  );
}

function NotFoundComponent() {
  return (
    <ErrorShell>
      <div className="font-display text-7xl text-primary md:text-8xl">404</div>
      <h1 className="mt-6 font-display text-3xl md:text-4xl">Такої сторінки немає</h1>
      <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
        Можливо, сторінку перенесено або в адресі є помилка. Оберіть потрібну послугу нижче або
        зателефонуйте — ми на зв&apos;язку цілодобово.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-xs uppercase tracking-[0.22em] text-primary-foreground transition hover:opacity-90"
        >
          На головну
        </Link>
        <a
          href="tel:+380442091175"
          className="inline-flex items-center justify-center rounded-sm border hairline px-8 py-4 text-xs uppercase tracking-[0.22em] transition hover:border-primary hover:text-primary"
        >
          +38 (044) 209 11 75
        </a>
      </div>

      <div className="mt-16 text-xs uppercase tracking-[0.3em] text-primary">Наші послуги</div>
      <ul className="mx-auto mt-6 grid max-w-2xl gap-x-8 gap-y-2 text-left sm:grid-cols-2">
        {ALL_SERVICES_LINKS.map((service) => (
          <li key={service.slug}>
            <Link
              to="/poslugy/$slug"
              params={{ slug: service.slug }}
              className="text-sm text-muted-foreground transition hover:text-primary"
            >
              {service.title}
            </Link>
          </li>
        ))}
      </ul>
    </ErrorShell>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <ErrorShell>
      <h1 className="font-display text-3xl md:text-4xl">Сторінка не завантажилась</h1>
      <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
        Щось пішло не так на нашому боці. Спробуйте оновити сторінку або зателефонуйте — приймаємо
        дзвінки цілодобово.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 text-xs uppercase tracking-[0.22em] text-primary-foreground transition hover:opacity-90"
        >
          Спробувати ще раз
        </button>
        <a
          href="tel:+380442091175"
          className="inline-flex items-center justify-center rounded-sm border hairline px-8 py-4 text-xs uppercase tracking-[0.22em] transition hover:border-primary hover:text-primary"
        >
          +38 (044) 209 11 75
        </a>
      </div>
    </ErrorShell>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${SITE_NAME} — ${SITE_TAGLINE}` },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: SITE_NAME },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: SITE_LOCALE },
      { property: "og:title", content: `${SITE_NAME} — ${SITE_TAGLINE}` },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      // Own-domain preview image. The previous value pointed at a Lovable
      // preview bucket, so every share was branded as somebody else's site.
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${SITE_NAME} — ${SITE_TAGLINE}` },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        // Only the weights the site actually renders: Cormorant 400 upright +
        // italic (display headings), Inter 400/500/600/700 (body and UI). The
        // previous URL asked for 13 variants, 7 of which were never used.
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Inter:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE_LANG}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      {/* Feedback surface for the contact form's success/error toasts. */}
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
