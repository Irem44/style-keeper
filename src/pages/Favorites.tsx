import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const Favorites = () => {
  const [favoritesProduct, setFavoritesProduct] = useState<any>();

  const getFavorites = async () => {
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
  };
  useEffect(() => {
    getFavorites();
  }, []);
  return (
    <>
      <div className="w-full min-h-screen grid grid-cols-2 gap-12 p-10 ">
        {favoritesProduct?.map((item: any) => (
          <div className="grid grid-cols-2">
            <div className="relative">
              <img
                src={item.clothes.image_url}
                alt="resim bulunamadı"
                className="absolute w-full h-full inset-0 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Favorites;
