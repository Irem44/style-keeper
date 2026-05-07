import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabase";
import { cleanFileNime } from "../utils/stringHelpers";
import CustomInput from "./CustomInput";
import ImageUploadButton from "./ImageUploadButton";
import CustomButton from "./CustomButton";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
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

  // Sidebar açıkken arka plan scroll'unu engelle
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const { register, handleSubmit, reset } = useForm<CreationFormType>();

  // GSAP Animasyon Bloğu
  useGSAP(
    () => {
      if (open) {
        // 1. Sidebar Giriş Animasyonu
        gsap.from(container.current, {
          xPercent: 100,
          duration: 0.6,
          ease: "power4.out",
        });

        // 2. Uçuşan İkonlar Animasyonu (fromTo ile kesin konumlandırma)
        gsap.fromTo(
          ".clothing-item",
          {
            y: 0, // CSS'teki top: 100% noktasından başlar
            opacity: 0,
          },
          {
            y: "-125vh", // Sidebar tavanının iyice dışına çıkana kadar yükselir
            opacity: 0.9,
            x: "random(-60, 60)",
            rotation: "random(-360, 360)",
            duration: "random(8, 12)",
            repeat: -1,
            ease: "none",
            delay: "random(0, 3)",
            stagger: {
              amount: 9,
              from: "random",
            },
          },
        );

        // 3. Form Elemanlarının Sırayla Belirmesi
        gsap.from(".form-item", {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          ease: "back.out(1.7)",
        });
      }
    },
    { scope: container, dependencies: [open] },
  );
  const onSubmit = async (data: CreationFormType) => {
    try {
      // 1. Giriş yapmış kullanıcıyı al (Hayati önem taşıyor!)
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error(
          "Oturum süreniz dolmuş olabilir. Lütfen tekrar giriş yapın.",
        );
        return;
      }

      const file = data.product.imageFile[0];
      let publicUrl = "";

      if (file) {
        const cleanFileName = cleanFileNime(file.name);

        // 2. Storage politikasına uygun olarak resmi kullanıcı klasörüne yükle
        // Format: user_id/timestamp_dosyaadi.png (Aynı isimli dosyaların çakışmaması için timestamp ekledim)
        const filePath = `${user.id}/${Date.now()}_${cleanFileName}`;

        const { error: uploadError } = await supabase.storage
          .from("wardrobe")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // 3. Resmin URL'ini al
        const { data: urlData } = supabase.storage
          .from("wardrobe")
          .getPublicUrl(filePath);

        publicUrl = urlData.publicUrl;

        // 4. Veritabanına user_id ile birlikte kaydet
        const { error: insertError } = await supabase.from("clothes").insert([
          {
            product_name: data.product.name,
            product_category: data.product.category,
            product_price: data.product.price,
            shop_name: data.shopName,
            image_url: publicUrl,
            user_id: user.id, // RLS ve Foreign Key için bu şart!
          },
        ]);

        if (insertError) {
          alert("Ürün eklenirken bir hata oluştu: ");
        } else {
          toast.success("Ürün gardırobuna eklendi! ✨");

          await onSuccess();
          setOpen(false);
          reset();
        }
      } else {
        toast.error("Lütfen bir resim dosyası seçin.");
      }
    } catch (error: any) {
      toast.error("Hata oluştu: " + error.message);
      console.error(error);
    }
  };

  if (!open) return null;

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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-998"
        onClick={() => setOpen(false)}
      />

      <div
        className="fixed inset-y-0 right-0 sm:w-125 w-full bg-[#f3a8c7] shadow-2xl z-999 flex flex-col overflow-hidden"
        ref={container}
      >
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {floatingIcons.map((Icon, i) => {
            const randomSize = Math.floor(Math.random() * 30 + 20);
            return (
              <div
                key={i}
                className="clothing-item absolute"
                style={{
                  left: Math.random() * 80 + 10 + "%",
                  top: "100%",
                  willChange: "transform",
                }}
              >
                <Icon size={randomSize} color="#D22E74" strokeWidth={2} />
              </div>
            );
          })}
        </div>

        <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="w-full flex justify-end p-2 form-item">
              <X className="cursor-pointer" onClick={() => setOpen(false)} />
            </div>

            <div className="form-item">
              <CustomInput
                label="Mağaza Adı"
                register={register("shopName")}
                type="text"
                className="bg-white w-full"
                labelClassName="w-[130px] font-bold"
                required={true}
              />
            </div>

            <div className="form-item">
              <CustomInput
                label="Ürün Adı"
                register={register("product.name")}
                type="text"
                className="bg-white w-full"
                labelClassName="w-[130px] font-bold"
                required={true}
              />
            </div>

            <div className="form-item">
              <CustomInput
                label="Kategori"
                register={register("product.category")}
                type="text"
                className="bg-white w-full"
                labelClassName="w-[130px] font-bold"
                required={true}
              />
            </div>

            <div className="form-item">
              <CustomInput
                label="Fiyat"
                register={register("product.price")}
                type="number"
                className="bg-white w-full"
                labelClassName="w-[130px] font-bold"
                required={true}
              />
            </div>

            <div className="form-item pt-2">
              <ImageUploadButton register={register("product.imageFile")} />
            </div>

            <div className="w-full flex justify-end items-center form-item pt-4">
              <CustomButton type="submit">Ekle</CustomButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SideBar;
