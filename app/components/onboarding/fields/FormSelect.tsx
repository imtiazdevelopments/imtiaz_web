// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";

// interface Option {
//   label: string;
//   value: string;
// }

// interface FormSelectProps {
//   placeholder: string;
//   options: Option[];
//   value?: string;
//   onChange: (value: string) => void;
//   error?: string;
//   disabled?: boolean;
// }

// export default function FormSelect({
//   placeholder,
//   options,
//   value,
//   onChange,
//   error,
//   disabled,
// }: FormSelectProps) {
//   const [open, setOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   const selectedLabel = options.find((o) => o.value === value)?.label;

//   // Close on outside click
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const isFilled = !!selectedLabel;

//   return (
//     <div className="flex flex-col w-full relative" ref={ref}>
//       <div className="group flex flex-col gap-5">
//         {/* Trigger row */}
//         <button
//           type="button"
//           disabled={disabled}
//           onClick={() => setOpen((p) => !p)}
//           className="flex w-full items-center justify-between bg-transparent outline-none cursor-pointer"
//         >
//           <span
//             className={`text-description transition-colors duration-200 ${
//               isFilled || open ? "text-foreground-light" : "text-foreground-light/50"
//             }`}
//           >
//             {selectedLabel ?? placeholder}
//           </span>

//           {/* Arrow */}
//           <Image
//             src="/images/icons/down-tip-arrow.svg"
//             alt="arrow-down"
//             width={20}
//             height={10}
//             className={`shrink-0 h-[7px] w-auto transition-transform duration-300 ${open ? "rotate-180" : ""}`}
//           />
//         </button>

//         {/* Bottom line */}
//         <div
//           className={`
//           h-px w-full transition-colors duration-300
//           ${
//             error
//               ? "bg-red-400"
//               : open || isFilled
//                 ? "bg-foreground-light"
//                 : "bg-foreground-light/30"
//           }
//         `}
//         />
//       </div>

//       {/* Dropdown */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{
//               opacity: 0,
//               clipPath: "inset(0% 0% 100% 0% round 16px)",
//             }}
//             animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 16px)" }}
//             exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0% round 16px)" }}
//             transition={{
//               duration: 0.5,
//               ease: [0.76, 0, 0.24, 1],
//               opacity: { duration: 0.3, ease: "easeIn" },
//             }}
//             className="absolute top-[calc(80%)] left-0 z-50 w-full min-w-[200px] overflow-hidden rounded-[12px] border border-white/50 bg-gray-100"
//             onWheel={(e) => e.stopPropagation()}
//           >
//             <div className="max-h-[250px] overflow-y-auto">
//               {options.length === 0 && (
//                 <p className="px-5 py-3 text-xs text-foreground-light">
//                   No options
//                 </p>
//               )}
//               {options.map((opt, i) => (
//                 <div key={opt.value}>
//                   {i !== 0 && <div className="h-px w-full bg-foreground-light/20" />}
//                   <button
//                     type="button"
//                     onClick={() => {
//                       onChange(opt.value);
//                       setOpen(false);
//                     }}
//                     className={`w-full p-3 text-left text-description transition-colors duration-300 hover:bg-primary/5 ${
//                       value === opt.value
//                         ? "text-primary"
//                         : "text-foreground-light"
//                     }`}
//                   >
//                     {opt.label}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Reserved error space */}
//       <p className="mt-[2px] min-h-[16px] text-xs text-red-400">{error ?? ""}</p>
//     </div>
//   );
// }


"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps {
  placeholder: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export default function FormSelect({
  placeholder,
  options,
  value,
  onChange,
  error,
  disabled,
}: FormSelectProps) {
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((o) => o.value === value)?.label;
  const isFilled = !!selectedLabel;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    if (disabled) return;
    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // 270 = estimated dropdown height (max-h-[250px] + padding)
      setOpenUpward(spaceBelow < 270);
    }
    setOpen((p) => !p);
  };

  return (
    <div className="flex flex-col w-full relative" ref={ref}>
      <div className="group flex flex-col gap-5">
        <button
          type="button"
          disabled={disabled}
          onClick={handleOpen}
          className="flex w-full items-center justify-between bg-transparent outline-none cursor-pointer"
        >
          <span
            className={`text-description transition-colors duration-200 ${
              isFilled || open ? "text-foreground-light" : "text-foreground-light/50"
            }`}
          >
            {selectedLabel ?? placeholder}
          </span>
          <Image
            src="/images/icons/down-tip-arrow.svg"
            alt="arrow-down"
            width={20}
            height={10}
            className={`shrink-0 h-[7px] w-auto transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`h-px w-full transition-colors duration-300 ${
            error
              ? "bg-red-400"
              : open || isFilled
                ? "bg-foreground-light"
                : "bg-foreground-light/30"
          }`}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: openUpward ? "inset(100% 0% 0% 0% round 16px)" : "inset(0% 0% 100% 0% round 16px)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 16px)" }}
            exit={{ opacity: 0, clipPath: openUpward ? "inset(100% 0% 0% 0% round 16px)" : "inset(0% 0% 100% 0% round 16px)" }}
            transition={{
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1],
              opacity: { duration: 0.3, ease: "easeIn" },
            }}
            className="absolute left-0 z-50 w-full min-w-[200px] overflow-hidden rounded-[12px] border border-white/50 bg-gray-100"
            style={openUpward ? { bottom: "calc(100% + 8px)" } : { top: "calc(80%)" }}
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="max-h-[250px] overflow-y-auto">
              {options.length === 0 && (
                <p className="px-5 py-3 text-xs text-foreground-light">No options</p>
              )}
              {options.map((opt, i) => (
                <div key={opt.value}>
                  {i !== 0 && <div className="h-px w-full bg-foreground-light/20" />}
                  <button
                    type="button"
                    onClick={() => { onChange(opt.value); setOpen(false); }}
                    className={`w-full p-3 text-left text-description transition-colors duration-300 hover:bg-primary/5 ${
                      value === opt.value ? "text-primary" : "text-foreground-light"
                    }`}
                  >
                    {opt.label}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-[2px] min-h-[16px] text-xs text-red-400">{error ?? ""}</p>
    </div>
  );
}