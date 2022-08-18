import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";


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
    return (
        <div className="AppTodolist">

                <h3>{props.title}
                    <button onClick={deleteTitlehandler}>x</button>
                </h3>
                {/*<div>*/}
                {/*    <input value={newTaskTitle} className={error ? "error" : ""} onChange={onChangeCurrentTarget}*/}
                {/*           onKeyPress={onKeyPressHandler}*/}
                {/*    />*/}
                {/*    <button onClick={addTask}>+</button>*/}
                {/*    {error && <div className={"errorMessage"}>{error}</div>}*/}
                <AddItemForm addItem={addTask} />
                <ul>
                    {
                        props.task.map((t) => {
                            const onChangeIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.ChangeIsDone(t.id, e.currentTarget.checked, props.todolistId)
                            }
                            const deleteTask = () => {
                                props.removeTasks(t.id, props.todolistId)
                            }

                            return <li key={t.id} className={t.isDone ? "isDone" : ""}><input type="checkbox"
                                                                                              onChange={onChangeIsDoneHandler}
                                                                                              checked={t.isDone}/>
                                <span className={"span"}>{t.title}</span>
                                <button onClick={deleteTask}>x</button>
                            </li>;
                        })
                    }
                    {/*<li><input type="checkbox" checked={props.task[0].isDone}/> <span>{props.task[0].title}</span></li>*/}
                    {/*<li><input type="checkbox" checked={props.task[1].isDone}/> <span>{props.task[1].title}</span></li>*/}
                    {/*<li><input type="checkbox" checked={props.task[2].isDone}/> <span>{props.task[2].title}</span></li>*/}
                </ul>
                <div>
                    <button className={props.filter === "all" ? "activeFilter" : ""}
                            onClick={onAllClickHandler}>All
                    </button>
                    <button className={props.filter === "active" ? "activeFilter" : ""}
                            onClick={onActiveClickHandler}>Active
                    </button>
                    <button className={props.filter === "completed" ? "activeFilter" : ""}
                            onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>

    );
}

