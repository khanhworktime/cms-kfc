import Validated from "./pages/Validated";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Login from "./pages/Guest/login";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

    // useEffect(()=>{
    //     localStorage.removeItem("uid")
    // }, [])

    const router = createBrowserRouter([
        {
            path: "*",
            element: <Validated/>

        },
        {
            path: "/login",
            element: <Login/>,
        }
    ]);
    return (
        <div className="App">
            <ToastContainer/>
            <RouterProvider router={router}/>
        </div>
    )
}

export default App
