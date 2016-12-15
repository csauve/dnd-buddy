import React, {Component} from "react";
import ReactDOM from "react-dom";
import PageManager from "./components/PageManager/PageManager.jsx";
import Overlay from "./components/Overlay/Overlay.jsx";
import uuid from "uuid";
import Shake from "shake.js";
import Roll from "roll";

const roll = new Roll();

const overlayMessageDuration = 3000;
const shakeThreshold = 8;

class App extends Component {
  state = {
    availablePages: [
      {pageId: uuid.v4(), type: "canvas"},
      {pageId: uuid.v4(), type: "canvas"},
    ],
    overlayMessages: []
  }

  publishOverlayMessage(message) {
    //todo: publish this across users via server
    this.handleReceiveOverlayMessage(message);
  }

  handleReceiveOverlayMessage(message) {
    this.setState({
      overlayMessages: this.state.overlayMessages.concat([message])
    });
    setTimeout(
      () => {this.clearOverlayMessage(message.messageId)},
      overlayMessageDuration
    );
  }

  clearOverlayMessage(messageId) {
    this.setState({
      overlayMessages: this.state.overlayMessages.filter((message) => message.messageId != messageId)
    });
  }

  publishRoll = (e) => {
    const message = {
      message: roll.roll("d20").result,
      from: "test-user",
      messageId: uuid.v4()
    };

    this.publishOverlayMessage(message);
  }

  componentDidMount() {
    //stop touch events from scrolling the page on mobile devices -- events should go to the canvas
    const ignore = (e) => { e.preventDefault() };
    const body = document.querySelector("body");
    body.addEventListener("touchstart", ignore);
    body.addEventListener("touchmove", ignore);

    new Shake({threshold: shakeThreshold, timeout: 1000}).start();
    window.addEventListener("shake", this.publishRoll);
  }

  render() {
    return (
      <main className="app-container">
        <Overlay messages={this.state.overlayMessages}/>
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