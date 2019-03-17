import React, { Component } from "react";
import Header from "../header";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";

import "./app.scss";

export default class App extends Component {
  maxId = 100;

  state = {
    items: [],
    currentItem: {},
    activeStatus: "all"
  };

  onItemAdd = (label, desc, priority) => {
    this.setState(state => {
      const item = this.createItem(label, desc, priority);
      if (Object.keys(state.currentItem).length !== 0) {
        const currentItem = {};
        return {
          items: [
            ...state.items.map(editItem => {
              return editItem.id === state.currentItem.id
                ? { ...editItem, label, desc, priority }
                : editItem;
            })
          ],
          currentItem
        };
      }
      return { items: [...state.items, item] };
    });
  };

  onDeleteItems = id => {
    this.setState(state => {
      const idx = state.items.findIndex(item => item.id === id);
      const items = [
        ...state.items.slice(0, idx),
        ...state.items.slice(idx + 1)
      ];
      return { items };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex(item => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value };
    return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
  };

  onToggleDone = id => {
    this.setState(state => {
      const items = this.toggleProperty(state.items, id, "done");
      return { items };
    });
  };

  onEdit = (id, arr) => {
    const currentItem = arr.find(item => item.id === id);
    this.setState({ currentItem });
  };

  onStatusChange = status => {
    this.setState({
      activeStatus: status
    });
  };

  sortByDate = sortFunc => {
    this.setState(state => {
      const items = state.items.sort(sortFunc);
      return { items };
    });
  };

  createItem(label, desc, priority) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      timezone: "UTC",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    };
    const date = new Date();
    return {
      id: ++this.maxId,
      label,
      desc,
      done: false,
      date: date.toLocaleString("en-US", options),
      dateToMs: date.getTime(),
      priority,
      color: null
    };
  }

  render() {
    const { items, currentItem, activeStatus } = this.state;
    const doneCount = items.filter(item => item.done).length;
    const toDoCount = items.length - doneCount;
    return (
      <div className="todo-app">
        <Header onStatus={this.onStatusChange} sortByDate={this.sortByDate} />
        <ItemAddForm onItemAdd={this.onItemAdd} currentItem={currentItem} />
        <TodoList
          items={items
            .filter(item => !item.done)
            .filter(i => activeStatus === "all" || i.priority === activeStatus)}
          onDelete={this.onDeleteItems}
          onDone={this.onToggleDone}
          onEdit={this.onEdit}
          renderTitle={() => "To Do"}
          countItems={() => toDoCount}
        />
        <TodoList
          items={items.filter(item => item.done)}
          onDelete={this.onDeleteItems}
          onEdit={this.onEdit}
          onDone={this.onToggleDone}
          renderTitle={() => "Completed"}
          countItems={() => doneCount}
        />
      </div>
    );
  }
}
