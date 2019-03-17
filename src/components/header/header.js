import React from "react";

import "./header.scss";

const Header = ({ onStatus, sortByDate }) => {
  const fromNewToOld = (a, b) => b.dateToMs - a.dateToMs;
  const fromOldToNew = (a, b) => a.dateToMs - b.dateToMs;
  return (
    <header className="header">
      <div className="header__title">ToDoS</div>
      <div className="header__todo-control">
        <div className="header__filters">
          <div className="header__filters-title">Filters</div>
          <div className="header__filters-buttons">
            <button
              className="header__filters-button"
              onClick={() => {
                onStatus("hight");
              }}
            >
              hight
            </button>
            <button
              className="header__filters-button"
              onClick={() => {
                onStatus("low");
              }}
            >
              low
            </button>
            <button
              className="header__filters-button"
              onClick={() => {
                onStatus("all");
              }}
            >
              all
            </button>
          </div>
        </div>
        <div className="header__sort">
          <div className="header__sort-title">Sort</div>
          <div className="header__sort-buttons">
            <button
              className="header__sort-button"
              onClick={() => sortByDate(fromNewToOld)}
            >
              From new to old
            </button>
            <button
              className="header__sort-button"
              onClick={() => sortByDate(fromOldToNew)}
            >
              From old to new
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
