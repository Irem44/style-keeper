import type { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  register: UseFormRegisterReturn;
}

const ImageUploadButton = ({ register }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Buraya tasarımımız gelecek */}
      <label
        htmlFor={register.name}
        className="border-2 border-dashed border-white bg-pink-100 p-4 rounded-xl text-center cursor-pointer hover:bg-pink-200 transition-all
        mt-3 
        "
      >
        <span className="text-pink-600">📸 Fotoğraf Seç</span>
      </label>
      <input type="file" id={register.name} className="hidden" {...register} />
    </div>
  );
};
export default ImageUploadButton;
