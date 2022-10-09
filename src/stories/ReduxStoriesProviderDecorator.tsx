import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType} from "../state/store";
import {combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

const initialGlobalState = {
    todolists: [
        {id:"todolistId1", title: "What to learn", filter: "all"},
        {id:"todolistId2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todolistId1"] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        ["todolistId2"] : [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React book", isDone: true},
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoriesProviderDecorator = (storyFn: any) => {
    return<Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
};