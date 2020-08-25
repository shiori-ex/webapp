/** @format */

import React, { Component } from 'react';
import { LinkModel } from 'shiorijs/dist/models';
import { ReactComponent as EditIcon } from '../../assets/icons/edit-outline.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash-outline.svg';

import './LinkTile.scss';

interface LinkTileProps {
  link: LinkModel;
  onEdit?: (l: LinkModel) => void;
  onRemove?: (l: LinkModel) => void;
}

export default class LinkTile extends Component<LinkTileProps> {
  state = {
    faviconState: 0,
    faviconURL: this.getFaviconURL('ico'),
  };

  render() {
    return (
      <a href={this.props.link.url}>
        <div className="link-tile">
          <div className="link-tile-favicon">
            <img
              width="32"
              height="32"
              alt="favicon"
              src={this.state.faviconURL}
              onError={() => this.onFaviconError()}
            />
          </div>
          <div>
            <p className="link-tile-title">{this.title}</p>
            {this.props.link.description && (
              <p className="link-tile-description">
                {this.props.link.description}
              </p>
            )}
            <div className="link-tile-tags">{this.tags}</div>
          </div>
          <div className="link-tile-controls">
            <button onClick={(e) => this.onEditClick(e)}>
              <EditIcon height="25px" />
            </button>
            <button onClick={(e) => this.onRemoveClick(e)}>
              <TrashIcon height="25px" />
            </button>
          </div>
        </div>
      </a>
    );
  }

  private get title(): string {
    const url = this.props.link.url;

    if (url.startsWith('http://')) {
      return url.substr(7);
    }

    if (url.startsWith('https://')) {
      return url.substr(8);
    }

    return url;
  }

  private get tags() {
    return (this.props.link.tags ?? []).map((t) => <span key={t}>{t}</span>);
  }

  private onEditClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    this.props.onEdit?.call(this, this.props.link);
  }

  private onRemoveClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    this.props.onRemove?.call(this, this.props.link);
  }

  private getFaviconURL(type: string): string {
    const url = this.props.link.url
      .replace('http://', '')
      .replace('https://', '')
      .split('/')[0];

    console.log(url);

    return `https://${url}/favicon.${type}`;
  }

  private onFaviconError() {
    switch (this.state.faviconState) {
      case 0:
        this.setState({
          faviconURL: this.getFaviconURL('png'),
          faviconState: 1,
        });
        break;

      default:
        this.setState({
          faviconURL: '/assets/globe-outline.svg',
          faviconState: 2,
        });
    }
  }
}
