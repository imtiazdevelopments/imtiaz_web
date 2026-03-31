"use client";

import { useLenis } from "../../contexts/LenisContext";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  scrollToId?: string;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  scrollToId,
}: PaginationProps) => {
  const { scrollTo } = useLenis();

  const handleClick = (page: number) => {
    onPageChange(page);

    if (!scrollToId) return;

    const el = document.getElementById(scrollToId);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - 150;

    scrollTo(top, { duration: 1.2 });
  };

  const getPages = (): (number | "...")[] => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [1, 2, 3, 4];

    if (currentPage > 5) {
      pages.push("...");
      pages.push(currentPage);
    }

    if (currentPage > 4 && currentPage < totalPages - 1) {
      if (!pages.includes(currentPage)) pages.push(currentPage);
    }

    pages.push("...");
    pages.push(totalPages);

    return pages.filter((p, i, arr) =>
      p === "..." ? arr[i - 1] !== "..." : arr.indexOf(p) === i
    );
  };

  const pages = getPages();

  return (
    <div className="flex items-end mt-50 md:mt-60 2xl:mt-100">
      {pages.map((page, i) => {
        const isEllipsis = page === "...";
        const isActive = page === currentPage;

        if (isEllipsis) {
          return (
            <div key={`ellipsis-${i}`} className="flex flex-col items-end pb-[1px]">
              <span className="text-[#490905] font-[avenirHeavy] text-19 leading-[100%] px-4 py-2 cursor-default">
                ···
              </span>
            </div>
          );
        }

        return (
          <div key={page} className="flex flex-col items-center">
            <button
              onClick={() => handleClick(page as number)}
              className="text-[#490905] font-[avenirHeavy] text-19 leading-[100%] px-4 py-2 transition-opacity duration-200 hover:opacity-60 cursor-pointer"
            >
              {page}
            </button>
            {isActive ? (
              <div className="w-full h-[2px] bg-[#490905]" />
            ) : (
              <div className="w-full h-px bg-[#490905]/20" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;