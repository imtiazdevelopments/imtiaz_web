"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import FormInput from "@/app/components/onboarding/fields/FormInput";
import FormSelect from "@/app/components/onboarding/fields/FormSelect";
import FormDatePicker from "@/app/components/onboarding/fields/FormDatePicker";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";
import { AgentDetailsData } from "@/app/onboarding/page";

interface Props {
  onNext: (data: AgentDetailsData) => void;
  savedData?: Partial<AgentDetailsData>;
}

const COUNTRY_CODE_OPTIONS = [
  { label: "+971", value: "+971" },
  { label: "+1", value: "+1" },
  { label: "+44", value: "+44" },
  { label: "+91", value: "+91" },
];

const NATIONALITY_OPTIONS = [
  { label: "Emirati", value: "emirati" },
  { label: "Indian", value: "indian" },
  { label: "British", value: "british" },
  { label: "American", value: "american" },
  { label: "Other", value: "other" },
];

const COUNTRY_OPTIONS = [
  { label: "UAE", value: "uae" },
  { label: "India", value: "india" },
  { label: "UK", value: "uk" },
  { label: "USA", value: "usa" },
];

const SOURCE_OPTIONS = [
  { label: "Referral", value: "referral" },
  { label: "Website", value: "website" },
  { label: "Social Media", value: "social_media" },
  { label: "Other", value: "other" },
];

export default function AgentDetails({ onNext, savedData }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AgentDetailsData>({
    mode: "onSubmit",
    defaultValues: { ownerAndSignatoryAreSame: false, ...savedData },
  });

  const ownerAndSignatoryAreSame = useWatch({
    control,
    name: "ownerAndSignatoryAreSame",
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="w-full">
      <h2 className="text-[24px] lg:text-[30px] text-heading text-primary mb-50">Agent Details</h2>

      {/* Owner Details */}
      <h3 className="text-25 font-[optima] leading-[1.4] mb-30 uppercase -tracking-[0.02em]">
        Owner Details
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
        <FormInput
          placeholder="Owner First Name"
          {...register("ownerFirstName", { required: "Required" })}
          error={errors.ownerFirstName?.message}
        />
        <FormInput
          placeholder="Owner Last Name"
          {...register("ownerLastName", { required: "Required" })}
          error={errors.ownerLastName?.message}
        />
        <FormInput
          placeholder="Owner Emirates Id No"
          {...register("ownerEmiratesId", { required: "Required" })}
          error={errors.ownerEmiratesId?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
        <Controller
          name="ownerEidExpiry"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormDatePicker
              placeholder="Owner EID Expiry Date"
              value={field.value}
              onChange={field.onChange}
              error={errors.ownerEidExpiry?.message}
            />
          )}
        />
        <FormInput
          placeholder="Owner Passport No"
          {...register("ownerPassportNo", { required: "Required" })}
          error={errors.ownerPassportNo?.message}
        />
        <Controller
          name="ownerPassportExpiry"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormDatePicker
              placeholder="Owner Passport Expiry Date"
              value={field.value}
              onChange={field.onChange}
              error={errors.ownerPassportExpiry?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
        <Controller
          name="ownerCountryCode"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormSelect
              placeholder="Owner Country Code"
              options={COUNTRY_CODE_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.ownerCountryCode?.message}
            />
          )}
        />
        <FormInput
          placeholder="Owner Mobile"
          {...register("ownerMobile", { required: "Required" })}
          error={errors.ownerMobile?.message}
        />
        <Controller
          name="ownerNationality"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormSelect
              placeholder="Owner Nationality"
              options={NATIONALITY_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.ownerNationality?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-[10px]">
        <FormInput
          placeholder="Owner Email"
          {...register("ownerEmail", { required: "Required" })}
          error={errors.ownerEmail?.message}
        />
        <FormInput
          placeholder="Owner Broker Card No"
          {...register("ownerBrokerCardNo")}
          error={errors.ownerBrokerCardNo?.message}
        />
        <Controller
          name="ownerBrokerCardExpiry"
          control={control}
          render={({ field }) => (
            <FormDatePicker
              placeholder="Owner Broker Card Expiry Date"
              value={field.value}
              onChange={field.onChange}
              error={errors.ownerBrokerCardExpiry?.message}
            />
          )}
        />
      </div>

      {/* Checkbox */}
      <label
        className={`flex items-center gap-10 cursor-pointer ${ownerAndSignatoryAreSame ? "mb-100" : "mb-70"}`}
      >
        <Controller
          name="ownerAndSignatoryAreSame"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              checked={field.value}
              onChange={field.onChange}
              className="w-[18px] h-[18px] accent-primary cursor-pointer"
            />
          )}
        />
        <span className="text-description text-foreground">
          Owner and Authorized Signatory are Same
        </span>
      </label>

      {/* Authorized Signatory Details — hidden when checkbox is checked */}
      {!ownerAndSignatoryAreSame && (
        <>
          <h3 className="text-25 font-[optima] leading-[1.4] mb-30 uppercase -tracking-[0.02em]">
            Authorized Signatory Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
            <FormInput
              placeholder="Authorized Signatory First Name"
              {...register("authFirstName", { required: "Required" })}
              error={errors.authFirstName?.message}
            />
            <FormInput
              placeholder="Authorized Signatory Last Name"
              {...register("authLastName", { required: "Required" })}
              error={errors.authLastName?.message}
            />
            <Controller
              name="authSource"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <FormSelect
                  placeholder="Source"
                  options={SOURCE_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.authSource?.message}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
            <FormInput
              placeholder="Email"
              {...register("authEmail", { required: "Required" })}
              error={errors.authEmail?.message}
            />
            <Controller
              name="authCountryCode"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <FormSelect
                  placeholder="Country Code"
                  options={COUNTRY_CODE_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.authCountryCode?.message}
                />
              )}
            />
            <FormInput
              placeholder="Phone"
              {...register("authPhone", { required: "Required" })}
              error={errors.authPhone?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
            <Controller
              name="authCountry"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <FormSelect
                  placeholder="Country"
                  options={COUNTRY_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.authCountry?.message}
                />
              )}
            />
            <FormInput
              placeholder="City"
              {...register("authCity", { required: "Required" })}
              error={errors.authCity?.message}
            />
            <FormInput
              placeholder="Authorized Signatory Emirates Id No"
              {...register("authEmiratesId", { required: "Required" })}
              error={errors.authEmiratesId?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-60 gap-y-30 mb-40">
            <Controller
              name="authEidExpiry"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <FormDatePicker
                  placeholder="Authorized Signatory EID Expiry Date"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.authEidExpiry?.message}
                />
              )}
            />
            <FormInput
              placeholder="Authorized Signatory Passport No"
              {...register("authPassportNo", { required: "Required" })}
              error={errors.authPassportNo?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-60 gap-y-30 mb-40">
            <Controller
              name="authPassportExpiry"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <FormDatePicker
                  placeholder="Authorized Signatory Passport Expiry Date"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.authPassportExpiry?.message}
                />
              )}
            />
            <FormInput
              placeholder="Authorized Signatory Broker Card No"
              {...register("authBrokerCardNo")}
              error={errors.authBrokerCardNo?.message}
            />
          </div>
          <div className="grid grid-cols-1">
            <Controller
              name="authBrokerCardExpiry"
              control={control}
              render={({ field }) => (
                <FormDatePicker
                  placeholder="Authorized Signatory Broker Card Expiry Date"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.authBrokerCardExpiry?.message}
                />
              )}
            />
          </div>
        </>
      )}

      <div className="mt-50 flex items-center gap-20">
        <CustomOutlineButton
          onClick={handleSubmit(onNext)}
          variant="dark"
          text="Next"
          borderColor="border-primary-2"
          textColor="text-primary-2"
          px="px-[25px] 3xl:px-[64px]"
          className="h-[44px] md:h-[50px]  xl:h-[66px] uppercase max-w-[180px]"
        />
      </div>
    </form>
  );
}
