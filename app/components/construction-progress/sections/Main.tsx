"use client";

import { useMemo, useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation"; 
import { offPlanProperties } from "../data"; 
import Cardconstruction from "../../common/Cardconstruction";
import { motion } from "framer-motion"; 
import {  moveUp, moveUpV2 } from "../../motionVariants";
import Pagination from "../../common/Pagination";
import Image from "next/image";
import { Plus, SearchX } from "lucide-react";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { useLenis } from "@/app/contexts/LenisContext";

type PropertyType =
  | "Villa"
  | "Apartment"
  | "Townhouse"
  | "Penthouse"
  | "Studio"
  | "";
type PriceRange =
  | "Under AED 1M"
  | "AED 1M - 3M"
  | "AED 3M - 5M"
  | "Above AED 5M"
  | "";
type Bedroom = "1" | "2" | "3" | "4" | "5+" | "";

const propertyTypes: PropertyType[] = [
  "Villa",
  "Apartment",
  "Townhouse",
  "Penthouse",
  "Studio",
];
const priceRanges: PriceRange[] = [
  "Under AED 1M",
  "AED 1M - 3M",
  "AED 3M - 5M",
  "Above AED 5M",
];
const bedrooms: Bedroom[] = ["1", "2", "3", "4", "5+"];

const parsePrice = (raw: string): number => {
  const cleaned = raw?.replace(/,/g, "").match(/[\d.]+/);
  if (!cleaned) return 0;
  const num = parseFloat(cleaned[0]);
  return num > 1000 ? num / 1_000_000 : num;
};

const priceInRange = (raw: string, range: PriceRange): boolean => {
  const price = parsePrice(raw);
  if (range === "Under AED 1M") return price < 1;
  if (range === "AED 1M - 3M") return price >= 1 && price <= 3;
  if (range === "AED 3M - 5M") return price > 3 && price <= 5;
  if (range === "Above AED 5M") return price > 5;
  return true;
};

// Derive itemsPerPage from window width — no state, no spurious re-renders
const getItemsPerPage = () =>
  typeof window !== "undefined" && window.innerWidth >= 1600 ? 8 : 6;

// ── Empty state ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center gap-6 text-center">
    <motion.div
      variants={moveUp(0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex items-center justify-center w-18 h-18 rounded-full bg-gray"
    >
      <SearchX size={32} className="text-primary" />
    </motion.div>
    <div className="flex flex-col gap-2 font-[avenirBook]">
      <motion.p
        variants={moveUp(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-25 text-foreground"
      >
        No Properties found
      </motion.p>
      <motion.p
        variants={moveUp(0.16)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        animate="show"
        className="text-description text-foreground-light max-w-xs"
      >
        No results match your current filters. Try adjusting or clearing your
        selection.
      </motion.p>
    </div>
  </div>
);

// ── Main ─────────────────────────────────────────────────────────────────────
const Main = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Always-current ref so callbacks never capture stale searchParams
  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  // Saved scroll position while a filter navigation is in flight
  const savedScrollY = useRef<number | null>(null);

  const { scrollTo, lock, unlock } = useLenis();

  const selectedPropertyType =
    (searchParams.get("propertyType") as PropertyType) || "";
  const selectedPriceRange =
    (searchParams.get("priceRange") as PriceRange) || "";
  const selectedBedroom = (searchParams.get("bedroom") as Bedroom) || "";
  const currentPage = Number(searchParams.get("page") || "1");
  const [view, setView] = useState<"list" | "map">("list");

  const itemsPerPageRef = useRef(6); // always 6 on server to match SSR
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    // Correct value after hydration (server always renders with 6)
    const initial = getItemsPerPage();
    if (initial !== itemsPerPageRef.current) {
      itemsPerPageRef.current = initial;
      forceUpdate((n) => n + 1);
    }

    const update = () => {
      const next = getItemsPerPage();
      if (next !== itemsPerPageRef.current) {
        itemsPerPageRef.current = next;
        forceUpdate((n) => n + 1);
      }
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParamsRef.current.toString());
    if (!params.get("page")) {
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname]);

  // Restore scroll position after URL change, if we saved one
  useEffect(() => {
    if (savedScrollY.current !== null) {
      const y = savedScrollY.current;
      requestAnimationFrame(() => {
        scrollTo(y, { duration: 0 });
      });
      savedScrollY.current = null;
    }
  }, [searchParams, scrollTo]);

  // Clear saved scroll on any manual scroll (user intentionally moved)
  useEffect(() => {
    const onScroll = () => {
      savedScrollY.current = null;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      params.set("page", "1");

      savedScrollY.current = window.scrollY;

      lock();
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      setTimeout(() => {
        unlock();
      }, 520);
    },
    [pathname, router, lock, unlock],
  );

  const clearFilters = useCallback(() => {
    savedScrollY.current = window.scrollY;
    router.replace(`${pathname}?page=1`, { scroll: false });
  }, [pathname, router]);

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      params.set("page", String(page));
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router],
  );
 

  const sorted = useMemo(
    () =>
      [...offPlanProperties].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  const filtered = useMemo(() => {
    return sorted.filter((item) => {
      if (selectedPropertyType && item.propertyType !== selectedPropertyType)
        return false;
      if (
        selectedPriceRange &&
        !priceInRange(item.startingFrom, selectedPriceRange)
      )
        return false;
      if (selectedBedroom) {
        const match = item.units?.match(/(\d+)BR\s*-\s*(\d+)BR/i);
        if (!match) return false;
        const min = parseInt(match[1]);
        const max = parseInt(match[2]);
        const bed = selectedBedroom === "5+" ? 5 : parseInt(selectedBedroom);
        if (bed < min || bed > max) return false;
      }
      return true;
    });
  }, [selectedPropertyType, selectedPriceRange, selectedBedroom, sorted]);

  const itemsPerPage = itemsPerPageRef.current;

  const totalPages = useMemo(
    () => Math.ceil(filtered.length / itemsPerPage),
    [filtered.length, itemsPerPage],
  );

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  return (
    <section className="w-full bg-white  py120 3xl:pt-[100px] 3xl:pb-160" data-header="dark" id="properties-list"> 
      {/* ── Cards / Map ── */}
      
          <div className="flex flex-col justify-center container">
            <div className="text-center"> 
                <div className="project-card-grid">
                  {/* {paginated.map((project, i) => (
                    <Reveal variants={moveUpV2} key={i} delayRange={i * 0.11}>
                      <Cardconstruction {...project} />
                    </Reveal>
                  ))} */}
                </div> 
            </div>
          </div>
        

        {/* ── Pagination ── */}
        {view === "list" && totalPages > 1 && (
          <motion.div
            variants={moveUp(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-full flex justify-center"
          >
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              scrollToId="properties-list"
            />
          </motion.div>
        )}
      </section> 
  );
};

export default Main;
