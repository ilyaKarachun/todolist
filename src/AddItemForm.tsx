import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type addItemFormPropsType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: addItemFormPropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState('');
    let [error, setError] = useState<string | null>(null);
    const onChangeCurrentTarget = ((event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    })

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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

        <input value={newTaskTitle}
               className={error ? "error" : ""}
               onChange={onChangeCurrentTarget}
               onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={"errorMessage"}>{error}</div>}
    </div>

}