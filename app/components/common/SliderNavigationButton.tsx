import Image from "next/image";

type SliderArrowButtonProps = {
  onClick: () => void;
  direction?: "prev" | "next";
  variant?: "dark" | "light";
};

export default function SliderArrowButton({
  onClick,
  direction = "prev",
  variant = "dark",
}: SliderArrowButtonProps) {
  const isNext = direction === "next";
  const isDark = variant === "dark";

  return (
    <button
      onClick={onClick}
      className={`
        relative lg:w-[50px] lg:h-[50px] 3xl:w-[62px] 3xl:h-[62px] w-[45px] h-[45px] cursor-pointer group rounded-[50px] flex items-center justify-center overflow-hidden
        ${isDark ? "border border-[#404040]" : "border border-white"}
      `}
    >
      {/* Hover fill — slides in from right (dark) or left (light) */}
      <span
        className={`
          absolute top-0 h-full w-0 transition-all duration-300 group-hover:w-full z-0
          ${isNext ? "left-0" : "right-0"}
          ${isDark ? "bg-primary" : "bg-white/30"}
        `}
      />

      <Image
        src="/icons/left_arrow_slider_primary.svg"
        alt={isNext ? "Next" : "Previous"}
        width={28}
        height={28}
        className={`
          relative z-10 object-contain 3xl:w-[28px] 3xl:h-[28px] lg:w-[22px] lg:h-[22px] w-[20px] h-[20px] transition-all duration-300
          ${isNext ? "rotate-180" : ""}
          ${
            isDark
              ? "group-hover:invert group-hover:brightness-0"
              : "invert brightness-0 group-hover:invert-0 group-hover:brightness-100"
          }
        `}
      />
    </button>
  );
}