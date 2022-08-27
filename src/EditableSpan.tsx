import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanTypeProps = {
    title: string
    onChange: (value: string) => void
}

export function EditableSpan(props: EditableSpanTypeProps) {
    let[editMode, setEditMode] = useState(false)
    let[title, setTitle] = useState("") // can be like props.title

    const editModeActivateHandler = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const editModeDeActivateHandler = () =>{
        setEditMode(false)
        props.onChange(title)
    }
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return editMode
        ? <TextField variant={"standard"} onBlur={editModeDeActivateHandler} onChange={inputOnChangeHandler} value={title} autoFocus/>
        : <span onDoubleClick={editModeActivateHandler} className={"span"}>{props.title}</span>
}