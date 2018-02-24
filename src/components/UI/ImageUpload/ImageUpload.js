import React from 'react';
import './styles.css';

const ImageUpload = props => {
  console.log(props);
  return (
    <div className="imageUpload">
      <img className="image" src={props.imgURL} />
      <input type="file" onChange={props.changed} />
    </div>
  );
};

export default ImageUpload;
