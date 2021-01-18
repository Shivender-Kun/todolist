import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [currentTime, setCurrentTime] = useState("");
  const [input, setinput] = useState("");
  const [items, setItems] = useState([]);
  const [time, setTime] = useState("");
  const [itemTime, setItemTime] = useState([]);
  // const [localData, setLocalData] = useState([]);
  // const [localTime, setLocalTime] = useState([]);

  const getCurrentTime = () => {
    setCurrentTime(new Date().toLocaleTimeString());
  };

  // useEffect(() => {
  //   console.log("setting");
  //   console.log(localStorage);
  //   if (localStorage.length === 3) {
  //     if (JSON.parse(localStorage.getItem("items")).length > 0) {
  //       setItems(JSON.parse(localStorage.getItem("items")));
  //       setItemTime(JSON.parse(localStorage.getItem("itemTime")));
  //     }
  //   }
  // }, []);

  // const refreshing = (operation, tasks, taskTime) => {
  //   localStorage.setItem("items", JSON.stringify(tasks));
  //   localStorage.setItem("itemTime", JSON.stringify(taskTime));
  //   console.log(operation, tasks, taskTime, localStorage);
  // };

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
      }
    }
    setinput("");
    setTime("");
    // setLocalData(items);
    // setLocalTime(itemTime);
    // refreshing("adding", localData, localTime);
  };
  const clearAll = () => {
    if (items.length > 0) {
      if (window.confirm("Clear All Tasks")) {
        setItems([]);
        setItemTime([]);
      } else {
        alert("Clearing all task Canceled");
      }
    }
    localStorage.removeItem("items");
    localStorage.removeItem("itemTime");
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
    // setLocalTime(itemTime);
    // setLocalData(items);
    // refreshing("deleting", localData, localTime);
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
