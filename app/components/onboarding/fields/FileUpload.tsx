"use client";

import Image from "next/image";
import { useRef, useState, DragEvent, ChangeEvent } from "react";

interface FileUploadProps {
  title: string;
  maxSizeMb?: number;
  accept?: string;
  onChange?: (file: File | null) => void;
  error?: string;
}

export default function FileUpload({
  title,
  maxSizeMb = 6,
  accept = ".pdf,.jpg,.jpeg,.png",
  onChange,
  error,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [sizeError, setSizeError] = useState<string | null>(null);

  const handleFile = (selected: File | null) => {
    if (!selected) return;
    const maxBytes = maxSizeMb * 1024 * 1024;
    if (selected.size > maxBytes) {
      setSizeError(`File exceeds ${maxSizeMb}MB limit`);
      return;
    }
    setSizeError(null);
    setFile(selected);
    onChange?.(selected);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files?.[0] ?? null;
    handleFile(dropped);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0] ?? null);
  };

  const handleRemove = () => {
    setFile(null);
    setSizeError(null);
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const displayError = sizeError || error;

  return (
    <div className="w-full">
      {/* Title */}
      <p className="text-description text-foreground-light mb-[7px]">{title}</p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`w-full max-h-[76px] min-h-[76px] flex items-center justify-center rounded-[10px] border border-dashed transition-colors ${
          dragOver
            ? "border-primary"
            : displayError
              ? "border-red-400"
              : "border-foreground-light/30"
        }`}
      >
        {file ? (
          /* Uploaded state */
          <div className="flex items-center gap-[10px] px-20">
            {/* File icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-primary"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span className="text-description text-foreground truncate max-w-[260px]">
              {file.name}
            </span>
            {/* Remove */}
            <button
              type="button"
              onClick={handleRemove}
              className="ml-[10px] flex items-center justify-center h-[22px] w-[22px] rounded-full bg-gray hover:bg-red-100 text-gray-500 hover:text-red-500 transition-colors shrink-0"
              aria-label="Remove file"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <line x1="1" y1="1" x2="9" y2="9" />
                <line x1="9" y1="1" x2="1" y2="9" />
              </svg>
            </button>
          </div>
        ) : (
          /* Empty state */
          <div className="flex items-center gap-[10px]">
            {/* Upload icon */}
            <Image
              src="/icons/file-upload.svg"
              alt="file-upload"
              width={22}
              height={22}
              className="h-[20px] w-auto"
            />
            <span className="text-description text-foreground-light">
              Drag and Drop Files Here OR{" "}
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-[#2563EB] underline underline-offset-2 cursor-pointer"
              >
                Upload File
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between mt-[7px]">
        <span className="text-[12px] leading-[2.058] text-foreground-light/50">
          Files Support : pdf, jpg, png
        </span>
        <span className="text-[12px] leading-[2.058] text-foreground-light/50">
          Max : {maxSizeMb}Mb
        </span>
      </div>

      {/* Error */}
      {displayError && (
        <p className="mt-[2px] text-[12px] text-red-500">{displayError}</p>
      )}

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
