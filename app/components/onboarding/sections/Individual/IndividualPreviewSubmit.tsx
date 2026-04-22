"use client";

import { useState, useRef } from "react";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";
import FormDatePicker from "@/app/components/onboarding/fields/FormDatePicker";
import type { IndividualFormData } from "@/app/onboarding/page";
import Image from "next/image";

interface Props {
  individualFormData: IndividualFormData;
  onIndividualFormDataChange: (updated: IndividualFormData) => void;
  onPrev: () => void;
  onSubmit: () => void;
}

const isDateField = (key: string) =>
  key.toLowerCase().includes("expiry") || key.toLowerCase().includes("date");

function labelFromKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

interface FieldCardProps {
  label: string;
  value?: string;
  isDate?: boolean;
  showEdit?: boolean;
  onChange?: (val: string) => void;
}

function FieldCard({ label, value, isDate, showEdit = true, onChange }: FieldCardProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? "");
  const [pickerOpen, setPickerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const commit = () => {
    onChange?.(draft);
    setEditing(false);
  };

  if (isDate) {
    return (
      <div className="bg-white/40 rounded-[10px] px-[10px] py-[13.5px] min-h-[79px] relative">
        <span className="text-[12px] leading-[2.058] text-primary mb-[2px]">{label}</span>
        <div className="flex items-center justify-between gap-6">
          <span className="text-description text-[#2B2B2B]">{draft || "—"}</span>
          {showEdit && (
            <button
              type="button"
              onClick={() => setPickerOpen((p) => !p)}
              className="shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Image src="/icons/calender-primary.svg" alt="calendar" width={25} height={25} className="h-[20.48px] w-[20.48px]" />
            </button>
          )}
        </div>
        {pickerOpen && (
          <div className="absolute top-full left-0 z-50 mt-2 bg-white shadow-xl rounded-[6px] min-w-[260px]">
            <FormDatePicker
              placeholder={label}
              value={draft}
              onChange={(val) => {
                setDraft(val);
                onChange?.(val);
                setPickerOpen(false);
              }}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white/40 rounded-[10px] px-[10px] py-[13.5px] min-h-[79px]">
      <span className="text-[12px] leading-[2.058] text-primary mb-[2px]">{label}</span>
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
          <span className="text-description text-[#2B2B2B]">{draft || "—"}</span>
          {showEdit && (
            <button
              type="button"
              onClick={() => { setEditing(true); setTimeout(() => inputRef.current?.focus(), 0); }}
              className="shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Image src="/icons/pencil-edit.svg" alt="Edit" width={20} height={20} className="w-[20.48px] h-[20.48px]" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
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
          const strVal = value !== null && value !== undefined ? String(value) : "";
          return (
            <FieldCard
              key={key}
              label={labelFromKey(key)}
              value={strVal}
              isDate={isDateField(key)}
              showEdit={showEdit}
              onChange={(val) => onChange?.(key, val)}
            />
          );
        })}
    </>
  );
}

const OWNER_KEYS = [
  "ownerFirstName", "ownerLastName", "ownerEmiratesId", "ownerEidExpiry",
  "ownerPassportNo", "ownerPassportExpiry", "ownerCountryCode", "ownerMobile",
  "ownerNationality", "ownerEmail", "ownerBrokerCardNo", "ownerBrokerCardExpiry",
];

const AUTH_KEYS = [
  "authFirstName", "authLastName", "authSource", "authEmail",
  "authCountryCode", "authPhone", "authCountry", "authCity",
  "authEmiratesId", "authEidExpiry", "authPassportNo", "authPassportExpiry",
  "authBrokerCardNo", "authBrokerCardExpiry",
];

export default function IndividualPreviewSubmit({
  individualFormData,
  onIndividualFormDataChange,
  onPrev,
  onSubmit,
}: Props) {
  const { agentDetails, bankInfo, documents } = individualFormData;

  const patch = <K extends keyof IndividualFormData>(section: K, key: string, val: string) => {
    onIndividualFormDataChange({
      ...individualFormData,
      [section]: { ...(individualFormData[section] as object), [key]: val },
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-heading text-primary mb-50">Preview &amp; Submit</h2>

      {/* OWNER DETAILS */}
      {agentDetails && (
        <Section title="Owner Details">
          <ObjectFields
            data={agentDetails as Record<string, unknown>}
            exclude={["ownerAndSignatoryAreSame", ...AUTH_KEYS]}
            onChange={(k, v) => patch("agentDetails", k, v)}
          />
        </Section>
      )}

      {/* AUTHORIZED SIGNATORY */}
      {agentDetails && !agentDetails.ownerAndSignatoryAreSame && (
        <Section title="Authorized Signatory Details">
          <ObjectFields
            data={agentDetails as Record<string, unknown>}
            exclude={["ownerAndSignatoryAreSame", ...OWNER_KEYS]}
            onChange={(k, v) => patch("agentDetails", k, v)}
          />
        </Section>
      )}

      {/* BANK — no edit */}
      {bankInfo && (
        <Section title="Bank Details">
          <ObjectFields
            data={bankInfo as Record<string, unknown>}
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
                    className="bg-white/40 rounded-[10px] px-[10px] py-[13.5px] max-h-[56px] flex items-center gap-10"
                  >
                    {file && (
                      <div className="w-8 h-8 bg-[#FEF2F2] rounded-[4px] flex items-center justify-center shrink-0">
                        <Image src="/icons/file-icon.svg" alt="pdf" width={25} height={25} className="w-[20px] h-[20px]" />
                      </div>
                    )}
                    <span className="text-description text-foreground-light truncate">
                      {file?.name ?? "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-70 flex items-center gap-20">
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
          onClick={onSubmit}
          variant="dark"
          text="Submit"
          borderColor="border-primary-2"
          textColor="text-foreground-light"
          px="px-[25px] 3xl:px-[64px]"
          className="h-[50px] md:h-[67px] uppercase max-w-[200px]"
        />
      </div>
    </div>
  );
}