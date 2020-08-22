/** @format */

import React, { Component } from 'react';

import './HoverButton.scss';

interface HoverButtonProps {
  onClick?: () => void;
}

export default class HoverButton extends Component<HoverButtonProps> {
  render() {
    return (
      <button
        className="hover-button"
        onClick={() => this.props.onClick?.call(this)}
      >
        {this.props.children}
      </button>
    );
  }
}
