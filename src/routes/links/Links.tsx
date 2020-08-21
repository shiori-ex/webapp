/** @format */

import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import GlobalState from '../../util/globalstate';
import { AuthenticationError } from 'shiorijs/dist/errors';
import { LinkModel } from 'shiorijs/dist/models';
import LinkTile from '../../components/link-tile/LinkTile';

interface LinksRouteProps extends RouteComponentProps {
  globalState: GlobalState;
}

class LinksRoute extends Component<LinksRouteProps> {
  state = {
    links: [] as LinkModel[],
  };

  async componentDidMount() {
    try {
      const links = await this.props.globalState.client!.links();
      this.setState({ links });
    } catch (err) {
      if (err instanceof AuthenticationError) {
        this.props.history.push('/login');
      } else {
        console.error(err);
      }
    }
  }

  render() {
    const linkList = this.state.links.map((l) => <LinkTile link={l} />);

    return <div>{linkList}</div>;
  }
}

export default withRouter(LinksRoute);
