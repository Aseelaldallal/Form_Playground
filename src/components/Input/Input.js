import React from 'react';
import './styles.css';

const input = props => {
  let inputElement = null;
  let validationError = null;
  if (props.invalid && props.shouldValidate && props.touched) {
    validationError = props.validationMsg
      ? props.validationMsg
      : 'Please enter a valid value!';
  }
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
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          defaultValue={props.elementConfig.defaultSelect}
          onChange={props.changed}
          onBlur={props.blurred}
        >
          <option disabled hidden>
            {props.elementConfig.defaultSelect}
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

  return (
    <div>
      <p> {props.elementConfig.label} </p>
      <p className="error">{validationError}</p>
      {inputElement}
    </div>
  );
};

export default input;
