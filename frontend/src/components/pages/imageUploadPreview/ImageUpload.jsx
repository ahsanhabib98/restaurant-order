import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";

const ImageUpload = ({
  defaultPreviewImage,
  setImage,
  maxFileSize,
  imgSize,
  isSmall,
  editable = true,
}) => {
  const [previewImage, setPreviewImage] = useState(
    defaultPreviewImage ? defaultPreviewImage : ""
  );

  const setParentImage = (image) => {
    if (setImage) setImage(image);
  };

  const handleImageChange = (e) => {
    if(!editable)return;
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setParentImage(file);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = (e) => {
    e.preventDefault();
    if(!editable)return;

    setPreviewImage("");
    setParentImage("");
  };
  return (
    <>
      <div className={`image-upload-wrap ${isSmall && "img-sm"}`}>
        <input
          type="file"
          className="form-control file-upload-input"
          onChange={handleImageChange}
          disabled={!editable}
        />

        <div className="img-icon">
          <span>
            <FontAwesomeIcon icon={faFileImage} />
          </span>
        </div>

        {previewImage && (
          <>
            <div className="img-container">
              <img src={previewImage} alt="" />
            </div>

            <button className="btn-link removeImage" onClick={removeImage}>
              Remove
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ImageUpload;
