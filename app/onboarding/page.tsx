"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import OnboardingIndex from "@/app/components/onboarding/Index";
import { useUtm } from "@/hooks/useUtm";
import { submitOnboardingLead } from "@/lib/submitOnboarding";

export type Tab = "agency" | "individual";
export type AgencyStep =
  | "company"
  | "signatory"
  | "broker"
  | "bank"
  | "documents"
  | "submit";
export type IndividualStep =
  | "agentDetails"
  | "bankInfo"
  | "documents"
  | "previewSubmit";

export interface CompanyInformationData {
  agencySubType: string;
  agencyName: string;
  tradeLicenseNo: string;
  tradeLicenseExpiry: string;
  headOfSales: string;
  agencyPhone: string;
  headOfSalesEmail: string;
  companyEmail: string;
  countryCode: string;
  companyPhone: string;
  source: string;
  officeUnitNo: string;
  buildingName: string;
  country: string;
  city: string;
  poBox: string;
  companyRERA: string;
  companyRERAExpiry: string;
  haveTRN: string;
}

export interface SignatoryDetailsData {
  // Owner Details
  ownerFirstName: string;
  ownerLastName: string;
  ownerEmiratesId: string;
  ownerEidExpiry: string;
  ownerPassportNo: string;
  ownerPassportExpiry: string;
  ownerCountryCode: string;
  ownerMobile: string;
  ownerNationality: string;
  ownerEmail: string;
  ownerBrokerCardNo: string;
  ownerBrokerCardExpiry: string;
  ownerAndSignatoryAreSame: boolean;

  // Authorized Signatory Details (shown only if checkbox is unchecked)
  authFirstName: string;
  authLastName: string;
  authEmiratesId: string;
  authEidExpiry: string;
  authPassportNo: string;
  authPassportExpiry: string;
  authCountryCode: string;
  authMobile: string;
  authNationality: string;
  authEmail: string;
  authSignatoryCardNo: string;
  authSignatoryCardExpiry: string;
}

export interface BrokerEntry {
  name: string;
  email: string;
  countryCode: string;
  signatoryCardNo: string;
  signatoryCardExpiry: string;
}
export interface BrokerDetailsData {
  brokers: BrokerEntry[];
}

export interface BankInfoData {
  bankDetailAvailable: string;
  bankName: string;
  bankAccountNo: string;
  beneficiaryName: string;
  ibanNo: string;
  swiftCode: string;
  currency: string;
  bankBranchName: string;
  bankAddress: string;
}

export interface DocumentsData {
  tradeLicense: File | null;
  visaOwner: File | null;
  eidOwner: File | null;
  passportCopyOwner: File | null;
  nonVatDeclaration: File | null;
  passportCopySignatory: File | null;
  visaSignatory: File | null;
  eidSignatory: File | null;
  vatCertificate: File | null;
  moaPoa: File | null;
  bankDetailsLetterHead: File | null;
  otherDocuments: File | null;
}

export interface AgentDetailsData {
  // Owner Details
  ownerFirstName: string;
  ownerLastName: string;
  ownerEmiratesId: string;
  ownerEidExpiry: string;
  ownerPassportNo: string;
  ownerPassportExpiry: string;
  ownerCountryCode: string;
  ownerMobile: string;
  ownerNationality: string;
  ownerEmail: string;
  ownerBrokerCardNo: string;
  ownerBrokerCardExpiry: string;
  ownerAndSignatoryAreSame: boolean;

  // Authorized Signatory Details
  authFirstName: string;
  authLastName: string;
  authSource: string;
  authEmail: string;
  authCountryCode: string;
  authPhone: string;
  authCountry: string;
  authCity: string;
  authEmiratesId: string;
  authEidExpiry: string;
  authPassportNo: string;
  authPassportExpiry: string;
  authBrokerCardNo: string;
  authBrokerCardExpiry: string;
}

export interface IndividualBankInfoData {
  bankDetailAvailable: string;
  bankName: string;
  bankAccountNo: string;
  ibanNo: string;
  swiftCode: string;
  currency: string;
  bankBranchName: string;
  bankAddress: string;
}

export interface IndividualDocumentsData {
  passportCopySignatory: File | null;
  visaSignatory: File | null;
  eidSignatory: File | null;
  individualPassport: File | null;
  passportCopyOwner: File | null;
  eidOwner: File | null;
  visaOwner: File | null;
}

export interface AgencyFormData {
  company?: Partial<CompanyInformationData>;
  signatory?: Partial<SignatoryDetailsData>;
  broker?: Partial<BrokerDetailsData>;
  bank?: Partial<BankInfoData>;
  documents?: Partial<DocumentsData>;
}

export interface IndividualFormData {
  agentDetails?: Partial<AgentDetailsData>;
  bankInfo?: Partial<IndividualBankInfoData>;
  documents?: Partial<IndividualDocumentsData>;
}

function OnboardingPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { buildUtmPayload } = useUtm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const initialTab =
    (searchParams.get("tab") as Tab) === "individual" ? "individual" : "agency";
  const [tab, setTab] = useState<Tab>(initialTab);
  const [agencyStep, setAgencyStep] = useState<AgencyStep>("company");
  const [individualStep, setIndividualStep] =
    useState<IndividualStep>("agentDetails");
  const [completedSteps, setCompletedSteps] = useState<{
    agency: AgencyStep[];
    individual: IndividualStep[];
  }>({ agency: [], individual: [] });
  const [agencyFormData, setAgencyFormData] = useState<AgencyFormData>({});
  const [individualFormData, setIndividualFormData] =
    useState<IndividualFormData>({});

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [tab]);

  const handleTabChange = (newTab: Tab) => {
    setTab(newTab);
    setAgencyStep("company");
    setIndividualStep("agentDetails");
  };

  const markStepComplete = (step: AgencyStep | IndividualStep) => {
    if (tab === "agency") {
      setCompletedSteps((prev) => ({
        ...prev,
        agency: prev.agency.includes(step as AgencyStep)
          ? prev.agency
          : [...prev.agency, step as AgencyStep],
      }));
    } else {
      setCompletedSteps((prev) => ({
        ...prev,
        individual: prev.individual.includes(step as IndividualStep)
          ? prev.individual
          : [...prev.individual, step as IndividualStep],
      }));
    }
  };

  const handleAgencyFormDataChange = (updated: AgencyFormData) => {
    setAgencyFormData(updated);
  };

  const handleIndividualFormDataChange = (updated: IndividualFormData) => {
    setIndividualFormData(updated);
  };

  const saveAgencyStepData = <K extends keyof AgencyFormData>(
    step: K,
    data: AgencyFormData[K],
  ) => {
    setAgencyFormData((prev) => ({ ...prev, [step]: data }));
  };

  const saveIndividualStepData = <K extends keyof IndividualFormData>(
    step: K,
    data: IndividualFormData[K],
  ) => {
    setIndividualFormData((prev) => ({ ...prev, [step]: data }));
  };


  const handleAgencySubmit = async () => {
    const company = agencyFormData.company;
    const signatory = agencyFormData.signatory;

    console.log(company,signatory)
    if (!company || !signatory) return;

    setSubmitLoading(true);
    setSubmitError(null);

    try {
      const result = await submitOnboardingLead({
        firstName: signatory.ownerFirstName || "",
        lastName: signatory.ownerLastName || "",
        email: signatory.ownerEmail || "",
        mobile: company.agencyPhone || "",
        message: `Agency onboarding: ${company.agencyName}`,
        utm: buildUtmPayload(),
        landingPageName:"onboarding"
      });

      if (result.success) {
        console.log("Submitted successfully", result);
        // show success UI
      } else {
        setSubmitError("Submission failed. Please try again.");
      }
    } catch {
      setSubmitError("Something went wrong.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleIndividualSubmit = async () => {
    const agentDetails = individualFormData.agentDetails;
    if (!agentDetails) return;

    setSubmitLoading(true);
    setSubmitError(null);

    try {
      const result = await submitOnboardingLead({
        firstName: agentDetails?.ownerFirstName || "",
        lastName: agentDetails?.ownerLastName || "",
        email: agentDetails?.ownerEmail || "",
        mobile: agentDetails?.ownerMobile || "",
        message: "Individual agent onboarding",
        utm: buildUtmPayload(),
        landingPageName:"onboarding"
      });

      if (result.success) {
        console.log("Submitted successfully", result);
      } else {
        setSubmitError("Submission failed. Please try again.");
      }
    } catch {
      setSubmitError("Something went wrong.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <OnboardingIndex
      tab={tab}
      agencyStep={agencyStep}
      individualStep={individualStep}
      onTabChange={handleTabChange}
      onAgencyStepChange={setAgencyStep}
      onIndividualStepChange={setIndividualStep}
      completedAgencySteps={completedSteps.agency}
      completedIndividualSteps={completedSteps.individual}
      onStepComplete={markStepComplete}
      agencyFormData={agencyFormData}
      onAgencyFormDataChange={handleAgencyFormDataChange}
      onSaveAgencyStepData={saveAgencyStepData}
      individualFormData={individualFormData}
      onSaveIndividualStepData={saveIndividualStepData}
      onIndividualFormDataChange={handleIndividualFormDataChange}
      submitLoading={submitLoading}
      submitError={submitError}
      onAgencySubmit={()=>console.log("Submitted")}       // replaces console.log in PreviewSubmit
      onIndividualSubmit={()=>console.log("Submitted")}
    />
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingPageInner />
    </Suspense>
  );
}
