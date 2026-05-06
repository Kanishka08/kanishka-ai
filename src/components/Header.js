import React, { useState } from "react";
import TypedText from "./TypedText";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const openmenu = () => setMenuOpen(true);
  const closemenu = () => setMenuOpen(false);

  return (
    <div id="header">
      <div className="container">
        <nav>
          <div className="logo">Portfolio</div>
          <ul id="sidemenu" style={{ right: menuOpen ? "0" : "-200px" }}>
            <li><a href="#header" onClick={closemenu}>Home</a></li>
            <li><a href="#about" onClick={closemenu}>About</a></li>
            <li><a href="#portfolio" onClick={closemenu}>Portfolio</a></li>
            <li><a href="#contact" onClick={closemenu}>Contact</a></li>
            <i className="fas fa-times" onClick={closemenu}></i>
          </ul>
          <i className="fas fa-bars" onClick={openmenu}></i>
        </nav>
        <div className="header-text">
          <h1>
            Hi I am <span>Kanishka</span>
          </h1>
          <p>
            I am a <span className="auto-type"><TypedText /></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
