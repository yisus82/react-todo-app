import React from 'react';
import ListItem from './ListItem';

export default function List({ items, handleCompleteTodo, handleRemoveTodo }) {
  if (!items) {
    return null;
  }

  return items.map(item => (
    <ListItem
      handleCompleteTodo={handleCompleteTodo}
      handleRemoveTodo={handleRemoveTodo}
      key={item.id}
      item={item}
    />
  ));
}
