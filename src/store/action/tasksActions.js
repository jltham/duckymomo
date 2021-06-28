import { ADD_TASK, DELETE_TASK } from "./types";

export const addTask = ({id, title}) => (dispatch) => {
    const newTask = {
      id, 
      title,
    };
  
    dispatch({type: ADD_TASK, payload: newTask});
  };
  
  export const deleteTask = (id) => (dispatch) => {
    dispatch({type: DELETE_TASK, payload: id});
  };