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
      {/* <form onSubmit={newMessageForm} style={{ flex: 8 }}> */}
      <input
        onKeyPress={newMessageForm}
        className="chatbar-message"
        style={{ width: "97%" }}
        name="chatBarUsername"
        placeholder="Type a message and hit ENTER"
      />
      {/* </form> */}
    </footer>
  );
}

export default ChatBar;
