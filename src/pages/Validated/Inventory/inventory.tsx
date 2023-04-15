import React, {useEffect, useState} from 'react';
import {Link, Route, Routes, useParams} from "react-router-dom";
import Facility from "./Facility/facility";
import Storage from "./Storage/storage"
import In_outbound from "./In_Outbound/in_outbound";

import WarehousesList from "./Warehouse/list";
import axios from "axios";
import env from "../../../env";

import EmptyBox from "../../../assets/empty-box.svg"
import {Button} from "@mui/material";
import WarehouseEdit from "./Warehouse/warehouseEdit";
import useFetch from "../../../Hooks/useFetch";
import {set} from "react-hook-form";
import LoadingCover from "../../../components/LoadingCover/loadingCover";
import IWarehouse from "../../../Interfaces/warehouse.interface";
import WarehouseDetail from "./Warehouse/warehouseDetail";



const InventoryRoutes = () => {
    return(<>
        <Routes>
            <Route path={"/"} element={<DefaultRoute />}></Route>
                <Route path={"/:whId"} element={<WarehouseDetail />}></Route>
                <Route path={"/:whId/facility"} element={<Facility/>}></Route>
                <Route path={"/:whId/storage"} element={<Storage/>}></Route>
                <Route path={"/:whId/in-outbound"} element={<In_outbound/>}></Route>
        </Routes>
    </>)
}

const DefaultRoute = () =>{

    const [warehouses, setWarehouses] = useState<Array<IWarehouse>>([]);
    const {data, isLoading, isError} = useFetch({path: "/warehouse/", method: "get"})

    useEffect(()=>{
        //@ts-ignore
        if(data != null) setWarehouses(data.warehouse);
    }, [data])
    return (
        <>
            {/*Providers*/}
            <LoadingCover visible={isLoading}/>
            {!isLoading &&
            <main className={"pt-4 w-full"}>
                <h1>Inventory manager</h1>
                <hr className={"mb-4"}/>
                {
                    warehouses.length == 0 && <NoWarehouse/>
                }
                {
                    warehouses.length > 0 && <WarehousesList warehouses={warehouses}/>
                }

            </main>
            }
        </>)
}

const NoWarehouse = ()=>{
    return (
        <div className={"rounded h-fit w-full bg-white text-center py-4 flex flex-col gap-2 items-center"}>
            <h1>No warehouse was setup</h1>
            <img src={EmptyBox} alt={"No warehouse was found"} width={150} height={150}/>
            <Button>+ Click here to add</Button>
        </div>
    )
}

const Inventory = () => {

    return (
        <>
            {/*TODO: Làm tiếp đoạn mở giao diện edit kho lên (Giao diện quản lý thông tin chung của khi)*/}
            {/*<WarehouseEdit />*/}

            <InventoryRoutes/>
            {/*Main*/}

        </>
    );
};

export default Inventory;