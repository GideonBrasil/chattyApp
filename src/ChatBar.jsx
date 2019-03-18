import React from "react";
import PropTypes from "prop-types";

function ChatBar({ currentUser, handleSubmitCreator, handleChangeUsername }) {
  return (
    <footer className="chatbar">
      <input
        className="chatbar-username"
        placeholder="Type your name here"
        defaultValue={currentUser}
        onKeyUp={handleChangeUsername}
      />
      <input
        onKeyPress={handleSubmitCreator}
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
      />
    </footer>
  );
}

ChatBar.propTypes = {
  currentUser: PropTypes.string,
  handleSubmitCreator: PropTypes.func,
  handleChangeUsername: PropTypes.func
};

export default ChatBar;
