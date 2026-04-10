import { Plus } from "lucide-react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { supabase } from "../lib/supabase";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [showPlus, setShowPlus] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  useEffect(() => {
    getData();
  }, []);
  //Get Data
  const getData = async () => {
    try {
      const { data, error } = await supabase.from("clothes").select("*");
      if (data?.length !== 0) {
        setData(data);
      }
      console.log("Data", data);
    } catch (error) {
      console.error("Veri alınırken hata oluştu:", error);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-pink-100 ">
      <Header setIsSideBarOpen={setIsSideBarOpen} />

      {showPlus && data?.lenght === 0 && (
        <div className=" flex justify-center w-full h-[calc(100vh-80px)]">
          <div className="flex flex-col justify-center items-center">
            <Plus
              size={85}
              strokeWidth={2}
              className="bg-[#F39CC1] p-2 rounded-2xl cursor-pointer"
              onClick={() => {
                setIsSideBarOpen(true);
                setShowPlus(false);
              }}
            />
            <span className="text-[#D22E74] mt-2">İlk Deponuzu Oluşturun</span>
          </div>
        </div>
      )}

      {isSideBarOpen && (
        <SideBar
          open={isSideBarOpen}
          setOpen={(open) => setIsSideBarOpen(open)}
          onSuccess={() => {
            getData();
          }}
        />
      )}
      <div className="grid grid-cols-1  sm:grid-cols-2   lg:grid-cols-2 xl:grid-cols-3 p-4 mt-4 gap-5 justify-items-center">
        {data && data.length > 0
          ? data.map((item: any) => {
              return (
                <ProductCard
                  key={item.id}
                  shopName={item.shop_name}
                  productName={item.product_name}
                  productCategory={item.product_category}
                  productPrice={item.product_price}
                  imageUrl={item.image_url}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};
export default Home;
