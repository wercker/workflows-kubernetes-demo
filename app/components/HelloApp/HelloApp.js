import React from 'react';
import ReactDOM from 'react-dom';

import * as TodoActions from 'actions/TodoActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import update from 'react-addons-update';

const ENTER_KEY = 13;

@connect(({ TodoStore }) => ({ TodoStore }))
class HelloApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterType: 'all'
    };
  }

  handleNewTodoKeys= (e) => {
    const getRefValue = (name) => {
      return ReactDOM.findDOMNode(this.refs[name]).value;
    };

    const { dispatch } = this.props;

    const actions = bindActionCreators(TodoActions, dispatch);

    if (e.charCode === ENTER_KEY) {
      const value = getRefValue('newTodoInput');
      actions.addTodo(value);
    }
  }

  handleEditTodoKeys = (id, e) => {
    const getRefValue = (name) => {
      return ReactDOM.findDOMNode(this.refs[name]).value;
    };
    const { dispatch } = this.props;

    const actions = bindActionCreators(TodoActions, dispatch);

    if (e.charCode === ENTER_KEY) {
      const value = getRefValue('editTodoInput' + id);

      this.setState({
        currentEditingItem: null
      });

      actions.editTodo(id, value);
    }
  }

  handleRemoveTodo = (id) => {
    const { dispatch } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);

    actions.removeTodo(id);
  }

  handleClearCompleted = () => {
    const { dispatch } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);

    actions.clearCompleted();
  }

  handleCompletedToggle = (id) => {
    const { dispatch } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);

    actions.toggleCompleted(id);
  }

  handleToggleAll = () => {
    const { dispatch } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);

    actions.toggleAllCompleted();
  }

  todoEditMode = (id) => {
    this.setState({
      currentEditingItem: id
    });
  }

  handleFilter = (type) => {
    this.setState(update(this.state, {
      $merge: { filterType: type }
    }));
  }

  renderTodoItem(todo, key) {
    let itemClass = todo.isCompleted ? 'completed' : '';

    const { currentEditingItem } = this.state;

    if (currentEditingItem === key) {
      itemClass = 'editing';
    }

    return (
      <li className={itemClass} key={key}>
        <div className='view'>
          <input checked={todo.isCompleted}
                 className='toggle'
                 onChange={this.handleCompletedToggle.bind(this, key)}
                 type='checkbox'/>
          <label onClick={this.todoEditMode.bind(this, key)}>{todo.text}</label>
          <button className='destroy'
                  onClick={this.handleRemoveTodo.bind(this, key)}/>
        </div>
        <input className='edit'
               onKeyPress={this.handleEditTodoKeys.bind(this, key)}
               ref={'editTodoInput' + key}/>
      </li>
    );
  }

  renderFooter(todosCount, activeTodosCount) {
    const getSelectedClass = (type) => {
      const { filterType } = this.state;

      if (filterType === type) { return 'selected'; }
      return '';
    };

    if (todosCount === 0) {
      return null;
    }

    return (
      <footer className='footer'>
        <span className='todo-count'>
          <strong>{activeTodosCount}</strong> items left
        </span>
        <ul className='filters'>
          <li>
            <a className={getSelectedClass('all')}
               href='#'
               onClick={this.handleFilter.bind(this, 'all')}>All</a>
          </li>
          <li>
            <a className={getSelectedClass('active')}
               href='#'
               onClick={this.handleFilter.bind(this, 'active')}>
              Active</a>
          </li>
          <li>
            <a className={getSelectedClass('completed')}
               href='#'
               onClick={this.handleFilter.bind(this, 'completed')}>
              Completed</a>
          </li>
        </ul>
        <button className='clear-completed'
                onClick={this.handleClearCompleted}>
          Clear completed</button>
      </footer>
    );
  }

  render() {
    const {TodoStore} = this.props;

    const todos = TodoStore.get('todos').toJS();

    const todosCount = todos.length;

    const activeTodosCount = todos.filter((todo) =>
      !todo.isCompleted).length;

    const { filterType } = this.state;

    const filteredTodos = todos.filter((todo) => {
      switch (filterType) {
        case 'all':
          return true;
        case 'active':
          return !todo.isCompleted;
        case 'completed':
          return todo.isCompleted;
      }
    });

    const todosDOM = filteredTodos.map((todo, idx) =>
      this.renderTodoItem(todo, idx)
    );

    return (
      <div>
        <section className='todoapp'>
          <header className='header'>
            <h1>todos</h1>
            <input className='new-todo'
                   onKeyPress={this.handleNewTodoKeys}
                   placeholder='What needs to be done?'
                   ref='newTodoInput'/>
          </header>
          <section className='main'>
            <input className='toggle-all'
                   onChange={this.handleToggleAll}
                   type='checkbox'/>
            <label htmlFor='toggle-all'>Mark all as complete</label>
            <ul className='todo-list'>
              {todosDOM}
            </ul>
          </section>
          {this.renderFooter(todosCount, activeTodosCount)}
        </section>
      </div>
    );
  }
}

export default HelloApp;
