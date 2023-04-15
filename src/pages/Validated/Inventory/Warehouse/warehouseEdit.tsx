import React, {useEffect, useState} from 'react';
import {Autocomplete, Backdrop, Box, Button, Checkbox, Fade, FormControlLabel, Modal, TextField} from "@mui/material";
import CusBox from "../../../../components/CusBox/cusBox";
import NoImgFound from "../../../../components/NoImgFound/noImgFound";
import IWarehouse, {warehouseInit} from "../../../../Interfaces/warehouse.interface";
import {useForm} from "react-hook-form";
import axios from "axios";
import env from "../../../../env";


type editWarehouseProps = {
    openForm:boolean,
    closeHandler: Function,
    isUpdate: boolean,
    item: IWarehouse,
    reRender: any
}

const WarehouseEdit = (props:editWarehouseProps) => {
    let {openForm, closeHandler, isUpdate, item, reRender} = props
    const {register, handleSubmit, formState:{errors}} = useForm()

    const [warehouse, setWarehouse] = useState<IWarehouse>(warehouseInit)
    const [user, setUser] = useState<Array<any>>()

    // User for options in autocomplete
    const userOpt = user?.map((user)=>({
        label: user.name, id: user.id
    }))

    // Fetch data first time
    useEffect(()=>{
        axios({
            method: "get",
            url: env.serverUrl + "/users",
            data: {
                options: {roles: ["admin", "hr"]}
            }
        }).then((res) => setUser(res.data.users))
    }, [])

    const inputHandler = (evt:any , newVal?: any) => {
        let name: string = evt.target.id;
        let newValue = evt.target.value;
        if (name.includes("unit")) {
            name = "unit"
            newValue = newVal
        }
        if (name === "state") newValue = newVal ? "active" : "inactive"
        if (name === "image") {
            // Preview image before upload
            newValue = evt.target.files[0];
        }
        setWarehouse({...warehouse, [name]: newValue});
    }


    // Handlers
    function addHandler() {}
    function updateHandler() {}
    return (
        <>
            <Modal
                open={openForm}
                onClose={()=>closeHandler()}
                className={"flex-all-center"}
                closeAfterTransition={true}
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openForm}>
                    <div  className={"flex flex-col md:flex-row"}>
                        <div className={"bg-white w-[50vw] md:max-w-[30vw] h-fit max-h-[90vh] z-10"}>
                            <CusBox header={isUpdate ? "Update a facility item" : "Add new facility item"}>
                                <Box component={"form"}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        defaultValue={item.name}
                                        id="name"
                                        label="Warehouse's name"
                                        {...register("name", {required: true})}
                                        error={!!errors.name}
                                        helperText={!!errors.name && "Name is required"}
                                        onChange={inputHandler}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        defaultValue={warehouse.address}
                                        id="address"
                                        label="Address"
                                        onChange={inputHandler}
                                    />
                                    <Autocomplete
                                        id="owner"
                                        value={warehouse.ownerId}
                                        defaultValue={warehouse.ownerId}
                                        {/*@ts-ignore*/...{}}
                                        options={userOpt}
                                        onChange={inputHandler}
                                        renderInput={(params) => (
                                            <TextField margin={"normal"}
                                                       {...params}
                                                       label="owner"/>)}
                                    />
                                    <div className="w-full">
                                        <label htmlFor={"img"}>Upload image</label>
                                        <input id="image" name={"image"} type="file" accept="image/*" className="w-full my-2"
                                               onChange={inputHandler}/>
                                    </div>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={warehouse.state == "active"}
                                                onChange={inputHandler}
                                                name={"state"} id={"state"}
                                            />}
                                        label="Activate this item ?"/>
                                </Box>
                                <div className={"flex gap-4 justify-between mt-6"}>
                                    <div className={"flex gap-4"}>
                                        {!isUpdate &&
                                            <Button variant={"contained"} className={""} onClick={handleSubmit(addHandler)}>Add</Button>}
                                        {isUpdate &&
                                            <Button variant={"contained"} className={""} onClick={handleSubmit(updateHandler)}>Update</Button>}
                                        <Button variant={"contained"} className={""} onClick={()=>closeHandler()}
                                                color={"success"}>Cancel</Button>
                                    </div>
                                </div>
                            </CusBox>
                        </div>
                    </div>
                </Fade>

            </Modal>
        </>
    );
};

export default WarehouseEdit;