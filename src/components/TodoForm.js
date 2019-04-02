import React, { Component } from 'react';

export default class TodoForm extends Component {
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
    event.preventDefault();
    this.props.handleAddTodo({ title: this.state.title, description: this.state.description });
    this.setState({
      title: '',
      description: ''
    });
  }

  render() {
    return (
      <form className="mb-5" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="title"
            className="form-control"
            id="title"
            placeholder="Enter a title..."
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control noresize"
            id="description"
            rows="5"
            placeholder="Enter a description..."
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!this.state.title || !this.state.description}
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </form>
    );
  }
}
