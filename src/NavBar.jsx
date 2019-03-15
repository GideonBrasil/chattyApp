import React from "react";

function NavBar({ clientCount }) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">
        Chatty
      </a>
      <p className="clientCounter">
        {clientCount} user{clientCount > 1 ? "s" : ""} online
      </p>
    </nav>
  );
}

export default NavBar;
