import React, {Component} from "react";
import ReactDOM from "react-dom";

class App extends Component {
  state = {
    session: "Todo"
  }

  render() {
    return (
      <main>
        <h1>DND Buddy</h1>

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