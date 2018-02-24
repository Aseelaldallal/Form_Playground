import React from 'react';
import './styles.css';

const ImageUpload = props => {
  return (
    <div className="imageUpload">
      <label> {props.label} </label>
      {props.error ? <p className="error">{props.error}</p> : null}
      <img className="image" src={props.imgURL} />
      <input type="file" onChange={props.changed} />
    </div>
  );
};

export default ImageUpload;
