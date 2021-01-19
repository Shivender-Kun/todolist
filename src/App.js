import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [currentTime, setCurrentTime] = useState("");
  const [input, setinput] = useState("");
  const [items, setItems] = useState([]);
  const [time, setTime] = useState("");
  const [itemTime, setItemTime] = useState([]);

  const getCurrentTime = () => {
    setCurrentTime(new Date().toLocaleTimeString());
  };
  React.useEffect(() => {
    if (localStorage.length > 0) {
      setItems(
        Object.keys(localStorage).filter((i) => {
          return i !== "randid";
        })
      );
      setItemTime(
        Object.values(localStorage).filter((i) => {
          return i.length < 7;
        })
      );
    }
  }, []);

  setInterval(getCurrentTime, 1000);

  const handleChange = (event) => {
    setinput(event.target.value);
  };

  const timeChange = (event) => {
    setTime(event.target.value);
  };
  const addItems = (e) => {
    e.preventDefault();
    if (input !== "" && time !== "") {
      if (items.includes(input)) {
        alert("Task Already exists.");
      } else {
        items.push(input);
        itemTime.push(time);
        localStorage.setItem(input, time);
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
        localStorage.clear();
      } else {
        alert("Clearing all task Canceled");
      }
    }
  };

  const list =
    items.length === 0 ? (
      <li id="empty">No Tasks</li>
    ) : (
      items.map((i, index) => (
        <li style={{ color: "white" }} key={index}>
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
      ))
    );
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
    localStorage.removeItem(i);
  };

  return (
    <div className="App">
      <div className="formApp">
        <header className="App-header">
          <h1 id="title">ToDo List</h1>
        </header>
        <form onSubmit={addItems} required>
          <div className="inputArea">
            <input
              type="text"
              placeholder="Enter The Task"
              id="inputArea"
              value={input}
              onChange={handleChange}
              maxLength="45"
              minLength="5"
            />
            <button type="submit" id="addBtn">
              Add
            </button>
          </div>
          <div id="setTime">
            <span>
              <label>Set Time</label>
              <input
                type="time"
                placeholder="Enter Time"
                id="time"
                value={time}
                onChange={timeChange}
              />
            </span>
            <span id="currentTime">Current Time - {currentTime}</span>
          </div>
        </form>
        <div className="itemsList">
          <ol className="smooth-scroll">{list}</ol>
          <button id="clearAll" onClick={clearAll}>
            Clear Tasks
          </button>
        </div>
      </div>
    </div>
  );
}
