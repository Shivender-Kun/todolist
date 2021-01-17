import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [input, setinput] = useState("");
  const [items, setItems] = useState([]);
  const [time, setTime] = useState("");
  const [itemTime, setItemTime] = useState([]);

  const handleChange = (event) => {
    setinput(event.target.value);
  };

  const timeChange = (event) => {
    setTime(event.target.value);
  };
  const addItems = () => {
    if (input !== "") {
      if (items.includes(input)) {
        alert("Task Already exists.");
      } else {
        items.push(input);
        itemTime.push(time);
      }
    }
    setinput("");
    setTime("");
  };
  const clearAll = () => {
    if (items.length > 0) {
      if (window.confirm("Clear All Tasks")) {
        setItems([]);
        setItemTime([]);
      } else {
        alert("Clearing all task Canceled");
      }
    } else {
      alert("There are no tasks to clear");
    }
  };
  const list = items.map((i, index) => (
    <li key={index}>
      {i} <span>at {itemTime[index]}</span>
      <button
        id="delBtn"
        onClick={() => {
          deleteItems(i, index);
        }}
      >
        Delete
      </button>
    </li>
  ));
  const deleteItems = (i, index) => {
    setItems(
      items.filter((item) => {
        return item !== i;
      })
    );
    setItemTime(
      itemTime.filter((item) => {
        return item !== itemTime[index];
      })
    );
    return items;
  };

  return (
    <div className="App">
      <div className="formApp">
        <header className="App-header">
          <h1 id="title">ToDo List</h1>
        </header>
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
        <div id="setTime">
          <label>Set Time</label>
          <input
            type="time"
            placeholder="Enter Time"
            id="time"
            value={time}
            onChange={timeChange}
          />
        </div>

        <div className="itemsList">
          <ol className="smooth-scroll">
            {items.length === 0 ? <li id="empty">List Empty</li> : list}
          </ol>
          <button id="clearAll" onClick={clearAll}>
            Clear Tasks
          </button>
        </div>
      </div>
    </div>
  );
}
