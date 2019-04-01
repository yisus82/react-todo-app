import React from 'react';
import { Field } from './Field';

export class TodoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    const { addTodo } = this.props;
    addTodo(this.state);
    this.setState({
      title: '',
      description: ''
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Field
          id="title"
          title="Enter the todo"
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <Field
          id="description"
          description="Enter a description for the todo"
          type="textarea"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleChange}
          rows="5"
        />
        <button
          type="submit"
          className="btn btn-success btn-lg"
          disabled={this.state.title === ''}
        >
          Add
        </button>
      </form>
    );
  }
}
