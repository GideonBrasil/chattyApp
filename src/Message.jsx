import React from "react";

function Message({ message: { content, username } }) {
  return (
    <main className="messages">
      <div className="message">
        <span className="message-username">{username}</span>
        <span className="message-content">{content}</span>
      </div>
      <div className="message system">
        {/* (Notifications) Anonymous1 changed their name to nomnom. */}
      </div>
    </main>
  );
}

export default Message;
