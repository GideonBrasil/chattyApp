import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { Message, Notification } from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";

//loading function for the initial loading of the app
function Loading() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">
        Chatty is Loading...
      </a>
    </nav>
  );
}

// main parent class that renders all components
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      messages: [],
      clients: 0,
      color: "",
      currentUser: "Anonymous"
    };
    this.handleSubmitCreator = this.handleSubmitCreator.bind(this);
    this.addNewNotification = this.addNewNotification.bind(this);
  }

  //handles events for message input
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

  //handles events and change username from the username input
  changeUsername = evt => {
    if (evt.keyCode === 13) {
      const oldUser = this.state.currentUser;
      this.setState({ currentUser: evt.target.value }, () => {
        this.addNewNotification(oldUser);
      });
    }
  };

  //waits for the DOM to load before loading virtual DOM
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onmessage = event => {
      let objectMessage = JSON.parse(event.data);
      console.log("objectMessage:", objectMessage);

      if (objectMessage.type) {
        const newMessages = this.state.messages.concat(objectMessage);
        this.setState({
          messages: newMessages,
          color: objectMessage.color
        });
      } else {
        this.setState({
          clients: objectMessage
        });
      }
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1500);
  }

  //renders all the components onto the index.html skeleton page
  render() {
    const asyncSection = this.state.loading ? (
      <Loading />
    ) : (
      <div>
        <NavBar clientCount={this.state.clients} />
        {this.state.messages.map(message => {
          // deals with incoming messages and notifications
          switch (message.type) {
            case "incomingMessage":
              return (
                <Message
                  key={message.id}
                  message={message}
                  color={this.state.color}
                />
              );
              break;
            case "incomingNotification":
              return <Notification key={message.id} message={message} />;
              break;
            default:
              console.error("You shouldn't be sending messages here", message);
              break;
          }
        })}
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
