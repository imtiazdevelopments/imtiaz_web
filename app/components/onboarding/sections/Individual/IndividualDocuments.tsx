"use client";

import { useState } from "react";
import FileUpload from "@/app/components/onboarding/fields/FileUpload";
import CustomOutlineButton from "@/app/components/common/CustomOutlineButton";
import { IndividualDocumentsData } from "@/app/onboarding/page";

interface Props {
  onNext: (data: IndividualDocumentsData) => void;
  onPrev: () => void;
  savedData?: Partial<IndividualDocumentsData>;
}

export default function IndividualDocuments({ onNext, onPrev, savedData }: Props) {
  const [files, setFiles] = useState<Partial<IndividualDocumentsData>>({ ...savedData });
  const [acknowledged, setAcknowledged] = useState(false);
  const [ackError, setAckError] = useState(false);

  const setFile = (key: keyof IndividualDocumentsData) => (file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = () => {
    if (!acknowledged) {
      setAckError(true);
      return;
    }
    setAckError(false);
    onNext(files as IndividualDocumentsData);
  };

  return (
    <div className="w-full">
      <h2 className="text-heading text-primary mb-50">Documents</h2>

      <div className="flex flex-col gap-60">
        <FileUpload title="Passport Copy (Authorized Signatory)" onChange={setFile("passportCopySignatory")} />
        <FileUpload title="Visa (Authorized Signatory)" onChange={setFile("visaSignatory")} />
        <FileUpload title="EID (Authorized Signatory)" onChange={setFile("eidSignatory")} />
        <FileUpload title="Individual Passport" onChange={setFile("individualPassport")} />
        <FileUpload title="Passport Copy (Owner)" onChange={setFile("passportCopyOwner")} />
        <FileUpload title="EID (Owner)" onChange={setFile("eidOwner")} />
        <FileUpload title="Visa (Owner)" onChange={setFile("visaOwner")} />
      </div>

      {/* Acknowledgement */}
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
          <span className={`text-description ${ackError ? "text-red-500" : "text-foreground-light"}`}>
            I acknowledge that I have reviewed the information and documents
            provided and confirm that they are accurate and completed
          </span>
        </label>
      </div>

      {/* Navigation */}
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
          onClick={handleSubmit}
          variant="dark"
          text="Next"
          borderColor="border-primary-2"
          textColor="text-foreground-light"
          px="px-[25px] 3xl:px-[64px]"
          className="h-[44px] md:h-[50px]  xl:h-[66px] uppercase max-w-[180px]"
        />
      </div>
    </div>
  );
}