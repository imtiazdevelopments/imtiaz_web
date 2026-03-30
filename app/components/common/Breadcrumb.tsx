"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  variant?: "white" | "black";
}

const Breadcrumb = ({ variant = "white" }: BreadcrumbProps) => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, i) => ({
    label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  const allCrumbs = [
    { label: "Home", href: "/", isLast: crumbs.length === 0 },
    ...crumbs,
  ];

  const isBlack = variant === "black";

  return (
    <div className="flex items-center gap-[10px]">
      {allCrumbs.map((crumb, i) => (
        <div key={i} className="flex items-center gap-[10px]">
          {i > 0 && (
            <span
              className={`text-[9px] ${
                crumb.isLast
                  ? isBlack
                    ? "text-foreground-light"
                    : "text-white"
                  : isBlack
                    ? "text-foreground-light/30"
                    : "text-white/50"
              }`}
            >
              ●
            </span>
          )}
          {crumb.isLast ? (
            <span
              className={`text-description ${
                isBlack ? "text-foreground-light" : "text-white"
              }`}
            >
              {/* mobile */}
              <span className="lg:hidden">
                {crumb.label.length > 15
                  ? crumb.label.slice(0, 10) + "..."
                  : crumb.label}
              </span>

              {/* lg → xl */}
              <span className="hidden lg:inline 2xl:hidden">
                {crumb.label.length > 40
                  ? crumb.label.slice(0, 40) + "..."
                  : crumb.label}
              </span>

              {/* 2xl+ */}
              <span className="hidden 2xl:inline">
                {crumb.label.length > 60
                  ? crumb.label.slice(0, 60) + "..."
                  : crumb.label}
              </span>
            </span>
          ) : (
            <Link
              href={crumb.href}
              className={`text-description transition-colors duration-300 ${
                isBlack
                  ? "text-foreground-light/30 hover:text-foreground-light/60"
                  : "text-white/50 hover:text-white/75"
              }`}
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
