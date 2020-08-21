/** @format */

import React, { Component } from 'react';
import LocalStorageWrapper from '../../wrapper/localstorage';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import GlobalState from '../../util/globalstate';
import { Client } from 'shiorijs';
import Consts from '../../util/consts';

import './Login.scss';

interface LoginRouteProps extends RouteComponentProps {
  globalState: GlobalState;
}

class LoginRoute extends Component<LoginRouteProps> {
  render() {
    return (
      <div className="login-container">
        <div>
          <p>TOKEN</p>
          <input type="password" onKeyDown={this.onKeyDown.bind(this)} />
        </div>
      </div>
    );
  }

  private onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      this.submitToken((event.target as HTMLInputElement).value);
    }
  }

  private submitToken(token: string) {
    if (!token) return;

    LocalStorageWrapper.set('token', token);
    this.props.history.push('/');
  }
}

export default withRouter(LoginRoute);
