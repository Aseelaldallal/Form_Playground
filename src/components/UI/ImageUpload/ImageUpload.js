const ImageUpload = props => {
  return (
    <div>
      <img className="image" src={props.imgURL} />
      <input type="file" onChange={props.changed} />
    </div>
  );
};

export default ImageUpload;
