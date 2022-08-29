import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const company = useSelector((state) => state.company.company);

  // console.log("Hello: ", company);

  return (
    <>
      <div className="header-menu">
        {/* <div className="dropdown mr-5"> */}
        {/* <Link to="/dashboard" className="text-dark font-weight-bol"> */}
        <h6 className="mb-0">{company && company.name}</h6>
        {/* </Link> */}
        {/* <a
            href="0"
            className="restaurant-name"
            id="dropdownMenuButton"
            data-toggle="dropdown"
          >
            {name}
            <FeatherIcon icon="chevron-down" size="15" className="ml-2" />
          </a> */}
        {/* <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            Tihami's Kitchen
          </div> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default Header;
