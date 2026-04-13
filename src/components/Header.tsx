import CustomButton from "./CustomButton";
import image from "../assets/logo.png";
import { Heart, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface HeaderProps {
  setIsSideBarOpen: (value: boolean) => void;
}
const Header = ({ setIsSideBarOpen }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#D22E74] text-white wid w-full h-20 flex justify-between items-center ">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <img src={image} alt="logo bulunamadı" className="object-contain" />
      </div>
      <div className="flex items-center gap-2 cursor-pointer">
        <CustomButton
          type="button"
          className="w-25! h-10!"
          onClick={() => setIsSideBarOpen(true)}
        >
          <Plus />
        </CustomButton>
        <Heart
          className="text-pink-100 fill-pink-100 h-8 w-8"
          onClick={() => navigate("/favorites")}
        />
      </div>
    </div>
  );
};
export default Header;
