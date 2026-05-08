"use client";

import { useState, useRef } from "react";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";
import FormDatePicker from "@/app/components/onboarding/fields/FormDatePicker";
import type { AgencyFormData } from "@/app/onboarding/page";
import Image from "next/image";

interface Props {
  agencyFormData: AgencyFormData;
  onAgencyFormDataChange: (updated: AgencyFormData) => void;
  onPrev: () => void;
  onSubmit: () => void;
}

/* ─── helpers ─── */
const isDateField = (key: string) =>
  key.toLowerCase().includes("expiry") || key.toLowerCase().includes("date");

function labelFromKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

/* ─── FieldCard: inline-editable ─── */
interface FieldCardProps {
  label: string;
  value?: string;
  isDate?: boolean;
  showEdit?: boolean;
  onChange?: (val: string) => void;
}

function FieldCard({
  label,
  value,
  isDate,
  showEdit = true,
  onChange,
}: FieldCardProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? "");
  const [pickerOpen, setPickerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const commit = () => {
    onChange?.(draft);
    setEditing(false);
  };

  /* date path */
  // if (isDate) {
  //   return (
  //     <div className="bg-white/40 rounded-[10px] px-[10px] py-[13.5px] min-h-[79px] relative">
  //       <span className="text-[12px] leading-[2.058] text-primary mb-[2px]">
  //         {label}
  //       </span>
  //       <div className="flex items-center justify-between gap-6">
  //         <span className="text-description text-[#2B2B2B]">
  //           {draft || "—"}
  //         </span>
  //         {showEdit && (
  //           <button
  //             type="button"
  //             onClick={() => setPickerOpen((p) => !p)}
  //             className="shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
  //             aria-label="Pick date"
  //           >
  //             <Image
  //               src="/icons/calender-primary.svg"
  //               alt="calendar"
  //               width={25}
  //               height={25}
  //               className="shrink-0 h-[20.48px] w-[20.48px]"
  //             />
  //           </button>
  //         )}
  //       </div>
  //       {/* Floating date picker */}
  //       {pickerOpen && (
  //         <div className="absolute top-full left-0 z-50 mt-2 bg-white shadow-xl rounded-[6px] min-w-[260px]">
  //           <FormDatePicker
  //             placeholder={label}
  //             value={draft}
  //             onChange={(val) => {
  //               setDraft(val);
  //               onChange?.(val);
  //               setPickerOpen(false);
  //             }}
  //           />
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  if (isDate) {
    return (
      <div className="bg-white/40 rounded-[10px] px-[10px] py-[13.5px] min-h-[79px] relative">
        <span className="text-[12px] leading-[2.058] text-primary mb-[2px]">
          {label}
        </span>
        <div className="flex items-center justify-between gap-6">
          {editing ? (
            <input
              ref={inputRef}
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commit}
              onKeyDown={(e) => {
                if (e.key === "Enter") commit();
                if (e.key === "Escape") setEditing(false);
              }}
              className="w-full text-description text-[#2B2B2B] font-medium border-b border-primary h-[20px] outline-none bg-transparent"
            />
          ) : (
            <div className="flex items-center w-full justify-between gap-6">
              <span className="text-description text-[#2B2B2B]">
                {draft || "—"}
              </span>
              {showEdit && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(true);
                    setTimeout(() => inputRef.current?.focus(), 0);
                  }}
                  className="shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
                  aria-label="Edit"
                >
                  <Image
                    src="/icons/pencil-edit.svg"
                    alt="Edit"
                    width={20}
                    height={20}
                    className="w-[20.48px] h-[20.48px]"
                  />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* text path */
  return (
    <div className="bg-white/40 rounded-[10px] px-[10px] py-[13.5px] min-h-[79px]">
      <span className="text-[12px] leading-[2.058] text-primary mb-[2px]">
        {label}
      </span>
      {editing ? (
        <input
          ref={inputRef}
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") setEditing(false);
          }}
          className="w-full text-description text-[#2B2B2B] font-medium border-b border-primary h-[20px] outline-none bg-transparent"
        />
      ) : (
        <div className="flex items-center justify-between gap-6">
          <span className="text-description text-[#2B2B2B]">
            {draft || "—"}
          </span>
          {showEdit && (
            <button
              type="button"
              onClick={() => {
                setEditing(true);
                setTimeout(() => inputRef.current?.focus(), 0);
              }}
              className="shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="Edit"
            >
              <Image
                src="/icons/pencil-edit.svg"
                alt="Edit"
                width={20}
                height={20}
                className="w-[20.48px] h-[20.48px]"
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Section wrapper ─── */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-60">
      <h3 className="text-25 font-[optima] text-foreground-light leading-[1.4] tracking-[-0.02em] uppercase mb-20">
        {title}
      </h3>
      <div className="bg-gray rounded-[10px] p-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-20 gap-x-[15px]">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── ObjectFields ─── */
function ObjectFields({
  data,
  showEdit = true,
  exclude = [],
  onChange,
}: {
  data: Record<string, unknown>;
  showEdit?: boolean;
  exclude?: string[];
  onChange?: (key: string, val: string) => void;
}) {
  return (
    <>
      {Object.entries(data)
        .filter(([key]) => !exclude.includes(key))
        .map(([key, value]) => {
          if (typeof value === "boolean") return null;
          if (value instanceof File) return null;
          const strVal =
            value !== null && value !== undefined ? String(value) : "";
          const date = isDateField(key);
          return (
            <FieldCard
              key={key}
              label={labelFromKey(key)}
              value={strVal}
              isDate={date}
              showEdit={showEdit}
              onChange={(val) => onChange?.(key, val)}
            />
          );
        })}
    </>
  );
}

/* ════════════════════════════════════════════
   Main PreviewSubmit
════════════════════════════════════════════ */
export default function PreviewSubmit({
  agencyFormData,
  onAgencyFormDataChange,
  onPrev,
  onSubmit,
}: Props) {
  const { company, signatory, broker, bank, documents } = agencyFormData;
  const [submitError, setSubmitError] = useState<string[]>([]);

  const patch = <K extends keyof AgencyFormData>(
    section: K,
    key: string,
    val: string,
  ) => {
    onAgencyFormDataChange({
      ...agencyFormData,
      [section]: { ...(agencyFormData[section] as object), [key]: val },
    });
  };

  const patchBroker = (index: number, key: string, val: string) => {
    const brokers = [...(agencyFormData.broker?.brokers ?? [])];
    brokers[index] = { ...brokers[index], [key]: val };
    onAgencyFormDataChange({ ...agencyFormData, broker: { brokers } });
  };

  const OWNER_KEYS = [
    "ownerFirstName",
    "ownerLastName",
    "ownerEmiratesId",
    "ownerEidExpiry",
    "ownerPassportNo",
    "ownerPassportExpiry",
    "ownerCountryCode",
    "ownerMobile",
    "ownerNationality",
    "ownerEmail",
    "ownerBrokerCardNo",
    "ownerBrokerCardExpiry",
  ];
  const AUTH_KEYS = [
    "authFirstName",
    "authLastName",
    "authEmiratesId",
    "authEidExpiry",
    "authPassportNo",
    "authPassportExpiry",
    "authCountryCode",
    "authMobile",
    "authNationality",
    "authEmail",
    "authSignatoryCardNo",
    "authSignatoryCardExpiry",
  ];

  // Which required sections are missing
  const missingSections: string[] = [];
  if (!company || Object.keys(company).length === 0)
    missingSections.push("Company Details");
  if (!signatory || Object.keys(signatory).length === 0)
    missingSections.push("Signatory Details");
  if (!broker || !broker.brokers || broker.brokers.length === 0)
    missingSections.push("Broker Details");
  if (!bank || Object.keys(bank).length === 0)
    missingSections.push("Bank Info");
  if (!documents || Object.keys(documents).length === 0)
    missingSections.push("Documents");

  const isComplete = missingSections.length === 0;
  const hasAnything = missingSections.length < 5; // at least one section filled

  const handleSubmit = () => {
    if (!isComplete) {
      setSubmitError(missingSections);
      return;
    }
    setSubmitError([]);
    onSubmit();
  };

  return (
    <div className="w-full">
      <h2 className="text-heading text-primary mb-50">Preview &amp; Submit</h2>

      {/* ── Empty state ── */}
      {!hasAnything ? (
        <div className="flex flex-col text-foreground-light">
          <Image
            src="/icons/file-icon.svg"
            alt=""
            width={40}
            height={40}
            className="mb-20"
          />
          <p className="text-description">Nothing to preview yet.</p>
          <p className="text-description">
            Complete the previous steps to see a summary here.
          </p>
        </div>
      ) : (
        <>
          {/* COMPANY */}
          {company && (
            <Section title="Company Details">
              <ObjectFields
                data={company as Record<string, unknown>}
                onChange={(k, v) => patch("company", k, v)}
              />
            </Section>
          )}

          {/* OWNER */}
          {signatory && (
            <Section title="Owner Details">
              <ObjectFields
                data={signatory as Record<string, unknown>}
                exclude={["ownerAndSignatoryAreSame", ...AUTH_KEYS]}
                onChange={(k, v) => patch("signatory", k, v)}
              />
            </Section>
          )}

          {/* AUTHORIZED SIGNATORY */}
          {signatory && !signatory.ownerAndSignatoryAreSame && (
            <Section title="Authorized Signatory Details">
              <ObjectFields
                data={signatory as Record<string, unknown>}
                exclude={["ownerAndSignatoryAreSame", ...OWNER_KEYS]}
                onChange={(k, v) => patch("signatory", k, v)}
              />
            </Section>
          )}

          {/* BROKERS */}
          {broker?.brokers && broker.brokers.length > 0 && (
            <div className="mb-60">
              <h3 className="text-25 font-[optima] text-foreground-light leading-[1.4] tracking-[-0.02em] uppercase mb-20">
                Broker Details
              </h3>
              {broker.brokers.map((b, i) => (
                <div key={i} className="bg-gray rounded-[10px] p-20 mb-20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-20">
                    <ObjectFields
                      data={b as unknown as Record<string, unknown>}
                      onChange={(k, v) => patchBroker(i, k, v)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BANK — no edit */}
          {bank && (
            <Section title="Bank Details">
              <ObjectFields
                data={bank as Record<string, unknown>}
                showEdit={false}
              />
            </Section>
          )}

          {/* DOCUMENTS — no edit */}
          {documents && (
            <div className="mb-60">
              <h3 className="text-25 font-[optima] text-foreground-light leading-[1.4] tracking-[-0.02em] uppercase mb-20">
                Documents
              </h3>
              <div className="bg-gray rounded-[10px] p-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-20">
                  {Object.entries(documents).map(([key, value]) => {
                    const file = value as File | null;
                    return (
                      <div
                        key={key}
                        className="bg-white/40 rounded-[10px] px-[10px] py-[13.5px] max-h-[56px] flex items-center justify-between gap-10"
                      >
                        <div className="flex flex-col w-full">
                          <div className="flex items-center gap-[12px] w-full">
                            {file && (
                              <div className="w-8 h-8 bg-[#FEF2F2] rounded-[4px] flex items-center justify-center">
                                <Image
                                  src="/icons/file-icon.svg"
                                  alt="pdf"
                                  width={25}
                                  height={25}
                                  className="w-[20px] h-[20px]"
                                />
                              </div>
                            )}
                            <span className="text-description text-foreground-light">
                              {file?.name ?? "—"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Navigation */}
      <div className="mt-50 flex flex-col">
        {/* Incomplete sections error */}
        <div className="h-[20px] flex items-center">
          {submitError.length > 0 && (
            <p className="text-[12px] text-red-400 pb-2">
              Please complete the following sections before submitting:{" "}
              <span>{submitError.join(", ")}</span>.
            </p>
          )}
        </div>
        <div className="flex items-center gap-20">
          <CustomOutlineButton
            onClick={onPrev}
            variant="dark"
            text="Previous"
            borderColor="border-primary-2"
            textColor="text-primary-2"
            px="px-[25px] 3xl:px-[64px]"
            className="h-[44px] md:h-[50px]  xl:h-[66px] uppercase max-w-[180px]"
          />
          <CustomOutlineButton
            onClick={handleSubmit}
            variant="dark"
            text="Submit"
            borderColor="border-primary-2"
            textColor={
              isComplete ? "text-primary-2" : "text-primary-2/30"
            }
            px="px-[25px] 3xl:px-[64px]"
            className={`h-[44px] md:h-[50px]  xl:h-[66px] uppercase max-w-[200px] ${!isComplete ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}
