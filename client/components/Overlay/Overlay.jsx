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
            {this.props.rolls.map(({rollId, roll, result, userName}) =>
              <li key={rollId} className="overlay-message">
                <ul className="message-details">
                  {userName != null &&
                    <li><i className="fa fa-user-circle"/> {userName}</li>
                  }
                  <li><i className="fa fa-cube"/> {roll}</li>
                </ul>
                <p className="message-content">
                  <strong>{result}</strong>
                </p>
              </li>
            )}
          </FlipMove>
        </ol>
      </section>
    );
  }
}