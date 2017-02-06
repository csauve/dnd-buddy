import React, {Component} from "react";
import ReactDOM from "react-dom";
import CanvasPage from "./components/canvas/CanvasPage.jsx";
import Overlay from "./components/overlay/Overlay.jsx";
import Menu from "./components/menu/Menu.jsx";
import uuid from "uuid";
import Shake from "shake.js";
import socketClient from "socket.io-client";

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
    canvasData: null
  }

  handleRollResult = (result) => {
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

  handleCanvasUpdate = (update) => {
    console.log("received canvas update");
  }

  componentDidMount() {
    //start listening for phone shakes
    new Shake({threshold: config.shakeThreshold, timeout: 1000}).start();
    window.addEventListener("shake", this.publishRoll);

    const socket = socketClient(this.props.socketEndpoint);
    socket.on("rollResult", this.handleRollResult);
    socket.on("canvasUpdate", this.handleCanvasUpdate);
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
        <CanvasPage canvasData={this.state.canvasData}/>
      </main>
    );
  }
}

ReactDOM.render(
  <App socketEndpoint={config.socketEndpoint}/>,
  document.querySelector("#mountpoint")
);
