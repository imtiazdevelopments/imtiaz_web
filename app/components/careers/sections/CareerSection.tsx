"use client";

import { useState, useMemo } from "react";
import { SectionHeading } from "../../animations/SectionHeading";
import { SectionDescription } from "../../animations/SectionDescription";
import FilterDropdown from "../../common/FilterDropdown";
import CareerCard from "./CareerCard";
import { careersData, vacanciesConfig } from "../data";
import Reveal from "../../animations/RevealOneByOneAnimation";
import { moveUp, moveUpV2 } from "../../motionVariants";
import { motion } from "framer-motion";

export default function VacanciesSection() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");

  const filtered = useMemo(() => {
    return careersData.filter((career) => {
      const matchDept =
        !selectedDepartment || career.department === selectedDepartment;
      const matchType = !selectedJobType || career.jobType === selectedJobType;
      return matchDept && matchType;
    });
  }, [selectedDepartment, selectedJobType]);

  return (
    <section className="bg-gray py-120 2xl:py-130">
      {/* Heading + Description */}
      <div className="container text-center mb-50">
        <SectionHeading
          title={vacanciesConfig.section.title}
          className="mb-20 text-foreground"
        />
        <SectionDescription
          text={vacanciesConfig.section.description}
          className="max-w-[623px] mx-auto text-foreground-light mb-20"
        />

        {/* Filters */}
        <div className="flex items-center justify-center gap-[10px] flex-wrap">
          <motion.div
            className="w-full sm:w-auto"
            variants={moveUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <FilterDropdown
              variant="secondary"
              placeholder="Department"
              options={vacanciesConfig.filters.department}
              value={selectedDepartment}
              onChange={(val) => setSelectedDepartment(val)}
            />
          </motion.div>
          <motion.div
            className="w-full sm:w-auto"
            variants={moveUp(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <FilterDropdown
              variant="secondary"
              placeholder="Job Type"
              options={vacanciesConfig.filters.jobType}
              value={selectedJobType}
              onChange={(val) => setSelectedJobType(val)}
            />
          </motion.div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-30 gap-y-40">
            {filtered.map((career, i) => (
              <Reveal key={career.id} variants={moveUpV2} delayRange={0.11 * i}>
                <CareerCard career={career} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-foreground-light text-description">
            No vacancies found for the selected filters.
          </div>
        )}
      </div>
    </section>
  );
}
