import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

// Creamos un loader para recuperar los datos del producto a editar
// Con params rescatamos el id de la url
export async function loader({ params }: LoaderFunctionArgs) {
  //console.log("desde loader");
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) {
      return redirect("/");
    }
    return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  //recuperamos los datos
  const data = Object.fromEntries(await request.formData());

  // Validacion
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }

  if (params.id !== undefined) {
    // editamos el producto
    await updateProduct(data, +params.id);
  }

  // Redireccionamos a la pagina principal
  return redirect("/");
}

// Opciones de disponibilidad
const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export default function EditProduct() {
  const product = useLoaderData() as Product;
  // Con esto cuando tengamos un error aparecera
  const error = useActionData() as string;

  // Recuperamos los datos de producto a editar

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-700"
        >
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="POST">
        <ProductForm product={product} />

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Editar Producto"
        />
      </Form>
    </>
  );
}
