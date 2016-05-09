import createReducer from 'lib/createReducer';

import Immutable from 'immutable';

import * as types from 'constants/ActionTypes';

const initialState = {
  todos: [{ text: 'Initial Todo', isCompleted: false }],
  toggleAllCompleted: true
};

export default createReducer(initialState, {
  [types.ADD_TODO](state, { text }) {
    const item = Immutable.fromJS({
      text: text,
      isCompleted: false
    });

    state = state.update('todos', (todos) =>
      todos.push(item)
    );

    return state;
  },

  [types.TOGGLE_COMPLETED](state, { id }) {
    state = state.updateIn(['todos', id, 'isCompleted'], (isCompleted) =>
      !isCompleted
    );
    return state;
  },

  [types.TOGGLE_ALL_COMPLETED](state) {
    const toggleAllCompleted = state.get('toggleAllCompleted');

    state = state.set('toggleAllCompleted', !toggleAllCompleted);
    state = state.update('todos', (todos) =>
      todos.map((todo) => todo.set('isCompleted', toggleAllCompleted))
    );

    return state;
  },

  [types.EDIT_TODO](state, { id, text }) {
    state = state.updateIn(['todos', id, 'text'], () =>
      text
    );
    return state;
  },

  [types.REMOVE_TODO](state, { id }) {
    state = state.deleteIn(['todos', id]);

    return state;
  },

  [types.CLEAR_COMPLETED](state) {
    state = state.update('todos', (todos) =>
      todos.filter((todo) => !todo.get('isCompleted'))
    );

    return state;
  }


});
