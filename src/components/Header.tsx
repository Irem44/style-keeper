import CustomButton from "./CustomButton";
interface HeaderProps {
  setIsSideBarOpen: (value: boolean) => void;
}
const Header = ({ setIsSideBarOpen }: HeaderProps) => {
  return (
    <div className="bg-[#D22E74] text-white wid w-full h-20 flex justify-between items-center">
      <div>Logo</div>
      <div>
        <CustomButton
          type="button"
          className="w-25! h-10!"
          onClick={() => setIsSideBarOpen(true)}
        >
          Ekle
        </CustomButton>
      </div>
    </div>
  );
};
export default Header;
