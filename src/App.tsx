import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

export type FilterValuesType = "all" | "active" | "completed"

// let task2: Array<TaskType> = [
//     {id: 1, title: "A1", isDone: true},
//     {id: 2, title: "B1", isDone: true},
//     {id: 3, title: "C1", isDone: false},
//     {id: 3, title: "C2", isDone: false}
// ]

type todolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type StateTaskType = {
    [key: string]: Array<TaskType>
}

function App() {
    // let initTask: Array<TaskType> = [
    //     {id: 1, title: "HTML&CSS", isDone: true},
    //     {id: 2, title: "JS", isDone: true},
    //     {id: 3, title: "React", isDone: false},
    //     {id: 4, title: "Redux", isDone: false}
    // ]
    // let [task, setTask] = useState<Array<TaskType>>([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "React", isDone: false},
    //     {id: v1(), title: "Redux", isDone: false}]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    const ChangeIsDone = (taskId: string, isDone: boolean, todolistId: string) => {

        let tasks = task[todolistId].find(t => t.id === taskId)
        if (tasks) {
            tasks.isDone = isDone
        }
        setTask({...task})
    }


    function removeTasks(id: string, todolistId: string) {
        let taskObj = task[todolistId]
        let filteredTask = taskObj.filter((t) => t.id !== id)
        task[todolistId] = filteredTask;
        setTask({...task});
    }

    function addTask(tittle: string, todolistId: string) {
        let newTitle = {id: v1(), title: tittle, isDone: false}
        let newTasks = task[todolistId]
        let finishTask = [newTitle, ...newTasks]
        task[todolistId] = finishTask
        setTask({...task})

    }

    function removeTodolist(todolistId: string) {
        let filtered = todolist.filter(t => t.id !== todolistId)
        if (filtered) {
            setTodolist(filtered)
        }

        delete task[todolistId]
        setTask({...task})

    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolists = todolist.find(t => t.id === todolistId);
        if (todolists) {
            todolists.filter = value
            setTodolist([...todolist])
        }
    }

    const todolistId1 = v1();
    const todolistId2 = v1();

    let [todolist, setTodolist] = useState<Array<todolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ])

    let [task, setTask] = useState<StateTaskType>({
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

    function AddTodolist(title: string) {
        let newTodolist: todolistType = {
            id: v1(),
            title,
            filter: "all"
        }
        setTodolist([newTodolist, ...todolist])
        setTask({
            ...task,
            [newTodolist.id]: []
        })
    }

    const changeTaskTitleStatus = (id: string, value: string, todolistId: string) => {
        let todolistTasks = task[todolistId];
        let newTask = todolistTasks.find(t => t.id === id)
        if (newTask) {
            newTask.title = value
            setTask({...task})
        }
    }

    const changeTodolistTitleHandler = (title: string, todolistId: string) => {
        const todolistTasks = todolist.find(t => t.id === todolistId)

        if (todolistTasks) {
            todolistTasks.title = title
            setTodolist([...todolist])
        }
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

export default App;
