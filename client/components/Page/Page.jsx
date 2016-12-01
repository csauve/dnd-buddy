import React, {Component} from "react";

export default class Page extends Component {
  render() {
    return (
      <section className="page">
        {this.props.pageId}
        {this.props.page.type}
      </section>
    );
  }
}