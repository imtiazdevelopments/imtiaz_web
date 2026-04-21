"use client";

import type {
  AgencyFormData,
  AgencyStep,
  IndividualStep,
  Tab,
} from "@/app/onboarding/page";
import Image from "next/image";
import Link from "next/link";
import CompanyInformation from "./sections/Agency/CompanyInformation";
import SignatoryDetails from "./sections/Agency/SignatoryDetails";
import BrokerDetails from "./sections/Agency/BrokerDetails";
import BankInfo from "./sections/Agency/BankInfo";
import Documents from "./sections/Agency/Documents";
import PreviewSubmit from "./sections/Agency/PreviewSubmit";

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
}: OnboardingIndexProps) {
  const steps = tab === "agency" ? AGENCY_STEPS : INDIVIDUAL_STEPS;
  const currentStep = tab === "agency" ? agencyStep : individualStep;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── LEFT: sticky panel, never scrolls ── */}
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
        <div className="absolute inset-0 z-[2] flex flex-col py-90 3xl:py-[93px]">
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/icons/layout_icons/header-logo.svg"
                alt="Imtiaz"
                width={183}
                height={50}
                priority
                className="h-[45px] lg:h-[50px] 2xl:h-[62px] w-auto"
              />
            </Link>
          </div>
          <div className="mt-auto pl-70">
            <h1 className="text-heading text-white">
              {tab === "agency" ? "Agency" : "Individual"}
              <br />
              Onboarding
            </h1>
            <p className="mt-20 text-description text-white/80 max-w-[445px]">
              Note: Please complete the form in one session, as progress may not
              be saved if you exit midway.
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: static container ── */}
      <div className="flex flex-1 flex-col overflow-hidden bg-white pt-100 px-70">
        {/* Tab switcher — never scrolls */}
        <div className="inline-flex self-start rounded-full h-[70px] max-w-[565px] bg-primary/5 mb-70">
          {(["agency", "individual"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => onTabChange(t)}
              className={`rounded-full px-90 py-[18px] 3xl:px-[94px] font-[optima] leading-[1.4] uppercase -tracking-[0.02em] text-25 transition-all cursor-pointer ${
                tab === t ? "bg-primary text-white" : "text-foreground"
              }`}
            >
              {t === "agency" ? "Agency" : "Individual"}
            </button>
          ))}
        </div>

        {/* Step breadcrumb — never scrolls */}
        <div className="flex flex-wrap items-center xl:justify-between pr-30 3xl:pr-[34px] gap-y-20 gap-x-60 border-b border-gray-200">
          {steps.map((s) => {
            const isActive = s.key === currentStep;
            const isCompleted =
              tab === "agency"
                ? completedAgencySteps.includes(s.key as AgencyStep)
                : completedIndividualSteps.includes(s.key as IndividualStep);

            return (
              <button
                key={s.key}
                onClick={() =>
                  tab === "agency"
                    ? onAgencyStepChange(s.key as AgencyStep)
                    : onIndividualStepChange(s.key as IndividualStep)
                }
                className={`flex items-center gap-[10px] pb-[14px] text-description transition-all cursor-pointer ${
                  isActive
                    ? "border-b-[3px] border-primary"
                    : isCompleted
                      ? "text-primary"
                      : "text-foreground-light"
                }`}
              >
                {s.label}
                {isCompleted && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <Image src="/icons/check.svg" alt="Imtiaz" width={20} height={20} priority className="h-[7.2px] w-auto" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Form slot — only this scrolls ── */}
        <div data-lenis-prevent className="flex-1 overflow-y-auto mt-70 pb-100">
          {/* Agency forms */}
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

          {/* Individual forms */}
          {tab === "individual" && individualStep === "agentDetails" && (
            <div>Agent Details form</div>
          )}
          {tab === "individual" && individualStep === "bankInfo" && (
            <div>Bank Info form</div>
          )}
          {tab === "individual" && individualStep === "documents" && (
            <div>Documents form</div>
          )}
          {tab === "individual" && individualStep === "previewSubmit" && (
            <div>Preview & Submit form</div>
          )}
        </div>
      </div>
    </div>
  );
}
