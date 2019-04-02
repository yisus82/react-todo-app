import React, { Component } from 'react';
import TodoForm from './components/TodoForm';
import List from './components/List';
import { getTodos, removeTodo, addTodo, updateTodo } from './http/todos';

class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: []
    };

    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
    this.handleCompleteTodo = this.handleCompleteTodo.bind(this);
  }

  async componentDidMount() {
    const { data: todos } = await getTodos();

    if (todos) {
      this.setState({ todos });
    }
  }

  async handleAddTodo(todo) {
    const { data: newTodo } = await addTodo({
      ...todo,
      createdAt: new Date(),
      completed: false
    });

    this.setState({ todos: [newTodo, ...this.state.todos] });
  }

  async handleRemoveTodo(id) {
    await removeTodo(id);

    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  async handleCompleteTodo(id) {
    const todo = this.state.todos.find(todo => todo.id === id);
    if (!todo) {
      return;
    }

    await updateTodo(id, { ...todo, completed: true });

    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = true;
        }
        return todo;
      })
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="display-5 mt-5">Awesome TODOs</h1>
        <hr />
        <TodoForm handleAddTodo={this.handleAddTodo} />
        <div className="row">
          <div className="col">
            <h3>My Task List</h3>
            <hr />
            <List
              handleCompleteTodo={this.handleCompleteTodo}
              handleRemoveTodo={this.handleRemoveTodo}
              items={this.state.todos.filter(todo => !todo.completed)}
            />
          </div>
          <div className="col">
            <h3>Completed</h3>
            <hr />
            <List
              handleCompleteTodo={this.handleCompleteTodo}
              handleRemoveTodo={this.handleRemoveTodo}
              items={this.state.todos.filter(todo => todo.completed)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TodoApp;
