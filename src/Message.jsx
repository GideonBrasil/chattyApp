import React from "react";

export function Message({ message: { content, username, color } }) {
  return (
    <main className="messages">
      <div className="message">
        <span className="message-username" style={{ color }}>
          {username}
        </span>
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
