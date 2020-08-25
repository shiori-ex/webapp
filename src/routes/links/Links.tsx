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
import InputLimiter from '../../util/inputlimiter';
import SnackBarNotifier, { State } from '../../util/snackbar-notifier';

interface LinksRouteProps extends RouteComponentProps {
  globalState: GlobalState;
}

class LinksRoute extends Component<LinksRouteProps> {
  state = {
    links: [] as LinkModel[],
  };

  private searchLimiter = new InputLimiter(200);

  async componentDidMount() {
    await this.fetchLinks();
  }

  render() {
    const linkList = this.state.links.map((l) => (
      <LinkTile
        link={l}
        key={l.id_str}
        onEdit={() => this.onLinkEdit(l)}
        onRemove={() => this.onLinkRemove(l)}
      />
    ));

    return (
      <div>
        <HoverButton onClick={() => this.props.history.push('/links/new')}>
          <PlusIcon width="50px" height="50px" style={{ padding: '3px 0px' }} />
        </HoverButton>

        <SearchBar
          placeholder="Search..."
          onChange={(v) => this.onSearchChange(v)}
        />

        {linkList}
      </div>
    );
  }

  private async fetchLinks() {
    try {
      const links = await this.props.globalState.client!.links();
      this.setState({ links });
    } catch (err) {
      if (err instanceof AuthenticationError) {
        this.props.history.push('/login');
      } else {
        SnackBarNotifier.show(`Failed fetching links: ${err}`, State.ERROR);
      }
    }
  }

  private async onSearchChange(v: string) {
    this.searchLimiter.input(v, async (val) => {
      if (!val) {
        await this.fetchLinks();
      } else {
        try {
          const links = (await this.props.globalState.client!.search(val)).hits;
          this.setState({ links });
        } catch (err) {
          if (err instanceof AuthenticationError) {
            this.props.history.push('/login');
          } else {
            SnackBarNotifier.show(
              `Failed fetching search: ${err}`,
              State.ERROR
            );
          }
        }
      }
    });
  }

  private onLinkEdit(l: LinkModel) {
    this.props.history.push(`/links/${l.id_str}`);
  }

  private async onLinkRemove(l: LinkModel) {
    try {
      await this.props.globalState.client!.removeLink(l.id_str);
      const i = this.state.links.findIndex((cl) => cl.id_str === l.id_str);
      if (i >= 0) {
        this.state.links.splice(i, 1);
        this.setState({});
      }
    } catch (err) {
      if (err instanceof AuthenticationError) {
        this.props.history.push('/login');
      } else {
        console.error(err);
      }
    }
  }
}

export default withRouter(LinksRoute);
