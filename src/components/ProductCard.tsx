import { Heart, Trash } from "lucide-react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

interface ProductCardProps {
  id: number;
  shopName: string;
  productName: string;
  productCategory: string;
  productPrice: number;
  imageUrl: string;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

const ProductCard = ({
  id,
  shopName,
  productName,
  productCategory,
  productPrice,
  imageUrl,
  setData,
}: ProductCardProps) => {
  const handleFavorites = async () => {
    try {
      const { data, error } = await supabase.from("favorites").insert([
        {
          product_id: id,
        },
      ]);
      if (error) {
        if (error.code === "23505") {
          toast.info("Bu ürün zaten favorilerinizde! ❤️");
        } else {
          toast.error("Ürün favorilere eklenemedi");
        }
      } else {
        toast.success("Ürün başarıyla favorilere eklendi🎉");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const removeClothes = async () => {
    try {
      const { error } = await supabase.from("clothes").delete().eq("id", id);

      if (error) throw error;
      setData((prev: any) => prev.filter((item: any) => item.id !== id));
      toast.success("Silme işlemi başarılı!");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="relative w-86 h-86  lg:w-100 lg:h-100 border border-[#F39CC1] rounded-full flex flex-col items-center justify-end overflow-hidden group">
      <button
        className=" top-10 right-13 cursor-pointer absolute lg:top-14 lg:right-14 z-30 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white transition-all duration-300 group/heart"
        onClick={handleFavorites}
      >
        <Heart
          size={24}
          className="text-white fill-transparent group-hover/heart:fill-pink-500 group-hover/heart:text-pink-500 transition-colors"
        />
      </button>
      <button
        className=" top-22 right-10 cursor-pointer absolute lg:top-25 lg:right-10 z-30 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white transition-all duration-300 group/heart"
        onClick={removeClothes}
      >
        <Trash
          size={24}
          className="text-white fill-transparent group-hover/heart:fill-pink-500 group-hover/heart:text-pink-500 transition-colors"
        />
      </button>
      <img
        src={imageUrl}
        alt="product"
        className="absolute inset-0 w-full h-full object-contain z-0 transition-transform duration-300 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/40 z-10 " />
      <div className="relative z-20 flex flex-col items-center  text-white drop-shadow-md p-2">
        <span className="text-2xl font-light">{shopName}</span>
        <span className="text-lg font-bold">{productName}</span>
        <span className="mt-2 font-bold bg-[#F39CC1] px-5 py-2 rounded-full text-black">
          {productPrice} TL
        </span>
      </div>
    </div>
  );
};
export default ProductCard;
