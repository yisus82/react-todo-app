import React from 'react';
import { ListItem } from './ListItem';

export function List({ items, complete, remove }) {
  if (!items) {
    return null;
  }

  return items.map(item => (
    <ListItem
      key={item.id}
      item={item}
      handleComplete={complete}
      handleRemove={remove}
    />
  ));
}
