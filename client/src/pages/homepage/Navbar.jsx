import React from "react";

function Navbar({ navOpened, setNavOpened }) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/logo.png" alt />
          </a>
          <a
            href="#"
            onClick={() => setNavOpened(!navOpened)}
            className={`mobile-nav-toggle ${navOpened && " opened"}`}
          >
            <span />
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="uppercase">
                <a href="#home">home</a>
              </li>
              <li className="uppercase">
                <a href="#courses">courses</a>
              </li>
              <li className="uppercase">
                <a href="#about">about</a>
              </li>
              <li className="uppercase">
                <a href="#gallery">gallery</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu ${navOpened && " open"}`}>
        <nav className="mobile-nav">
          <img src="/logo-light.png" className="h-12 mb-4" alt="" />
          <ul className="mobile-menu-list">
            <li className="uppercase">
              <a href="#home">home</a>
            </li>
            <li className="uppercase">
              <a href="#courses">courses</a>
            </li>
            <li className="uppercase">
              <a href="#about">about</a>
            </li>
            <li className="uppercase">
              <a href="#gallery">gallery</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
