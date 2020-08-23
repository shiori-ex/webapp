/** @format */

import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import GlobalState from '../../util/globalstate';
import { LinkModel } from 'shiorijs/dist/models';
import { AuthenticationError } from 'shiorijs/dist/errors';
import { ReactComponent as SaveIcon } from '../../assets/icons/save-outline.svg';
import { ReactComponent as BackIcon } from '../../assets/icons/arrow-ios-back-outline.svg';

import './Edit.scss';

interface EditRouteProps extends RouteComponentProps {
  id: string;
  globalState: GlobalState;
}

class EditRoute extends Component<EditRouteProps> {
  state = {
    link: {} as LinkModel,
    tags: '',
    isNew: false,
  };

  async componentDidMount() {
    const id = this.props.id;

    if (id !== 'new') {
      try {
        const link = await this.props.globalState.client!.link(this.props.id);
        const tags = (link.tags ?? []).join(', ');
        this.setState({ link, tags });
      } catch (err) {
        if (err instanceof AuthenticationError) {
          this.props.history.push('/login');
        } else {
          console.error(err);
        }
      }
    } else {
      this.setState({ isNew: true });
    }
  }

  render() {
    return (
      <div className="edit-container">
        <h2>{this.state.isNew ? 'Create new link' : 'Edit link'}</h2>

        <div className="edit-input-group">
          <label htmlFor="i-url">URL</label>
          <input
            id="i-url"
            placeholder="https://example.com"
            value={this.state.link.url ?? ''}
            onChange={(e) =>
              this.onChange(
                this.state.link,
                (l) => (l.url = e.currentTarget.value)
              )
            }
          ></input>
        </div>

        <div className="edit-input-group">
          <label htmlFor="i-description">Description</label>
          <input
            id="i-description"
            placeholder="Very interesting page for stuff."
            value={this.state.link.description ?? ''}
            onChange={(e) =>
              this.onChange(
                this.state.link,
                (l) => (l.description = e.currentTarget.value)
              )
            }
          ></input>
        </div>

        <div className="edit-input-group">
          <label htmlFor="i-tags">Tags</label>
          <input
            id="i-tags"
            placeholder="icons, tutorial, creative"
            value={this.state.tags}
            onChange={(e) => this.setState({ tags: e.currentTarget.value })}
            onBlur={() => this.formatTags()}
          ></input>
        </div>

        <div className="edit-control-buttons">
          <button onClick={() => this.props.history.goBack()}>
            <BackIcon height="25px" />
          </button>
          <button onClick={() => this.onSaveClick()}>
            <SaveIcon height="25px" />
          </button>
        </div>
      </div>
    );
  }

  private splitTags(s: string): string[] {
    return s
      .split(',')
      .filter((t) => !!t)
      .map((t) => t.trim());
  }

  private formatTags(): Promise<any> {
    return new Promise((resolve, _) => {
      const tags = this.splitTags(this.state.tags).join(', ');
      this.setState({ tags }, resolve);
    });
  }

  private onChange<T>(v: T, modifier: (v: T) => void) {
    modifier(v);
    this.setState({});
  }

  private async onSaveClick() {
    await this.formatTags();
    this.state.link.tags = this.splitTags(this.state.tags);

    try {
      if (this.state.isNew) {
        await this.props.globalState.client!.createLink(this.state.link);
      } else {
        await this.props.globalState.client!.updateLink(this.state.link);
      }

      this.props.history.goBack();
    } catch (err) {
      if (err instanceof AuthenticationError) {
        this.props.history.push('/login');
      } else {
        console.error(err);
      }
    }
  }
}

export default withRouter(EditRoute);
