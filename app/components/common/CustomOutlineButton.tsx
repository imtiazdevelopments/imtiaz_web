interface OutlineButtonProps {
  text: string;
  borderColor?: string;
  px?: string;
  textColor?: string;
  onClick?: () => void;
}

const CustomOutlineButton = ({
  text,
  borderColor = "border-white/90",
  textColor = "text-white",
  px = "px-10",
  onClick,
}: OutlineButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer ${px} py-5 rounded-full border ${borderColor} ${textColor} font-[avenirRoman] text-19 leading-[100%] hover:bg-white/10 transition-colors duration-300`}
    >
      {text}
    </button>
  );
};

export default CustomOutlineButton;