import React, { Component } from "react";
import { Link } from "react-router-dom";

const LoginIntro = ({ pathname }) => {
  return (
    <>
      <Link to="/">
        <img src="logo.png" alt="onnow logo" />
      </Link>
      {/* <h3 className="pt-4">Welcome to onnow</h3> */}

      {pathname && pathname == "superuser" ? (
        <>
          <h3 className="mt-4">Welcome to Onnow Admin Panel</h3>
        </>
      ) : (
        <>
          <h3 className="mt-4">Welcome Back</h3>
          <p className="mb-0">
            Please login to your account to access your dashboard
          </p>
        </>
      )}

      {/* <p>
          It's good to see you again! <br />
          Type your login information and we will take you to your dashboard
          right away.
        </p> */}
    </>
  );
};

export default LoginIntro;
