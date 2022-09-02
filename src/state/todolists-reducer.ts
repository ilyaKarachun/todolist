import {todolistType} from "../App";
import {v1} from "uuid";


type ActionType = {
    type: string
    [key: string]: any
}

export const todolistReducer = (state: todolistType[], action: ActionType): todolistType[]=> {
        switch (action.type) {
            case "REMOVE-TODOLIST":
                return [
                    ...state.filter(f => f.id !== action.id)
                ]
            case    "ADD-TODOLIST":
                return [
                    ...state, {id: v1(), title: action.title, filter: "all"}
                ]
            case "CHANGE-TODOLIST-TITLE":
                const todolist = state.find(f => f.id === action.id)
                if(todolist) {
                    todolist.title = action.title
                }
                return [
                    ...state
                ]
            case "CHANGE-TODOLIST-FILTER":
                const todolistFilter = state.find(f => f.id === action.id)
                if(todolistFilter) {
                    todolistFilter.filter = action.filter
                }
                return [...state]
            default:
                throw new Error("I dont understand this action")
        }
}

export const RemoveTodolistAC = (todolistId: string) => {
    return {type:"REMOVE-TODOLIST", id: todolistId}
}

export const AddTodolistAC = (newTodolistTitle: string) => {
    return {type:"ADD-TODOLIST", title: newTodolistTitle}
}

export const ChangeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type:"CHANGE-TODOLIST-TITLE",
        id: todolistId2,
        title: newTodolistTitle,
    }
}

export const ChangeTodolistFilterAC = (todolistId2: string, newFilter: string) => {
    return {
        type:"CHANGE-TODOLIST-FILTER",
        id: todolistId2,
        filter: newFilter
    }
}












