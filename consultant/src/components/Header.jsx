import React from "react";
import "../styles/Header.css";
import logo from "../img/logo.png"; // Asegúrate de ajustar la ruta a tu imagen
function Header() {
  return (
    <div className="container-header">
      <img src={logo} alt="Consultant Green Logo" />
    </div>
  );
}

export default Header;
