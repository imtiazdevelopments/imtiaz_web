"use client";

import { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        <div className="group flex flex-col gap-20">
          <input
            ref={ref}
            {...props}
            className={`
              w-full bg-transparent outline-none border-none
              text-description text-foreground-light
              placeholder:text-foreground-light/50
              focus:placeholder:text-foreground-light
              ${className}
            `}
          />
          <div
            className={`
            h-px w-full transition-colors duration-200
            ${
              error
                ? "bg-red-400"
                : "bg-foreground-light/30 group-focus-within:bg-foreground-light"
            }
          `}
          />
        </div>

        {/* Reserved error space */}
        <p className="mt-1 min-h-[16px] text-[12px] text-red-400">{error ?? ""}</p>
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
export default FormInput;
