import React, {Component} from "react";
import ReactDOM from "react-dom";
import CanvasPage from "./components/canvas/CanvasPage.jsx";
import Overlay from "./components/overlay/Overlay.jsx";
import Menu from "./components/menu/Menu.jsx";
import uuid from "uuid";
import Shake from "shake.js";
import socketClient from "socket.io-client";
import ee from "event-emitter";

const config = {
  rollMessageDuration: 3000,
  shakeThreshold: 8,
  socketEndpoint: "/"
};

class App extends Component {
  state = {
    rolls: [],
    settings: {
      userName: "Player",
      defaultRoll: "d20",
      activeMenu: "name"
    },
    canvasDataTopic: ee({})
  }

  handleSocketRollResult = (result) => {
    this.setState({
      rolls: this.state.rolls.concat([result])
    });
    setTimeout(
      () => {
        this.setState({
          rolls: this.state.rolls.filter((roll) => roll.rollId != result.rollId)
        });
      },
      config.rollMessageDuration
    );
  }

  publishRoll = (e) => {
    if (!this.state.settings.defaultRoll) return;
    this.state.socket.emit("roll", {
      userName: this.state.settings.userName,
      roll: this.state.settings.defaultRoll
    });
  }

  handleSettingsChanged = (settings) => {
    this.setState({settings});
  }

  publishCanvasDataMsg = (canvasData) => {
    this.state.socket.emit("canvasDataMsg", {
      userName: this.state.settings.userName,
      canvasData: canvasData
    });
  }

  handleSocketCanvasDataMsg = (canvasDataMsg) => {
    this.state.canvasDataTopic.emit("canvasDataMsg", canvasDataMsg);
  }

  componentDidMount() {
    //start listening for phone shakes
    new Shake({threshold: config.shakeThreshold, timeout: 1000}).start();
    window.addEventListener("shake", this.publishRoll);

    const socket = socketClient(this.props.socketEndpoint);
    socket.on("rollResult", this.handleSocketRollResult);
    socket.on("canvasDataMsg", this.handleSocketCanvasDataMsg);
    this.setState({socket});
  }

  render() {
    return (
      <main className="app-container">
        <Overlay rolls={this.state.rolls}/>
        <Menu
          settings={this.state.settings}
          onSettingsChange={this.handleSettingsChanged}
          onRoll={this.publishRoll}
        />
        <CanvasPage
          settings={this.state.settings}
          onUpdate={this.publishCanvasDataMsg}
          canvasDataTopic={this.state.canvasDataTopic}
        />
      </main>
    );
  }
}

ReactDOM.render(
  <App socketEndpoint={config.socketEndpoint}/>,
  document.querySelector("#mountpoint")
);
