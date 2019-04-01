import React, { Component } from 'react';
import { TodoForm } from './components/TodoForm';
import { List } from './components/List';
import { getTodos, addTodo, removeTodo, updateTodo } from './http/todos';

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
      this.setState({
        todos
      });
    }
  }

  async handleAddTodo(todo) {
    const { data } = await addTodo({
      ...todo,
      createdAt: new Date(),
      completed: false
    });

    this.setState({ todos: [data, ...this.state.todos] });
  }

  async handleRemoveTodo(id) {
    await removeTodo(id);

    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  async handleCompleteTodo(id) {
    const updatedTodo = this.state.todos.find(todo => todo.id === id);
    updatedTodo.completed = true;

    await updateTodo(id, updatedTodo);

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
      <div className="container mt-5">
        <h1 className="display-5">Awesome TODOS!!</h1>
        <hr />
        <TodoForm onAddTodo={this.handleAddTodo} />
        <div className="row mt-5">
          <div className="col">
            <h3>My Task List</h3>
            <hr />
            <List
              items={this.state.todos.filter(todo => !todo.completed)}
              onComplete={this.handleCompleteTodo}
              onRemove={this.handleRemoveTodo}
            />
          </div>
          <div className="col">
            <h3>Completed</h3>
            <hr />
            <List
              items={this.state.todos.filter(todo => todo.completed)}
              onComplete={this.handleCompleteTodo}
              onRemove={this.handleRemoveTodo}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TodoApp;
