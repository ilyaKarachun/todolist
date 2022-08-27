import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


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


export function ToDoList(props: PropsType) {
    // let [newTaskTitle, setNewTaskTitle] = useState('')
    // let [error, setError] = useState<string | null>(null)

    // const addTask = () => {
    //     if (newTaskTitle.trim() !== '') {
    //         props.addTask(newTaskTitle.trim(), props.todolistId)
    //         setNewTaskTitle("")
    //         // setNewTaskTitle(newTaskTitle)
    //     } else {
    //         setError("Title is required")
    //     }
    // }

    // const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null)
    //     if (event.key === 'Enter') {
    //         addTask()
    //         setNewTaskTitle('')
    //     }
    // }
    // const onChangeCurrentTarget = ((event: ChangeEvent<HTMLInputElement>) => {
    //     setNewTaskTitle(event.currentTarget.value)
    // })

    const onAllClickHandler = () => props.changeFilter("all", props.todolistId)
    const onActiveClickHandler = () => props.changeFilter("active", props.todolistId)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todolistId)
    const deleteTitlehandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }

    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitleHandler(title, props.todolistId)
    }
    return (
        <div className="AppTodolist">

            <h3><EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
                {/*<button onClick={deleteTitlehandler}>x</button>*/}
                <IconButton
                    aria-label="delete"
                    onClick={deleteTitlehandler}
                >
                    <DeleteIcon />
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
                    props.task.map((t) => {
                        const onChangeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.ChangeIsDone(t.id, e.currentTarget.checked, props.todolistId)
                        }
                        const onChangeTitleHandler = (value: string) => {
                            props.changeTaskTitleStatus(t.id, value, props.todolistId)
                        }
                        const deleteTask = () => {
                            props.removeTasks(t.id, props.todolistId)
                        }

                        return <div key={t.id} className={t.isDone ? "isDone" : ""}><Checkbox
                                                                                          onChange={onChangeIsDoneHandler}
                                                                                          checked={t.isDone}/>
                            {/*<span className={"span"}>{t.title}</span>*/}
                            <EditableSpan title={t.title}
                                          onChange={onChangeTitleHandler}/>
                            {/*<button onClick={deleteTask}>x</button>*/}
                            <IconButton onClick={deleteTask} aria-label="delete" size="small">
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </div>;
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
}

