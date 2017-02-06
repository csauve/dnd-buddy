import React, {Component} from "react";
import elementResizeEvent from "element-resize-event";

export default class CanvasPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewCenter: {x: 0, y: 0},
      zoomLevel: 1
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
    console.log("handleScroll");
    console.log(e);
    e.preventDefault();
    return false;
  }

  resizeCanvas = () => {
    this.refs.canvas.width = this.refs.canvasPage.clientWidth;
    this.refs.canvas.height = this.refs.canvasPage.clientHeight;
  }

  renderCanvas = () => {

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
    canvas.addEventListener("mousewheel", this.handleScroll, false);
    canvas.addEventListener("DOMMouseScroll", this.handleScroll, false);

    elementResizeEvent(this.refs.canvasPage, this.resizeCanvas);
    this.resizeCanvas();
  }

  render() {
    return (
      <div className="canvas-page" ref="canvasPage">
        <canvas className="drawing-canvas" ref="canvas"/>
      </div>
    );
  }
}