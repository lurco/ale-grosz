import './App.css';
import {useEffect} from "react";

function App() {

    useEffect(() => {
        fetch('/api/v1/products').then((response) => response.json()).then(console.log);
    },[])

    return (
        <>
            <h1>Alegrosz</h1>
        </>
    );
}

export default App;
