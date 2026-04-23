import CustomButton from "./CustomButton";
import image from "../assets/logo.png";
import { Heart, Plus, LogOut, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

interface HeaderProps {
  setIsSideBarOpen?: (value: boolean) => void;
  showSideBar?: boolean;
}

const Header = ({ setIsSideBarOpen, showSideBar }: HeaderProps) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // Kullanıcının adını metadata'dan çekelim
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata.full_name || "Kullanıcı");
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/signin");
    }
  };

  return (
    <div className="bg-[#D22E74] text-white w-full h-20 flex justify-between items-center shadow-md">
      {/* Logo Alanı */}
      <div
        className="relative w-28 h-28 flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={image} alt="Style Keeper Logo" className="object-contain" />
      </div>

      {showSideBar === true && (
        <div className="flex items-center gap-2 cursor-pointer pr-2">
          {/* Kullanıcı İsmi (Opsiyonel) */}
          <div className="hidden md:flex items-center gap-2 text-pink-100 text-sm italic">
            <UserIcon size={16} />
            <span>{userName}</span>
          </div>
          {/* Çıkış Yap Butonu */}
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-white/10 rounded-full transition-colors group"
            title="Çıkış Yap"
          >
            <LogOut
              className="text-pink-100 group-hover:text-white"
              size={24}
            />
          </button>
          <Heart
            className="text-pink-100 fill-pink-100 h-8 w-8 hover:scale-110 transition-transform"
            onClick={() => navigate("/favorites")}
          />
          <CustomButton
            type="button"
            className="w-25! h-10!"
            onClick={() => setIsSideBarOpen?.(true)}
          >
            <Plus />
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default Header;
