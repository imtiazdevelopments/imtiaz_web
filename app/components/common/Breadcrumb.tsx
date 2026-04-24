"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  variant?: "white" | "black";
}

const Breadcrumb = ({ variant = "white" }: BreadcrumbProps) => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  // ✅ ONLY real existing routes
  const VALID_ROUTES = new Set([
    "/",
    "/media-center/blog",
    "/media-center/news",
    "/media-center/events",
    "/communities",
    "/properties",
    "/pay-now",
    "/construction-progress-listing",
    "/about/careers"
  ]);

  const crumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");

    return {
      label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
      href,
      isLast: i === segments.length - 1,
      clickable: VALID_ROUTES.has(href),
    };
  });

  const allCrumbs = [
    {
      label: "Home",
      href: "/",
      isLast: crumbs.length === 0,
      clickable: true,
    },
    ...crumbs,
  ];

  const isBlack = variant === "black";

  return (
    <div className="flex items-center gap-[10px] capitalize">
      {allCrumbs.map((crumb, i) => (
        <div key={i} className="flex items-center gap-[10px]">
          {i > 0 && (
            <span
              className={`text-[9px] rounded-full ${
                crumb.isLast
                  ? isBlack
                    ? "bg-foreground-light"
                    : "bg-white"
                  : isBlack
                    ? "bg-foreground-light/30"
                    : "bg-white/50"
              }`}
            >
              <div className="w-[7px] h-[7px] "></div>
            </span>
          )}

          {crumb.isLast || !crumb.clickable ? (
            <span
  className={`text-[14px] md:text-16 text-description whitespace-nowrap overflow-hidden text-ellipsis ${
    crumb.isLast
      ? isBlack
        ? "text-foreground-light"
        : "text-white"
      : isBlack
        ? "text-foreground-light/30"
        : "text-white/50"
  }`}
>
              {/* mobile */}
<span className="md:hidden">
  {crumb.label.length > 15
    ? crumb.label.slice(0, 15) + "..."
    : crumb.label}
</span>

{/* md */}
<span className="hidden md:inline 2xl:hidden">
  {crumb.label.length > 25
    ? crumb.label.slice(0, 50) + "..."
    : crumb.label}
</span>

{/* 2xl+ */}
<span className="hidden 2xl:inline">
  {crumb.label.length > 60
    ? crumb.label.slice(0, 80) + "..."
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
