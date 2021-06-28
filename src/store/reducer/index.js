import { combineReducers } from 'redux';

import transactionsReducer from './Transactions';
import tasksReducer from './Tasks';

export default combineReducers({
    transactions: transactionsReducer,
    tasks: tasksReducer,
})