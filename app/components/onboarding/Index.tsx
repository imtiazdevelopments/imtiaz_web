"use client";

import type {
  AgencyFormData,
  AgencyStep,
  IndividualStep,
  IndividualFormData,
  Tab,
} from "@/app/onboarding/page";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState, useCallback } from "react";
import CompanyInformation from "./sections/Agency/CompanyInformation";
import SignatoryDetails from "./sections/Agency/SignatoryDetails";
import BrokerDetails from "./sections/Agency/BrokerDetails";
import BankInfo from "./sections/Agency/BankInfo";
import Documents from "./sections/Agency/Documents";
import PreviewSubmit from "./sections/Agency/PreviewSubmit";
import AgentDetails from "./sections/Individual/AgentDetails";
import IndividualBankInfo from "./sections/Individual/IndividualBankInfo";
import IndividualDocuments from "./sections/Individual/IndividualDocuments";
import IndividualPreviewSubmit from "./sections/Individual/IndividualPreviewSubmit";
import { SectionHeading } from "../animations/SectionHeading";
import { motion } from "framer-motion";
import { moveUp } from "../motionVariants";

interface OnboardingIndexProps {
  tab: Tab;
  agencyStep: AgencyStep;
  individualStep: IndividualStep;
  onTabChange: (tab: Tab) => void;
  onAgencyStepChange: (step: AgencyStep) => void;
  onIndividualStepChange: (step: IndividualStep) => void;
  completedAgencySteps: AgencyStep[];
  completedIndividualSteps: IndividualStep[];
  onStepComplete: (step: AgencyStep | IndividualStep) => void;
  agencyFormData: AgencyFormData;
  onAgencyFormDataChange: (updated: AgencyFormData) => void;
  onSaveAgencyStepData: <K extends keyof AgencyFormData>(
    step: K,
    data: AgencyFormData[K],
  ) => void;
  individualFormData: IndividualFormData;
  onSaveIndividualStepData: <K extends keyof IndividualFormData>(
    step: K,
    data: IndividualFormData[K],
  ) => void;
  onIndividualFormDataChange: (updated: IndividualFormData) => void;
}

const AGENCY_STEPS: { key: AgencyStep; label: string }[] = [
  { key: "company", label: "Company Information" },
  { key: "signatory", label: "Signatory Details" },
  { key: "broker", label: "Broker Details" },
  { key: "bank", label: "Bank Info" },
  { key: "documents", label: "Documents" },
  { key: "submit", label: "Submit" },
];

const INDIVIDUAL_STEPS: { key: IndividualStep; label: string }[] = [
  { key: "agentDetails", label: "Agent Details" },
  { key: "bankInfo", label: "Bank Info" },
  { key: "documents", label: "Documents" },
  { key: "previewSubmit", label: "Preview & Submit" },
];

type UnderlineSegment = { left: number; width: number; key: string };

// Defined outside to keep a stable reference — prevents re-mounting on parent re-render
function StepUnderline({ left, width }: { left: number; width: number }) {
  const [currentWidth, setCurrentWidth] = useState(0);

  // Animate in from 0 on mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setCurrentWidth(width));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Animate width change (e.g. adjacent gap extension)
  useEffect(() => {
    setCurrentWidth(width);
  }, [width]);

  return (
    <span
      className="absolute bottom-[-1px] h-[3px] bg-primary"
      style={{ left, width: currentWidth, transition: "width 0.4s ease-out" }}
    />
  );
}

export default function OnboardingIndex({
  tab,
  agencyStep,
  individualStep,
  onTabChange,
  onAgencyStepChange,
  onIndividualStepChange,
  completedAgencySteps,
  completedIndividualSteps,
  onStepComplete,
  agencyFormData,
  onAgencyFormDataChange,
  onSaveAgencyStepData,
  individualFormData,
  onSaveIndividualStepData,
  onIndividualFormDataChange,
}: OnboardingIndexProps) {
  const steps = tab === "agency" ? AGENCY_STEPS : INDIVIDUAL_STEPS;
  const currentStep = tab === "agency" ? agencyStep : individualStep;

  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [segments, setSegments] = useState<UnderlineSegment[]>([]);

  // Measures each completed button's exact pixel position and builds underline segments.
  // Adjacent completed steps extend to cover the gap between them.
  const computeSegments = useCallback(() => {
    const container = breadcrumbRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const completedSteps =
      tab === "agency" ? completedAgencySteps : completedIndividualSteps;

    const measured: { index: number; left: number; width: number }[] = [];

    steps.forEach((s, i) => {
      const btn = buttonRefs.current[i];
      if (
        !btn ||
        !completedSteps.includes(s.key as AgencyStep & IndividualStep)
      )
        return;
      const rect = btn.getBoundingClientRect();
      measured.push({
        index: i,
        left: rect.left - containerRect.left,
        width: rect.width,
      });
    });

    const newSegments: UnderlineSegment[] = measured.map((m, i) => {
      const next = measured[i + 1];
      // Stretch to next segment's start if consecutive, to close the gap
      const extendedWidth =
        next && next.index === m.index + 1 ? next.left - m.left : m.width;
      return { left: m.left, width: extendedWidth, key: `${m.index}` };
    });

    setSegments(newSegments);
  }, [tab, completedAgencySteps, completedIndividualSteps, steps]);

  const completedSteps =
    tab === "agency" ? completedAgencySteps : completedIndividualSteps;

  // Only recompute when completed steps change, not on every tab/step click
  useEffect(() => {
    computeSegments();
  }, [completedSteps, computeSegments]);

  // Recompute on container resize for responsive correctness
  useEffect(() => {
    const observer = new ResizeObserver(() => computeSegments());
    if (breadcrumbRef.current) observer.observe(breadcrumbRef.current);
    return () => observer.disconnect();
  }, [computeSegments]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* LEFT: sticky decorative panel */}
      <div className="relative hidden h-screen w-[35%] max-w-[671px] shrink-0 sticky top-0 lg:block">
        <Image
          src="/images/onboarding/left-image-agent.jpg"
          alt="Imtiaz Developments"
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180.26deg, rgba(0, 0, 0, 0) -0.21%, #000000 94.36%)",
          }}
        />
        <div className="absolute inset-0 z-[2] flex flex-col justify-between py-90 3xl:py-[93px]">
          <div className="flex justify-center shrink-0">
            <Link href="/">
              <Image
                src="/icons/layout_icons/logo-onboarding.svg"
                alt="Imtiaz"
                width={300}
                height={150}
                priority
                className="h-[45px] lg:h-[50px] 2xl:h-[62.06px] w-auto 3xl:w-[221.31px] shrink-0"
              />
            </Link>
          </div>
          <div className="pl-70">
            <SectionHeading
              title={`${tab === "agency" ? "Agency" : "Individual"} Onboarding`}
              className="text-white max-w-[445px]"
            />
            <motion.p
              key={tab}
              initial={{ opacity: 0.6, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-20 text-description text-white/80 max-w-[445px]"
            >
              Note: Please complete the form in one session, as progress may not
              be saved if you exit midway.
            </motion.p>
          </div>
        </div>
      </div>

      {/* RIGHT: scrollable form area */}
      <div className="flex flex-1 flex-col overflow-hidden bg-white pt-100 px-70">
        {/* Tab switcher */}
        <div className="inline-flex self-start relative rounded-full h-[70px] max-w-[565px] bg-primary/5 mb-70">
          {/* Sliding background pill */}
          <div
            className="absolute top-0 h-full w-1/2 rounded-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{
              transform:
                tab === "agency" ? "translateX(0%)" : "translateX(100%)",
            }}
          />

          {(["agency", "individual"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => onTabChange(t)}
              className={`relative z-10 w-1/2 flex items-center justify-center rounded-full px-80 py-[18px] 3xl:px-[94px] font-[optima] leading-[1.4] uppercase -tracking-[0.02em] text-25 transition-colors duration-300 cursor-pointer ${
                tab === t ? "text-white" : "text-foreground"
              }`}
            >
              {t === "agency" ? "Agency" : "Individual"}
            </button>
          ))}
        </div>

        {/* Step breadcrumb */}
        <motion.div
          key={tab}
          variants={moveUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          ref={breadcrumbRef}
          className="relative flex flex-wrap xl:flex-nowrap items-center xl:justify-between pr-30 3xl:pr-[34px] gap-y-20 gap-x-60 lg:gap-x-30 2xl:gap-x-40 3xl:gap-x-60 border-b border-gray-200"
        >
          {steps.map((s, i) => {
            const isActive = s.key === currentStep;
            const isCompleted =
              tab === "agency"
                ? completedAgencySteps.includes(s.key as AgencyStep)
                : completedIndividualSteps.includes(s.key as IndividualStep);

            return (
              <button
                key={s.key}
                ref={(el) => {
                  buttonRefs.current[i] = el;
                }}
                onClick={() =>
                  tab === "agency"
                    ? onAgencyStepChange(s.key as AgencyStep)
                    : onIndividualStepChange(s.key as IndividualStep)
                }
                className={`flex items-center gap-[10px] pb-[14px] text-description transition-all cursor-pointer ${
                  isActive
                    ? "font-bold text-primary"
                    : isCompleted
                      ? "text-primary"
                      : "text-foreground-light"
                }`}
              >
                {s.label}
                {isCompleted && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <Image
                      src="/icons/check.svg"
                      alt="Imtiaz"
                      width={20}
                      height={20}
                      priority
                      className="h-[7.2px] w-auto"
                    />
                  </span>
                )}
              </button>
            );
          })}
          {segments.map((seg) => (
            <StepUnderline key={seg.key} left={seg.left} width={seg.width} />
          ))}
        </motion.div>

        {/* Form slot — only this scrolls */}
        <motion.div
          key={currentStep}
          variants={moveUp(0.2)}
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          data-lenis-prevent
          className="flex-1 overflow-y-auto mt-70 pb-100"
        >
          {tab === "agency" && agencyStep === "company" && (
            <CompanyInformation
              savedData={agencyFormData.company}
              onNext={(data) => {
                onSaveAgencyStepData("company", data);
                onStepComplete("company");
                onAgencyStepChange("signatory");
              }}
            />
          )}
          {tab === "agency" && agencyStep === "signatory" && (
            <SignatoryDetails
              savedData={agencyFormData.signatory}
              onPrev={() => onAgencyStepChange("company")}
              onNext={(data) => {
                onSaveAgencyStepData("signatory", data);
                onStepComplete("signatory");
                onAgencyStepChange("broker");
              }}
            />
          )}
          {tab === "agency" && agencyStep === "broker" && (
            <BrokerDetails
              savedData={agencyFormData.broker}
              onPrev={() => onAgencyStepChange("signatory")}
              onNext={(data) => {
                onSaveAgencyStepData("broker", data);
                onStepComplete("broker");
                onAgencyStepChange("bank");
              }}
            />
          )}
          {tab === "agency" && agencyStep === "bank" && (
            <BankInfo
              savedData={agencyFormData.bank}
              onPrev={() => onAgencyStepChange("broker")}
              onNext={(data) => {
                onSaveAgencyStepData("bank", data);
                onStepComplete("bank");
                onAgencyStepChange("documents");
              }}
            />
          )}
          {tab === "agency" && agencyStep === "documents" && (
            <Documents
              savedData={agencyFormData.documents}
              onPrev={() => onAgencyStepChange("bank")}
              onNext={(data) => {
                onSaveAgencyStepData("documents", data);
                onStepComplete("documents");
                onAgencyStepChange("submit");
              }}
            />
          )}
          {tab === "agency" && agencyStep === "submit" && (
            <PreviewSubmit
              agencyFormData={agencyFormData}
              onAgencyFormDataChange={onAgencyFormDataChange}
              onPrev={() => onAgencyStepChange("documents")}
              onSubmit={() => console.log("Final submit", agencyFormData)}
            />
          )}

          {tab === "individual" && individualStep === "agentDetails" && (
            <AgentDetails
              savedData={individualFormData.agentDetails}
              onNext={(data) => {
                onSaveIndividualStepData("agentDetails", data);
                onStepComplete("agentDetails");
                onIndividualStepChange("bankInfo");
              }}
            />
          )}
          {tab === "individual" && individualStep === "bankInfo" && (
            <IndividualBankInfo
              savedData={individualFormData.bankInfo}
              onPrev={() => onIndividualStepChange("agentDetails")}
              onNext={(data) => {
                onSaveIndividualStepData("bankInfo", data);
                onStepComplete("bankInfo");
                onIndividualStepChange("documents");
              }}
            />
          )}
          {tab === "individual" && individualStep === "documents" && (
            <IndividualDocuments
              savedData={individualFormData.documents}
              onPrev={() => onIndividualStepChange("bankInfo")}
              onNext={(data) => {
                onSaveIndividualStepData("documents", data);
                onStepComplete("documents");
                onIndividualStepChange("previewSubmit");
              }}
            />
          )}
          {tab === "individual" && individualStep === "previewSubmit" && (
            <IndividualPreviewSubmit
              individualFormData={individualFormData}
              onIndividualFormDataChange={onIndividualFormDataChange}
              onPrev={() => onIndividualStepChange("documents")}
              onSubmit={() =>
                console.log("Final individual submit", individualFormData)
              }
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
