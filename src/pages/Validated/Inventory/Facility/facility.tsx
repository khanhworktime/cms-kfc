import React, {useEffect, useReducer, useState} from 'react';
import {Button} from "@mui/material";
import {HiArrowLeft} from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import FacilityDetails, {IFacilities} from "./facilityDetails";
import axios from "axios";
import env from "../../../../env";
import EditFacility from "./EditFacility/editFacility";

const Facility = () => {
    const navigate = useNavigate();

    const initInput: IFacilities = {
        id: undefined,
        name: "",
        amount: "",
        cost: "",
        issue_amount: "",
        state: "unavailable",
        supplierId: "",
        unit: "the",
        image: undefined
    }

    const facilityStateInit = {
        openAddForm: false,
        openUpdateForm: false,
        openDeleteConfirm: false,
        selectedItem: undefined,
    }

    const [facilityStates, setFacilityStates] = useReducer((state: any, newState: any) => ({...state, ...newState}), {
        ...facilityStateInit
    })
    const [facilities, setFacilities] = useState<Array<IFacilities>>([]);
    const [render, requestRerender] = useState(false);
    const reRender = () => requestRerender((prev) => !prev);

    // Fetch data
    useEffect(() => {
        axios({
            method: "get",
            url: env.serverUrl + "/facilities"
        }).then((res) => setFacilities(res.data.facilities))
    }, [render])

    // Checking var
    const isOpenForm : boolean = ( facilityStates.openAddForm || facilityStates.openUpdateForm ) && !!facilityStates.selectedItem

    // Handlers
    function itemOnClickHandler(item: IFacilities){
        const handler = async () => reRender()
        handler().then(() => setFacilityStates({openUpdateForm: true, selectedItem: item}))
    }
    // Setup new form
    function addFormSetup(){
        setFacilityStates({openAddForm: true, selectedItem: initInput})
    }
    return (
        <div>
            {isOpenForm && <EditFacility
                openForm={isOpenForm}
                closeHandler={() => setFacilityStates({
                    openUpdateForm: false,
                    openAddForm: false,
                    selectedItem: undefined
                })}
                reRender={reRender}
                isUpdate={facilityStates.openUpdateForm}
                item={facilityStates.selectedItem}
            />}
            <header className={"mb-2.5"}>
                <Button variant={"text"} onClick={() => navigate(-1)}><HiArrowLeft/> Back</Button>
            </header>
            <section>
                <h1>Facility management</h1>
                <h2 className={"font-medium"}>Total amount : {facilities.length} item{facilities.length > 1 ? "s" : ""}</h2>
                <div className={"main-section"}>
                    <div className={"w-full flex gap-4 justify-end"}>
                        <Button variant={"contained"} onClick={()=>addFormSetup()}>Add</Button>
                    </div>
                    <div className={"grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6"}>
                        {
                            facilities.map((facility:IFacilities, i: number) => (<FacilityDetails key={`facility${i}`} item={facility} onClick={()=>itemOnClickHandler(facility)}/>))
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Facility;