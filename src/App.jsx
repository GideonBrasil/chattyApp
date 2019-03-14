import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { Message, Notification } from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";

function Loading() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">
        Chatty is Loading...
      </a>
    </nav>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      messages: [],
      currentUser: "Anonymous"
    };
    this.handleSubmitCreator = this.handleSubmitCreator.bind(this);
    this.addNewNotification = this.addNewNotification.bind(this);
  }

  handleSubmitCreator = event => {
    if (event.key == "Enter") {
      event.preventDefault();
      const newMessageInput = event.target;
      this.addNewMessage(newMessageInput.value);
      newMessageInput.value = "";
    }
  };

  addNewMessage(content) {
    const newMessage = {
      username: this.state.currentUser,
      content,
      type: "postMessage"
    };

    this.socket.send(JSON.stringify(newMessage));
  }

  addNewNotification(oldUser) {
    const newNotification = {
      username: this.state.currentUser,
      oldUser,
      type: "postNotification"
    };

    this.socket.send(JSON.stringify(newNotification));
  }

  changeUsername = evt => {
    if (evt.keyCode === 13) {
      const oldUser = this.state.currentUser;
      this.setState({ currentUser: evt.target.value }, () => {
        this.addNewNotification(oldUser);
      });
    }
  };

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onmessage = event => {
      let objectMessage = JSON.parse(event.data);

      const newMessages = this.state.messages.concat(objectMessage);
      this.setState({
        messages: newMessages
      });
      console.log("messages in array: ", newMessages);
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1500);
  }

  render() {
    const allMessages = this.state.messages.map(message => {
      switch (message.type) {
        case "incomingMessage":
          return <Message key={message.id} message={message} />;
          break;
        case "incomingNotification":
          return <Notification key={message.id} message={message} />;
          break;
        default:
          console.error("You shouldn't be sending messages here");
          break;
      }
    });

    const asyncSection = this.state.loading ? (
      <Loading />
    ) : (
      <div>
        <NavBar />
        {allMessages}
        <ChatBar
          currentUser={this.state.currentUser}
          handleSubmitCreator={this.handleSubmitCreator}
          handleChangeUsername={this.changeUsername}
        />
      </div>
    );
    return <div>{asyncSection}</div>;
  }
}
