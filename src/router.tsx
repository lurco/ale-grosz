import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import ProductForm from './components/Products/ProductForm.tsx';
import ProductDetails from './components/Products/ProductDetails.tsx';
import { Home } from './components/Home.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/contact',
                element: <h1>Contact</h1>,
            },
            {
                path: '/add-product',
                element: <ProductForm />,
            },
            {
                path: '/products/:productId',
                element: <ProductDetails />,
            },
        ],
    },
    {
        path: '/registration',
        element: <h1>Registration</h1>,
    },
]);
