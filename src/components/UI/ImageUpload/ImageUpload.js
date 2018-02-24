import React from 'react';
import './styles.css';

const ImageUpload = props => {
  return (
    <div className="imageUpload">
      <label> {props.label} </label>
      {props.error ? <p className="error">{props.error}</p> : null}
      <img className="image" src={props.imgURL} />
      <input
        type="file"
        onChange={props.changed}
        hidden
        ref={input => (this.myinput = input)}
      />
      <button onClick={() => this.myinput.click()}> Upload Image </button>
    </div>
  );
};

export default ImageUpload;
