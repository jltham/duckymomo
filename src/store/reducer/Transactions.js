import { ADD_TRANSACTION, DELETE_TRANSACTION } from "../action/types";
import * as Transactions from '../../../api/firestore';

const initialState = {
    transactions: [],
};

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case DELETE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(
                    (transaction) => transaction.id !== payload,
                ),
            };
        case ADD_TRANSACTION:
            return {
                ...state,
                transactions: [payload, ...state.transactions],
            };
        default:
            return state;
    }
}