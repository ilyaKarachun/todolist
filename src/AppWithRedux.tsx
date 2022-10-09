import React, {useCallback, useReducer} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed"


export type todolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type StateTaskType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {
    const dispatch = useDispatch()
    const todolist = useSelector<AppRootStateType, todolistType[]>( state => state.todolists)
    const task = useSelector<AppRootStateType, StateTaskType>( state => state.tasks)

    const ChangeIsDone = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeStatusTaskAC(todolistId, taskId, isDone))
    }, [dispatch])

    const removeTasks = useCallback((id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback ((tittle: string, todolistId: string) => {
        dispatch(addTaskAC(todolistId,  tittle))
    }, [dispatch])

    const changeTaskTitleStatus = useCallback ((id: string, value: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, value))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const AddTodolist = useCallback ((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitleHandler = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch])
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

