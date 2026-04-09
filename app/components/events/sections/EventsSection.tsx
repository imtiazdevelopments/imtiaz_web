"use client";

import { useMemo, useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  eventItems,
  eventCategories,
  eventYears,
  eventMonths,
  EventCategory,
  EventYear,
  EventMonth,
} from "../data";
import Pagination from "../../common/Pagination";
import FilterDropdown from "../../common/FilterDropdown";
import EventCard from "./EventCard";
import { Plus } from "lucide-react";
import CustomOutlineButton from "../../common/CustomOutlineButton";
import { motion } from "framer-motion";
import {
  containerStagger,
  moveUp,
  moveUpV2,
} from "@/app/components/motionVariants";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { useLenis } from "@/app/contexts/LenisContext";

const EVENTS_PER_PAGE = 6;

const EventsSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const selectedTopic = (searchParams.get("topic") as EventCategory) || "";
  const selectedYear = (searchParams.get("year") as EventYear) || "";
  const selectedMonth = (searchParams.get("month") as EventMonth) || "";
  const currentPage = Number(searchParams.get("page") || "1");
  const { scrollTo, lock, unlock } = useLenis();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.get("page")) {
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname]);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const scrollY = window.scrollY;
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      params.set("page", "1");
      lock();
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      setTimeout(() => {
        scrollTo(scrollY, { duration: 0 });
        unlock();
      }, 520);
    },
    [searchParams, pathname, router, lock, unlock, scrollTo],
  );

  const clearFilters = useCallback(() => {
    router.replace(`${pathname}?page=1`, { scroll: false });
  }, [pathname, router]);

  const hasFilter = selectedTopic || selectedYear || selectedMonth;

  const sorted = useMemo(
    () =>
      [...eventItems].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  const filtered = useMemo(() => {
    return sorted.filter((item) => {
      if (selectedTopic && item.category !== selectedTopic) return false;
      if (selectedYear && !item.date.startsWith(selectedYear)) return false;
      if (selectedMonth) {
        const monthIndex = new Date(`${selectedMonth} 1`).getMonth();
        const itemMonth = new Date(item.date).getMonth();
        if (itemMonth !== monthIndex) return false;
      }
      return true;
    });
  }, [selectedTopic, selectedYear, selectedMonth, sorted]);

  const totalPages = useMemo(
    () => Math.ceil(filtered.length / EVENTS_PER_PAGE),
    [filtered.length],
  );
  const paginated = useMemo(
    () =>
      filtered.slice(
        (currentPage - 1) * EVENTS_PER_PAGE,
        currentPage * EVENTS_PER_PAGE,
      ),
    [filtered, currentPage],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  return (
    <section
      className="w-full bg-white pt-70 pb-120 3xl:pb-160"
      data-header="dark"
    >
      <div className="container">
        {/* Filters Row */}
        {/* ── Desktop (lg+) ── */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="hidden lg:flex items-center justify-between mb-70"
        >
          <motion.div
            variants={containerStagger}
            className="flex items-center gap-30"
          >
            <motion.div variants={moveUp(0)} className="w-auto">
              <FilterDropdown
                placeholder="Topics"
                options={eventCategories}
                value={selectedTopic}
                onChange={(val) => updateParam("topic", val)}
              />
            </motion.div>

            <motion.div variants={moveUp(0.1)} className="w-auto">
              <FilterDropdown
                placeholder="Year"
                options={eventYears}
                value={selectedYear}
                onChange={(val) => updateParam("year", val)}
              />
            </motion.div>

            <motion.div variants={moveUp(0.15)} className="w-auto">
              <FilterDropdown
                placeholder="Month"
                options={eventMonths}
                value={selectedMonth}
                onChange={(val) => updateParam("month", val)}
              />
            </motion.div>
          </motion.div>

          {hasFilter && (
            <motion.div
              className="w-full md:w-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <CustomOutlineButton
                text="Clear Filter"
                onClick={clearFilters}
                variant="dark"
                px="px-60"
                borderColor="border-primary-2"
                textColor="text-foreground-light"
                className="w-full md:w-auto !py-[17px] md:!py-5 h-[50px] lg:h-[66px] uppercase"
              />
            </motion.div>
          )}
        </motion.div>

        {/* ── Mobile (below lg) ── */}
        <motion.div
          variants={moveUp(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="lg:hidden mb-70"
        >
          {/* Toggle button */}
          <button
            onClick={() => setFiltersOpen((prev) => !prev)}
            className="flex items-center justify-between w-full px-6 py-4 rounded-full border border-primary-2 text-foreground-light text-description uppercase cursor-pointer"
          >
            <span>Filters</span>
            <span
              className="transition-transform duration-300 ease-in-out"
              style={{
                transform: filtersOpen ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              <Plus size={20} />
            </span>
          </button>

          {/* Collapsible content */}
          <div
            ref={contentRef}
            className="transition-all duration-400 ease-in-out"
            style={{
              maxHeight: filtersOpen ? "500px" : "0px",
              opacity: filtersOpen ? 1 : 0,
            }}
          >
            <div className="flex flex-col gap-3 pt-4">
              <FilterDropdown
                placeholder="Topics"
                options={eventCategories}
                value={selectedTopic}
                onChange={(val) => updateParam("topic", val)}
              />
              <FilterDropdown
                placeholder="Year"
                options={eventYears}
                value={selectedYear}
                onChange={(val) => updateParam("year", val)}
              />
              <FilterDropdown
                placeholder="Month"
                options={eventMonths}
                value={selectedMonth}
                onChange={(val) => updateParam("month", val)}
              />

              {hasFilter && (
                <CustomOutlineButton
                  text="Clear Filter"
                  onClick={clearFilters}
                  variant="dark"
                  px="px-60"
                  borderColor="border-primary-2"
                  textColor="text-foreground-light"
                  className="w-full md:w-auto !py-[17px] md:!py-5 h-[50px] lg:h-[66px] uppercase"
                />
              )}
            </div>
          </div>
        </motion.div>

        <div className="w-full my-50">
          <div className="relative w-full h-px overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-black/10 origin-center"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div id="events-list" className="scroll-mt-20">
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-30 md:gap-40">
              {paginated.map((item) => (
                <Reveal key={item.id} variants={moveUpV2}>
                  <EventCard item={item} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-center text-black/40 font-[avenirRoman] text-[16px] py-20">
              No events found.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
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
              scrollToId="events-list"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
