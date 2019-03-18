import React from "react";
import PropTypes from "prop-types";

function NavBar({ clientCount }) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">
        Chatty <i className="fab fa-rocketchat" />
      </a>
      <p className="clientCounter">
        {clientCount} user{clientCount > 1 ? "s" : ""} online
      </p>
    </nav>
  );
}

NavBar.propTypes = {
  clientCount: PropTypes.number
};

export default NavBar;
