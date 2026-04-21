"use client";

import { useState } from "react";
import FileUpload from "@/app/components/onboarding/fields/FileUpload";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";
import { DocumentsData } from "@/app/onboarding/page";
import Image from "next/image";
import Link from "next/link";

interface Props {
  onNext: (data: DocumentsData) => void;
  onPrev: () => void;
  savedData?: Partial<DocumentsData>;
}

export default function Documents({ onNext, onPrev, savedData }: Props) {
  const [files, setFiles] = useState<Partial<DocumentsData>>({
    ...savedData,
  });
  const [acknowledged, setAcknowledged] = useState(false);
  const [ackError, setAckError] = useState(false);

  const setFile = (key: keyof DocumentsData) => (file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = () => {
    if (!acknowledged) {
      setAckError(true);
      return;
    }
    setAckError(false);
    onNext(files as DocumentsData);
  };

  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-heading text-primary mb-50">Documents</h2>

      {/* Fields */}
      <div className="flex flex-col gap-60">
        {/* Trade License */}
        <FileUpload title="Trade License" onChange={setFile("tradeLicense")} />

        {/* Visa Owner */}
        <FileUpload title="Visa Owner" onChange={setFile("visaOwner")} />

        {/* EID Owner */}
        <FileUpload title="EID Owner" onChange={setFile("eidOwner")} />

        {/* Passport Copy Owner */}
        <FileUpload
          title="Passport Copy Owner"
          onChange={setFile("passportCopyOwner")}
        />

        {/* Non VAT Declaration — special row */}
        <div className="w-full flex gap-30 items-end">
          {/* Drop zone — reuse but without its own title */}
          <div  className="w-full">
              <FileUpload
                title="Non VAT Declaration"
                maxSizeMb={6}
                accept=".pdf,.docx"
                onChange={setFile("nonVatDeclaration")}
              />
            <p className="text-[12px] leading-[2.058] text-[#FF0000]">
              Print the form under company letter head with signatures &amp; stamp
            </p>
          </div>
          
          <div className="shrink-0">
            <Link
              href="#"
              download
              className="flex items-center gap-20 bg-primary text-white py-[10px] mb-[50px] px-[24px] h-[45px] text-description rounded-[10px] transition-opacity hover:opacity-80 whitespace-nowrap"
            >
              Download Non - VAT Document
              <Image
                src="/icons/download-file.svg"
                alt="download"
                width={20}
                height={20}
                className="h-[15px] w-auto"
              />
            </Link>
          </div>
        </div>

        {/* Passport Copy (Authorized Signatory) */}
        <FileUpload
          title="Passport Copy ( Authorized Signatory )"
          onChange={setFile("passportCopySignatory")}
        />

        {/* Visa (Authorized Signatory) */}
        <FileUpload
          title="Visa ( Authorized Signatory )"
          onChange={setFile("visaSignatory")}
        />

        {/* EID (Authorized Signatory) */}
        <FileUpload
          title="EID ( Authorized Signatory )"
          onChange={setFile("eidSignatory")}
        />

        {/* VAT Certificate */}
        <FileUpload
          title="VAT Certificate"
          onChange={setFile("vatCertificate")}
        />

        {/* MOA / POA */}
        <FileUpload title="MOA / POA" onChange={setFile("moaPoa")} />

        {/* Bank Details on Company Letter Head with Sign & Stamp */}
        <FileUpload
          title="Bank Details on Company Letter Head with Sign & Stamp"
          onChange={setFile("bankDetailsLetterHead")}
        />

        {/* Other Documents */}
        <FileUpload
          title="Other Documents"
          onChange={setFile("otherDocuments")}
        />
      </div>

      {/* Acknowledgement checkbox */}
      <div className="mt-30">
        <label className="flex items-start gap-[10px] cursor-pointer select-none">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => {
              setAcknowledged(e.target.checked);
              if (e.target.checked) setAckError(false);
            }}
            className="h-[18px] w-[18px] shrink-0 accent-primary cursor-pointer mt-[2px]"
          />
          <span
            className={`text-description ${ackError ? "text-red-500" : "text-foreground-light"}`}
          >
            I acknowledge that I have reviewed the information and documents
            provided and confirm that they are accurate and completed
          </span>
        </label>
      </div>

      {/* Navigation */}
      <div className="mt-70">
        <CustomOutlineButton
          onClick={handleSubmit}
          variant="dark"
          text="Next"
          borderColor="border-primary-2"
          textColor="text-foreground-light"
          px="px-[25px] 3xl:px-[64px]"
          className="h-[50px] md:h-[67px] uppercase max-w-[180px]"
        />
      </div>
    </div>
  );
}
