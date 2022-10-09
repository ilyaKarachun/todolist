import {StateTaskType} from "../App";
import {v1} from "uuid";
import {addTaskAC, changeStatusTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {ToDoList} from "../ToDoList";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

test("correct task should be deleted from correct array", () => {
    const startState: StateTaskType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},
            {id: '4', title: "Redux", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "book", isDone: true},
            {id: '2', title: "car", isDone: true}
        ]
    }

    const action = removeTaskAC("2", 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(1)
    expect(endState['todolistId2'].every(t => t.id !== "2")).toBeTruthy()

})

test("correct task should be add in correct array", () => {
    const startState: StateTaskType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},
            {id: '4', title: "Redux", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "book", isDone: true},
            {id: '2', title: "car", isDone: true}
        ]
    }
    const newTitle = "NewTitle"

    const action = addTaskAC("todolistId2", newTitle)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].title).toBe(newTitle)

})

test("correct task should change status", () => {
    const startState: StateTaskType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},
            {id: '4', title: "Redux", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "book", isDone: true},
            {id: '2', title: "car", isDone: true}
        ]
    }
    const newStatus = false
    const taskId = '1'

    const action = changeStatusTaskAC("todolistId2",taskId, newStatus)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'][1].isDone).toBeTruthy()
    expect(endState['todolistId2'][0].isDone).toBeFalsy()

})

test("correct task title should be change", () => {
    const startState: StateTaskType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},
            {id: '4', title: "Redux", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "book", isDone: true},
            {id: '2', title: "car", isDone: true}
        ]
    }
    const newTitle = "New Title"
    const taskId = '1'

    const action = changeTaskTitleAC("todolistId2",taskId, newTitle)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'][1].isDone).toBeTruthy()
    expect(endState['todolistId2'][0].title).toBe(newTitle)
    expect(endState['todolistId1'][0].title).toBe("HTML&CSS")
})

test("correct todolist should be add", () => {
    const startState: StateTaskType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},
            {id: '4', title: "Redux", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "book", isDone: true},
            {id: '2', title: "car", isDone: true}
        ]
    }


    const action = addTodolistAC("new todolist")

    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test("properties with todolistId should be deleted", () => {
    const startState: StateTaskType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},
            {id: '4', title: "Redux", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "book", isDone: true},
            {id: '2', title: "car", isDone: true}
        ]
    }


    const action = removeTodolistAC("todolistId2")

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)


    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()
        expect(endState["todolistId2"]).toBeUndefined()
})