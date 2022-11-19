import React, { Fragment, forwardRef } from "react";

const Select = forwardRef(({ id, labelText, options, handleChange }, ref) => (
  <Fragment>
    <label htmlFor={id}>{labelText}</label>
    <select ref={ref} id={id} onChange={handleChange || (() => { })}>
      {options.map(option => (<option key={option.value} value={option.value}>{option.text}</option>))}
    </select>
  </Fragment>
));


export { Select };