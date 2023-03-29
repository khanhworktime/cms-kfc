import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import Facility from "./Facility/facility";
import Storage from "./Storage/storage"

const DefaultRoute = ()=>(<div className={"flex gap-4 flex-wrap "}>
    <Link to={"/inventory/facility"} className={"my-4 overflow-hidden h-[25vh] flex flex-col w-[25vh] bg-white rounded-md shadow hover:shadow-lg hover:scale-[1.05] transition-all"}>
        <p className={"p-6 font-semibold"}>Facility</p>
        <img src={'https://images.unsplash.com/photo-1602429438429-3def765b84d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=739&q=80'} width={"100%"} height={"auto"} alt={"Inventory"}/>
    </Link>
    <Link to={"/inventory/storage"} className={"my-4 overflow-hidden h-[25vh] flex flex-col w-[25vh] bg-white rounded-md shadow hover:shadow-lg hover:scale-[1.05] transition-all"}>
        <p className={"p-6 font-semibold"}>Storage</p>
    </Link>
</div>)

const Inventory = () => {
    return (
        <>
            <main className={"p-6"}>
                <h1>Inventory manager</h1>
                <hr className={"mb-4"}/>
                <Routes>
                    <Route path={"/"} element={<DefaultRoute/>}/>
                    <Route path={"/facility"} element={<Facility />}></Route>
                    <Route path={"/storage"} element={<Storage />}></Route>
                </Routes>

            </main>
        </>
    );
};

export default Inventory;