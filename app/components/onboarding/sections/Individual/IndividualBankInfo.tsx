"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import FormInput from "@/app/components/onboarding/fields/FormInput";
import FormSelect from "@/app/components/onboarding/fields/FormSelect";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";
import { BankInfoData } from "@/app/onboarding/page";

interface Props {
  onNext: (data: BankInfoData) => void;
  onPrev: () => void;
  savedData?: Partial<BankInfoData>;
}

const BANK_DETAIL_OPTIONS = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const BANK_NAME_OPTIONS = [
  { label: "Emirates NBD", value: "emirates_nbd" },
  { label: "Abu Dhabi Commercial Bank", value: "adcb" },
  { label: "First Abu Dhabi Bank", value: "fab" },
  { label: "Dubai Islamic Bank", value: "dib" },
  { label: "Mashreq Bank", value: "mashreq" },
];

const CURRENCY_OPTIONS = [
  { label: "AED", value: "aed" },
  { label: "USD", value: "usd" },
  { label: "GBP", value: "gbp" },
  { label: "EUR", value: "eur" },
  { label: "INR", value: "inr" },
];

export default function IndividualBankInfo({ onNext, onPrev, savedData }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BankInfoData>({
    mode: "onSubmit",
    defaultValues: savedData ?? {},
  });

  const bankDetailAvailable = useWatch({ control, name: "bankDetailAvailable" });
  const detailsEnabled = bankDetailAvailable === "yes";

  return (
    <form onSubmit={handleSubmit(onNext)} className="w-full">
      <h2 className="text-heading text-primary mb-50">Bank Info</h2>

      {/* Row 1: Bank Details Available | Bank Name | Bank Account Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
        <Controller
          name="bankDetailAvailable"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormSelect
              placeholder="Bank Details Available"
              options={BANK_DETAIL_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.bankDetailAvailable?.message}
            />
          )}
        />
        <div className={`transition-opacity duration-300 ${detailsEnabled ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
          <Controller
            name="bankName"
            control={control}
            rules={{ required: detailsEnabled ? "Required" : false }}
            render={({ field }) => (
              <FormSelect
                placeholder="Bank Name"
                options={BANK_NAME_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                error={errors.bankName?.message}
              />
            )}
          />
        </div>
        <div className={`transition-opacity duration-300 ${detailsEnabled ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
          <FormInput
            placeholder="Bank Account Number"
            {...register("bankAccountNo", { required: detailsEnabled ? "Required" : false })}
            error={errors.bankAccountNo?.message}
          />
        </div>
      </div>

      {/* Row 2: IBAN Number | Swift Code | Currency */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40 transition-opacity duration-300 ${detailsEnabled ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
        <FormInput
          placeholder="IBAN Number"
          {...register("ibanNo", { required: detailsEnabled ? "Required" : false })}
          error={errors.ibanNo?.message}
        />
        <FormInput
          placeholder="Swift Code"
          {...register("swiftCode")}
          error={errors.swiftCode?.message}
        />
        <Controller
          name="currency"
          control={control}
          rules={{ required: detailsEnabled ? "Required" : false }}
          render={({ field }) => (
            <FormSelect
              placeholder="Currency"
              options={CURRENCY_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.currency?.message}
            />
          )}
        />
      </div>

      {/* Row 3: Bank Branch Name | Bank Address (2 cols) */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-x-60 gap-y-30 transition-opacity duration-300 ${detailsEnabled ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
        <FormInput
          placeholder="Bank Branch Name"
          {...register("bankBranchName")}
          error={errors.bankBranchName?.message}
        />
        <FormInput
          placeholder="Bank Address"
          {...register("bankAddress")}
          error={errors.bankAddress?.message}
        />
      </div>

      {/* Navigation */}
      <div className="mt-50 flex items-center gap-20">
        <CustomOutlineButton
          onClick={onPrev}
          variant="dark"
          text="Previous"
          borderColor="border-primary-2"
          textColor="text-foreground"
          px="px-[25px] 3xl:px-[64px]"
          className="h-[44px] md:h-[50px]  xl:h-[66px] uppercase max-w-[180px]"
        />
        <CustomOutlineButton
          onClick={handleSubmit(onNext)}
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