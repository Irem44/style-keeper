interface CustomButtonProps {
  type: "submit" | "reset" | "button";
  className?: string;
  children: string;
  onClick?: () => void;
}

const CustomButton = ({
  type,
  className,
  children,
  onClick,
}: CustomButtonProps) => {
  return (
    <button
      className={`  border-2  border-white bg-pink-100 p-2 rounded-xl flex items-center justify-center cursor-pointer hover:bg-pink-200 transition-all
        mt-3 mb-3 text-pink-600 w-2/12 h-12.5
        " ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default CustomButton;
