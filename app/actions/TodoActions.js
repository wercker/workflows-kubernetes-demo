import * as types from 'constants/ActionTypes';

export function addTodo(text) {
  return {
    type: types.ADD_TODO,
    text
  };
}

export function toggleCompleted(id) {
  return {
    type: types.TOGGLE_COMPLETED,
    id
  };
}

export function toggleAllCompleted() {
  return {
    type: types.TOGGLE_ALL_COMPLETED
  };
}

export function removeTodo(id) {
  return {
    type: types.REMOVE_TODO,
    id
  };
}

export function editTodo(id, text) {
  return {
    type: types.EDIT_TODO,
    id,
    text
  };
}

export function clearCompleted() {
  return {
    type: types.CLEAR_COMPLETED
  };
}
