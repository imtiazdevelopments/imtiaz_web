"use client";

import { useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  blogs,
  blogTopics,
  blogCategories,
  BlogTopic,
  BlogCategory,
} from "../data";
import LatestBlogSlider from "./LatestBlogSlider";
import BlogCard from "./BlogCard";
import Pagination from "../../common/Pagination";
import FilterDropdown from "../../common/FilterDropdown";
import CustomOutlineButton from "../../common/CustomOutlineButton";

const BLOGS_PER_PAGE = 4;

const BlogsSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTopic = (searchParams.get("topic") as BlogTopic) || "";
  const selectedCategory = (searchParams.get("category") as BlogCategory) || "";
  const currentPage = Number(searchParams.get("page") || "1"); // ✅ declared here

  // ✅ Sync page=1 in URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.get("page")) {
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1"); // ✅ reset to page 1 on filter change
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.replace(`${pathname}?page=1`, { scroll: false });
  };

  const hasFilter = selectedTopic || selectedCategory;

  const sortedBlogs = useMemo(
    () =>
      [...blogs].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  const filtered = useMemo(() => {
    return sortedBlogs.filter((b) => {
      if (selectedTopic && b.topic !== selectedTopic) return false;
      if (selectedCategory && b.category !== selectedCategory) return false;
      return true;
    });
  }, [selectedTopic, selectedCategory, sortedBlogs]);

  const totalPages = Math.ceil(filtered.length / BLOGS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="w-full bg-white pt-70 pb-120 3xl:pb-160">
      <div className="container">
        {/* Filters Row */}
        <div className="flex flex-col md:flex-row gap-30 items-center justify-between mb-70">
          <div className="flex flex-col md:flex-row items-center gap-30 w-full md:w-auto">
            <FilterDropdown
              placeholder="Topic"
              options={blogTopics}
              value={selectedTopic}
              onChange={(val) => updateParam("topic", val)}
            />
            <FilterDropdown
              placeholder="Categories"
              options={blogCategories}
              value={selectedCategory}
              onChange={(val) => updateParam("category", val)}
            />
          </div>

          {hasFilter && (
            <CustomOutlineButton
              text="Clear Filters"
              onClick={clearFilters}
              variant="dark"
              px="px-60"
              borderColor="border-primary-2"
              textColor="text-foreground-light"
              className="w-full md:w-auto !py-[17px] md:!py-5"
            />
          )}
        </div>

        <div className="w-full h-px bg-black/10 mb-50" />

        {/* Hero Slider */}
        <LatestBlogSlider blogs={sortedBlogs.slice(0, 3)} />

        {/* Divider */}
        <div className="w-full h-px bg-black/10 my-50" />

        {/* Blog Cards Grid */}
        <div id="blog-list" className="scroll-mt-20">
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-40 gap-40">
              {paginated.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <p className="text-center text-foreground-light text-description py-20">
              No blogs found for selected filters.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-50 md:mt-60 2xl:mt-100 w-full flex justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              scrollToId="blog-list"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogsSection;
