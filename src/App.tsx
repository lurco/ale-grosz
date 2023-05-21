import { router } from './router.tsx';
import { RouterProvider } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
    return (
        <>
            <CssBaseline />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
