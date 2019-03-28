import React from 'react';

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
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
            rows="5"
          />
        </div>
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
