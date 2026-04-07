import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabase";
import { cleanFileNime } from "../utils/stringHelpers";
import CustomInput from "./CustomInput";
import ImageUploadButton from "./ImageUploadButton";
import CustomButton from "./CustomButton";
import { X } from "lucide-react";
import { toast } from "sonner";

interface CreationFormType {
  id: number;
  shopName: string;
  product: {
    name: string;
    category: string;
    price: number;
    imageFile: FileList;
  };
}
interface SideBarProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  onSuccess: () => void;
}
const SideBar = ({ open, setOpen, onSuccess }: SideBarProps) => {
  //Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreationFormType>();

  //Submit
  const onSubmit = async (data: CreationFormType) => {
    try {
      const file = data.product.imageFile[0];
      let publicUrl = "";

      if (file) {
        const cleanFileName = cleanFileNime(file.name);

        //TODO upload(isimlendirme,dosya):Ben bu ismi ve bu dosyayı aldım storage a yükledim
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("wardrobe")
          .upload(cleanFileName, file);

        if (uploadError) throw uploadError;

        //TODO getPublicUrl(isimlendirme):img tagı ile ulaşabileceğimiz url'e çevirir
        const { data: urlData } = supabase.storage
          .from("wardrobe")
          .getPublicUrl(cleanFileName);
        publicUrl = urlData.publicUrl;
      }

      const { error: insertError } = await supabase.from("clothes").insert([
        {
          product_name: data.product.name,
          product_category: data.product.category,
          product_price: data.product.price,
          shop_name: data.shopName,
          image_url: publicUrl,
        },
      ]);

      if (insertError) throw insertError;

      // alert("Ürün başarıyla eklendi! 🎉");
      toast.success("Ürün başarıyla eklendi! ✨", {
        description: "Veriler başarıyla kaydedildi",
      });
      onSuccess();
      setOpen(false);
      // reset(); // Formu temizle
    } catch (error: any) {
      alert("Hata oluştu: " + error.message);
      console.error(error);
    }
  };
  return (
    <div className="w-125 h-full rounded-l-2xl bg-[#F39CC1] flex flex-col p-4 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex justify-end p-2">
          <X className=" cursor-pointer" />
        </div>
        <CustomInput
          label="Mağaza Adı"
          register={register("shopName")}
          type="text"
          className="bg-white  w-full"
          labelClassName="w-[130px]"
        />

        <CustomInput
          label="Ürün Adı"
          register={register("product.name")}
          type="text"
          className="bg-white w-full "
          labelClassName="w-[130px]"
        />
        <CustomInput
          label="Kategori"
          register={register("product.category")}
          type="text"
          className="bg-white w-full"
          labelClassName="w-[130px]"
        />

        <CustomInput
          label="Fiyat"
          register={register("product.price")}
          type="number"
          className="bg-white w-full"
          labelClassName="w-[130px]"
        />
        <ImageUploadButton register={register("product.imageFile")} />
        <CustomButton type="submit">Ekle</CustomButton>
      </form>
    </div>
  );
};
export default SideBar;
