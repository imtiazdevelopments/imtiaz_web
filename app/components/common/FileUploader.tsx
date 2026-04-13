"use client";

import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface FileUploaderProps {
  label?: string;
  fieldName?: string;
  maxSize?: number; // in MB
  allowedFormats?: string[];
}

export default function FileUploader({
  label = "Attach resume",
  fieldName = "resume",
  maxSize = 20,
  allowedFormats = ["pdf", "doc", "docx", "jpg", "jpeg"],
}: FileUploaderProps) {
  const { control, setValue, watch, formState: { errors } } = useFormContext() || {};
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  if (!control) {
    console.error("FileUploader must be used within FormProvider");
    return null;
  }

  const fileValue = watch?.(fieldName);

  const validateFile = (file: File): boolean => {
    setFileError("");

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setFileError(`File size exceeds ${maxSize}MB limit`);
      return false;
    }

    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
    if (!allowedFormats.includes(fileExtension)) {
      setFileError(
        `Invalid format. Allowed formats: ${allowedFormats.join(", ").toUpperCase()}`
      );
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setFileName(file.name);
      setValue?.(fieldName, file);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && validateFile(file)) {
      setFileName(file.name);
      setValue?.(fieldName, file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById(`file-input-${fieldName}`)?.click();
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-description mb-20 2xl:leading-[1.75] mt-25 text-foreground-light/50 transition-colors group-focus-within:text-foreground-light">
          {label}
        </label>
      )}

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleUploadClick}
        className={`border-1 border-dashed border-foreground-lighter rounded-sm px-8 py-5 xl:py-[25px] text-center cursor-pointer transition-all duration-300 ${
          dragActive
            ? "border-primary  "
            : "border-[#ddd8d0]  hover:border-primary  "
        } ${fileError ? "border-red-500 bg-red-50" : ""}`}
      >
        <div className="flex flex-row justify-center items-center gap-[10px]">
          <div className="flex justify-center  ">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.7201 7.71997C17.895 7.73208 19.0729 7.82853 19.8413 8.59691C20.72 9.4756 20.72 10.8898 20.72 13.7181V14.7181C20.72 17.5465 20.72 18.9608 19.8413 19.8394C18.9626 20.718 17.5484 20.718 14.7201 20.718H6.72015C3.89175 20.718 2.47756 20.718 1.59889 19.8394C0.720215 18.9608 0.720215 17.5465 0.720215 14.7181V13.7181C0.720215 10.8898 0.720215 9.4756 1.59889 8.5969C2.36726 7.82853 3.54516 7.73208 5.72016 7.71997" stroke="#404040" stroke-width="1.44" stroke-linecap="round"/>
              <path d="M10.7202 13.7198V0.719971M10.7202 0.719971L13.7202 4.21992M10.7202 0.719971L7.72021 4.21992" stroke="#404040" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

        </div>

        <div>
          <p className="text-foreground-light/50 text-description">
            Drag and Drop Files Here OR{" "}
            <button
              type="button"
              className="text-[#2563EB] cursor-pointer underline"
              onClick={(e) => {
                e.stopPropagation();
                handleUploadClick();
              }}
            >
              Upload File
            </button>
          </p>
        </div>
        </div>

        {fileName && (
          <p className="text-sm text-green-600 font-medium mb-2">
            ✓ {fileName}
          </p>
        )}

      </div>

       <div className="flex !text-[12px] items-center justify-between gap-2 text-description mt-[7px] mb-50 leading-[2.088] ">
         <p className=" text-foreground-light/50 ">
          Format: {allowedFormats.map((f) => f.toUpperCase()).join(", ")} 
        </p>
        <p className="text-foreground-light/50">Max :{" "} {maxSize}MB</p>
       </div>
      <input
        id={`file-input-${fieldName}`}
        type="file"
        className="hidden"
        accept={allowedFormats.map((f) => `.${f}`).join(",")}
        onChange={handleFileChange}
      />

      {fileError && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 font-medium"> {fileError}</p>
        </div>
      )}

      {errors?.[fieldName] && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 font-medium">
          {errors[fieldName]?.message as string}
          </p>
        </div>
      )}
    </div>
  );
}