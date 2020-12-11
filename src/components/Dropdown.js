import React from "react";
import "./Dropdown.css";

export default function Dropdown({ options, arrowColor, onChange }) {
  // const arrowSVG = `url("data:image/svg+xml;charset=UTF-8, <svg viewBox='0 0 100 100'><polygon fill='${arrowColor}' points='50 15, 100 100, 0 100'/></svg>")`;
  return (
    <div className="dropdown-wrap">
      <select className="dropdown" onChange={onChange}>
        {options.map((option, key) => {
          return (
            <option key={key} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
      <span
        className="dropdown-arrow"
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon fill='${arrowColor}' points='50 15, 100 100, 0 100'/></svg>")`,
        }}
      ></span>
    </div>
  );
}
