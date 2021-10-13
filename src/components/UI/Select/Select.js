import React from 'react';

import classes from './Select.scss';

const Select = ({ label, value, onChange, options }) => {
  const htmlFor = `${label}-${Math.random()}`;

  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>{label}</label>
      <select id={htmlFor} value={value} onChange={onChange}>
        {options.map((option, i) => {
          return (
            <option key={option.value + i} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
