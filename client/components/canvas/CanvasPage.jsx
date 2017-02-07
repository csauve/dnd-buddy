import React, {Component} from "react";
import elementResizeEvent from "element-resize-event";

const config = {
  canvasWidth: 1000,
  canvasHeight: 1000,
  zoomScalar: 0.001,
  maxScaleFactor: 5,
  minScaleFactor: 0.25,
  lineThickness: 5,
  eraserThickness: 50,
  peerTimeoutPeriod: 2000
};

const clamp = function(x, min, max) {
  return Math.min(max, Math.max(min, x));
};

export default class CanvasPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      originInViewport: {x: 0.5, y: 0.5},
      scaleFactor: 1,
      isDrawing: false
    };
  }

  handlePointerStart = (e) => {
    const activeMenu = this.props.settings.activeMenu;
    if (activeMenu == "pen" || activeMenu == "eraser") {
      const canvasPoint = {
        x: e.offsetX / this.state.scaleFactor,
        y: e.offsetY / this.state.scaleFactor
      };
      this.setState({
        isDrawing: true,
        tool: activeMenu,
        prevPoint: canvasPoint
      });
    }
  }

  handlePointerMove = (e) => {
    if (this.state.isDrawing) {
      const ctx = this.state.context;

      const canvasPoint = {
        x: e.offsetX / this.state.scaleFactor,
        y: e.offsetY / this.state.scaleFactor
      };

      if (this.state.tool == "pen") {
        ctx.lineWidth = config.lineThickness;
        ctx.strokeStyle = "#333";
      } else if (this.state.tool == "eraser") {
        ctx.lineWidth = config.eraserThickness;
        ctx.strokeStyle = "#e5ffc4";
      }

      ctx.beginPath();
      ctx.moveTo(
        this.state.prevPoint.x,
        this.state.prevPoint.y
      );
      ctx.lineTo(
        canvasPoint.x,
        canvasPoint.y
      );
      ctx.stroke();

      this.setState({prevPoint: canvasPoint});
      this.props.onUpdate(this.refs.canvas.toDataURL());
    }
  }

  handlePointerStop = (e) => {
    this.setState({isDrawing: false});
  }

  handleScroll = (e) => {
    const zoomLevelDiff = -e.deltaY * config.zoomScalar;

    const newScaleFactor = clamp(
      Math.exp(Math.log(this.state.scaleFactor) + zoomLevelDiff),
      config.minScaleFactor,
      config.maxScaleFactor
    );

    const scrollInViewport = {
      x: e.clientX / this.refs.canvasPage.offsetWidth - this.refs.canvasPage.clientLeft,
      y: e.clientY / this.refs.canvasPage.offsetHeight  - this.refs.canvasPage.clientTop
    };

    const newOriginInViewport = newScaleFactor != config.maxScaleFactor ? {
      x: Math.exp(zoomLevelDiff) * (this.state.originInViewport.x - scrollInViewport.x) + scrollInViewport.x,
      y: Math.exp(zoomLevelDiff) * (this.state.originInViewport.y - scrollInViewport.y) + scrollInViewport.y
    } : this.state.originInViewport;

    this.setState({
      scaleFactor: newScaleFactor,
      originInViewport: newOriginInViewport
    });

    e.preventDefault();
    return false;
  }

  handleCanvasDataMsg = (canvasDataMsg) => {
    const img = new Image();
    img.src = canvasDataMsg.canvasData;
    this.state.context.drawImage(img, 0, 0, config.canvasWidth, config.canvasHeight);

    if (canvasDataMsg.userName) {
      if (this.state.peerTimeout) {
        clearTimeout(this.state.peerTimeout);
      }

      this.setState({
        peerUserName: canvasDataMsg.userName,
        peerUserNameVisible: true,
        peerTimeout: setTimeout(() => {
          this.setState({peerUserNameVisible: false});
        }, config.peerTimeoutPeriod)
      });
    }
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    canvas.setAttribute("touch-action", "none"); //required for polyfill
    // canvas.addEventListener("pointerover", this.handlePointerOver, false);
    // canvas.addEventListener("pointerenter", this.handlePointerEnter, false);
    canvas.addEventListener("pointerdown", this.handlePointerStart, false);
    canvas.addEventListener("pointermove", this.handlePointerMove, false);
    canvas.addEventListener("pointerup", this.handlePointerStop, false);
    canvas.addEventListener("pointerout", this.handlePointerStop, false);
    canvas.addEventListener("pointerleave", this.handlePointerStop, false);
    canvas.addEventListener("pointercancel", this.handlePointerStop, false);
    const canvasPage = this.refs.canvasPage;
    canvasPage.addEventListener("mousewheel", this.handleScroll, false);
    canvasPage.addEventListener("DOMMouseScroll", this.handleScroll, false);

    this.props.canvasDataTopic.on("canvasDataMsg", this.handleCanvasDataMsg);

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#e5ffc4";
    ctx.clearRect(0, 0, config.canvasWidth, config.canvasHeight);
    this.setState({context: ctx});
  }

  render() {
    return (
      <div className="canvas-page" ref="canvasPage">
        <canvas className={`drawing-canvas ${this.props.settings.activeMenu}`} ref="canvas"
          style={{
            top: `${this.state.originInViewport.y * 100}%`,
            left: `${this.state.originInViewport.x * 100}%`,
            width: `${this.state.scaleFactor * config.canvasWidth}px` //height will retain proportion
          }}
          width={config.canvasWidth}
          height={config.canvasHeight}
        />
        <div className={`peer-name ${this.state.peerUserNameVisible ? "visible" : "invisible"}`}>
          <i className="fa fa-user-circle"/> {this.state.peerUserName}
        </div>
      </div>
    );
  }
}