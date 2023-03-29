import React from 'react';
import Navbar from "../../components/Navbar/navbar";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./dashboard";
import Users from "./Users/users";
import Data from "./Data/data";
import Inventory from "./Inventory/inventory";

const Pages = () => {
    return (
        <div className={"bg-[#f5f7f9] w-screen min-h-screen sm:pl-[15vw]"}>
            <Navbar/>
            <Routes>
                <Route path={"/"} element={<Dashboard/>}/>
                <Route path={"/users"} element={<Users/>}/>
                <Route path={"/data/*"} element={<Data/>}/>
                <Route path={"/inventory/*"} element={<Inventory/>}/>
            </Routes>
        </div>
    );
};

export default Pages;