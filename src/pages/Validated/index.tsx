import React from 'react';
import Navbar from "../../components/Navbar/navbar";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./dashboard";
import Users from "./Users/users";

const Pages = () => {
    return (
        <div className={"bg-[#f5f7f9] w-screen min-h-screen pl-[15vw]"}>
            <Navbar/>
            <Routes>
                <Route path={"/"} element={<Dashboard />}/>
                <Route path={"/users"} element={<Users />} />
            </Routes>
        </div>
    );
};

export default Pages;