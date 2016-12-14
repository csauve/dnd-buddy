import React, {Component} from "react";
import ReactDOM from "react-dom";
import PageManager from "./components/PageManager/PageManager.jsx";
import uuid from "uuid";

class App extends Component {
  state = {
    availablePages: [
      {pageId: uuid.v4(), type: "canvas"},
      {pageId: uuid.v4(), type: "canvas"},
    ]
  }

  componentDidMount() {
    //stop touch events from scrolling the page on mobile devices -- events should go to the canvas
    const ignore = (e) => { e.preventDefault() };
    const body = document.querySelector("body");
    body.addEventListener("touchstart", ignore);
    body.addEventListener("touchmove", ignore);
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