import { Outlet } from 'react-router-dom';
import {Container} from "@mui/material";
import NavBar from "../NavBar/NavBar.tsx";

function Layout() {
    return (
        <>
            <NavBar />
            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </>
    );
}

export default Layout;
