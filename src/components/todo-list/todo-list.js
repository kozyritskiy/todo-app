import React from "react";

import TodoListItem from "../todo-list-item";

import "./todo-list.scss";

const TodoList = ({
  items,
  onDelete,
  onDone,
  onEdit,
  renderTitle,
  countItems
}) => {
  const title = renderTitle();
  const count = countItems();
  const elements = items.map(item => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-item">
        <TodoListItem
          {...itemProps}
          onDelete={() => onDelete(id)}
          onDone={() => onDone(id)}
          onEdit={() => onEdit(id, items)}
        />
      </li>
    );
  });

  return (
    <ul className="todo-list">
      <h3>
        {title} ({count})
      </h3>
      {elements}
    </ul>
  );
};

export default TodoList;
