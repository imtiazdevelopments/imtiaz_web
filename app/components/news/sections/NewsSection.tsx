"use client";

import { useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  pressItems,
  pressYears,
  pressMonths,
  pressCategories,
  PressYear,
  PressMonth,
  PressCategory,
} from "../data";
import LatestNewsSlider from "./LatestNewsSlider";
import NewsCard from "./NewsCard";
import Pagination from "../../common/Pagination";
import FilterDropdown from "../../common/FilterDropdown";

const NEWS_PER_PAGE = 6;

const NewsSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedYear = (searchParams.get("year") as PressYear) || "";
  const selectedMonth = (searchParams.get("month") as PressMonth) || "";
  const selectedCategory =
    (searchParams.get("category") as PressCategory) || "";
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

  const hasFilter = selectedYear || selectedMonth || selectedCategory;

  // Only used for the slider — always shows latest "News" items regardless of filters
  const latestNews = useMemo(
    () =>
      [...pressItems]
        .filter((item) => item.category === "News")
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
    [],
  );

  // All items sorted by date — filters applied separately below
  const sorted = useMemo(
    () =>
      [...pressItems].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  const filtered = useMemo(() => {
    return sorted.filter((item) => {
      if (selectedCategory && item.category !== selectedCategory) return false;
      if (selectedYear && !item.date.startsWith(selectedYear)) return false;
      if (selectedMonth) {
        const monthIndex = new Date(`${selectedMonth} 1`).getMonth();
        const itemMonth = new Date(item.date).getMonth();
        if (itemMonth !== monthIndex) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedYear, selectedMonth, sorted]);

  const totalPages = Math.ceil(filtered.length / NEWS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * NEWS_PER_PAGE,
    currentPage * NEWS_PER_PAGE,
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
              placeholder="Topics"
              options={pressCategories}
              value={selectedCategory}
              onChange={(val) => updateParam("category", val)}
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

        <div className="w-full h-px bg-black/10 mb-50" />

        {/* Slider — top 3 latest News items, unaffected by filters */}
        <LatestNewsSlider news={latestNews.slice(0, 3)} />

        <div className="w-full h-px bg-black/10 my-50" />

        {/* News Cards Grid */}
        <div id="news-list" className="scroll-mt-20">
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-25 gap-y-40">
              {paginated.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-black/40 font-[avenirRoman] text-[16px] py-20">
              No news found.
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
              scrollToId="news-list"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;