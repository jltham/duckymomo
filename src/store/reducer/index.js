import { combineReducers } from 'redux';

import transactionsReducer from './Transactions';

export default combineReducers({
    transactions: transactionsReducer,
})