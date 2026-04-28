"use client";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import FormInput from "@/app/components/onboarding/fields/FormInput";
import FormSelect from "@/app/components/onboarding/fields/FormSelect";
import FormDatePicker from "@/app/components/onboarding/fields/FormDatePicker";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";
import { BrokerDetailsData, BrokerEntry } from "@/app/onboarding/page";
import Image from "next/image";

interface Props {
  onNext: (data: BrokerDetailsData) => void;
  onPrev: () => void;
  savedData?: Partial<BrokerDetailsData>;
}

const COUNTRY_CODES = [
  { label: "+971 (UAE)", value: "+971" },
  { label: "+966 (KSA)", value: "+966" },
  { label: "+44 (UK)", value: "+44" },
  { label: "+91 (India)", value: "+91" },
];

const DEFAULT_BROKER: BrokerEntry = {
  name: "",
  email: "",
  countryCode: "",
  signatoryCardNo: "",
  signatoryCardExpiry: "",
};

export default function BrokerDetails({ onNext, onPrev, savedData }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BrokerDetailsData>({
    mode: "onSubmit",
    defaultValues: savedData?.brokers?.length
      ? savedData
      : { brokers: [{ ...DEFAULT_BROKER }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "brokers",
  });

  const onSubmit = (data: BrokerDetailsData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Title row */}
      <div className="flex items-center justify-between mb-50">
        <h2 className="text-heading text-primary">Broker Details</h2>
        <button
          type="button"
          onClick={() => append({ ...DEFAULT_BROKER })}
          className="flex items-center gap-20 bg-primary text-white py-[10px] px-[24px] h-[45px] max-w-[167px] 3xl:w-[167px] text-description rounded-[10px] transition-opacity hover:opacity-80"
        >
          Add Broker
          <span className="text-[22px]">+</span>
        </button>
      </div>

      {/* Broker cards */}
      <div className="flex flex-col gap-40">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative bg-gray rounded-[10px] px-30 pt-90 pb-70 3xl:pt-[87px] 3xl:pb-[67px]"
          >
            {/* Delete button */}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute cursor-pointer top-30 right-30 flex items-center justify-center h-[37px] w-[38px] rounded-[10px] bg-primary text-primary hover:opacity-80 transition-opacity"
                aria-label="Delete broker"
              >
                {/* Trash icon */}
                <Image src="/icons/delete_icon.svg" alt="Delete" width={20} height={22} className="h-[20px] w-auto" />
              </button>
            )}

            {/* Row 1 — Name + Email + Country Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-30 gap-y-30 mb-30">
              <FormInput
                placeholder="Name"
                {...register(`brokers.${index}.name`, { required: "Required" })}
                error={errors.brokers?.[index]?.name?.message}
              />
              <FormInput
                placeholder="Email"
                type="email"
                {...register(`brokers.${index}.email`, {
                  required: "Required",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
                })}
                error={errors.brokers?.[index]?.email?.message}
              />
              <Controller
                name={`brokers.${index}.countryCode`}
                control={control}
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <FormSelect
                    placeholder="Country Code"
                    options={COUNTRY_CODES}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.brokers?.[index]?.countryCode?.message}
                  />
                )}
              />
            </div>

            {/* Row 2 — Signatory Card No + Card Expiry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-30 gap-y-30">
              <FormInput
                placeholder="Authorized Signatory Card No"
                {...register(`brokers.${index}.signatoryCardNo`)}
                error={errors.brokers?.[index]?.signatoryCardNo?.message}
              />
              <Controller
                name={`brokers.${index}.signatoryCardExpiry`}
                control={control}
                render={({ field }) => (
                  <FormDatePicker
                    placeholder="Authorized Signatory Card No Expiry Date"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.brokers?.[index]?.signatoryCardExpiry?.message}
                  />
                )}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="mt-70 flex items-center gap-20">
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