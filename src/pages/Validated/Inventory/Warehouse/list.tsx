import React from 'react';
import {TbBuildingWarehouse} from "react-icons/tb";
import IWarehouse from "../../../../Interfaces/warehouse.interface";
import {Button, Chip} from "@mui/material";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";

type listProps = {
    warehouses: Array<IWarehouse>
}

const Warehouse = (warehouse: IWarehouse)=>{
    const {name, address, state} = warehouse
    const navigate = useNavigate()
    const location = useLocation()
    let statusColor:"success" | "error" = state === "active" ? "success" : "error"
    return (
        <div
            onClick={()=>{navigate(location.pathname + "/" + warehouse.id)}}
            className={"w-[300px] h-fit flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.05] transition-all"}>

            <img src={"https://images.unsplash.com/photo-1487611459768-bd414656ea10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"} alt={"Warehouse"}/>
            <div className={"p-6 relative"}>
                <h3>{name}</h3>
                <em className={"text-zinc-400"}>{address}</em>
                <Chip className={"absolute top-1 right-1 capitalize"} color={statusColor} label={warehouse.state} />
            </div>
        </div>
    )
}

const WarehousesList = (props: listProps) => {
    const {warehouses} = props
    return (
        <div className={"w-full bg-white p-6 rounded drop-shadow-sm"}>
            <div className={"title flex flex-col md:flex-row gap-2 justify-between"}>
                <h1><TbBuildingWarehouse height={30} width={30} className={"inline-block"}/> All warehouse installed</h1>
                <Button>+ Add</Button>
            </div>
            <div className={"flex flex-row flex-wrap w-full gap-4 mt-6"}>
                {
                    warehouses.map((warehouse)=>(
                        <Warehouse key={warehouse.id} {...warehouse}/>
                    ))
                }
            </div>
        </div>
    );
};

export default WarehousesList;