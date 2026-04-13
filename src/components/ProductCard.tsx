import { Heart } from "lucide-react";

interface ProductCardProps {
  shopName: string;
  productName: string;
  productCategory: string;
  productPrice: number;
  imageUrl: string;
}

const ProductCard = ({
  shopName,
  productName,
  productPrice,
  imageUrl,
}: ProductCardProps) => {
  return (
    <div className="relative w-86 h-86  lg:w-125 lg:h-125 border border-[#F39CC1] rounded-full flex flex-col items-center justify-end overflow-hidden group">
      <button className=" top-10 right-13 cursor-pointer absolute lg:top-8 lg:right-8 z-30 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white transition-all duration-300 group/heart">
        <Heart
          size={24}
          className="text-white fill-transparent group-hover/heart:fill-pink-500 group-hover/heart:text-pink-500 transition-colors"
        />
      </button>
      <img
        src={imageUrl}
        alt="product"
        className="absolute inset-0 w-full h-full object-contain z-0 transition-transform duration-300 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/40 z-10 " />
      <div className="relative z-20 flex flex-col items-center  text-white drop-shadow-md p-2">
        <span className="text-2xl font-light">{shopName}</span>
        <span className="text-lg font-bold">{productName}</span>
        <span className="mt-2 font-bold bg-[#F39CC1] px-5 py-2 rounded-full text-black">
          {productPrice} TL
        </span>
      </div>
    </div>
  );
};
export default ProductCard;
