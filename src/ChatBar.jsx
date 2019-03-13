import React from "react";

const handleSubmitCreator = callback => event => {
  if (event.key == "Enter") {
    event.preventDefault();
    const newMessageInput = event.target;
    callback(newMessageInput.value);
    newMessageInput.value = "";
  }
};

function ChatBar({ addNewMessage, currentUser, handleChangeUsername }) {
  const newMessageForm = handleSubmitCreator(addNewMessage);
  return (
    <footer className="chatbar">
      <input
        className="chatbar-username"
        placeholder="Type name here"
        onChange={handleChangeUsername}
        value={currentUser}
      />
      <input
        onKeyPress={newMessageForm}
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
      />
    </footer>
  );
}

export default ChatBar;
