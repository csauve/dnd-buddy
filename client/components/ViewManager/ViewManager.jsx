import React, {Component} from "react";
import _ from "lodash";
import Page from "../Page/Page";

export default class ViewManager extends Component {
  state = {
    visiblePages: this.props.availablePages
  }

  render() {
    return (
      <div className="view-manager">
        <nav className="available-pages"></nav>

        {_.map(this.state.visiblePages, (page, pageId) =>
          <div className="view-panel" key={pageId}>
            <Page pageId={pageId} page={page}/>
          </div>
        )}


      </div>
    );
  }
}