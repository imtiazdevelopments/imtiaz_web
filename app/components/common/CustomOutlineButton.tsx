interface OutlineButtonProps {
  text: string;
  borderColor?: string;
  px?: string;
  textColor?: string;
  onClick?: () => void;
  variant?: "light" | "dark";
  className?: string;
}

const CustomOutlineButton = ({
  className,
  text,
  borderColor = "border-white/90",
  textColor = "text-white",
  px = "px-10",
  onClick,
  variant = "light",
}: OutlineButtonProps) => {
  const fillColor = variant === "dark" ? "bg-primary-2" : "bg-white/10";

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer group relative ${className} overflow-hidden ${px} py-5 rounded-full border ${borderColor} ${textColor} font-[avenirRoman] text-19 leading-[100%] transition-colors duration-300`}
    >
      {/* Left fill */}
      <span
        className={`absolute inset-y-0 left-0 w-1/2 ${fillColor} transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100`}
      />
      {/* Right fill */}
      <span
        className={`absolute inset-y-0 right-0 w-1/2 ${fillColor} transform scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100`}
      />
      <span className={`relative z-10 transition-colors duration-300 ${variant === "dark" ? "group-hover:text-white" : ""}`}>
  {text}
</span>
    </button>
  );
};

export default CustomOutlineButton;