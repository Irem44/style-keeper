import { Plus, Search } from "lucide-react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { supabase } from "../lib/supabase";
import ProductCard from "../components/ProductCard";
import CustomTextInput from "../components/CustomTextInput";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [showPlus, setShowPlus] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data, error } = await supabase.from("clothes").select("*");
      if (error) throw error;
      setData(data || []);
      console.log("Veriler Alındı:", data);
    } catch (error) {
      console.error("Veri alınırken hata oluştu:", error);
    }
  };

  // Filtreleme Mantığı: Her render'da güncel searchValue'a göre data'yı süzüyoruz
  const filteredData = data.filter((item: any) => {
    const search = searchValue.toLowerCase();
    return (
      item.product_name?.toLowerCase().includes(search) ||
      item.shop_name?.toLowerCase().includes(search) ||
      item.product_category?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-pink-100">
      <Header setIsSideBarOpen={setIsSideBarOpen} />

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

      {/* Boş Durum (Hiç veri yoksa) */}
      {data.length === 0 && showPlus && (
        <div className="flex justify-center w-full h-[calc(100vh-150px)]">
          <div className="flex flex-col justify-center items-center">
            <Plus
              size={85}
              strokeWidth={2}
              className="bg-[#F39CC1] p-4 rounded-2xl cursor-pointer text-white hover:bg-[#D22E74] transition-colors"
              onClick={() => {
                setIsSideBarOpen(true);
                setShowPlus(false);
              }}
            />
            <span className="text-[#D22E74] mt-4 font-semibold">
              İlk Deponuzu Oluşturun
            </span>
          </div>
        </div>
      )}

      {/* SideBar Bileşeni */}
      {isSideBarOpen && (
        <SideBar
          open={isSideBarOpen}
          setOpen={(open) => setIsSideBarOpen(open)}
          onSuccess={() => {
            getData();
          }}
        />
      )}

      {/* Ürün Listesi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 p-6 mt-4 gap-6 justify-items-center">
        {filteredData.length > 0 ? (
          filteredData.map((item: any) => (
            <ProductCard
              key={item.id}
              shopName={item.shop_name}
              productName={item.product_name}
              productCategory={item.product_category}
              productPrice={item.product_price}
              imageUrl={item.image_url}
            />
          ))
        ) : data.length > 0 ? (
          <div className="col-span-full text-[#D22E74] font-medium mt-10">
            "{searchValue}" ile eşleşen bir ürün bulunamadı. 🔍
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
