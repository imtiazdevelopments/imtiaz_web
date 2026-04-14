"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form"; 
import CountryCodeSelect from "@/app/components/auth/CountryCodeList";
import CustomOutlineButton from "../common/CustomOutlineButton";
import FileUploader from "../common/FileUploader";
import { AnimatedHeading } from "../animations/AnimateHeading";
import { SectionDescription } from "../animations/SectionDescription";

type SignupValues = {
  applyPosition: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  password: string;
  privacy: boolean;
};

const FieldLine = ({ hasError }: { hasError: boolean }) => (
  <div className="relative h-px w-full bg-foreground-light/30">
    <div
      className={`absolute inset-y-0 left-0 transition-all duration-[420ms] ease-out ${
        hasError ? "bg-[#c0392b] w-full" : "w-0 group-focus-within:w-full bg-foreground-light"
      }`}
    />
  </div>
);


const inputClass =
  "w-full mt-[10px] pb-[5px] text-description text-foreground-light bg-transparent outline-none p-0 h-auto";

const labelClass =
  "block text-description 2xl:leading-[1.75] text-foreground-light/50 transition-colors group-focus-within:text-foreground-light";

const ErrorSlot = ({ msg }: { msg?: string }) => (
  <p className="text-[14px] text-[#c0392b] pt-2 h-20">{msg ?? "\u00A0"}</p>
);

interface CareerFormProps {
  onClose: () => void;
  onSwitch: () => void;
}

export default function CareerForm({ onClose, onSwitch }: CareerFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupValues>({
    mode: "onTouched",
    defaultValues: { countryCode: "+971" },
  });

const methods = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    console.log("Resume File:", data.resume);
  };
  return (
    <>
      {/* Close btn */}
      

      <div className="w-full  px-3 py-60 md:px-60 3xl:px-0 max-w-[790px] h-screen overflow-scroll relative flex flex-col self-center 3xl:self-end py-6 2xl:py-80  items-center">
        <div className="cursor-pointer"  >
        <button
        aria-label="Close"
        className="absolute top-50 3xl:top-90 left-3 md:left-60 3xl:left-0    gap-[10px] flex items-center justify-center text-primary-2 group   cursor-pointer transition-colors"
        onClick={onClose}
      >
        <div><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.57 6.16406L3.5 12.4741L9.57 18.7842" stroke="#490905" strokeWidth="1.44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M20.5019 12.4766H3.67188" stroke="#490905" strokeWidth="1.44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
</svg></div>

        <span className=" transition-transform duration-300 ease-out text-description text-foreground-light">
          Back
        </span>
      </button>
      </div>
        <div className="flex flex-col items-center justify-center   mt-[45px]  md:mt-50">
          <AnimatedHeading title="Build Your Future with Imtiaz" className="text-primary-2 mb-20 max-w-[26ch] mx-auto text-center" mode="blade" />
          <SectionDescription text="Fill out the form below to take the first step toward a rewarding career with Imtiaz, where innovation meets exceptional real estate development." className="text-center mb-50 max-w-[64ch] text-foreground-light  " />
        </div>
<FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
          {/* First + Last name */}
          <div>
            <label htmlFor="applyPosition" className="group cursor-text block">
              <span className={labelClass}>Apply position*</span>
              <select
                id="applyPosition"
                className={inputClass}
                {...register("applyPosition", { required: "Required" })}
              >
                <option value="option0">Design & Architecture</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
              <FieldLine hasError={!!errors.applyPosition} />
              <ErrorSlot msg={errors.applyPosition?.message} />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-40 sm:gap-70 3xl:gap-100">
            <label htmlFor="firstName" className="group cursor-text block mt-25">
              <span className={labelClass}>First name*</span>
              <input
                id="firstName"
                type="text"
                className={inputClass}
                {...register("firstName", { required: "Required" })}
              />
              <FieldLine hasError={!!errors.firstName} />
              <ErrorSlot msg={errors.firstName?.message} />
            </label>

            <label htmlFor="lastName" className="group cursor-text block mt-25">
              <span className={labelClass}>Last name*</span>
              <input
                id="lastName"
                type="text"
                className={inputClass}
                {...register("lastName", { required: "Required" })}
              />
              <FieldLine hasError={!!errors.lastName} />
              <ErrorSlot msg={errors.lastName?.message} />
            </label>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-40 lg:gap-x-70 3xl:gap-x-100">
            <label htmlFor="email" className="group cursor-text block">
              <span className="block text-description 2xl:leading-[1.75] mt-25 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
                Email*
              </span>
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
            </label>

            <label htmlFor="phone" className="group cursor-text block">
              <span className="block text-description mt-25 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
                Enter Phone no*
              </span>
              <div className="flex items-end mt-[10px] gap-2">
                <CountryCodeSelect
                  value={watch("countryCode")}
                  onChange={(val) => setValue("countryCode", val)}
                />
                <input
                  id="phone"
                  type="number"
                  className="flex-1 pb-[5px] pl-[100px] border-none outline-none bg-transparent text-description text-foreground-light p-0 min-w-0"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{7,15}$/,
                      message: "Invalid number",
                    },
                  })}
                />
              </div>
              <FieldLine hasError={!!errors.phone} />
              <ErrorSlot msg={errors.phone?.message} />
            </label>
          </div>
 
          <label htmlFor="signupPassword" className="group cursor-text block">
          <span className="block text-description mt-25 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
            Cover letter*
          </span>
          <div className="relative mt-[8px]">
            <textarea 
              className="w-full text-description pb-[5px] text-foreground-light bg-transparent outline-none p-0 pr-7 h-auto resize-none"
              rows={3}
              {...register("password", {
                required: "Cover letter is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
          </div>
          <FieldLine hasError={!!errors.password} />
          <p className="text-[12px] text-[#c0392b] pt-2 h-20">
            {errors.password?.message ?? "\u00A0"}
          </p>
        </label>

          {/* Privacy policy */}
         <FileUploader
          label="Attach resume"
          fieldName="resume"
          maxSize={20}
          allowedFormats={["pdf", "doc", "docx", "jpg", "jpeg"]}
        />

          {/* Submit */}
          <CustomOutlineButton
            px="px-[12px] lg:px-[23px] 3xl:px-[90.6px] 3xl:py-[23px]"
            text="Submit"
            borderColor="border-primary-2"
            textColor="text-foreground-light"
            variant="dark"
          />
        </form>
      </FormProvider>   
      </div>
    </>
  );
}
