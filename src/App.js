import React, { useState, useEffect } from "react";
import "./App.css";

let items = [];
export default function App() {
  const [input, setinput] = useState("");

  const handleChange = (event) => {
    setinput(event.target.value);
  };
  const addItems = () => {
    if (input !== "") {
      if (items.includes(input)) {
        alert("Task Already exists.");
      } else {
        items.push(input);
      }
    }
    setinput("");
  };
  const deleteItems = (i) => {
    items = items.filter((item) => {
      return item !== i;
    });
    return items;
  };
  const clearAll = () => {
    if (items.length > 0) {
      if (window.confirm("Clear All Tasks")) {
        items = [];
      } else {
        alert("Clearing all task Canceled");
      }
    } else {
      alert("There are no tasks to clear");
    }
  };

  const list = items.map((i, index) => (
    <li key={index}>
      {i}
      <button id="delBtn" onClick={() => deleteItems(i)}>
        Delete
      </button>
    </li>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <h1 id="title">ToDo List</h1>
      </header>
      <div className="formApp">
        <div className="inputArea">
          <input
            type="text"
            placeholder="Enter The Task"
            id="inputArea"
            value={input}
            onChange={handleChange}
            maxLength="45"
          />
          <button id="addBtn" onClick={addItems}>
            Add
          </button>
        </div>
        <div className="itemsList">
          <ul className="smooth-scroll">{list}</ul>
          <button id="clearAll" onClick={clearAll}>
            Clear Tasks
          </button>
        </div>
      </div>
    </div>
  );
}
