import React, {Component} from "react";
import FlipMove from "react-flip-move";

const flipMoveConfig = {
  duration: 200,
  enterAnimation: "fade",
  leaveAnimation: "fade"
};

export default class Overlay extends Component {
  render() {
    return (
      <section className="overlay">
        <ol className="messages">
          <FlipMove {...flipMoveConfig}>
            {this.props.messages.map(({messageId, message, from}) =>
              <li key={messageId} className="overlay-message panel floating">
                <span className="panel-header player">{from}</span>
                <span className="panel-body message-content">{message}</span>
              </li>
            )}
          </FlipMove>
        </ol>
      </section>
    );
  }
}