import { RouterProvider } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import { router } from './router.tsx';
import CategoriesProvider from "./components/Providers/CategoriesProvider.tsx";

function App() {
    return (
        <>
            <CssBaseline />
            <CategoriesProvider>
                <RouterProvider router={router}/>
            </CategoriesProvider>
        </>
    );
}

export default App;
