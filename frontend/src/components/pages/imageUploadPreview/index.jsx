import React from "react";
import ImageUpload from "./ImageUpload";

function FileUpload() {
  return (
    <div className="p-5">
      <ImageUpload getImage="" isSmall={false} />
      <small className="text-muted d-block mt-2">
        Max of 5MB, at least 854x400 pizels and only JPEG and PNG are allowed.
      </small>
    </div>
  );
}

export default FileUpload;
