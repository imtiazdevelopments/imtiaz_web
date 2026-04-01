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
import { motion } from "framer-motion";
import {
  containerStagger,
  moveUp,
  moveUpV2,
} from "@/app/components/motionVariants";
import Reveal from "../../animations/RevealOneByOneAnimation";

const BLOGS_PER_PAGE = 4;

const BlogsSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTopic = (searchParams.get("topic") as BlogTopic) || "";
  const selectedCategory = (searchParams.get("category") as BlogCategory) || "";
  const currentPage = Number(searchParams.get("page") || "1");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.get("page")) {
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname]);

  const updateParam = (key: string, value: string) => {
    const newsGrid = document.getElementById("blog-list");
    const gridTop = newsGrid?.getBoundingClientRect().top ?? 0;
    const absoluteGridTop = window.scrollY + gridTop;

    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    requestAnimationFrame(() => {
      const newGridTop =
        document.getElementById("blog-list")?.getBoundingClientRect().top ?? 0;
      const newAbsoluteGridTop = window.scrollY + newGridTop;
      const diff = newAbsoluteGridTop - absoluteGridTop;
      window.scrollBy({ top: -diff, behavior: "instant" });
    });
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
    <section
      className="w-full bg-white pt-70 pb-120 3xl:pb-160"
      data-header="dark"
    >
      <div className="container">
        {/* Filters Row */}
        <motion.div
          className="flex flex-col md:flex-row gap-30 items-center justify-between mb-70"
          variants={containerStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div
            className="flex flex-col md:flex-row items-center gap-30 w-full md:w-auto"
            variants={containerStagger}
          >
            <motion.div className="w-full md:w-auto" variants={moveUp(0)}>
              <FilterDropdown
                placeholder="Topic"
                options={blogTopics}
                value={selectedTopic}
                onChange={(val) => updateParam("topic", val)}
              />
            </motion.div>
            <motion.div className="w-full md:w-auto" variants={moveUp(0.15)}>
              <FilterDropdown
                placeholder="Categories"
                options={blogCategories}
                value={selectedCategory}
                onChange={(val) => updateParam("category", val)}
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
                text="Clear Filters"
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

        <div className="w-full mb-50">
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

        {/* Hero Slider — hidden when filters active */}
        <div
          className="transition-all duration-500 ease-in-out overflow-hidden"
          style={{
            maxHeight: hasFilter ? "0px" : "1000px",
            opacity: hasFilter ? 0 : 1,
            marginBottom: hasFilter ? "0px" : undefined,
            willChange: "max-height",
          }}
        >
          <motion.div
            variants={moveUp(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <LatestBlogSlider blogs={sortedBlogs.slice(0, 3)} />
          </motion.div>
          {/* Divider */}
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
        </div>

        {/* Blog Cards Grid */}
        <div id="blog-list" className="scroll-mt-20">
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-40 gap-40">
              {paginated.map((blog) => (
                <Reveal key={blog.id} variants={moveUpV2}>
                  <div>
                    <BlogCard blog={blog} />
                  </div>
                </Reveal>
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
              scrollToId="blog-list"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogsSection;
