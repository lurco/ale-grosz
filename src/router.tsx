import {createBrowserRouter} from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import ProductForm from "./components/Products/ProductForm.tsx";
import ProductDetails from "./components/Products/ProductDetails.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <h1>Home</h1>
            },
            {
                path: '/contact',
                element: <h1>Contact</h1>
            },
            {
                path: '/add-product',
                element: <ProductForm />
            },
            {
                path: '/products/:id',
                element: <ProductDetails />
            }
        ]
    },
    {
        path: '/registration',
        element: <h1>Registration</h1>
    }
])
