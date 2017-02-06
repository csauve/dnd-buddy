import React, {Component} from "react";
import _ from "lodash";

const MenuSection = ({name, active, iconClass, children, onClick}) => (
  <div className={`menu-section ${active ? "active" : "inactive"}`}>
    <div className="icon-button" onClick={onClick}>
      <i className={iconClass}/>
    </div>
    <div className="children-container">
      <div className="settings-list">
        {children}
      </div>
    </div>
  </div>
);

export default class Menu extends Component {

  handleRollChange = (e) => {
    this.props.onSettingsChange(_.defaults(
      {defaultRoll: e.target.value.trim() == "" ? null : e.target.value},
      this.props.settings
    ));
  }

  handleNameChange = (e) => {
    this.props.onSettingsChange(_.defaults(
      {userName: e.target.value.trim() == "" ? null : e.target.value},
      this.props.settings
    ));
  }

  setActiveMenu = (activeMenu) => {
    this.props.onSettingsChange(_.defaults(
      {activeMenu},
      this.props.settings
    ));
  }

  render() {
    const activeMenuLink = (menuName) => ({
      active: this.props.settings.activeMenu == menuName,
      onClick: () => this.setActiveMenu(menuName)
    });

    return (
      <menu className="main-menu">
        <MenuSection iconClass="fa fa-user-circle" {...activeMenuLink("name")}>
          <div className="setting">
            <input type="text" value={this.props.settings.userName || ""} onChange={this.handleNameChange}/>
          </div>
        </MenuSection>
        <MenuSection iconClass="fa fa-pencil" {...activeMenuLink("pen")}>
          <div className="setting">
            Pen
          </div>
        </MenuSection>
        <MenuSection iconClass="fa fa-eraser" {...activeMenuLink("eraser")}>
          <div className="setting">
            Eraser
          </div>
        </MenuSection>
        <MenuSection iconClass="fa fa-map-marker" {...activeMenuLink("markers")}>
          <div className="setting">
            Markers
          </div>
        </MenuSection>
        <MenuSection iconClass="fa fa-cube" {...activeMenuLink("roll")}>
          <div className="setting">
            <input type="text" value={this.props.settings.defaultRoll || ""} onChange={this.handleRollChange}/>
          </div>
          <div className="setting">
            <button onClick={this.props.onRoll}>Roll</button>
          </div>
        </MenuSection>
      </menu>
    );
  }
}