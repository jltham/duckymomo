import {ADD_TRANSACTION, DELETE_TRANSACTION} from './types';

export const addTransaction = ({id, title, price, type}) => (dispatch) => {
  const newTransaction = {
    id, 
    title,
    price,
    type,
  };

  dispatch({type: ADD_TRANSACTION, payload: newTransaction});
};

export const deleteTransaction = (id) => (dispatch) => {
  dispatch({type: DELETE_TRANSACTION, payload: id});
};