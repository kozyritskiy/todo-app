import React, { Component } from "react";

import "./item-add-form.scss";

export default class ItemAddForm extends Component {
  state = {
    label: "",
    desc: "",
    priority: "medium"
  };

  onLabelChange = e => {
    this.setState({
      label: e.target.value
    });
  };

  onAreaChange = e => {
    this.setState({
      desc: e.target.value
    });
  };

  onPriorityChange = e => {
    this.setState({
      priority: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { label, desc, priority } = this.state;
    this.setState({ label: "", desc: "" });
    const cb = this.props.onItemAdd || (() => {});
    cb(label, desc, priority);
  };

  componentDidUpdate(prevProps) {
    if (this.props.currentItem !== prevProps.currentItem) {
      const { label, desc, priority } = this.props.currentItem;
      if (!label && !priority) {
        return;
      }
      this.setState({
        label,
        desc,
        priority
      });
    }
  }

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <div className="form__input">
          <label htmlFor="input-title">Title</label>
          <input
            type="text"
            className="form__input-title"
            value={this.state.label}
            onChange={this.onLabelChange}
            placeholder="Task name"
            id="input-title"
          />
        </div>
        <div className="form__area">
          <label htmlFor="area-desc">Description</label>
          <textarea
            name="desc"
            id="area-desc"
            cols="30"
            rows="10"
            placeholder="What needs to be done?"
            value={this.state.desc}
            onChange={this.onAreaChange}
          />
        </div>
        <div className="form__radio" onChange={this.onPriorityChange}>
          <div className="form__radio-hight">
            <input
              type="radio"
              id="hight-priority"
              name="priority"
              value="hight"
            />
            <label htlmfor="hight-priority">hight-priority</label>
          </div>
          <div className="form__radio-medium">
            <input
              type="radio"
              id="medium-priority"
              name="priority"
              value="medium"
              defaultChecked
            />
            <label htlmfor="medium-priority">medium-priority</label>
          </div>
          <div className="form__radio-low">
            <input
              type="radio"
              id="low-priority"
              name="priority"
              value="low"
            />
            <label htlmfor="low-priority">low-priority</label>
          </div>
        </div>
        <button type="submit" className="btn-submit">
          <i className="fas fa-plus-circle btn-submit-fa" />
        </button>
      </form>
    );
  }
}
