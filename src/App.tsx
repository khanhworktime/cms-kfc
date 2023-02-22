import Validated from "./pages/Validated";
import {
    createBrowserRouter, Route, Router,
    RouterProvider, Routes,
} from "react-router-dom";
import Users from "./pages/Validated/Users/users";
import Login from "./pages/Guest/login";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

function App() {
    const router = createBrowserRouter([
        {
            path: "*",
            element: <Validated/>

        },
        {
            path: "/login",
            element: <Login />,
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
