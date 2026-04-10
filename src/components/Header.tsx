import CustomButton from "./CustomButton";
import gorsel from "../assets/Adobe Express - file.png";
import { Heart } from "lucide-react";
interface HeaderProps {
  setIsSideBarOpen: (value: boolean) => void;
}
const Header = ({ setIsSideBarOpen }: HeaderProps) => {
  return (
    <div className="bg-[#D22E74] text-white wid w-full h-20 flex justify-between items-center ">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <img src={gorsel} alt="logo bulunamadı" className="object-contain" />
      </div>
      <div className="flex items-center gap-2 cursor-pointer">
        <CustomButton
          type="button"
          className="w-25! h-10!"
          onClick={() => setIsSideBarOpen(true)}
        >
          Ekle
        </CustomButton>
        <Heart className="text-pink-100 fill-pink-100 h-8 w-8" />
      </div>
    </div>
  );
};
export default Header;
