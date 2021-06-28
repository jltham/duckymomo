import { ADD_TASK, DELETE_TASK } from "../action/types";

const initialState = {
    tasks: [
        {id: 1, title: "Make a video for Orbital Milestone 2"},
    ]
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(
                    (task) => task.id !== payload,
                ),
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: [payload, ...state.tasks],
            };
        default:
            return state;
    }
}