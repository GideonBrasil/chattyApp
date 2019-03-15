import React from "react";

export function Message({ message: { content, username, color, id } }) {
  let imageArray = content.match(/(https?:\/\/.*\.(?:png|jpg|gif))/gi) || [];

  return (
    <main className="messages">
      <div className="message">
        <span className="message-username" style={{ color }}>
          {username}
        </span>
        <span className="message-content">
          {content.replace(/(https?:\/\/.*\.(?:png|jpg|gif))/gi, "")}
          {imageArray.map(image => (
            <img src={image} key={id} />
          ))}
        </span>
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
