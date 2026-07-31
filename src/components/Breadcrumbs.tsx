import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import type { Crumb } from "@/lib/structured-data";

/**
 * Visible breadcrumb trail. Pairs with `breadcrumbSchema()` — Google only shows
 * a breadcrumb in the SERP when the markup matches a trail that is actually on
 * the page, and the internal links pass weight back up to the category.
 *
 * The last crumb is the current page and is rendered as plain text, not a link.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Навігація по сайту" className="text-[11px] uppercase tracking-[0.2em]">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-foreground/80">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link to={crumb.path} className="transition hover:text-primary">
                    {crumb.name}
                  </Link>
                  <ChevronRight size={12} className="text-muted-foreground/50" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
