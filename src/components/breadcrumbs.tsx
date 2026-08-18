import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-premium pt-28 sm:pt-32">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink/45">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={11} />}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-gold-600">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink/70">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
