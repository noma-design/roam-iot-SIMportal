import Image from "next/image";
import Link from "next/link";

type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="mb-4 flex items-center text-sm" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={`${item.label}-${index}`} className="flex items-center">
            {item.href && !isLast ? (
              <Link href={item.href} className="px-2 py-2 text-roam-label">
                {item.label}
              </Link>
            ) : (
              <span
                className={`px-2 py-2 ${isLast ? "text-[#5f6b76]" : "text-roam-label"}`}
              >
                {item.label}
              </span>
            )}
            {!isLast ? (
              <Image src="/assets/caret-right.svg" alt="" width={16} height={16} />
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
