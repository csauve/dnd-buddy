import React, {Component} from "react";

export default class CanvasPage extends Component {

  handlePointerMove = (e) => {
    console.log(e);
  }

  handlePointerDown = (e) => {
    console.log(e);
  }

  handlePointerUp = (e) => {
    console.log(e);
  }

  handlePointerOver = (e) => {
    console.log(e);
  }

  handlePointerOut = (e) => {
    console.log(e);
  }

  handlePointerEnter = (e) => {
    console.log(e);
  }

  handlePointerLeave = (e) => {
    console.log(e);
  }

  handlePointerCancel = (e) => {
    console.log(e);
  }

  handleAny = (e) => {
    console.log(e);
  }


  componentDidMount() {
    const canvas = this.refs.canvas;
    canvas.setAttribute('touch-action', 'none'); //required for polyfill

    canvas.addEventListener("pointermove", this.handlePointerMove, false);
    canvas.addEventListener("pointerdown", this.handlePointerDown, false);
    canvas.addEventListener("pointerup", this.handlePointerUp, false);
    canvas.addEventListener("pointerover", this.handlePointerOver, false);
    canvas.addEventListener("pointerout", this.handlePointerOut, false);
    canvas.addEventListener("pointerenter", this.handlePointerEnter, false);
    canvas.addEventListener("pointerleave", this.handlePointerLeave, false);
    canvas.addEventListener("pointercancel", this.handlePointerCancel, false);
  }

  render() {
    return (
      <div className="canvas-page">
        <canvas className="drawing-canvas" ref="canvas" width={800} height={600}/>
      </div>
    );
  }
}