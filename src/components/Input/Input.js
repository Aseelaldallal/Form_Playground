import React from 'react';
import './styles.css';

const input = props => {
  let inputElement = null;
  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          onBlur={props.blurred}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          onBlur={props.blurred}
          cols="5"
          rows="10"
        />
      );
      break;
    case 'select':
      inputElement = (
        <select value={props.value} onChange={props.changed}>
          <option value="" disabled selected hidden>
            {props.elementConfig.label}
          </option>
          {props.elementConfig.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayName}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = <input />;
  }

  let i = 0;
  const errors = props.validationErrors.map(error => (
    <p key={i++}> {error} </p>
  ));

  return (
    <div>
      {errors}
      {inputElement}
    </div>
  );
};

export default input;
