"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form"; 
import CountryCodeSelect from "@/app/components/auth/CountryCodeList";
import CustomOutlineButton from "../common/CustomOutlineButton"; 
import { SectionHeading } from "../animations/SectionHeading";
import { SectionDescription } from "../animations/SectionDescription";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { useRef, useEffect } from "react";


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
  "w-full mt-[4.8px] md:mt-[10px] pb-[5px] text-description text-foreground-light bg-transparent outline-none p-0 h-auto";

const labelClass =
  "block text-description 2xl:leading-[1.75] text-foreground-light/50 transition-colors group-focus-within:text-foreground-light";

const ErrorSlot = ({ msg }: { msg?: string }) => (
  <p className="text-[14px] text-[#c0392b] md:pt-2 h-media md:h-20">{msg ?? "\u00A0"}</p>
);

// Tab Button Component
interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = ({ label, isActive, onClick }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative min-h-[55px] cursor-pointer lg:min-h-[70px] z-10 w-1/2 px-2 py-3 lg:py-[17.5px] uppercase text-25 leading-[1.5] md:leading-[1.4] transition-colors duration-300 ${
        isActive ? "text-white" : "text-foreground-light"
      }`}
    >
      {label}
    </button>
  );
};

// Book a Viewing Component
const BookViewing = ({ formHeight }: { formHeight: number }) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }
  }, []);

  return (
    <motion.div
      ref={imageRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="relative w-full  " style={{ height: `${formHeight}px` }}
 >
  <div className="absolute top-0 left-0 w-full  translate-y-1/2 flex justify-center ">
    <div className="flex flex-col items-center text-center  ">
       
             <SectionHeading
                     title={'Book a Viewing'}
                     className="text-heading  text-foreground mb-20 text-center  "
                   />
                   <SectionDescription
                     text={'Explore the property at your convenience with a guided viewing experience. Toggle to reveal available time slots, key details, and what to expect during your visit. Once you’re ready, click the button below to proceed to our trusted partner platform and confirm your booking securely.'}
                     className="text-description max-w-[82ch] text-center   font-[optima] text-foreground-light leading-[1.5] md:leading-[1.57] font-normal"
                   />
                    <CustomOutlineButton
            className="w-fit mt-50"
            px="px-5 3xl:py-[23px] 3xl:px-[72px]"
            text="Schedule Now"
            borderColor="border-primary-2"
            textColor="text-foreground-light"
            variant="dark"
          />
         </div>
         </div>
      </div>
    </motion.div>
  );
};

interface CareerFormProps {
  onClose: () => void;
  onSwitch: () => void;
}

export default function EnquiryForm({ onClose, onSwitch }: CareerFormProps) { 
  const [activeTab, setActiveTab] = useState<"enquiry" | "viewing">("enquiry");
  const backgroundRef = useRef<HTMLDivElement>(null);
  const whiteBoxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
const [divHeight, setDivHeight] = useState(0);

  useEffect(() => {
    if (backgroundRef.current) {
      const height = backgroundRef.current.offsetHeight;
      setDivHeight(height);
    }
  }, []);

  // Listen for window resize to recalculate height
  useEffect(() => {
    const handleResize = () => {
      if (backgroundRef.current) {
        setDivHeight(backgroundRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle click outside white box to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if click is outside the white box
      if (
        whiteBoxRef.current &&
        containerRef.current &&
        !whiteBoxRef.current.contains(target)
      ) {
        // Close the popup
        onClose();
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

   
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

  useEffect(() => {
    if (backgroundRef.current) {
      gsap.fromTo(
        backgroundRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }
  }, [activeTab]);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    console.log("Resume File:", data.resume);
  };
const [rows, setRows] = useState(3);

useEffect(() => {
  const handleResize = () => {
    setRows(window.innerWidth < 768 ? 2 : 3);
  };
  
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
  return (
    <>
      {/* Close btn */}
      <div className="px-3 py-5  md:px-60 3xl:px-0 h-full w-full">  <div 
        ref={containerRef} 
        onClick={onClose}
      > </div>
      <div className="flex h-full items-center justify-center">
          <div  ref={whiteBoxRef} className="w-full h-fit justify-center bg-white w-[95%] lg:w-[800px] mx-auto  overflow-scroll relative flex flex-col self-center   p-7 px-5 md:p-10 items-center">
          {/* Tabs */}
          <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="relative flex justify-center mb-5 md:mb-30 bg-primary/5 rounded-full w-full lg:w-[567px] min-h-[55px] lg:min-h-[70px] overflow-hidden"
>
  {/* 🔥 Sliding Background */}
  <motion.div
    layout
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
    className={`absolute top-0 bottom-0 w-1/2 min-h-[55px] lg:min-h-[70px] bg-primary rounded-full ${
      activeTab === "enquiry" ? "left-0" : "left-1/2"
    }`}
  />

  {/* Tabs */}
  <TabButton
    label="ENQUIRY"
    isActive={activeTab === "enquiry"}
    onClick={() => setActiveTab("enquiry")}
  />

  <TabButton
    label="BOOK A VIEWING"
    isActive={activeTab === "viewing"}
    onClick={() => setActiveTab("viewing")}
  />
</motion.div>

          {/* Content */}
          <motion.div
            ref={backgroundRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full dddd"
          >
            <AnimatePresence mode="wait">
              {activeTab === "enquiry" ? (
                <div key="enquiry" className="w-full">
                  <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
                      {/* First + Last name */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-70 3xl:gap-100">
                        <label htmlFor="firstName" className="group cursor-text block md:mt-30">
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

                        <label htmlFor="lastName" className="group cursor-text block md:mt-30">
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
                          <span className="block text-description 2xl:leading-[1.75] md:mt-30 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
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
                          <span className="block text-description md:mt-30 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
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

                      {/* Country */}
                      <div>
                        <label htmlFor="applyPosition" className="group cursor-text md:mt-30 block">
                          <span className={labelClass}>Country*</span>
                          <select
                            id="applyPosition"
                            className={inputClass}
                            {...register("applyPosition", { required: "Required" })}
                          >
                            <option value="option0"> </option>
                            <option value="option1">UAE</option>
                            <option value="option2">KSA</option>
                            <option value="option3">India</option>
                          </select>
                          <FieldLine hasError={!!errors.applyPosition} />
                          <ErrorSlot msg={errors.applyPosition?.message} />
                        </label>
                      </div>

                      {/* Message */}
                      <label htmlFor="signupPassword" className="group cursor-text block">
                        <span className="block text-description md:mt-30 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
                          Add a message*
                        </span>
                        <div className="relative mt-[5px] md:mt-[8px]">
                           <textarea 
                          className="w-full text-description pb-[5px] text-foreground-light bg-transparent outline-none p-0 pr-7 h-auto resize-none"
                          rows={rows}
                          {...register("password", {
                            required: "Message is required",
                            minLength: { value: 6, message: "Minimum 6 characters" },
                          })}
                        />
                        </div>
                        <FieldLine hasError={!!errors.password} />
                        <p className="text-[12px] text-[#c0392b] pt-2 h-20">
                          {errors.password?.message ?? "\u00A0"}
                        </p>
                      </label>

                      {/* Submit */}
                      <div className="csmtst mt-40 w-fit mx-auto">
                        <CustomOutlineButton
                          px="py-[16px] px-[33px] lg:px-[23px] 3xl:px-[48px] 3xl:py-[23px]"
                          text="Submit"
                          borderColor="border-primary-2"
                          textColor="text-foreground-light"
                          variant="dark"
                        />
                      </div>
                    </form>
                  </FormProvider>
                </div>
              ) : (
                <div key="viewing" className="w-full">
                  <BookViewing formHeight={divHeight}  />
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      </div>
    </>
  );
}