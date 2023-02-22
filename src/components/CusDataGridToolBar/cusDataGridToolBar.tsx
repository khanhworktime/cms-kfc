import React, {EventHandler} from 'react';
import {GridToolbarContainer} from "@mui/x-data-grid";
import {HiLockClosed, HiPencil, HiTrash} from "react-icons/hi";
import {Button} from "@mui/material";

interface ToolBarProps{
    fnEdit?: Function,
    fnLock?: Function,
    fnDel?: Function,
    isSelecting: boolean
}

const CusDataGridToolBar = (props: ToolBarProps) => {
    const {fnEdit, fnLock, fnDel, isSelecting} = props
    return (
            <div className={"flex gap-4 my-4"}>
                <Button variant={"contained"} onClick={()=>fnEdit && fnEdit()} disabled={!isSelecting}>
                    <HiPencil></HiPencil>
                </Button>
                <Button color={"warning"} variant={"contained"} onClick={()=>fnLock && fnLock()} disabled={!isSelecting}>
                    <HiLockClosed></HiLockClosed>
                </Button>
                <Button color={"error"} variant={"contained"} onClick={()=>fnDel && fnDel()} disabled={!isSelecting}>
                    <HiTrash></HiTrash>
                </Button>
            </div>
    );
};

export default CusDataGridToolBar;