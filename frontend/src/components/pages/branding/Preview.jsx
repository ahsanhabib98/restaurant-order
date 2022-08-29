import React from "react";
import PreviewWidget from "./PreviewWidget";
import { useSelector } from "react-redux";

function Preview({ imagePreviewUrl, bgColor, brandingStyleColor }) {
  const company = useSelector((state) => state.company.company);

  return (
    <>
      <div className="preview-box">
        <div className="card">
          <div className="card-img-top mt-0">
            {imagePreviewUrl?.length > 0 ? (
              <img src={imagePreviewUrl} />
            ) : (
              <p className="mb-0"> No Image </p>
            )}
          </div>

          <div className="card-body p-3">
            <div className="header-info">
              <h6 className="mb-3">
                Brand Name
                {/* {company ? company.name : "Brand Name"} */}
              </h6>
              <div className="demo-text">
                <div className="line line-sm "></div>
                <div className="line line-xs "></div>
              </div>
            </div>
            {/* ---------------------- */}
            <div className="deliver-content d-flex justify-content-between align-items-center my-3 border-bottom border-top py-2">
              <div className="demo-text ">
                {/* <div className="line line-md "></div> */}
                <div className="line line-sm "></div>
                <div className="line line-xs "></div>
              </div>
              <div
                className="btn-group rounded"
                style={{ border: `1px solid ${bgColor}` }}
              >
                {/* <button className="btn btn-sm bg-white">
                  <small>Delivery</small>
                </button> */}
                <button className="btn btn-sm" style={brandingStyleColor}>
                  <small>Delivery</small>
                </button>
              </div>
            </div>
            <div className="ctg-list">
              <small style={brandingStyleColor}>Category</small>
              <small>Category</small>
              <small>Category</small>
            </div>
            {/* .................. */}

            <div className="demo-container d-flex align-items-center">
              <div className="img"></div>
              <div className="demo-text ml-2">
                <div className="line line-lg "></div>
                <div className="line line-md "></div>
                <div className="line line-sm "></div>
                <div className="line line-xs "></div>
              </div>
            </div>
            <div className="demo-container d-flex align-items-center">
              <div className="img"></div>
              <div className="demo-text ml-2">
                <div className="line line-lg "></div>
                <div className="line line-md "></div>
                <div className="line line-sm "></div>
                <div className="line line-xs "></div>
              </div>
            </div>
            <div className="demo-container d-flex align-items-center">
              <div className="img"></div>
              <div className="demo-text ml-2">
                <div className="line line-lg "></div>
                <div className="line line-md "></div>
                <div className="line line-sm "></div>
                <div className="line line-xs "></div>
              </div>
            </div>
            <button
              className="btn mt-3 w-100 text-uppercase"
              style={brandingStyleColor}
            >
              <small>Add to cart</small>
            </button>
          </div>
        </div>

        {/* //////////////////// */}
      </div>
    </>
  );
}

export default Preview;
