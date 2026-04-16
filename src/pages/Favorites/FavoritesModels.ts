import z from "zod";

const ClothesSchema = z.object({
  id: z.number(),
  image_url: z.string(),
  product_category: z.string(),
  product_name: z.string(),
  product_price: z.number(),
  shop_name: z.string(),
});

const FavoriteSchema = z.object({
  id: z.number(),
  product_id: z.number(),
  clothes: z.array(ClothesSchema),
});
export type Favorite = z.infer<typeof FavoriteSchema>;
export type Clothes = z.infer<typeof ClothesSchema>;
