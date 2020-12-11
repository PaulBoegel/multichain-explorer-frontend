import React from 'react';
import './SearchPanel.css';
import Search from './Search';
import Dropdown from './Dropdown';

export default function SearchPanel() {
  const blockchainOptions = [
    { value: 0, name: 'Bitcoin' },
    { value: 1, name: 'Litecoin' },
    { value: 2, name: 'Dash' },
    { value: 3, name: 'Ethereum' },
  ];

  return (
    <div className="search-panel-grid">
      <div className="search-bar">
        <Search />
      </div>
      <div className="search-border"></div>
      <div className="search-dropdown">
        <Dropdown options={blockchainOptions} />
      </div>
    </div>
  );
}
