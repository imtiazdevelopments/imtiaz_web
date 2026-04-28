"use client";

import { useForm, Controller } from "react-hook-form";
import FormInput from "@/app/components/onboarding/fields/FormInput";
import FormSelect from "@/app/components/onboarding/fields/FormSelect";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";
import FormDatePicker from "../../fields/FormDatePicker";
import { CompanyInformationData } from "@/app/onboarding/page";

interface Props {
  onNext: (data: CompanyInformationData) => void;
  savedData?: Partial<CompanyInformationData>;
}

const AGENCY_SUB_TYPES = [
  { label: "Real Estate", value: "real_estate" },
  { label: "Mortgage", value: "mortgage" },
  { label: "Property Management", value: "property_management" },
];

const SOURCES = [
  { label: "Referral", value: "referral" },
  { label: "Online", value: "online" },
  { label: "Walk-in", value: "walk_in" },
];

const COUNTRIES = [
  { label: "United Arab Emirates", value: "uae" },
  { label: "Saudi Arabia", value: "ksa" },
  { label: "United Kingdom", value: "uk" },
];

const COUNTRY_CODES = [
  { label: "+971 (UAE)", value: "+971" },
  { label: "+966 (KSA)", value: "+966" },
  { label: "+44 (UK)", value: "+44" },
];

const CITIES = [
  { label: "Dubai", value: "dubai" },
  { label: "Abu Dhabi", value: "abu_dhabi" },
  { label: "Sharjah", value: "sharjah" },
];

const OFFICE_UNITS = [
  { label: "Unit 1", value: "unit_1" },
  { label: "Unit 2", value: "unit_2" },
];

const TRN_OPTIONS = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export default function CompanyInformation({ onNext, savedData }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CompanyInformationData>({
    mode: "onSubmit",
    defaultValues: savedData ?? {}, // ← re-hydrates saved data
  });

  const onSubmit = (data: CompanyInformationData) => {
    onNext(data); // ← passes data up instead of just calling onNext()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Title */}
      <h2 className="text-heading text-primary mb-50">Company Information</h2>

      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
        <Controller
          name="agencySubType"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormSelect
              placeholder="Agency Sub Type"
              options={AGENCY_SUB_TYPES}
              value={field.value}
              onChange={field.onChange}
              error={errors.agencySubType?.message}
            />
          )}
        />
        <FormInput
          placeholder="Agency Name (as per trade license)"
          {...register("agencyName", { required: "Required" })}
          error={errors.agencyName?.message}
        />
        <FormInput
          placeholder="Trade License No/Registration No"
          {...register("tradeLicenseNo", { required: "Required" })}
          error={errors.tradeLicenseNo?.message}
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
        <Controller
          name="tradeLicenseExpiry"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormDatePicker
              placeholder="Trade License Expire Date"
              value={field.value}
              onChange={field.onChange}
              error={errors.tradeLicenseExpiry?.message}
            />
          )}
        />
        <FormInput
          placeholder="Head of Sales"
          {...register("headOfSales", { required: "Required" })}
          error={errors.headOfSales?.message}
        />
        <FormInput
          placeholder="Agency Phone No"
          {...register("agencyPhone", { required: "Required" })}
          error={errors.agencyPhone?.message}
        />
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
        <FormInput
          placeholder="Head of Sales Email"
          type="email"
          {...register("headOfSalesEmail", {
            required: "Required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
          })}
          error={errors.headOfSalesEmail?.message}
        />
        <FormInput
          placeholder="Company Registered Email"
          type="email"
          {...register("companyEmail", {
            required: "Required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
          })}
          error={errors.companyEmail?.message}
        />
        <Controller
          name="countryCode"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormSelect
              placeholder="Country Code"
              options={COUNTRY_CODES}
              value={field.value}
              onChange={field.onChange}
              error={errors.countryCode?.message}
            />
          )}
        />
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
        <FormInput
          placeholder="Company Phone No"
          {...register("companyPhone", { required: "Required" })}
          error={errors.companyPhone?.message}
        />
        <Controller
          name="source"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormSelect
              placeholder="Source"
              options={SOURCES}
              value={field.value}
              onChange={field.onChange}
              error={errors.source?.message}
            />
          )}
        />
        <Controller
          name="officeUnitNo"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormSelect
              placeholder="Office Unit No"
              options={OFFICE_UNITS}
              value={field.value}
              onChange={field.onChange}
              error={errors.officeUnitNo?.message}
            />
          )}
        />
      </div>

      {/* Row 5 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
        <FormInput
          placeholder="Building Name"
          {...register("buildingName", { required: "Required" })}
          error={errors.buildingName?.message}
        />
        <Controller
          name="country"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormSelect
              placeholder="Country"
              options={COUNTRIES}
              value={field.value}
              onChange={field.onChange}
              error={errors.country?.message}
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormSelect
              placeholder="City"
              options={CITIES}
              value={field.value}
              onChange={field.onChange}
              error={errors.city?.message}
            />
          )}
        />
      </div>

      {/* Row 6 — 2 cols */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-60 gap-y-30 mb-40">
        <FormInput
          placeholder="Po Box"
          {...register("poBox")}
          error={errors.poBox?.message}
        />
        <FormInput
          placeholder="Company RERA (QRN No.)"
          {...register("companyRERA", { required: "Required" })}
          error={errors.companyRERA?.message}
        />
      </div>

      {/* Row 7 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-60 gap-y-30 mb-40">
        <Controller
          name="companyRERAExpiry"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormDatePicker
              placeholder="Company RERA Registration Expiry"
              value={field.value}
              onChange={field.onChange}
              error={errors.companyRERAExpiry?.message}
            />
          )}
        />
        <Controller
          name="haveTRN"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormSelect
              placeholder="Have TRN ?"
              options={TRN_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.haveTRN?.message}
            />
          )}
        />
      </div>

      {/* Next button */}
      <div className="mt-50">
        <CustomOutlineButton
          onClick={handleSubmit(onSubmit)}
          variant="dark"
          text="Next"
          borderColor="border-primary-2"
          textColor="text-foreground-light"
          px="px-[25px] 3xl:px-[64px]"
          className="h-[44px] md:h-[50px]  xl:h-[66px] uppercase max-w-[180px]"
        />
      </div>
    </form>
  );
}
