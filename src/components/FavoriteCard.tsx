import { X } from "lucide-react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import type { Favorite } from "../pages/Favorites/FavoritesModels";

interface FavoriteCardProps {
  id: number;
  image_url: string;
  product_name: string;
  shop_name: string;
  product_price: number;
  setFavoritesProduct: React.Dispatch<React.SetStateAction<Favorite[]>>;
}

const FavoriteCard = ({
  id,
  image_url,
  product_name,
  shop_name,
  product_price,
  setFavoritesProduct,
}: FavoriteCardProps) => {
  const removeFromFavorites = async () => {
    try {
      const { error } = await supabase.from("favorites").delete().eq("id", id);
      if (error) throw error;
      toast.success("Ürün favorilerden kaldırıldı!");
      setFavoritesProduct((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };
  return (
    <div className="w-80 sm:w-85 md:w-85 lg:w-80 xl:w-80 h-85 lg:h-100 xl:h-100 bg-white rounded-3xl overflow-hidden border border-pink-100 flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="w-full h-50 bg-[#FDF2F7] flex items-center justify-center p-4 relative ">
        <div>
          <X
            className="absolute  top-2 right-1.5 text-[#D22E74] cursor-pointer"
            onClick={removeFromFavorites}
          />
        </div>
        <img
          src={image_url}
          alt={product_name}
          className="w-full h-full object-contain drop-shadow-md"
        />
      </div>

      <div className="p-5 flex flex-col gap-2">
        <span className="text-[15px] text-gray-400 uppercase font-bold tracking-widest">
          {shop_name || "Butik"}
        </span>
        <h2 className="text-[#D22E74] font-bold text-lg leading-tight line-clamp-1">
          {product_name}
        </h2>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-extrabold text-gray-800">
            {product_price} TL
          </span>
        </div>
      </div>
    </div>
  );
};
export default FavoriteCard;
