"use client";

import { useForm } from "react-hook-form";
import CountryCodeSelect from "@/app/components/auth/CountryCodeList";
import Image from "next/image";
import { SearchableDropdown, allCountries } from "./CountryNameList";
import CustomOutlineButton from "../common/CustomOutlineButton";
import { useRef, useEffect, useState } from "react";

type PaymentValues = {
  firstName: string;
  lastName: string;
  email: string;
  eid: string;
  countryCode: string;
  phone: string;
  country: string;
  project: string;
  unit: string;
  amount: string;
  message: string;
};

const ErrorSlot = ({ msg, hint }: { msg?: string; hint?: string }) => (
  <p
    className={`pt-1 h-20 ${msg ? "text-[#c0392b] text-[14px]" : "text-foreground-light/50 text-description"}`}
  >
    {msg ?? hint ?? "\u00A0"}
  </p>
);

const FieldLine = ({ hasError }: { hasError: boolean }) => (
  <div
    className={`field-line relative h-px w-full ${
      hasError ? "bg-[#c0392b] error" : "bg-foreground-light/50"
    }`}
  />
);

const inputClass =
  "w-full mt-20 text-description text-foreground-light bg-transparent outline-none p-0 h-auto";

const projects = [
  "Project Alpha",
  "Project Beta",
  "Project Gamma",
  "Project Delta",
];

export default function PaymentForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentValues>({
    mode: "onTouched",
    defaultValues: { countryCode: "+971" },
  });

  const onSubmit = (data: PaymentValues) => {
    console.log("Payment:", data);
  };

  const selectedProject = watch("project");
  const selectedCountry = watch("country");

  const phoneRowRef = useRef<HTMLDivElement>(null);
  const [phoneRowWidth, setPhoneRowWidth] = useState(0);

  useEffect(() => {
    if (!phoneRowRef.current) return;
    const ro = new ResizeObserver(() => {
      setPhoneRowWidth(phoneRowRef.current?.offsetWidth ?? 0);
    });
    ro.observe(phoneRowRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      className="w-full min-h-screen py-130 bg-[#EBEBEC]"
      data-header="dark"
    >
      <div className="container flex flex-col lg:flex-row gap-80 lg:gap-50 2xl:gap-0">
        {/* Left col — 49% */}
        <div className="w-full lg:w-[48.5%] flex-shrink-0 flex flex-col">
          <h1 className="text-heading text-foreground mb-20 lg:max-w-[10ch]">
            PAY WITH CONFIDENCE
          </h1>
          <p className="text-description text-foreground-light/80 max-w-[473px] mb-50">
            Complete your payment quickly and securely through our trusted
            online payment gateway.
          </p>
          <p className="text-25 font-[optima] font-[400] text-foreground uppercase tracking-[2%] mb-20 leading-[1.4]">
            Pay by Card
          </p>
          <div className="flex items-center gap-4">
            <div className="w-[70px] h-[48px] bg-white rounded-[6px] flex items-center justify-center border border-[#EBEBEC]">
              <Image
                src="/images/pay-now/cards/mastercard.svg"
                alt="Mastercard"
                width={45}
                height={30}
                className="w-[45px] h-[27.61px] object-contain pointer-events-none"
              />
            </div>
            <div className="w-[70px] h-[48px] bg-white rounded-[6px] flex items-center justify-center border border-[#EBEBEC]">
              <Image
                src="/images/pay-now/cards/maestro.svg"
                alt="Maestro"
                width={50}
                height={20}
                className="w-[45px] h-[27.61px] object-contain pointer-events-none"
              />
            </div>
            <div className="w-[70px] h-[48px] bg-white rounded-[6px] flex items-center justify-center border border-[#EBEBEC]">
              <Image
                src="/images/pay-now/cards/visa.svg"
                alt="Visa"
                width={32}
                height={20}
                className="w-[49px] h-[15.64px] object-contain pointer-events-none"
              />
            </div>
            <div className="w-[70px] h-[48px] relative bg-white rounded-[6px] flex items-center justify-center border border-[#EBEBEC]">
              <div className="absolute bottom-0 right-0 flex items-center justify-center">
                <Image
                  src="/images/pay-now/cards/discover.svg"
                  alt="Discover"
                  width={70}
                  height={30}
                  className="w-[62.37px] h-[28px] object-contain pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right col — 51% */}
        <div className="w-full lg:w-[51.5%] flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Row 1 — First + Last name */}
            <div className="grid grid-cols-2 gap-70 3xl:gap-90">
              <div className="group">
                <label
                  htmlFor="firstName"
                  className="block text-description text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
                >
                  Enter First Last Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className={inputClass}
                  {...register("firstName", { required: "Required" })}
                />
                <FieldLine hasError={!!errors.firstName} />
                <ErrorSlot msg={errors.firstName?.message} />
              </div>
              <div className="group">
                <label
                  htmlFor="lastName"
                  className="block text-description text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
                >
                  Enter Your Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className={inputClass}
                  {...register("lastName", { required: "Required" })}
                />
                <FieldLine hasError={!!errors.lastName} />
                <ErrorSlot msg={errors.lastName?.message} />
              </div>
            </div>

            {/* Row 2 — Email + EID */}
            <div className="grid grid-cols-2 gap-70 3xl:gap-90">
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-description mt-40 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
                >
                  Enter Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={inputClass}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                <FieldLine hasError={!!errors.email} />
                <ErrorSlot msg={errors.email?.message} />
              </div>
              <div className="group">
                <label
                  htmlFor="eid"
                  className="block text-description mt-40 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
                >
                  Enter your EID / Passport Number
                </label>
                <input
                  id="eid"
                  type="text"
                  className={inputClass}
                  {...register("eid", {
                    required: "EID / Passport is required",
                  })}
                />
                <FieldLine hasError={!!errors.eid} />
                <ErrorSlot msg={errors.eid?.message} />
              </div>
            </div>

            {/* Row 3 — Phone + Country */}
            <div className="grid grid-cols-2 gap-70 3xl:gap-90">
              <div className="group">
                <label
                  htmlFor="phone"
                  className="block text-description mt-40 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
                >
                  Enter Phone no
                </label>
                <div ref={phoneRowRef} className="flex items-end pt-20 gap-2">
                  <CountryCodeSelect
                    value={watch("countryCode")}
                    onChange={(val) => setValue("countryCode", val)}
                    dropdownWidth={phoneRowWidth}
                  />
                  <input
                    id="phone"
                    type="tel"
                    className="flex-1 border-none border-b pb-[10px] border-foreground-light outline-none bg-transparent text-description text-foreground-light"
                    {...register("phone", {
                      required: "Phone is required",
                      pattern: {
                        value: /^[0-9]{7,15}$/,
                        message: "Invalid number",
                      },
                    })}
                  />
                </div>
                <FieldLine hasError={!!errors.phone} />
                <ErrorSlot msg={errors.phone?.message} />
              </div>

              {/* Country dropdown */}
              <div className="group relative flex flex-col self-end">
                <Image
                  src="/images/icons/down-tip-arrow.svg"
                  alt="arrow-down"
                  width={20}
                  height={10}
                  className="h-[7px] w-auto mb-[6px] absolute top-30 -mt-1 right-0"
                />
                <SearchableDropdown
                  label="Select country"
                  items={allCountries}
                  value={selectedCountry}
                  onChange={(val) => setValue("country", val)}
                  placeholder="country"
                />
                <ErrorSlot msg={errors.country?.message} />
              </div>
            </div>

            {/* Row 4 — Project + Unit */}
            <div className="grid grid-cols-2 gap-70 3xl:gap-90">
              <div className="group relative flex flex-col self-end">
                <Image
                  src="/images/icons/down-tip-arrow.svg"
                  alt="arrow-down"
                  width={20}
                  height={10}
                  className="h-[7px] w-auto mb-[6px] absolute top-30 -mt-1 right-0"
                />
                <SearchableDropdown
                  label="Select Project"
                  items={projects.map((p) => ({ name: p }))}
                  value={selectedProject}
                  onChange={(val) => setValue("project", val)}
                  placeholder="project"
                />
                <ErrorSlot msg={errors.project?.message} />
              </div>

              <div className="group">
                <label
                  htmlFor="unit"
                  className="block text-description mt-40 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
                >
                  Enter unit number
                </label>
                <input
                  id="unit"
                  type="text"
                  className={inputClass}
                  {...register("unit", { required: "Unit number is required" })}
                />
                <FieldLine hasError={!!errors.unit} />
                <ErrorSlot msg={errors.unit?.message} />
              </div>
            </div>

            {/* Row 5 — Amount */}
            <div className="group">
              <label
                htmlFor="amount"
                className="block text-description mt-40 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
              >
                Amount AED
              </label>
              <input
                id="amount"
                type="number"
                className={inputClass}
                {...register("amount", {
                  required: "Amount is required",
                  max: {
                    value: 100000,
                    message:
                      "Please Enter Amount less than or equal to 100,000 (AED)",
                  },
                })}
              />
              <FieldLine hasError={!!errors.amount} />
              <ErrorSlot
                msg={errors.amount?.message}
                hint="Please Enter Amount less than or equal to 100,000 (AED)"
              />
            </div>

            {/* Row 6 — Message */}
            <div className="group">
              <label
                htmlFor="message"
                className="block text-description mt-120 sm:mt-60 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light"
              >
                Type your message here...
              </label>
              <textarea
                id="message"
                rows={1}
                className="w-full mt-40 text-description text-foreground-light bg-transparent outline-none p-0 resize-none"
                {...register("message")}
              />
              <FieldLine hasError={false} />
              <ErrorSlot msg={undefined} />
            </div>

            {/* Submit */}
            <div className="mt-30">
              <CustomOutlineButton
                text="Next"
                onClick={() => {}}
                variant="dark"
                textColor="text-foreground-light"
                borderColor="border-primary-2"
                px="px-60"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
