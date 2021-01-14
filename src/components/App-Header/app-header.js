import React from 'react';
import './app-header.css';

const AppHeader = ({toDo, done}) => {
  return (
    <div className="app-header d-flex">
      <h2>Todo List</h2>
      <h3>{toDo} more to do, {done} done</h3>
    </div>
  );
};

export default AppHeader;
