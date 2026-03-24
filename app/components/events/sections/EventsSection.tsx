"use client";

import { useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  pressItems,
  pressCategories,
  pressYears,
  pressMonths,
  PressCategory,
  PressYear,
  PressMonth,
} from "../data";
import Pagination from "../../common/Pagination";
import FilterDropdown from "../../common/FilterDropdown";
import EventCard from "./EventCard";

const EVENTS_PER_PAGE = 6;

const EventsSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTopic = (searchParams.get("topic") as PressCategory) || "";
  const selectedYear = (searchParams.get("year") as PressYear) || "";
  const selectedMonth = (searchParams.get("month") as PressMonth) || "";
  const currentPage = Number(searchParams.get("page") || "1");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.get("page")) {
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.replace(`${pathname}?page=1`, { scroll: false });
  };

  const hasFilter = selectedTopic || selectedYear || selectedMonth;

  const sorted = useMemo(
    () =>
      [...pressItems].sort(
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

  const totalPages = Math.ceil(filtered.length / EVENTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="w-full bg-white pt-70 pb-160">
      <div className="container">
        {/* Filters Row */}
        <div className="flex items-center justify-between mb-70">
          <div className="flex items-center gap-30">
            <FilterDropdown
              placeholder="Topic"
              options={pressCategories}
              value={selectedTopic}
              onChange={(val) => updateParam("topic", val)}
            />
            <FilterDropdown
              placeholder="Year"
              options={pressYears}
              value={selectedYear}
              onChange={(val) => updateParam("year", val)}
            />
            <FilterDropdown
              placeholder="Month"
              options={pressMonths}
              value={selectedMonth}
              onChange={(val) => updateParam("month", val)}
            />
          </div>

          {hasFilter && (
            <button
              onClick={clearFilters}
              className="cursor-pointer px-60 3xl:px-[62px] py-5 rounded-full border border-primary-2 text-foreground-light font-[avenirRoman] text-19 leading-[100%] hover:bg-primary-2/10 transition-colors duration-300"
            >
              Clear Filter
            </button>
          )}
        </div>

        <div className="w-full h-px bg-black/10 my-50" />

        {/* Cards Grid */}
        <div id="events-list" className="scroll-mt-20">
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-40">
              {paginated.map((item) => (
                <EventCard key={item.id} item={item} />
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
          <div className="mt-100 w-full flex justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              scrollToId="events-list"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
