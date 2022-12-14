import {v1} from "uuid";
import {FilterValuesType, todolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolists-reducer";


test("correct todolist should be removed", () => {
        let todolistId1 = v1()
        let todolistId2 = v1()

    const startState: todolistType[] =[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = "New Todolist"

    const startState: todolistType[] =[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe("all")
})


test("correct todolist should change it's name", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTodolistTitle = "New Todolist"
    const startState: todolistType[] =[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action = {
        type: "CHANGE-TODOLIST-TITLE",
        id: todolistId2,
        title: newTodolistTitle
    }


    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe(newTodolistTitle)
    expect(endState[1].filter).toBe("all")
})

test("correct filter should be changes", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newFilter: FilterValuesType = "active"
    const startState: todolistType[] =[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action = {
    //     type: "CHANGE-TODOLIST-FILTER",
    //     id: todolistId2,
    //     filter: newFilter
    // }


    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe("What to buy")
    expect(endState[1].filter).toBe(newFilter)
})