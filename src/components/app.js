import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="headerContainer">SWAPP</div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
