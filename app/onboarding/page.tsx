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

export interface AgencyFormData {
  company?: Partial<CompanyInformationData>
    signatory?: Partial<SignatoryDetailsData>;
  // add more steps here as you build them
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
      onSaveAgencyStepData={saveAgencyStepData}
    />
  )
}