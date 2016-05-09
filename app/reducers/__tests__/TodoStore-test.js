import 'babel-polyfill';
import { expect } from 'chai';

import * as TodoActions from 'actions/TodoActions';

import { bindActionCreators } from 'redux';
import createStore from 'lib/createStore';

function mockTodo(text, isCompleted = false) {
  return { text: text, isCompleted: isCompleted };
}

describe('Todo Store', () => {
  let store, initialTodo, todoActions;

  beforeEach(() => {
    store = createStore();
    todoActions = bindActionCreators(TodoActions, store.dispatch);

    initialTodo = mockTodo('Initial Todo');
  });

  function todoState(prop) {
    return store.getState().TodoStore.get(prop);
  }

  it('should add todo', () => {
    todoActions.addTodo('mock todo');

    const expectedTodos = [
      initialTodo,
      mockTodo('mock todo')
    ];

    expect(todoState('todos').toJS()).to.eql(expectedTodos);
  });

  it('should remove todo', () => {
    todoActions.removeTodo(0);

    expect(todoState('todos').toJS()).to.eql([]);
  });

  it('should edit todo', () => {
    todoActions.editTodo(0, 'edited todo');

    expect(todoState('todos').toJS()).to.eql([
      mockTodo('edited todo')
    ]);
  });

  it('should toggle completed', () => {
    todoActions.toggleCompleted(0);

    expect(todoState('todos').toJS()).to.eql([
      mockTodo('Initial Todo', true)
    ]);
  });

  describe('with some todos', () => {
    let mockTodo1, mockTodo2;
    beforeEach(() => {
      mockTodo1 = mockTodo('mockTodo1');
      mockTodo2 = mockTodo('mockTodo2');

      todoActions.addTodo(mockTodo1.text);
      todoActions.addTodo(mockTodo2.text);
    });

    it('should clear completed', () => {
      todoActions.toggleCompleted(1);

      todoActions.clearCompleted();

      expect(todoState('todos').toJS()).to.eql([
        initialTodo, mockTodo2
      ]);
    });

    it('should toggle all completed', () => {
      todoActions.toggleCompleted(1);
      todoActions.toggleAllCompleted();

      expect(todoState('todos').toJS()).to.eql([
        mockTodo(initialTodo.text, true),
        mockTodo(mockTodo1.text, true),
        mockTodo(mockTodo2.text, true)
      ]);

      todoActions.toggleAllCompleted();

      expect(todoState('todos').toJS()).to.eql([
        initialTodo,
        mockTodo1,
        mockTodo2
      ]);
    });
  });
});
