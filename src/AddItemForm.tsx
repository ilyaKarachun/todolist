import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { IconButton, TextField} from "@mui/material";
import {NoteAdd} from "@mui/icons-material";


type addItemFormPropsType = {
    addItem: (title: string) => void

}

export const AddItemForm = React.memo ((props: addItemFormPropsType) => {

    let [newTaskTitle, setNewTaskTitle] = useState('');
    let [error, setError] = useState<string | null>(null);
    const onChangeCurrentTarget = ((event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    })

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (event.key === 'Enter') {
            addTask()
            setNewTaskTitle('')
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle("")
            // setNewTaskTitle(newTaskTitle)
        } else {
            setError("Title is required")
        }
    }
    return <div>
        <TextField variant="outlined" label={"type value"} value={newTaskTitle}
                   className={error ? "error" : ""}
                   onChange={onChangeCurrentTarget}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
        />
        {/*<input value={newTaskTitle}*/}
        {/*       className={error ? "error" : ""}*/}
        {/*       onChange={onChangeCurrentTarget}*/}
        {/*       onKeyPress={onKeyPressHandler}*/}
        {/*/>*/}
        {/*<button onClick={addTask}>+</button>*/}
        <IconButton onClick={addTask}>
            <NoteAdd/>
        </IconButton>
        {error && <div className={"errorMessage"}>{error}</div>}
    </div>

})