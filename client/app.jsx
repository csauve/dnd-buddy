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
      <main>
        <h3>Render Result:</h3>
        <div id="test-device">
          <ViewManager availablePages={this.state.availablePages}/>
        </div>

        <h3>App State:</h3>
        <pre>
          <code>
            {JSON.stringify(this.state, null, 2)}
          </code>
        </pre>
      </main>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector("#mountpoint"));