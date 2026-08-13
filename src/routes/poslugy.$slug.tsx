import { createFileRoute, notFound } from "@tanstack/react-router";
import { SERVICES } from "@/lib/services-data";
import { ServicePage } from "@/components/ServicePage";
import { canonicalHead } from "@/lib/site";

export const Route = createFileRoute("/poslugy/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { service } = loaderData;
    const canonical = canonicalHead(`/poslugy/${service.slug}`);
    return {
      links: canonical.links,
      meta: [
        { title: service.metaTitle },
        { name: "description", content: service.metaDescription },
        { property: "og:title", content: service.metaTitle },
        { property: "og:description", content: service.metaDescription },
        { property: "og:type", content: "article" },
        ...canonical.meta,
      ],
    };
  },
  component: ServiceRoute,
  // Unknown slugs fall through to the root 404 screen, which carries the header,
  // footer and the full service list instead of a bare line of text.
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center text-foreground">{error.message}</div>
  ),
});

function ServiceRoute() {
  const { service } = Route.useLoaderData();
  return <ServicePage service={service} />;
}