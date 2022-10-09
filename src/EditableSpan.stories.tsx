import React from "react";
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}

const cb = action("Editable span want change")

export const EditableSpanBaseExample = () => {
        return <EditableSpan title={"Start value"} onChange={cb}/>
}