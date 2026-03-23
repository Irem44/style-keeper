import { Form, useForm } from "react-hook-form";

interface CreationFormType {
  id: number;
  shopName: string;
  product: {
    name: string;
    category: string;
    price: number;
    imageUrl: string;
  };
}
const SideBar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreationFormType>();
  const onSubmit = (data: CreationFormType) => {
    console.log("Data", data);
  };
  return (
    <div className="w-72 h-full rounded-l-2xl bg-[#F39CC1] flex flex-col p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Mağaza Adı:</label>
        <input
          type="text"
          {...register("shopName")}
          className="bg-white block"
        />
        <label>Ürün Adı:</label>
        <input
          type="text"
          {...register("product.name")}
          className="bg-white block"
        />
        <label>Kategori:</label>
        <input
          type="text"
          {...register("product.category")}
          className="bg-white block"
        />
        <label>Fiyat:</label>
        <input
          type="number"
          {...register("product.price")}
          className="bg-white block"
        />
        <input type="file" className="bg-white mt-2 w-50 h-10 block" />
        <button type="submit">Ekle</button>
      </form>
    </div>
  );
};
export default SideBar;
