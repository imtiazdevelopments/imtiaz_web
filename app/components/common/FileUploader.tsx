"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

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
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const fileValue = watch(fieldName);

  const validateFile = (file: File): boolean => {
    setFileError("");

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setFileError(`File size exceeds ${maxSize}MB limit`);
      return false;
    }

    // Check file format
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
      setValue(fieldName, file);
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
      setValue(fieldName, file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById(`file-input-${fieldName}`)?.click();
  };

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-foreground mb-3">
          {label}
        </label>
      )}

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleUploadClick}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-[#ddd8d0] bg-[#f5f0eb] hover:border-primary hover:bg-primary/5"
        } ${fileError ? "border-red-500 bg-red-50" : ""}`}
      >
        {/* Upload Icon */}
        <div className="flex justify-center mb-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
            />
          </svg>
        </div>

        {/* Upload Text */}
        <div className="mb-2">
          <p className="text-foreground-light text-sm md:text-base">
            Drag and Drop Files Here OR{" "}
            <button
              type="button"
              className="text-primary font-semibold hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                handleUploadClick();
              }}
            >
              Upload File
            </button>
          </p>
        </div>

        {/* File Name Display */}
        {fileName && (
          <p className="text-sm text-green-600 font-medium mb-2">
            ✓ {fileName}
          </p>
        )}

        {/* Format Info */}
        <p className="text-xs text-foreground-light mt-3">
          Format: {allowedFormats.map((f) => f.toUpperCase()).join(", ")} | Max :{" "}
          {maxSize}MB
        </p>
      </div>

      {/* File Input (Hidden) */}
      <input
        id={`file-input-${fieldName}`}
        type="file"
        className="hidden"
        accept={allowedFormats.map((f) => `.${f}`).join(",")}
        {...register(fieldName, {
          required: `${label} is required`,
          validate: (value) => {
            if (!value) return true;
            if (value instanceof FileList) {
              const file = value[0];
              if (!validateFile(file)) return fileError;
            }
            return true;
          },
        })}
        onChange={handleFileChange}
      />

      {/* Error Messages */}
      {fileError && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 font-medium">⚠️ {fileError}</p>
        </div>
      )}

      {errors[fieldName] && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 font-medium">
            ⚠️ {errors[fieldName]?.message as string}
          </p>
        </div>
      )}
    </div>
  );
}