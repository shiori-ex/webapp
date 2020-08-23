/** @format */

import React, { Component } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-outline.svg';

import './SearchBar.scss';

interface SearchBarProps {
  onChange?: (v: string) => void;
  placeholder?: string;
}

export default class SearchBar extends Component<SearchBarProps> {
  render() {
    return (
      <div className="search-bar-container">
        <SearchIcon width="25px" style={{ filter: 'invert()' }} />
        <input
          placeholder={this.props.placeholder}
          onChange={(e) =>
            this.props.onChange?.call(this, e.currentTarget.value)
          }
        />
      </div>
    );
  }
}
