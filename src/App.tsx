/** @format */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginRoute from './routes/login/Login';
import LinksRoute from './routes/links/Links';
import EditRoute from './routes/edit/Edit';
import GlobalState from './util/globalstate';

import './App.scss';

export default class App extends Component {
  state = {
    redirect: '',
  };

  private globalState = new GlobalState();

  async componentDidMount() {
    this.globalState.onError(() => {
      this.redirect('/login');
    });
  }

  render() {
    return (
      <div className="flex">
        <div className="app-router-outlet">
          <Router>
            <Route
              exact
              path="/login"
              render={() => <LoginRoute globalState={this.globalState} />}
            ></Route>

            <Route
              exact
              path="/links"
              render={() => <LinksRoute globalState={this.globalState} />}
            ></Route>

            <Route
              exact
              path="/links/:id"
              render={({ match }) => (
                <EditRoute
                  globalState={this.globalState}
                  id={match.params.id}
                />
              )}
            ></Route>

            <Route exact path="/" render={() => <Redirect to="/links" />} />

            {this.state.redirect && <Redirect to={this.state.redirect} />}
          </Router>
        </div>
      </div>
    );
  }

  private redirect(to: string) {
    this.setState({ redirect: to });
    setTimeout(() => this.setState({ redirect: null }), 10);
  }
}
