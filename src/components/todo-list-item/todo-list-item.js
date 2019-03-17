import React, { Component } from "react";

import "./todo-list-item.scss";

export default class TodoListItem extends Component {

  render() {
    const {
      done,
      priority,
      label,
      desc,
      onDelete,
      date,
      onDone,
      onEdit,
      
    } = this.props;

    let classNames = "fas fa-check";
 

    if (done) {
      classNames = "fas fa-times";
    }
    return (
      <React.Fragment>
        <div className="property">
          <span className="property__priority">{priority} priority</span>
          <span className="property__data">
            <span>Time of creation - </span>
            {date}
          </span>
        </div>
        <div className="task">
          <div className="task__avatar-wrap">
            <div className="task__avatar">
              T
            </div>
          </div>
          <div className="task__info">
            <h3 className="task__title">{label}</h3>
            <p className="task__desc">{desc}</p>
          </div>
          <div className="task__control">
            <button
              className="task__control-button task__control-button_delete"
              type="button"
              onClick={onDelete}
            >
              <i className="fas fa-trash-alt" />
            </button>
            <button
              className="task__control-button task__control-button_done"
              type="button"
              onClick={onDone}
            >
              <i className={classNames} />
            </button>
            <button
              className="task__control-button task__control-button_edit"
              type="button"
              onClick={onEdit}
            >
              <i className="fas fa-pencil-alt" />
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
