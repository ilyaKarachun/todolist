type stateType = {
    age: number
    childrenCount: number
    name: string
}

type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: stateType, action: ActionType): stateType => {
    switch (action.type) {
        case "INCREMENT-AGE":
            // state.age = state.age + 1;
            // return state
        return {
            ...state,
            age: state.age + 1
        }
        case "INCREMENT-CHILDREN-COUNT":
            // state.childrenCount = state.childrenCount + 1
            // return state
        return {
                ...state,
            childrenCount: state.childrenCount + 1
        }
        case "CHANGE-NAME":
            return {
                ...state,
                name: action.newName
            }
        default:
            throw new Error("I dont understand this action")
    }
}