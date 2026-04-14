import type { ReactNode } from "react";

interface CustomTextInputProps {
  type: string;
  className?: string;
  icon?: ReactNode;
  value?: any;
  onChange: (value: any) => void;
  placeHolder?: string;
}

const CustomTextInput = ({
  type,
  className,
  icon,
  value,
  onChange,
  placeHolder,
}: CustomTextInputProps) => {
  return (
    <div className="p-3 w-150 h-30px border-white rounded-3xl  bg-white flex items-center justify-between">
      <input
        type={type}
        className={`w-90 h-full  focus:outline-none bg-white ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
      />
      {icon}
    </div>
  );
};
export default CustomTextInput;
