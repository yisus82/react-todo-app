import React from 'react';

export default function ListItem({ item, handleCompleteTodo, handleRemoveTodo }) {
  return (
    <div className="card mb-5">
      <div className="card-header">{item.title}</div>
      <div className="card-body">
        <h5 className="card-title">{item.description}</h5>
        {!item.completed && (
          <button
            className="btn btn-outline-success mr-5"
            onClick={event => {
              event.preventDefault();
              handleCompleteTodo(item.id);
            }}
          >
            Complete
          </button>
        )}
        <button
          className="btn btn-outline-danger"
          onClick={event => {
            event.preventDefault();
            handleRemoveTodo(item.id);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
