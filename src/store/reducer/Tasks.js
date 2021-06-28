import { ADD_TASK, DELETE_TASK } from "../action/types";

const initialState = {
    tasks: [
        {id: 1, title: "Hello", date: "1"},
        {id: 2, title: "World", date: "2"},
        {id: 3, title: "Welcome", date: "3"}
    ]
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        // case DELETE_TRANSACTION:
        //     return {
        //         ...state,
        //         transactions: state.transactions.filter(
        //             (transaction) => transaction.id !== payload,
        //         ),
        //     };
        // case ADD_TRANSACTION:
        //     return {
        //         ...state,
        //         transactions: [payload, ...state.transactions],
        //     };
        default:
            return state;
    }
}