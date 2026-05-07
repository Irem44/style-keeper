import type { UseFormRegisterReturn } from "react-hook-form";

interface CustomInputProps {
  label?: string;
  type?: string;
  register: UseFormRegisterReturn;
  className?: string;
  labelClassName?: string;
  required?: boolean;
}
const CustomInput = ({
  label,
  type = "text",
  register,
  className,
  labelClassName,
  required = false,
}: CustomInputProps) => {
  return (
    <div className="flex flex-row  p-2 items-center justify-center">
      <label className={`"text-sm text-[#454040] ${labelClassName}`}>
        {label}
      </label>
      <input
        type={type}
        {...register}
        className={`p-2.5  rounded-[10px] focus:outline-none bg-pink-100 ${className}`}
        required={required}
      />
    </div>
  );
};
export default CustomInput;
