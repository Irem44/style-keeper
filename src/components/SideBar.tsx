import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabase";
import { cleanFileNime } from "../utils/stringHelpers";
import CustomInput from "./CustomInput";
import ImageUploadButton from "./ImageUploadButton";
import CustomButton from "./CustomButton";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Shirt,
  Watch,
  Glasses,
  ShoppingBag,
  Handbag,
  Footprints,
  Crown,
  Gem,
  ShoppingBasket,
  Backpack,
  Tags,
  Zap,
} from "lucide-react";
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
  const container = useRef<HTMLDivElement>(null);
  //Form
  const { register, handleSubmit } = useForm<CreationFormType>();
  // GSAP Animasyon Bloğu
  useGSAP(
    () => {
      if (open) {
        // 1. Sidebar Giriş Animasyonu
        gsap.from(container.current, {
          //*Başlangıç noktası-ne
          xPercent: 100,
          duration: 0.6,
          ease: "power2.out",
        });

        gsap.to(".clothing-item", {
          y: "-120vh",
          x: "random(-40, 40)",
          rotation: "random(-360, 360)", // Döndürerek uçuruyoruz
          duration: "random(6, 10)", // Biraz daha yavaş ve süzülerek
          repeat: -1,
          ease: "none",
          delay: "random(0, 5)",
          stagger: {
            amount: 4,
            from: "random",
          },
        });

        // 3. Form Elemanlarının Sırayla Belirmesi
        gsap.from(".form-item", {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.3,
        });
      }
    },
    { scope: container, dependencies: [open] },
  );

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
  if (!open) return null;
  // Uçuşacak ikonlar listesi
  const floatingIcons = [
    Shirt,
    Watch,
    Glasses,
    ShoppingBag,
    Handbag,
    Footprints,
    Crown,
    Gem,
    ShoppingBasket,
    Backpack,
    Tags,
    Zap,
    Shirt,
    ShoppingBag,
  ];
  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-998 transition-opacity duration-500"
        onClick={() => setOpen(false)}
      />
      <div
        className="fixed top-0 right-0 w-full h-screen  bg-[#f3a8c7] shadow-2xl p-6 z-999 overflow-hidden"
        ref={container}
      >
        {/* 1. Arka Planda Uçuşan Kıyafetler */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingIcons.map((Icon, i) => {
            const randomSize = Math.floor(Math.random() * 30 + 20); // 20px-50px arası
            return (
              <div
                key={i}
                className="clothing-item absolute -bottom-20"
                style={{ left: Math.random() * 80 + 10 + "%" }}
              >
                <Icon size={randomSize} color="#D22E74" strokeWidth={1} />
              </div>
            );
          })}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 flex flex-col gap-6 "
        >
          <div className="w-full flex justify-end p-2 form-item">
            <X className=" cursor-pointer" onClick={() => setOpen(false)} />
          </div>
          <div className="form-item">
            <CustomInput
              label="Mağaza Adı"
              register={register("shopName")}
              type="text"
              className="bg-white w-full"
              labelClassName="w-[130px] "
            />
          </div>
          <div className="form-item">
            <CustomInput
              label="Ürün Adı"
              register={register("product.name")}
              type="text"
              className="bg-white w-full "
              labelClassName="w-[130px]"
            />
          </div>
          <div className="form-item">
            <CustomInput
              label="Kategori"
              register={register("product.category")}
              type="text"
              className="bg-white w-full"
              labelClassName="w-[130px]"
            />
          </div>
          <div className="form-item">
            <CustomInput
              label="Fiyat"
              register={register("product.price")}
              type="number"
              className="bg-white w-full"
              labelClassName="w-[130px]"
            />
          </div>
          <div className="form-item"></div>
          <div className="form-item">
            <ImageUploadButton register={register("product.imageFile")} />
          </div>
          <div className="w-full flex justify-end items-center form-item">
            <CustomButton type="submit">Ekle</CustomButton>
          </div>
        </form>
      </div>
      <div />
    </>
  );
};
export default SideBar;
