"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import FormInput from "@/app/components/onboarding/fields/FormInput";
import FormSelect from "@/app/components/onboarding/fields/FormSelect";
import FormDatePicker from "@/app/components/onboarding/fields/FormDatePicker";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";
import { SignatoryDetailsData } from "@/app/onboarding/page";

interface Props {
  onNext: (data: SignatoryDetailsData) => void;
  onPrev: () => void;
  savedData?: Partial<SignatoryDetailsData>;
}

const COUNTRY_CODES = [
  { label: "+971 (UAE)", value: "+971" },
  { label: "+966 (KSA)", value: "+966" },
  { label: "+44 (UK)", value: "+44" },
  { label: "+91 (India)", value: "+91" },
];

const NATIONALITIES = [
  { label: "Emirati", value: "emirati" },
  { label: "Indian", value: "indian" },
  { label: "British", value: "british" },
  { label: "Pakistani", value: "pakistani" },
  { label: "Other", value: "other" },
];

export default function SignatoryDetails({ onNext, onPrev, savedData }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignatoryDetailsData>({
    mode: "onSubmit",
    defaultValues: savedData ?? { ownerAndSignatoryAreSame: false },
  });

  // Watch the checkbox to conditionally show/hide Authorized Signatory section
  const sameAsOwner = useWatch({ control, name: "ownerAndSignatoryAreSame" });

  const onSubmit = (data: SignatoryDetailsData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Title */}
      <h2 className="text-heading text-primary mb-50">Signatory Details</h2>

      {/* ── OWNER DETAILS ── */}
      <h3 className="text-description uppercase tracking-widest text-foreground mb-30">
        Owner Details
      </h3>

      {/* Row 1 */}
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

      {/* Row 2 */}
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

      {/* Row 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
        <Controller
          name="ownerCountryCode"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormSelect
              placeholder="Owner Country Code"
              options={COUNTRY_CODES}
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
              options={NATIONALITIES}
              value={field.value}
              onChange={field.onChange}
              error={errors.ownerNationality?.message}
            />
          )}
        />
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
        <FormInput
          placeholder="Owner Email"
          type="email"
          {...register("ownerEmail", {
            required: "Required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
          })}
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
      <div className="mb-50">
        <label className="flex items-center gap-10 cursor-pointer select-none">
          <input
            type="checkbox"
            className="h-[18px] w-[18px] accent-primary cursor-pointer"
            {...register("ownerAndSignatoryAreSame")}
          />
          <span className="text-description text-foreground">
            Owner and Authorized Signatory are Same
          </span>
        </label>
      </div>

      {/* ── AUTHORIZED SIGNATORY DETAILS (hidden when checkbox is ticked) ── */}
      {!sameAsOwner && (
        <>
          <h3 className="text-description uppercase tracking-widest text-foreground mb-30">
            Authorized Signatory Details
          </h3>

          {/* Row 1 */}
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
            <FormInput
              placeholder="Authorized Signatory Emirates Id No"
              {...register("authEmiratesId", { required: "Required" })}
              error={errors.authEmiratesId?.message}
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
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
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
            <Controller
              name="authCountryCode"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <FormSelect
                  placeholder="Authorized Signatory Country Code"
                  options={COUNTRY_CODES}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.authCountryCode?.message}
                />
              )}
            />
            <FormInput
              placeholder="Authorized Signatory Mobile"
              {...register("authMobile", { required: "Required" })}
              error={errors.authMobile?.message}
            />
            <Controller
              name="authNationality"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <FormSelect
                  placeholder="Authorized Signatory Nationality"
                  options={NATIONALITIES}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.authNationality?.message}
                />
              )}
            />
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
            <FormInput
              placeholder="Authorized Signatory Email"
              type="email"
              {...register("authEmail", {
                required: "Required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
              })}
              error={errors.authEmail?.message}
            />
            <FormInput
              placeholder="Authorized Signatory Card No"
              {...register("authSignatoryCardNo")}
              error={errors.authSignatoryCardNo?.message}
            />
            <Controller
              name="authSignatoryCardExpiry"
              control={control}
              render={({ field }) => (
                <FormDatePicker
                  placeholder="Authorized Signatory Card No Expiry Date"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.authSignatoryCardExpiry?.message}
                />
              )}
            />
          </div>
        </>
      )}

      {/* Navigation buttons */}
      <div className="mt-50 flex items-center gap-20">
        <CustomOutlineButton
          onClick={onPrev}
          variant="dark"
          text="Previous"
          borderColor="border-primary"
          textColor="text-foreground"
          px="px-[25px] 3xl:px-[64px]"
          className="h-[50px] md:h-[67px] uppercase max-w-[180px]"
        />
        <CustomOutlineButton
          onClick={handleSubmit(onSubmit)}
          variant="dark"
          text="Next"
          borderColor="border-primary"
          textColor="text-foreground-light"
          px="px-[25px] 3xl:px-[64px]"
          className="h-[50px] md:h-[67px] uppercase max-w-[180px]"
        />
      </div>
    </form>
  );
}
