import React from "react";

function ChatBar({ currentUser, handleSubmitCreator, handleChangeUsername }) {
  return (
    <footer className="chatbar">
      <input
        className="chatbar-username"
        // onKeyPress={newNotificationForm}
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

export default ChatBar;
