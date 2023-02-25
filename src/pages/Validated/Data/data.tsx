import React, {useEffect, useState} from 'react';
import {Card, CardHeader} from "@mui/material";
import {Link, Route, Routes} from "react-router-dom";
import FnB from "./FnB/FnB";

const DefaultRoute = ()=>(<div className={"flex gap-4 flex-wrap "}>
    <Link to={"/data/fnb"} className={"my-4 h-[25vh] w-[25vh] bg-white p-6 rounded-md shadow hover:shadow-lg transition-all"}>
        <p>F&B data</p>
    </Link>
    <Link to={"/"} className={"my-4 h-[25vh] w-[25vh] bg-white p-6 rounded-md shadow hover:shadow-lg transition-all"}>
        <p>Facilities</p>
    </Link>
    <Link to={"/"} className={"my-4 h-[25vh] w-[25vh] bg-white p-6 rounded-md shadow hover:shadow-lg transition-all"}>
        <p>Supplier</p>
    </Link>
</div>)

const Data = () => {
    const [page, getPage] = useState(window.location.pathname)

    return (
        <>

            <main className={"p-6"}>
                <h1>Data & resources manager</h1>
                <hr className={"mb-4"}/>
                <Routes>
                    <Route path={"/"} element={<DefaultRoute/>}/>
                    <Route path={"/fnb"} element={<FnB />}></Route>
                </Routes>

            </main>
        </>
    );
};

export default Data;