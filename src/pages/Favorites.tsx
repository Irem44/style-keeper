import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Header from "../components/Header";
import { Heart, Search } from "lucide-react";
import CustomTextInput from "../components/CustomTextInput";

const Favorites = () => {
  const [favoritesProduct, setFavoritesProduct] = useState<any>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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
        product_price,
        product_category,
        image_url,
        shop_name)

      `);
      if (favoritesData?.length !== 0) {
        setFavoritesProduct(favoritesData);
        console.log("Favorites", favoritesData);
      }
    } catch (error) {
      console.error("Error", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFavorites();
  }, []);
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
        {loading && favoritesProduct ? (
          favoritesProduct?.map((item: any) => (
            <div className="w-70 min-h-95 bg-white rounded-3xl overflow-hidden border border-pink-100 flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-full h-60 bg-[#FDF2F7] flex items-center justify-center p-4 relative ">
                <img
                  src={item.clothes.image_url}
                  alt={item.clothes.product_name}
                  className="max-w-full max-h-full object-contain drop-shadow-md"
                />
              </div>

              <div className="p-5 flex flex-col gap-2">
                <span className="text-[15px] text-gray-400 uppercase font-bold tracking-widest">
                  {item.clothes.shop_name || "Butik"}
                </span>
                <h2 className="text-[#D22E74] font-bold text-lg leading-tight line-clamp-1">
                  {item.clothes.product_name}
                </h2>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xl font-extrabold text-gray-800">
                    {item.clothes.product_price} TL
                  </span>
                </div>
              </div>
            </div>
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
