import { RouterProvider } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import { router } from './router.tsx';
import CategoriesProvider from "./components/Providers/CategoriesProvider.tsx";
import CartProvider from "./components/Providers/CartProvider.tsx";

function App() {
    return (
        <>
            <CssBaseline />
            <CartProvider>
                <CategoriesProvider>
                    <RouterProvider router={router}/>
                </CategoriesProvider>
            </CartProvider>
        </>
    );
}

export default App;
