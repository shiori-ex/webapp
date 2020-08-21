/** @format */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginRoute from './routes/login/Login';
import GlobalState from './util/globalstate';

import './App.scss';
import LocalStorageWrapper from './wrapper/localstorage';
import { Client } from 'shiorijs';
import Consts from './util/consts';

export default class App extends Component {
  state = {
    redirect: '',
  };

  private globalState = new GlobalState();

  async componentDidMount() {
    if (!this.globalState.client) {
      const token = LocalStorageWrapper.get<string>('token');
      if (token) {
        this.globalState.client = new Client(token, Consts.API_ENDPOINT);
      } else {
        this.redirect('/login');
      }
    }
  }

  render() {
    return (
      <div>
        <Router>
          <Route
            exact
            path="/login"
            render={() => <LoginRoute globalState={this.globalState} />}
          ></Route>

          {this.state.redirect && <Redirect to={this.state.redirect} />}
        </Router>
      </div>
    );
  }

  private redirect(to: string) {
    this.setState({ redirect: to });
    setTimeout(() => this.setState({ redirect: null }), 10);
  }
}
