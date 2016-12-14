import React, {Component} from "react";
import _ from "lodash";
import CanvasPage from "../CanvasPage/CanvasPage";

const pagesByType = {
  canvas: CanvasPage
};

export default class ViewManager extends Component {
  state = {
    visiblePages: this.props.availablePages
  }

  render() {
    return (
      <div className="page-manager">
        <nav className="available-pages"></nav>

        {this.state.visiblePages.map((page) => {
          const PageComponent = pagesByType[page.type];
          return (
            <section className="page" key={page.pageId}>
              <PageComponent {...page}/>
            </section>
          );
        })}
      </div>
    );
  }
}