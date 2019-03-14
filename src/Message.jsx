import React from "react";

export function Message({ message: { content, username } }) {
  return (
    <main className="messages">
      <div className="message">
        <span className="message-username">{username}</span>
        <span className="message-content">{content}</span>
      </div>
    </main>
  );
}

export function Notification({ message: { username, oldUser } }) {
  return (
    <div className="message system">
      {oldUser + " changed their name to " + username}
    </div>
  );
}
