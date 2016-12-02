import React, {Component} from "react";
import ReactDOM from "react-dom";
import ViewManager from "./components/ViewManager/ViewManager.jsx";
import uuid from "uuid";

class App extends Component {
  state = {
    availablePages: {
      [`${uuid.v4()}`]: {type: "Test"},
      [`${uuid.v4()}`]: {type: "Test"},
    }
  }

  render() {
    return (
      <main className="app-container">
        <ViewManager availablePages={this.state.availablePages}/>
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