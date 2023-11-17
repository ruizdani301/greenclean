import React from "react";
import "../styles/Header.css";
import logo from "../img/clean.png";

/**
 * Renders the header component.
 *
 * @return {JSX.Element} The rendered header component.
 */
function Header() {
  return (
    <div className="container-header">
      <img src={logo} alt="Consultant Green Logo" />
    </div>
  );
}

export default Header;
