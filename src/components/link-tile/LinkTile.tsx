/** @format */

import React, { Component } from 'react';
import { LinkModel } from 'shiorijs/dist/models';

import './LinkTile.scss';

export default class LinkTile extends Component<{ link: LinkModel }> {
  render() {
    return (
      <a href={this.props.link.url}>
        <div className="link-tile">
          <p className="link-tile-title">{this.title}</p>
          {this.props.link.description && (
            <p className="link-tile-description">
              {this.props.link.description}
            </p>
          )}
          <div className="link-tile-tags">{this.tags}</div>
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
}
