import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      input: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.addItems = this.addItems.bind(this);
    this.deleteItems = this.deleteItems.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }
  addItems(event) {
    event.preventDefault();
    if (this.state.input !== "") {
      if (this.state.items.includes(this.state.input)) {
        alert("Task Already exists.");
      } else {
        this.state.items.push(this.state.input);
        console.log(this.state.items);
      }
    }
    this.setState({
      input: "",
    });
  }

  deleteItems(e) {
    // alert("Deleting task - " + e);
    var newList = this.state.items.filter((_item) => {
      return _item !== e;
    });
    this.setState({
      items: newList,
    });
  }

  clearAll() {
    if (this.state.items.length > 0) {
      if (window.confirm("Clear All Tasks")) {
        this.setState({
          items: [],
        });
      } else { }
      alert('Clearing all task Canceled')
    } else {
      alert('There are no tasks to clear')
    }
  }

  render() {
    const list = this.state.items.map((i) => (
      <li key={i + 1}>
        {i}
        <button id="delBtn" onClick={this.deleteItems.bind(this, i)}>
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
          <form id="todoForm" onSubmit={this.additems}>
            <div className="inputArea">
              <input
                type="text"
                placeholder="Enter The Task"
                id="inputArea"
                value={this.state.input}
                onChange={this.handleChange}
                maxLength="45"
              />
              <button id="addBtn" onClick={this.addItems}>
                Add
              </button>
            </div>
          </form>
          <div className="itemsList">
            <ul className='smooth-scroll'>{list}</ul>
            <button id="clearAll" onClick={this.clearAll}>
              Clear Tasks
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
