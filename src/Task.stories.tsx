import React from "react";
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "./state/Task/Task";

export default {
    title: 'Task Component',
    component: Task
}

const changeTaskTitleStatus = action("Task title changed")
const removeTask = action("Task was been removed")
const taskChangeIsDone = action("IsDone was been changed")

export const TaskBaseExample = () => {
    return <>
        <Task
            id={'1'}
            isDone={false}
            title={"CSS"}
            todolistId={'todolistId1'}
            ChangeIsDone={taskChangeIsDone}
            changeTaskTitleStatus={changeTaskTitleStatus}
            removeTasks={removeTask}
        />
        <Task
            id={'2'}
            isDone={true}
            title={"JS"}
            todolistId={'todolistId2'}
            ChangeIsDone={taskChangeIsDone}
            changeTaskTitleStatus={changeTaskTitleStatus}
            removeTasks={removeTask}
        />
    </>
}