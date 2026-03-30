"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";

// ─── JSON Data ────────────────────────────────────────────────────────────────

const enquiryData = {
  heading: "Make an Enquiry",
  subheading:
    "We combine industry insight with hands-on experience to solve complex challenges.",
  contacts: [
    {
      id: "phone",
      icon: "phone",
      label: "+971 800 468429",
      href: "tel:+971800468429",
    },
    {
      id: "email",
      icon: "email",
      label: "INFO@IMTIAZ.AE",
      href: "mailto:info@imtiaz.ae",
    },
  ],
  selectReasons: [
    "General Enquiry",
    "Project Development",
    "Asset Management",
    "Engineering & Construction",
    "Project Management",
  ],
  contactModes: ["Phone", "Whatsapp", "Email"],
  checkboxes: [
    { id: "news", label: "I'd like to hear about news and offers." },
    { id: "privacy", label: "I've read and agree to the Privacy Policy" },
  ],
  phoneCodes: [
    { code: "+971", flag: "🇦🇪", country: "UAE" },
    { code: "+1", flag: "🇺🇸", country: "USA" },
    { code: "+44", flag: "🇬🇧", country: "UK" },
    { code: "+91", flag: "🇮🇳", country: "IND" },
  ],
};

// ─── Types ────────────────────────────────────────────────────────────────────

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCode: string;
  reason: string;
  message: string;
  contactMode: string;
  news: boolean;
  privacy: boolean;
};

// ─── Error Message ────────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  return (
    <span
      className="absolute left-0 text-[11px] text-red-400 font-[800] leading-none overflow-hidden transition-all duration-200"
      style={{
        bottom: "-16px",
        height: message ? "14px" : "0px",
        opacity: message ? 1 : 0,
      }}
    >
      {message}
    </span>
  );
}

// ─── Floating Label Input ─────────────────────────────────────────────────────

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); onBlur?.(); }}
        onChange={(e) => onChange(e.target.value)}
        className="h-[68px] peer w-full bg-transparent border-0 border-b border-white/30 pt-5 pb-2 text-white text-sm outline-none focus:border-white/80 transition-colors duration-300 placeholder-transparent"
        placeholder={label}
        autoComplete="off"
      />
      <label
        htmlFor={id}
        className={`absolute left-0 text-[16px] font-[800] pointer-events-none transition-all duration-300 ${
          active ? "top-0 text-white" : "top-0 text-white/50"
        }`}
      >
        {label}
      </label>
      <span
        className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-300 ${
          focused ? "w-full" : "w-0"
        }`}
      />
      <FieldError message={error} />
    </div>
  );
}

// ─── Floating Label Select ────────────────────────────────────────────────────

function FloatingSelect({
  id,
  label,
  options,
  value,
  onChange,
  onBlur,
  error,
}: {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative w-full">
      <select
        id={id}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); onBlur?.(); }}
        onChange={(e) => onChange(e.target.value)}
        className="h-[68px] peer w-full bg-transparent border-0 border-b border-white/30 pt-5 pb-2 text-white text-sm outline-none appearance-none cursor-pointer focus:border-white/80 transition-colors duration-300"
      >
        <option value="" disabled hidden />
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#1a0a08] text-white">
            {opt}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute left-0 text-[16px] font-[800] text-white pointer-events-none transition-all duration-300 ${
          active ? "top-0 text-white" : "top-0 text-white/50"
        }`}
      >
        {label}
      </label>
      <span className="absolute right-0 top-5 text-white/50 pointer-events-none text-xs">▾</span>
      <span
        className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-300 ${
          focused ? "w-full" : "w-0"
        }`}
      />
      <FieldError message={error} />
    </div>
  );
}

// ─── Floating Textarea ────────────────────────────────────────────────────────

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative w-full h-[98px]">
      <textarea
        id={id}
        rows={3}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); onBlur?.(); }}
        onChange={(e) => onChange(e.target.value)}
        className="h-[98px] peer w-full bg-transparent border-0 border-b border-white/30 pt-8 pb-2 text-white text-sm outline-none resize-none focus:border-white/80 transition-colors duration-300 placeholder-transparent"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`absolute left-0 text-[16px] font-[800] text-white pointer-events-none transition-all duration-300 ${
          active ? "top-0 text-white" : "top-0 text-white/50"
        }`}
      >
        {label}
      </label>
      <span
        className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-300 ${
          focused ? "w-full" : "w-0"
        }`}
      />
      <FieldError message={error} />
    </div>
  );
}

// ─── Phone Input with Country Code ───────────────────────────────────────────

function PhoneInput({
  value,
  onChange,
  onBlur,
  phoneCode,
  onCodeChange,
  codes,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  phoneCode: string;
  onCodeChange: (v: string) => void;
  codes: typeof enquiryData.phoneCodes;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative w-full">
      <label
        className={`absolute left-0 text-[16px] font-[800] text-white pointer-events-none transition-all duration-300 z-10 ${
          active ? "top-0 text-white" : "top-0 text-white/50"
        }`}
      >
        Enter Phone no
      </label>
      <div className="h-[68px] flex items-end border-b border-white/30 pt-5 pb-2 gap-2 focus-within:border-white/80 transition-colors duration-300">
        <div className="relative flex-shrink-0">
          <select
            value={phoneCode}
            onChange={(e) => onCodeChange(e.target.value)}
            className="bg-transparent text-white text-sm outline-none appearance-none cursor-pointer pr-4"
          >
            {codes.map((c) => (
              <option key={c.code} value={c.code} className="bg-[#1a0a08]">
                {c.flag} {c.code}
              </option>
            ))}
          </select>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 text-[10px] pointer-events-none">▾</span>
        </div>
        <input
          type="tel"
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur?.(); }}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-white text-sm outline-none placeholder-transparent"
          placeholder="Phone number"
        />
      </div>
      <span
        className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-300 ${
          focused ? "w-full" : "w-0"
        }`}
      />
      <FieldError message={error} />
    </div>
  );
}

// ─── Icon Components ──────────────────────────────────────────────────────────

function PhoneIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.2927 24.4398C29.2927 24.9198 29.186 25.4132 28.9593 25.8932C28.7327 26.3732 28.4394 26.8265 28.0527 27.2532C27.3994 27.9732 26.6793 28.4932 25.866 28.8265C25.066 29.1598 24.1994 29.3332 23.266 29.3332C21.906 29.3332 20.4527 29.0132 18.9193 28.3598C17.386 27.7065 15.8527 26.8265 14.3327 25.7198C12.7835 24.5866 11.3216 23.3387 9.95935 21.9865C8.61104 20.6292 7.36748 19.1717 6.23935 17.6265C5.14602 16.1065 4.26602 14.5865 3.62602 13.0798C2.98602 11.5598 2.66602 10.1065 2.66602 8.71984C2.66602 7.81317 2.82602 6.9465 3.14602 6.1465C3.46602 5.33317 3.97268 4.5865 4.67935 3.91984C5.53268 3.07984 6.46602 2.6665 7.45268 2.6665C7.82602 2.6665 8.19935 2.7465 8.53268 2.9065C8.87935 3.0665 9.18602 3.3065 9.42602 3.65317L12.5193 8.01317C12.7593 8.3465 12.9327 8.65317 13.0527 8.9465C13.1727 9.2265 13.2393 9.5065 13.2393 9.75984C13.2393 10.0798 13.146 10.3998 12.9593 10.7065C12.786 11.0132 12.5327 11.3332 12.2127 11.6532L11.1993 12.7065C11.0527 12.8532 10.986 13.0265 10.986 13.2398C10.986 13.3465 10.9993 13.4398 11.026 13.5465C11.066 13.6532 11.106 13.7332 11.1327 13.8132C11.3727 14.2532 11.786 14.8265 12.3727 15.5198C12.9727 16.2132 13.6127 16.9198 14.306 17.6265C15.026 18.3332 15.7193 18.9865 16.426 19.5865C17.1193 20.1732 17.6927 20.5732 18.146 20.8132C18.2127 20.8398 18.2927 20.8798 18.386 20.9198C18.4927 20.9598 18.5993 20.9732 18.7193 20.9732C18.946 20.9732 19.1193 20.8932 19.266 20.7465L20.2793 19.7465C20.6127 19.4132 20.9327 19.1598 21.2393 18.9998C21.546 18.8132 21.8527 18.7198 22.186 18.7198C22.4393 18.7198 22.706 18.7732 22.9993 18.8932C23.2927 19.0132 23.5994 19.1865 23.9327 19.4132L28.346 22.5465C28.6927 22.7865 28.9327 23.0665 29.0793 23.3998C29.2127 23.7332 29.2927 24.0665 29.2927 24.4398Z" stroke="white" strokeWidth="1.41" strokeMiterlimit="10"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.668 27.3337H9.33464C5.33464 27.3337 2.66797 25.3337 2.66797 20.667V11.3337C2.66797 6.66699 5.33464 4.66699 9.33464 4.66699H22.668C26.668 4.66699 29.3346 6.66699 29.3346 11.3337V20.667C29.3346 25.3337 26.668 27.3337 22.668 27.3337Z" stroke="white" strokeWidth="1.44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22.6654 12L18.492 15.3333C17.1187 16.4267 14.8654 16.4267 13.492 15.3333L9.33203 12" stroke="white" strokeWidth="1.44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EnquirySection() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      phoneCode: enquiryData.phoneCodes[0].code,
      reason: "",
      message: "",
      contactMode: "Phone",
      news: true,
      privacy: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <section className="w-full" data-header="light">
      <div className="relative">
        <Image
          src="/images/expertise/m.svg"
          alt="M"
          width={1066}
          height={703}
          className="!w-[1066px] h-[703px] absolute bottom-0 left-0 z-[1] select-none pointer-events-none"
        />

        <div className="flex">
          {/* ── Left Panel ── */}
          <div className="relative w-[43.65%] bg-[#4a0a08] flex flex-col px-14 spacing-y-130 overflow-hidden">
            <h2 className="heading-50 text-white uppercase mb-5">
              {enquiryData.heading}
            </h2>
            <p className="text-[16px] text-white font-[800] max-w-[47ch] mb-4 xl:mb-[40px]">
              {enquiryData.subheading}
            </p>
            <div className="flex flex-col gap-5 xl:gap-[40px]">
              {enquiryData.contacts.map((c) => (
                <a key={c.id} href={c.href} className="flex items-center gap-5 group">
                  <span className="w-[79px] h-[79px] rounded-full border border-white/40 flex items-center justify-center text-white/80 group-hover:border-white group-hover:text-white transition-colors duration-300 flex-shrink-0">
                    {c.icon === "phone" ? <PhoneIcon /> : <EmailIcon />}
                  </span>
                  <span className="text-white text-[20px] lg:text-[25px] uppercase font-[800] leading-[1.2] group-hover:text-white transition-colors duration-300">
                    {c.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right Panel ── */}
          <div
            className="flex-1 relative flex items-center justify-center spacing-y-130 ps-6 xl:ps-[82px] overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #1a1008 50%, #0d0a06 100%)" }}
          >
            <div className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/dubai-skyline.jpg')" }} />
            <div className="absolute inset-0 bg-black/90 z-[2]" />
            <Image
              src="/images/expertise/overimg.jpg"
              alt="overimg"
              width={1066}
              height={703}
              className="!w-full h-full absolute inset-0 z-[1] select-none pointer-events-none"
            />

            {/* Form */}
            <div className="relative z-10 w-full">

              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-x-10 2xl:gap-x-[103px] mb-10 xl:mb-[60px]">
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: "First name is required" }}
                  render={({ field }) => (
                    <FloatingInput
                      id="firstName"
                      label="First Name"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.firstName?.message}
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: "Last name is required" }}
                  render={({ field }) => (
                    <FloatingInput
                      id="lastName"
                      label="Enter Your Last Name"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.lastName?.message}
                    />
                  )}
                />
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-x-10 2xl:gap-x-[103px] mb-10 xl:mb-[60px]">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
                  }}
                  render={({ field }) => (
                    <FloatingInput
                      id="email"
                      label="Enter Your Email"
                      type="email"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.email?.message}
                    />
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    pattern: { value: /^[0-9]{7,15}$/, message: "Invalid phone number" },
                  }}
                  render={({ field: phoneField }) => (
                    <Controller
                      name="phoneCode"
                      control={control}
                      render={({ field: codeField }) => (
                        <PhoneInput
                          value={phoneField.value}
                          onChange={phoneField.onChange}
                          onBlur={phoneField.onBlur}
                          phoneCode={codeField.value}
                          onCodeChange={codeField.onChange}
                          codes={enquiryData.phoneCodes}
                          error={errors.phone?.message}
                        />
                      )}
                    />
                  )}
                />
              </div>

              {/* Row 3 — Select */}
              <div className="mb-10 xl:mb-[60px]">
                <Controller
                  name="reason"
                  control={control}
                  rules={{ required: "Please select a reason" }}
                  render={({ field }) => (
                    <FloatingSelect
                      id="reason"
                      label="Select Reason"
                      options={enquiryData.selectReasons}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.reason?.message}
                    />
                  )}
                />
              </div>

              {/* Row 4 — Textarea */}
              <div className="mb-10 xl:mb-[60px]">
                <Controller
                  name="message"
                  control={control}
                  rules={{ required: "Message is required" }}
                  render={({ field }) => (
                    <FloatingTextarea
                      id="message"
                      label="Type your message here..."
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={errors.message?.message}
                    />
                  )}
                />
              </div>

              {/* Preferred Mode */}
              <div className="mb-7">
                <p className="text-[20px] xl:text-[25px] font-[optima] uppercase text-white mb-4 xl:mb-[20px]">
                  Preferred Mode of Contact
                </p>
                <Controller
                  name="contactMode"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-8 xl:gap-[40px]">
                      {enquiryData.contactModes.map((mode) => (
                        <label key={mode} className="flex items-center gap-2.5 cursor-pointer group">
                          <span
                            onClick={() => field.onChange(mode)}
                            className={`w-[20px] h-[20px] rounded-full border flex items-center justify-center transition-colors duration-200 ${
                              field.value === mode ? "border-white" : "border-white/40"
                            }`}
                          >
                            {field.value === mode && (
                              <span className="w-[14px] h-[14px] rounded-full bg-white block" />
                            )}
                          </span>
                          <span className="text-[16px] font-[800] text-white group-hover:text-white transition-colors duration-200">
                            {mode}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                />
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap items-center gap-x-10 gap-y-3 mb-10">
                <Controller
                  name="news"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <span
                        onClick={() => field.onChange(!field.value)}
                        className={`w-4 h-4 border flex items-center justify-center transition-colors duration-200 flex-shrink-0 ${
                          field.value ? "bg-white border-white" : "border-white/40"
                        }`}
                      >
                        {field.value && (
                          <svg viewBox="0 0 12 12" fill="none" stroke="#000" strokeWidth="2" className="w-2.5 h-2.5">
                            <polyline points="1,6 4.5,9.5 11,2" />
                          </svg>
                        )}
                      </span>
                      <span className="text-[16px] font-[800] text-white group-hover:text-white/80 transition-colors duration-200">
                        {enquiryData.checkboxes[0].label}
                      </span>
                    </label>
                  )}
                />
                <Controller
                  name="privacy"
                  control={control}
                  rules={{ required: "You must agree to the Privacy Policy" }}
                  render={({ field }) => (
                    <div className="relative">
                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <span
                          onClick={() => field.onChange(!field.value)}
                          className={`w-4 h-4 border flex items-center justify-center transition-colors duration-200 flex-shrink-0 ${
                            field.value ? "bg-white border-white" : errors.privacy ? "border-red-400" : "border-white/40"
                          }`}
                        >
                          {field.value && (
                            <svg viewBox="0 0 12 12" fill="none" stroke="#000" strokeWidth="2" className="w-2.5 h-2.5">
                              <polyline points="1,6 4.5,9.5 11,2" />
                            </svg>
                          )}
                        </span>
                        <span className="text-[16px] font-[800] text-white group-hover:text-white/80 transition-colors duration-200">
                          {enquiryData.checkboxes[1].label}
                        </span>
                      </label>
                      <FieldError message={errors.privacy?.message} />
                    </div>
                  )}
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit(onSubmit)}
                className="px-10 py-4 xl:px-[57px] xl:py-[20px] rounded-full border border-white text-white text-[19px] cursor-pointer font-[800] hover:bg-white hover:text-black transition-all duration-300"
              >
                Submit Enquire
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}