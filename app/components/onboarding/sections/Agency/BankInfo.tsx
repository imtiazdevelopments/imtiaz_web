"use client";

import { useForm, Controller } from "react-hook-form";
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

const CURRENCY_OPTIONS = [
  { label: "AED", value: "aed" },
  { label: "USD", value: "usd" },
  { label: "GBP", value: "gbp" },
  { label: "EUR", value: "eur" },
  { label: "INR", value: "inr" },
];

export default function BankInfo({ onNext, onPrev, savedData }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BankInfoData>({
    mode: "onSubmit",
    defaultValues: savedData ?? {},
  });

  const onSubmit = (data: BankInfoData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Title */}
      <h2 className="text-heading text-primary mb-50">Bank Info</h2>

      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
        <Controller
          name="bankDetailAvailable"
          control={control}
          rules={{ required: "Required" }}
          render={({ field }) => (
            <FormSelect
              placeholder="Bank Detail Available"
              options={BANK_DETAIL_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.bankDetailAvailable?.message}
            />
          )}
        />
        <FormInput
          placeholder="Bank Name"
          {...register("bankName", { required: "Required" })}
          error={errors.bankName?.message}
        />
        <FormInput
          placeholder="Bank Account No"
          {...register("bankAccountNo", { required: "Required" })}
          error={errors.bankAccountNo?.message}
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
        <FormInput
          placeholder="Beneficiary Name"
          {...register("beneficiaryName", { required: "Required" })}
          error={errors.beneficiaryName?.message}
        />
        <FormInput
          placeholder="IBAN No"
          {...register("ibanNo", { required: "Required" })}
          error={errors.ibanNo?.message}
        />
        <FormInput
          placeholder="Swift Code"
          {...register("swiftCode")}
          error={errors.swiftCode?.message}
        />
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-60 gap-y-30 mb-40">
        <Controller
          name="currency"
          control={control}
          rules={{ required: "Required" }}
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

      {/* Navigation buttons */}
      <div className="mt-50 flex items-center gap-20">
        <CustomOutlineButton
          onClick={onPrev}
          variant="dark"
          text="Previous"
          borderColor="border-primary-2"
          textColor="text-foreground"
          px="px-[25px] 3xl:px-[64px]"
          className="h-[50px] md:h-[67px] uppercase max-w-[180px]"
        />
        <CustomOutlineButton
          onClick={handleSubmit(onSubmit)}
          variant="dark"
          text="Next"
          borderColor="border-primary-2"
          textColor="text-foreground-light"
          px="px-[25px] 3xl:px-[64px]"
          className="h-[50px] md:h-[67px] uppercase max-w-[180px]"
        />
      </div>
    </form>
  );
}