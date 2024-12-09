import { object, string, number, boolean, InferOutput, array } from "valibot";

// Creamos el schema para validar el formulario enviado
export const DraftProductSchema = object({
  name: string(),
  price: number(),
});

// Creamos el schema para validar los productos obtenidos
export const ProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  availability: boolean(),
});

// Creamos un arreglo de product
export const ProductsSchema = array(ProductSchema);

export type Product = InferOutput<typeof ProductSchema>;
