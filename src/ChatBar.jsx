import React from "react";

const handleSubmitCreator = callback => event => {
  if (event.key == "Enter") {
    event.preventDefault();
    const newMessageInput = event.target;
    callback(newMessageInput.value);
    newMessageInput.value = "";
  }
};

function ChatBar({ currentUser, addNewMessage, handleChangeUsername }) {
  const newMessageForm = handleSubmitCreator(addNewMessage);
  // const newNotificationForm = handleSubmitCreatorUserName(addNewNotification);
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
        onKeyPress={newMessageForm}
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
      />
    </footer>
  );
}

export default ChatBar;
