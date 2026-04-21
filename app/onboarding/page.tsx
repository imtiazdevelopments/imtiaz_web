'use client'

import { useState } from 'react'
import OnboardingIndex from '@/app/components/onboarding/Index'

export type Tab = 'agency' | 'individual'
export type AgencyStep = 'company' | 'signatory' | 'broker' | 'bank' | 'documents' | 'submit'
export type IndividualStep = 'agentDetails' | 'bankInfo' | 'documents' | 'previewSubmit'

export interface CompanyInformationData {
  agencySubType: string
  agencyName: string
  tradeLicenseNo: string
  tradeLicenseExpiry: string
  headOfSales: string
  agencyPhone: string
  headOfSalesEmail: string
  companyEmail: string
  countryCode: string
  companyPhone: string
  source: string
  officeUnitNo: string
  buildingName: string
  country: string
  city: string
  poBox: string
  companyRERA: string
  companyRERAExpiry: string
  haveTRN: string
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
  name: string; email: string; countryCode: string;
  signatoryCardNo: string; signatoryCardExpiry: string;
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

export interface AgencyFormData {
  company?: Partial<CompanyInformationData>
  signatory?: Partial<SignatoryDetailsData>;
  broker?: Partial<BrokerDetailsData>; 
  bank?: Partial<BankInfoData>; 
  documents?: Partial<DocumentsData>; 
}

export default function OnboardingPage() {
  const [tab, setTab] = useState<Tab>('agency')
  const [agencyStep, setAgencyStep] = useState<AgencyStep>('company')
  const [individualStep, setIndividualStep] = useState<IndividualStep>('agentDetails')
  const [completedSteps, setCompletedSteps] = useState<{
    agency: AgencyStep[]
    individual: IndividualStep[]
  }>({ agency: [], individual: [] })
  const [agencyFormData, setAgencyFormData] = useState<AgencyFormData>({})

  const handleTabChange = (newTab: Tab) => {
    setTab(newTab)
    setAgencyStep('company')
    setIndividualStep('agentDetails')
  }

  const markStepComplete = (step: AgencyStep | IndividualStep) => {
    if (tab === 'agency') {
      setCompletedSteps(prev => ({
        ...prev,
        agency: prev.agency.includes(step as AgencyStep)
          ? prev.agency
          : [...prev.agency, step as AgencyStep],
      }))
    } else {
      setCompletedSteps(prev => ({
        ...prev,
        individual: prev.individual.includes(step as IndividualStep)
          ? prev.individual
          : [...prev.individual, step as IndividualStep],
      }))
    }
  }

  const handleAgencyFormDataChange = (updated: AgencyFormData) => {
  setAgencyFormData(updated);
};

const saveAgencyStepData = <K extends keyof AgencyFormData>(step: K, data: AgencyFormData[K]) => {
  setAgencyFormData(prev => ({ ...prev, [step]: data }))
}

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
    />
  )
}