// Es el encargado de interactuar con nuestra API
import {
  DraftProductSchema,
  ProductsSchema,
  Product,
  ProductSchema,
} from "../types";
import axios from "axios";
import { pipe, safeParse, transform, number, string, parse } from "valibot";
import { toBoolean } from "../utils/index";

type ProductData = {
  [k: string]: FormDataEntryValue;
};
export async function addProduct(data: ProductData) {
  try {
    // Validamos que sean del tipo correcto
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    //console.log(result);
    if (result.success) {
      // Usamos axios para crear el producto
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      //console.log(url);
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Datos no válidos");
    }
  } catch (error) {
    console.log(error);
  }
}

// Funcion para obtener productos de la API
export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url);
    //console.log(data);
    // Validamos
    const result = safeParse(ProductsSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
}

// Funcion para obtener un producto de la API con id
export async function getProductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios(url);
    //console.log(data);
    // Validamos
    const result = safeParse(ProductSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
}

// Actualizar producto
export async function updateProduct(data: ProductData, id: Product["id"]) {
  try {
    // Convertimos de un string a numero
    const NumberSchema = pipe(string(), transform(Number), number());
    // Validamos que sean del tipo correcto
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString()),
    });
    //console.log(result);
    if (result.success) {
      // Usamos axios para crear el producto
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      //console.log(url);
      await axios.put(url, {
        name: result.output.name,
        price: result.output.price,
        availability: result.output.availability,
      });
    } else {
      throw new Error("Datos no válidos");
    }
  } catch (error) {
    console.log(error);
  }
}

// Borrar un producto
export async function deleteProduct(id: Product["id"]) {
  //console.log(id);
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}

// Actualizar disponibilidad
export async function updateProductAvailability(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log(error);
  }
}
