/** @format */

import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import GlobalState from '../../util/globalstate';
import { AuthenticationError } from 'shiorijs/dist/errors';
import { LinkModel } from 'shiorijs/dist/models';
import LinkTile from '../../components/link-tile/LinkTile';
import HoverButton from '../../components/hover-button/HoverButton';

import { ReactComponent as PlusIcon } from '../../assets/icons/plus-outline.svg';
import SearchBar from '../../components/search-bar/SearchBar';

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
    const linkList = this.state.links.map((l) => (
      <LinkTile link={l} key={l.id_str} />
    ));

    return (
      <div>
        <HoverButton onClick={() => this.props.history.push('/links/new')}>
          <PlusIcon width="50px" height="50px" style={{ padding: '3px 0px' }} />
        </HoverButton>

        <SearchBar />

        {linkList}
      </div>
    );
  }
}

export default withRouter(LinksRoute);
