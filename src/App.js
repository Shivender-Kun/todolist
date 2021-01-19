import React, { useState } from "react";
import pushNotification from "./pushNotification";
import options from "./pushNotificationOptions";

import "./App.css";

export default function App() {
  const [currentTime, setCurrentTime] = useState("");
  const [input, setinput] = useState("");
  const [items, setItems] = useState([]);
  const [time, setTime] = useState("");
  const [itemTime, setItemTime] = useState([]);

  // Get current time for clock
  const getCurrentTime = () => {
    let hours = `${new Date().getHours()}`;
    let minutes = `${new Date().getMinutes()}`;
    setCurrentTime(
      (hours.length > 1 ? hours : "0" + hours) +
        ":" +
        (minutes.length > 1 ? minutes : "0" + minutes) +
        ":" +
        new Date().getSeconds()
    );
  };

  // Set localStorage data to appData when app is reloaded
  React.useEffect(() => {
    if (localStorage.length > 0) {
      setItems(
        Object.keys(localStorage).filter((i) => {
          // To ignore the random id object stored in the local storage
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

  // Notification setup when task time reaches
  React.useEffect(() => {
    if (items.length > 0) {
      itemTime.forEach((t, index) => {
        if (currentTime === `${t}:0`) {
          pushNotification(items[index], options);
        }
      });
    }
  }, [currentTime, itemTime, items]);

  // Setting interval to update clock
  setInterval(getCurrentTime, 1000);

  // Handling task name input
  const handleChange = (event) => {
    setinput(event.target.value);
  };

  // Handling task time input
  const timeChange = (event) => {
    setTime(event.target.value);
  };

  // Adding task to the list
  const addItems = (e) => {
    // Prevent page from refreshing when form submitted
    e.preventDefault();
    // Adding task if task name and time fields are not empty
    if (input !== "" && time !== "") {
      // If entered task alredy exists in the task list
      if (items.includes(input)) {
        alert("Task Already exists.");
      } else {
        // Adding task to the list
        items.push(input);
        itemTime.push(time);
        // Adding tasks to the local storage of the device
        localStorage.setItem(input, time);
      }
    }
    // Clering the input fields for next task entry
    setinput("");
    setTime("");
  };

  // Clearing all tasks from the list
  const clearAll = () => {
    // Checking if there are any tasks in the task list
    if (items.length > 0) {
      // Prompt to confirm the clear operation
      if (window.confirm("Clear All Tasks")) {
        // Clearing all tasks from app and local storage too
        setItems([]);
        setItemTime([]);
        localStorage.clear();
      } else {
        // If clear operation is cancelled
        alert("Clearing all task Cancelled");
      }
    }
  };

  // Mapping the task list to show on the screen
  const list =
    // Checking if task list is empty or not
    items.length === 0 ? (
      <li id="empty">No Tasks</li>
    ) : (
      items.map((i, index) => (
        <li style={{ color: "white" }} key={index}>
          {i.length > 15 ? i.substring(0, 15) + "..." : i}{" "}
          <span>at {itemTime[index]}</span>
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

  // To delete a task from the task list
  const deleteItems = (i, index) => {
    setItems(
      items.filter((item) => {
        return item !== i;
        // Returns the tasks according to the condition provided
      })
    );
    setItemTime(
      itemTime.filter((item) => {
        // Filtering the tasks time array using the task index in the task name list
        return item !== itemTime[index];
      })
    );
    // Removing the item from the local storage
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
