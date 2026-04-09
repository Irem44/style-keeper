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
  productCategory,
  productPrice,
  imageUrl,
}: ProductCardProps) => {
  return (
    <div className="w-72 h-72 border flex flex-col items-center justify-center border-black rounded-full">
      <img src={imageUrl} alt="resim bulunamadı" width={50} height={50} />
      <span>{shopName}</span>
      <span>{productName}</span>
      <span>{productCategory}</span>
      <span>{productPrice}</span>
    </div>
  );
};
export default ProductCard;
