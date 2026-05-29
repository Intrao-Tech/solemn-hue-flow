import { createFileRoute, notFound } from "@tanstack/react-router";
import { SERVICES } from "@/lib/services-data";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/poslugy/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} — Ритуал 24 Березівці` },
          { name: "description", content: loaderData.service.intro.slice(0, 160) },
          { property: "og:title", content: loaderData.service.title },
          { property: "og:description", content: loaderData.service.intro.slice(0, 160) },
        ]
      : [],
  }),
  component: ServiceRoute,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-foreground">Послугу не знайдено</div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center text-foreground">{error.message}</div>
  ),
});

function ServiceRoute() {
  const { service } = Route.useLoaderData();
  return <ServicePage service={service} />;
}