import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./state/Task/Task";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean

}

type PropsType = {
    title: string,
    task: Array<TaskType> //TaskType[], the same thing
    removeTasks: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    ChangeIsDone: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    changeTaskTitleStatus: (id: string, value: string, todolistId: string) => void
    changeTodolistTitleHandler: (title: string, id: string) => void
}


export const ToDoList = React.memo((props: PropsType) => {

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todolistId), [props.changeFilter, props.todolistId])

    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todolistId), [props.changeFilter, props.todolistId])

    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todolistId), [props.changeFilter, props.todolistId])

    const deleteTitlehandler = useCallback(() => {
        props.removeTodolist(props.todolistId)
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistId)
    }, [props.addTask, props.todolistId])

    const changeTodolistTitleHandler = useCallback((title: string) => {
        props.changeTodolistTitleHandler(title, props.todolistId)
    }, [props.changeTodolistTitleHandler, props.todolistId])

    let taskForToDoList = props.task

    if (props.filter === "completed") {
        taskForToDoList = taskForToDoList.filter(t => t.isDone)
    }
    if (props.filter === "active") {
        taskForToDoList = taskForToDoList.filter(t => !t.isDone)
    }
    return (
        <div className="AppTodolist">

            <h3><EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
                {/*<button onClick={deleteTitlehandler}>x</button>*/}
                <IconButton
                    aria-label="delete"
                    onClick={deleteTitlehandler}
                >
                    <DeleteIcon/>
                </IconButton>
            </h3>
            {/*<div>*/}
            {/*    <input value={newTaskTitle} className={error ? "error" : ""} onChange={onChangeCurrentTarget}*/}
            {/*           onKeyPress={onKeyPressHandler}*/}
            {/*    />*/}
            {/*    <button onClick={addTask}>+</button>*/}
            {/*    {error && <div className={"errorMessage"}>{error}</div>}*/}
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    taskForToDoList.map((t) => {
                        return  <Task
                            id={t.id}
                            isDone={t.isDone}
                            title={t.title}
                            todolistId={props.todolistId}
                            ChangeIsDone={props.ChangeIsDone}
                            changeTaskTitleStatus={props.changeTaskTitleStatus}
                            removeTasks={props.removeTasks}
                            key={t.id}
                        />
                    })
                }
                {/*<li><input type="checkbox" checked={props.task[0].isDone}/> <span>{props.task[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.task[1].isDone}/> <span>{props.task[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.task[2].isDone}/> <span>{props.task[2].title}</span></li>*/}
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                    // className={props.filter === "all" ? "activeFilter" : ""}
                        onClick={onAllClickHandler}
                >All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "text"}
                        color={"primary"}
                    // className={props.filter === "active" ? "activeFilter" : ""}
                        onClick={onActiveClickHandler}
                >Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"}
                        color={"secondary"}
                    // className={props.filter === "completed" ? "activeFilter" : ""}
                        onClick={onCompletedClickHandler}
                >Completed
                </Button>
            </div>
        </div>

    );
})

