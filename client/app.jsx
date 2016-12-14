import React, {Component} from "react";
import ReactDOM from "react-dom";
import PageManager from "./components/PageManager/PageManager.jsx";
import uuid from "uuid";
import Shake from "shake.js";
import Roll from "roll";

const roll = new Roll();

class App extends Component {
  state = {
    availablePages: [
      {pageId: uuid.v4(), type: "canvas"},
      {pageId: uuid.v4(), type: "canvas"},
    ]
  }

  handleShake = (e) => {
    //todo: publish this across users
    console.log(roll.roll("d20").result);
  }

  componentDidMount() {
    //stop touch events from scrolling the page on mobile devices -- events should go to the canvas
    const ignore = (e) => { e.preventDefault() };
    const body = document.querySelector("body");
    body.addEventListener("touchstart", ignore);
    body.addEventListener("touchmove", ignore);

    new Shake({threshold: 10, timeout: 1000}).start();
    window.addEventListener("shake", this.handleShake);
  }

  render() {
    return (
      <main className="app-container">
        <PageManager availablePages={this.state.availablePages}/>
      </main>
    );
  }
}

/*
<pre>
  <code>
    {JSON.stringify(this.state, null, 2)}
  </code>
</pre>
*/

ReactDOM.render(<App/>, document.querySelector("#mountpoint"));