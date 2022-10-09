import React from "react";
import {AppWithRedux} from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ReduxStoriesProviderDecorator} from "./stories/ReduxStoriesProviderDecorator";

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoriesProviderDecorator]
}

export const AppWithReduxBaseExample = () => {
    return <AppWithRedux/>
}