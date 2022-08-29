import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", function () {
      if (window.innerWidth < 769) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    });

    // console.log(window.innerWidth);
  }, [showMenu]);

  return (
    <>
      {/* <div className="main_menu">
        <div className="menu_icon">
          <span></span>
        </div>
        <a
          className="btn btn-primary"
          data-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <FontAwesomeIcon icon={faPlus} />
        </a>
      </div> */}

      <div className="sidebar_brand d-flex justify-content-between align-items-center">
        <Link to="/dashboard">
          <img src={window.location.origin + "/logo-02.svg"} alt="onnow logo" />
          {/* <img src="logo-light.png" alt="onnow logo" /> */}
        </Link>

        <button
          className="btn text-white"
          onClick={(e) => setShowMenu(!showMenu)}
        >
          {/* <FontAwesomeIcon icon={faBars} size="lg" /> */}
          <FontAwesomeIcon
            icon={showMenu ? faTimes : faBars}
            size="lg"
            className="text-white"
          />
        </button>
      </div>

      <NavBar showMenu={showMenu} />
    </>
  );
};

export default Sidebar;
