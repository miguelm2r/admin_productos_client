import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {
  loader as productsLoader,
  action as updateAvailabilityAction,
} from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, {
  loader as EditProductLoader,
  action as EditProductAction,
} from "./views/EditProduct";
import { action as DeleteProductAction } from "./components/ProductDetails";

// Creamos el router
// Con index = true, le decimos que al visitar la pagina principal se cargara ese elemento

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: updateAvailabilityAction,
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: "productos/:id/editar",
        element: <EditProduct />,
        loader: EditProductLoader,
        action: EditProductAction,
      },
      {
        path: "productos/:id/eliminar",
        action: DeleteProductAction,
      },
    ],
  },
]);
