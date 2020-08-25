/** @format */

import React, { Component } from 'react';
import { State } from '../../util/snackbar-notifier';
import { ReactComponent as ErrorIcon } from '../../assets/icons/alert-triangle-outline.svg';
import { ReactComponent as SuccessIcon } from '../../assets/icons/checkmark-circle-outline.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/info-outline.svg';

import './SnackBar.scss';

interface SnackBarProps {
  state: State;
  visible: boolean;
}

export default class SnackBar extends Component<SnackBarProps> {
  static defaultProps = {
    state: State.INFO,
    visible: false,
  };

  render() {
    return (
      <div className="snack-bar-container" style={this.style}>
        <div className={'snack-bar ' + this.props.state}>
          {this.icon}
          {this.props.children}
        </div>
      </div>
    );
  }

  private get icon() {
    switch (this.props.state) {
      case State.SUCCESS:
        return <SuccessIcon width="26" style={{ filter: 'invert()' }} />;
      case State.ERROR:
        return <ErrorIcon width="26" style={{ filter: 'invert()' }} />;
      default:
        return <InfoIcon width="26" style={{ filter: 'invert()' }} />;
    }
  }

  private get style() {
    const bottom = this.props.visible ? '20px' : '-100px';
    const opacity = this.props.visible ? 1 : 0;

    return { bottom, opacity };
  }
}
