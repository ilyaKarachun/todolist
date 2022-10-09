import {StateTaskType, todolistType} from "../App";
import {addTodolistAC, todolistReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test("id should be equal", () => {
    const startTasksState: StateTaskType = {}
    const startTodolistsState: todolistType[] = []

    const action = addTodolistAC("new todolist")

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys =  Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolist = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolist).toBe(action.todolistId)

})