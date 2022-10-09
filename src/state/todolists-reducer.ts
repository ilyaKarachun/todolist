import {FilterValuesType, todolistType} from "../App";
import {v1} from "uuid";

export const todolistId1 = v1();
export const todolistId2 = v1();
const initialState: todolistType[] = []

export const todolistReducer = (state: todolistType[] = initialState, action: TsarType): todolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return [
                ...state.filter(f => f.id !== action.payload.id)
            ]
        case    "ADD-TODOLIST":
            debugger
            return [
                ...state,
                {id: action.todolistId, title: action.title, filter: "all"}
            ]
        case "CHANGE-TODOLIST-TITLE":
            const todolist = state.find(f => f.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [
                ...state
            ]
        case "CHANGE-TODOLIST-FILTER":
            const todolistFilter = state.find(f => f.id === action.id)
            if (todolistFilter) {
                todolistFilter.filter = action.filter
            }
            return [...state]
        default:
            return state
    }
}

type TsarType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeTodolistFilterACType
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {type: "REMOVE-TODOLIST", payload: {id: todolistId}} as const;
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolistTitle: string) => {
    return {type: "ADD-TODOLIST", title: newTodolistTitle, todolistId: v1()} as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id: todolistId2,
        title: newTodolistTitle,
    } as const
}

type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const changeTodolistFilterAC = (todolistId2: string, newFilter: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistId2,
        filter: newFilter
    } as const
}













