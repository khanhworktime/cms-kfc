import React, {useEffect, useReducer, useState} from 'react';
import {
    Autocomplete,
    Backdrop,
    Box,
    Breadcrumbs,
    Button,
    Checkbox,
    Fade,
    FormControlLabel, Modal,
    TextField
} from "@mui/material";
import {HiArrowLeft} from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import {DataGrid, GridSelectionModel} from "@mui/x-data-grid";
import axios from "axios";
import env from "../../../../env";
import CusDataGridToolBar from "../../../../components/CusDataGridToolBar/cusDataGridToolBar";
import {toast} from "react-toastify";
import CusBox from "../../../../components/CusBox/cusBox";
import CusConfirmDialog from "../../../../components/CusConfirmDialog/cusConfirmDialog";

const FnB = () => {
    const navigate = useNavigate()

    const foodStateInit = {
        openAddForm: false,
        openUpdateForm: false,
        openBlockConfirm: false,
        openDeleteConfirm: false,
        inputs: {
            name: "",
            category: "new",
            price: "",
            sale_price: "",
            state: "unavailble",
            description: ""
        }
    }
    const [foodStates, setFoodStates] = useReducer((state: any, newState: any) => ({...state, ...newState}), {
        ...foodStateInit
    })

    const [foods, setFoods] = useState([]);
    const [foodCat, setFoodCat] = useState([]);
    const [render, requestRerender] = useState(false);

    const rerender = () => requestRerender((prev) => !prev)


    useEffect(()=>{
        axios({
            method: "get",
            url: env.serverUrl + "/foods"
        }).then((res)=> setFoods(res.data.foods))
    }, [render])

    useEffect(()=>{
        axios({
            method: "get",
            url: env.serverUrl + "/foods/categories"
        }).then((res)=> setFoodCat(res.data.categories))
    }, [])

    // Form input handler
    const handleInput = (evt: any, newVal?: any) => {
        let name: string = evt.target.id;
        let newValue = evt.target.value;
        if (name.includes("category")) {
            name = "category"
            newValue = newVal
        }
        if (name === "state") newValue = newVal ? "available" : "unavailable"
        if (name === "state_onsale") {
            newValue = newVal ? "onsale" : "unavailable"
            name = "state"
        }
        setFoodStates({inputs: {...foodStates.inputs, [name]: newValue}});
    };
    // Foods table config
    const foodColumns = [{
        field: "id",headerName: "ID", width: 50
    }, {
        field: "name",headerName: "Name", width: 125
    }, {
        field: "category",headerName: "Category", width: 75
    },{
        field: "price",headerName: "Price", width: 100
    }, {
        field: "sale_price",headerName: "Sale price", width: 100,
    }, {
        field: "description",headerName: "Description", width: 100
    }, {
        field: "state",headerName: "State", width: 100
    }]

    const [selectingFood, setSelectingFood] = useState<GridSelectionModel>([])
    // CRUD Foods
    const addFoodHandler = ()=>{
        toast.promise(axios({
            method: "post",
            url: env.serverUrl + "/foods",
            data: {...foodStates.inputs}
        }), {
            pending: "Verifying data",
            success: "Added successfully",
            error: {
                render({data}) {
                    // @ts-ignore
                    return data.response.data.message
                }
            }
        }).then(()=>setFoodStates({...foodStateInit}))
            .finally(()=>rerender())
    }
    const updateFoodHandler = ()=>{
        toast.promise(axios({
            method: "put",
            url: env.serverUrl + "/foods/" + selectingFood[0],
            data: {...foodStates.inputs}
        }), {
            pending: "Verifying data",
            success: "Update successfully",
            error: {
                render({data}) {
                    // @ts-ignore
                    return data.response.data.message
                }
            }
        }).then(()=>setFoodStates({...foodStateInit}))
            .finally(()=>rerender())
    }
    const blockFoodHandler = ()=>{
        toast.promise(axios({
            method: "put",
            url: env.serverUrl + "/foods/" + selectingFood[0],
            data: {...foodStates.inputs, category: undefined, state: "unavailable"}
        }), {
            pending: "Verifying data",
            success: "Item just jumped out of the menu",
            error: {
                render({data}) {
                    // @ts-ignore
                    return data.response.data.message
                }
            }
        }).then(()=>setFoodStates({...foodStateInit}))
            .finally(()=>rerender())
    }

    const fetchFoodAndOpenForm = () => {
        toast.promise(axios({
            method: "get",
            url: env.serverUrl + "/foods/" + selectingFood[0]
        }), {
            pending: "Just a sec!"
        }).then((res) => {
            const data = res.data.food
            setFoodStates({
                openUpdateForm: true,
                inputs: {...data}
            })
        }).finally(()=>rerender())
    }

    const deleteFoodHandler = () => {
        toast.promise(
            axios({
                method: "delete",
                data: {
                    "uid": localStorage.getItem("uid")
                },
                url: env.serverUrl + "/foods/" + selectingFood[0]
            }),
            {
                success: "Deleted successfully",
                pending: "Verifying data",
                error: {
                    render({data}) {
                        // @ts-ignore
                        return data.response.data.message
                    }
                }
            })
            .then(() => {
                setFoodStates({openDeleteConfirm: false})
            }).finally(()=>rerender())
    }
    return (
        <div>
            {/*       Confirm Providers*/}
            <CusConfirmDialog confirmHandler={blockFoodHandler}
                              open={foodStates.openBlockConfirm}
                              closeHandler={() => setFoodStates({openBlockConfirm: false})}
                              message={"Confirm to stop selling this item ?"}/>
            <CusConfirmDialog confirmHandler={deleteFoodHandler}
                              open={foodStates.openDeleteConfirm}
                              closeHandler={() => setFoodStates({openDeleteConfirm: false})}
                              message={"Confirm to delete this item ?"}/>
            {/* Add and Update form*/}
            <Modal
                open={foodStates.openAddForm || foodStates.openUpdateForm}
                onClose={()=>setFoodStates({...foodStateInit})}
                className={"flex-all-center"}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={foodStates.openAddForm || foodStates.openUpdateForm}>
                    <div className={"bg-white w-[50vw] md:max-w-[30vw] h-fit max-h-[50vh] z-10"}>
                        <CusBox header={foodStates.openAddForm ? "Add new food item" : "Update a food item"}>
                            <Box component={"form"}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    defaultValue={foodStates.inputs.name}
                                    id="name"
                                    label="Food's name"
                                    name="name"
                                    autoFocus
                                    onChange={handleInput}
                                />
                                <TextField
                                    margin="normal"
                                    type='number'
                                    fullWidth
                                    defaultValue={foodStates.inputs.price}
                                    id="price"
                                    label="Price (VND)"
                                    name="price"
                                    onChange={handleInput}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    defaultValue={foodStates.inputs.description}
                                    id="description"
                                    label="Description"
                                    name="description"
                                    onChange={handleInput}
                                />
                                <Autocomplete
                                    id="category"
                                    value={foodStates.inputs.category}
                                    defaultValue={foodStates.inputs.category}
                                    options={foodCat}
                                    onChange={handleInput}
                                    renderInput={(params) => (
                                        <TextField margin={"normal"}
                                                   {...params}
                                                   label="Category"/>)}
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox checked={foodStates.inputs.state == "available" || foodStates.inputs.state == "onsale"}
                                              onChange={handleInput}
                                              name={"state"} id={"state"} disabled={foodStates.inputs.state == "onsale"}
                                    />}
                                    label="Activate this item ?"/>
                                <FormControlLabel
                                    control={<Checkbox checked={foodStates.inputs.state === "onsale"} onChange={handleInput}
                                                       name={"state_onsale"} id={"state_onsale"}/>}
                                    label="Put this item in sale mode ?"/>
                            </Box>
                            <div className={"flex gap-4 justify-end"}>
                                {foodStates.openAddForm &&
                                    <Button variant={"contained"} onClick={addFoodHandler}>Add</Button>}
                                {foodStates.openUpdateForm &&
                                    <Button variant={"contained"} onClick={updateFoodHandler}>Update</Button>}
                                <Button variant={"contained"} onClick={() => setFoodStates({...foodStateInit})}
                                        color={"error"}>Cancel</Button>
                            </div>
                        </CusBox>
                    </div>
                </Fade>

            </Modal>


            <header className={"mb-2.5"}>
                <Button variant={"text"} onClick={()=>navigate(-1)}><HiArrowLeft /> Back</Button>
            </header>
            <section>
                <h2>F&B Data resources</h2>
                <div className={"flex gap-4 flex-wrap mt-4 min-h-[60vh]"}>
                    <div className={"w-[700px] max-w-[100%] bg-white p-6 rounded-md shadow"}>
                        <h2>Food list</h2>
                        <CusDataGridToolBar isSelecting={!!selectingFood[0]}
                                            fnAdd={()=>setFoodStates({openAddForm: true})}
                                            fnEdit={()=>fetchFoodAndOpenForm()}
                                            fnLock={()=> setFoodStates({openBlockConfirm: true})}
                                            fnDel={()=> setFoodStates({openDeleteConfirm: true})}
                        />
                        <DataGrid columns={foodColumns}
                                  rows={foods}
                                  onSelectionModelChange={(newSelection)=>setSelectingFood(newSelection)}
                                  autoHeight/>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FnB;