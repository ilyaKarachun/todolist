import {StateTaskType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType, todolistId1, todolistId2} from "./todolists-reducer";

const initialState = {}

export const tasksReducer = (state: StateTaskType = initialState, action: TsarType): StateTaskType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter((t) => t.id !== action.payload.id)
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: [
                    {
                        id: v1(),
                        title: action.payload.newTitle,
                        isDone: false
                    },
                    ...state[action.payload.todolistId]
                ]
            }
        }
        case "CHANGE-STATUS-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => (
                        m.id === action.payload.taskId ? {...m, isDone: action.payload.newStatus} : m
                    )
                )
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => (
                        m.id === action.payload.taskId ? {...m, title: action.payload.newTitle} : m
                    )
                )
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copy = {...state}
            delete copy[action.payload.id]
            return copy
        }
        default:
            return state
    }
}

type TsarType = removeTaskACType | addTaskACType
    | changeStatusTaskACType | changeTaskTitleACType
    | addTodolistACType | removeTodolistACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {id, todolistId}
    } as const;
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string,  newTitle: string) => {
    return {
        type: "ADD-TASK",
        payload: {todolistId,  newTitle}
    } as const;
}

type changeStatusTaskACType = ReturnType<typeof changeStatusTaskAC>
export const changeStatusTaskAC = (todolistId: string, taskId: string, newStatus: boolean) => {
    return {
        type: "CHANGE-STATUS-TASK",
        payload: {todolistId, taskId, newStatus}
    } as const;
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: "CHANGE-TITLE-TASK",
        payload: {todolistId, taskId, newTitle}
    } as const;
}














