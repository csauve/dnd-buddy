import React, {Component} from "react";
import elementResizeEvent from "element-resize-event";

const config = {
  canvasWidth: 1000,
  canvasHeight: 1000,
  zoomScalar: 0.001,
  maxScaleFactor: 10,
  minScaleFactor: 0.1
};

const clamp = function(x, min, max) {
  return Math.min(max, Math.max(min, x));
};

export default class CanvasPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewCenter: {x: 0, y: 0},
      scaleFactor: 1
    };
  }

  handlePointerMove = (e) => {
    console.log("handlePointerMove");
    console.log(e);
  }

  handlePointerDown = (e) => {
    console.log("handlePointerDown");
    console.log(e);
  }

  handlePointerUp = (e) => {
    console.log("handlePointerUp");
    console.log(e);
  }

  handlePointerOver = (e) => {
    console.log("handlePointerOver");
    console.log(e);
  }

  handlePointerOut = (e) => {
    console.log("handlePointerOut");
    console.log(e);
  }

  handlePointerEnter = (e) => {
    console.log("handlePointerEnter");
    console.log(e);
  }

  handlePointerLeave = (e) => {
    console.log("handlePointerLeave");
    console.log(e);
  }

  handlePointerCancel = (e) => {
    console.log("handlePointerCancel");
    console.log(e);
  }

  handleScroll = (e) => {
    const newScaleFactor = clamp(
      Math.exp(Math.log(this.state.scaleFactor) + (-e.deltaY * config.zoomScalar)),
      config.minScaleFactor,
      config.maxScaleFactor
    );

    this.setState({
      scaleFactor: newScaleFactor
    });

    e.preventDefault();
    return false;
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    canvas.setAttribute("touch-action", "none"); //required for polyfill
    canvas.addEventListener("pointermove", this.handlePointerMove, false);
    canvas.addEventListener("pointerdown", this.handlePointerDown, false);
    canvas.addEventListener("pointerup", this.handlePointerUp, false);
    canvas.addEventListener("pointerover", this.handlePointerOver, false);
    canvas.addEventListener("pointerout", this.handlePointerOut, false);
    canvas.addEventListener("pointerenter", this.handlePointerEnter, false);
    canvas.addEventListener("pointerleave", this.handlePointerLeave, false);
    canvas.addEventListener("pointercancel", this.handlePointerCancel, false);

    const canvasPage = this.refs.canvasPage;
    canvasPage.addEventListener("mousewheel", this.handleScroll, false);
    canvasPage.addEventListener("DOMMouseScroll", this.handleScroll, false);
  }

  render() {
    return (
      <div className="canvas-page" ref="canvasPage">
        <canvas className="drawing-canvas" ref="canvas"
          style={{
            width: `${this.state.scaleFactor * 100}%`,
            height: `${this.state.scaleFactor * 100}%`
          }}
          width={config.canvasWidth}
          height={config.canvasHeight}
        />
      </div>
    );
  }
}