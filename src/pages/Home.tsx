import { Plus } from "lucide-react";
import Header from "../components/Header";
import { useState } from "react";
import SideBar from "../components/SideBar";
import { supabase } from "../lib/supabase";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const [showPlus, setShowPlus] = useState<boolean>(true);

  //Get Data
  const getData = async () => {
    try {
      const { data, error } = await supabase.from("clothes").select("*");

      console.log("Data", data);
    } catch (error) {
      console.error("Veri alınırken hata oluştu:", error);
    }
  };
  return (
    <div className="flex flex-col">
      <Header />

      <div className="w-full h-[calc(100vh-80px)] flex items-center ">
        <div className="flex-1 flex justify-center">
          {showPlus && (
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
              <span className="text-[#D22E74] mt-2">
                İlk Deponuzu Oluşturun
              </span>
            </div>
          )}
        </div>

        {isSideBarOpen && (
          <SideBar
            open={isSideBarOpen}
            setOpen={(open) => setIsSideBarOpen(open)}
            onSuccess={() => {
              getData();
            }}
          />
        )}
      </div>
    </div>
  );
};
export default Home;
