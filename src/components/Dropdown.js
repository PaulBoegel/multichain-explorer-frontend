import React from 'react';
import './Dropdown.css';

export default function Dropdown({ options }) {
  return (
    <div className="dropdown-wrap">
      <select className="dropdown">
        {options.map((option, key) => {
          return (
            <option key={key} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
      <span className="dropdown-arrow"></span>
    </div>
  );
}
