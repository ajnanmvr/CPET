import React from "react";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4">
      <div className="logo">
        <img
          src="https://ld-wp73.template-help.com/wordpress/prod_29735/v1/wp-content/uploads/2020/09/logo.png"
          alt="Mahdiyya Logo"
        />
      </div>
      <div className="text-base font-normal px-10">
        <ul className="flex space-x-4 font-bold text-gray-800">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Project</li>
          <li>Mahdiyya</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
