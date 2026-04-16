import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Header from "../../components/Header";
import { Heart, Search } from "lucide-react";
import CustomTextInput from "../../components/CustomTextInput";
import type { Favorite } from "./FavoritesModels";
import FavoriteCard from "../../components/FavoriteCard";

const Favorites = () => {
  const [favoritesProduct, setFavoritesProduct] = useState<Favorite[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const getFavorites = async () => {
    try {
      setLoading(true);

      const { data: favoritesData, error } = await supabase.from("favorites")
        .select(`
        id, 
        product_id,
        clothes (
          id,
          product_name,
          product_category,
          shop_name,
          product_price,
          image_url
        )
      `);

      if (error) throw error;
      setFavoritesProduct(favoritesData || []);
      console.log("Favorite Data", favoritesData);
    } catch (error) {
      console.error("Favoriler çekilirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFavorites();
  }, []);
  const filteredData = favoritesProduct?.filter((item: any) => {
    const search = searchValue.toLowerCase();
    const cloth = item.clothes;
    return (
      cloth.product_name?.toLowerCase().includes(search) ||
      cloth.shop_name?.toLowerCase().includes(search) ||
      cloth.product_price?.toString().toLowerCase().includes(search)
    );
  });
  return (
    <div className="bg-pink-100">
      <Header showSideBar={false} />
      <div className="w-full h-15 flex items-center justify-center mt-2 text-[35px] space-x-2">
        <Heart
          width={32}
          height={32}
          stroke="none"
          className="fill-[#D22E74] border-none"
        />
        <h1 className="text-[#D22E74]  font-bold italic">Favorilerim</h1>
      </div>
      {/* Arama Alanı */}
      <div className="mt-6 flex justify-center px-4">
        <CustomTextInput
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          icon={<Search className="text-[#D22E74]" />}
          placeHolder="Ürün Ara..."
        />
      </div>

      <div className="w-full min-h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 p-10 justify-items-center">
        {loading ? (
          <div className="w-full col-span-4 flex flex-row justify-center">
            <h2 className="text-[#D22E74] font-bold text-lg">
              Favori ürünleri yükleniyor...
            </h2>
          </div>
        ) : filteredData && filteredData.length !== 0 ? (
          filteredData?.map((item: any) => (
            <FavoriteCard
              id={item.id}
              image_url={item.clothes.image_url}
              product_name={item.clothes.product_name}
              shop_name={item.clothes.shop_name}
              product_price={item.clothes.product_price}
              setFavoritesProduct={setFavoritesProduct}
            />
          ))
        ) : (
          <div className="w-full col-span-4 flex flex-row justify-center">
            <h2 className="text-[#D22E74] font-bold text-lg">
              Favori ürün bulunmamakta...
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};
export default Favorites;
