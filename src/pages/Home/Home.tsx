import { Plus, Search } from "lucide-react";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { supabase } from "../../lib/supabase";
import ProductCard from "../../components/ProductCard";
import CustomTextInput from "../../components/CustomTextInput";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPlus, setShowPlus] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);

      // 1. Önce giriş yapmış kullanıcının bilgilerini alıyoruz
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("Kullanıcı bulunamadı");
        return;
      }

      // 2. Sorguya .eq("user_id", user.id) filtresini ekliyoruz
      const { data: clothesData, error } = await supabase
        .from("clothes")
        .select("*")
        .eq("user_id", user.id); // Sadece bana ait olanları getir!

      if (error) throw error;
      setData([...(clothesData || [])]);
    } catch (error) {
      console.error("Veri alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
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
  const sumPrice = filteredData?.reduce(
    (acc, item) => acc + (item.product_price || 0),
    0,
  );
  return (
    <div className="flex flex-col w-full min-h-screen bg-pink-100">
      <Header setIsSideBarOpen={setIsSideBarOpen} showSideBar={true} />

      {/* Arama Alanı */}
      <div className="mt-6 flex flex-col items-center justify-center   md:grid  md:grid-cols-[1fr_auto] lg:grid  lg:grid-cols-[1fr_auto]items-center px-4 gap-4">
        {/* Sol taraf: Tüm boşluğu doldurur */}
        <div className="flex justify-center">
          <CustomTextInput
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            icon={<Search className="text-[#D22E74]" />}
            placeHolder="Ürün Ara..."
          />
        </div>

        <div className="text-white bg-[#D22E74] w-25 h-25  flex flex-col items-center justify-center gap-2 border-2 border-[#D22E74] rounded-full p-2">
          <span>Toplam</span>
          <span> {sumPrice}</span>
        </div>
      </div>

      {/* Boş Durum (Hiç veri yoksa) */}
      {!loading && showPlus && data.length === 0 && (
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
              id={item.id}
              shopName={item.shop_name}
              productName={item.product_name}
              productPrice={item.product_price}
              imageUrl={item.image_url}
              setData={setData}
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
