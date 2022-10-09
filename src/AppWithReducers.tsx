import React, {useReducer} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeStatusTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed"

// let task2: Array<TaskType> = [
//     {id: 1, title: "A1", isDone: true},
//     {id: 2, title: "B1", isDone: true},
//     {id: 3, title: "C1", isDone: false},
//     {id: 3, title: "C2", isDone: false}
// ]

export type todolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type StateTaskType = {
    [key: string]: Array<TaskType>
}

export function AppWithReducers() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    let [todolist, dispatchTodolistReducer] = useReducer(todolistReducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ])

    let [task, dispatchTaskReducer] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "book", isDone: true},
            {id: v1(), title: "car", isDone: true}
        ]

    })

    const ChangeIsDone = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatchTaskReducer(changeStatusTaskAC(todolistId, taskId, isDone))
    }

    function removeTasks(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchTaskReducer(action)
    }

    function addTask(tittle: string, todolistId: string) {
        dispatchTaskReducer(addTaskAC(todolistId,  tittle))
    }

    function removeTodolist(todolistId: string) {
        dispatchTodolistReducer(removeTodolistAC(todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchTodolistReducer(changeTodolistFilterAC(todolistId, value))
    }

    function AddTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatchTodolistReducer(action)
        dispatchTaskReducer(action)
    }

    const changeTaskTitleStatus = (id: string, value: string, todolistId: string) => {
        dispatchTaskReducer(changeTaskTitleAC(todolistId, id, value))
    }

    const changeTodolistTitleHandler = (title: string, todolistId: string) => {
        dispatchTodolistReducer(changeTodolistTitleAC(todolistId, title))
    }
    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            What u gonna do today? Make ur own to-do LIST !!!
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container>
                <Grid container style={ {padding: "10px"} }>
                    <AddItemForm addItem={AddTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolist.map(t => {
                        let taskForToDoList = task[t.id];
                        if (t.filter === "completed") {
                            taskForToDoList = task[t.id].filter(t => t.isDone)
                        }
                        if (t.filter === "active") {
                            taskForToDoList = task[t.id].filter(t => !t.isDone)
                        }

                        return (
                            <Grid item>
                                <Paper elevation={3} style={ {padding: '10px'} }>
                                    <ToDoList
                                        key={t.id}
                                        todolistId={t.id}
                                        title={t.title}
                                        task={taskForToDoList}
                                        removeTasks={removeTasks}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        ChangeIsDone={ChangeIsDone}
                                        filter={t.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitleStatus={changeTaskTitleStatus}
                                        changeTodolistTitleHandler={changeTodolistTitleHandler}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>

    );
}

