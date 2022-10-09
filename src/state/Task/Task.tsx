import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";


type TaskPropType = {
    id: string
    isDone: boolean
    title: string
    todolistId: string
    ChangeIsDone: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitleStatus: (id: string, value: string, todolistId: string) => void
    removeTasks: (id: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropType) => {

    const onChangeIsDoneHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.ChangeIsDone(props.id, e.currentTarget.checked, props.todolistId)
    }, [props.ChangeIsDone, props.id, props.todolistId])

    const onChangeTitleHandler = useCallback ((value: string) => {
        props.changeTaskTitleStatus(props.id, value, props.todolistId)
    }, [props.changeTaskTitleStatus, props.id, props.todolistId])
    const deleteTask = useCallback (() => {
        props.removeTasks(props.id, props.todolistId)
    }, [props.removeTasks, props.id, props.todolistId])

    return <div key={props.id} className={props.isDone ? "isDone" : ""}><Checkbox
        onChange={onChangeIsDoneHandler}
        checked={props.isDone}
        color={"success"}
    />
        <EditableSpan title={props.title}
                      onChange={onChangeTitleHandler}/>
        <IconButton onClick={deleteTask} aria-label="delete" size="small">
            <DeleteIcon fontSize="small"/>
        </IconButton>
    </div>;

})