import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import Message from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";
import messages from "./messages.json";

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
      messages,
      currentUser: ""
    };
    // this.addNewMessage = this.addNewMessage.bind(this);
  }

  addNewMessage = content => {
    const oldMssage = this.state.messages;
    const newMessage = {
      username: this.state.currentUser,
      content,
      id: 1567890
    };
    const newMessages = [...oldMssage, newMessage];
    this.setState({
      messages: newMessages,
      currentUser: this.state.currentUser
    });
  };

  changeUsername = evt => this.setState({ currentUser: evt.target.value });

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = () => {
      this.socket.send(
        "Here's some text that the server is urgently awaiting!"
      );
      console.log("Connected to server. We got dis!");
    };

    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({
        messages
      });
    }, 3000);
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1500);
  }

  render() {
    const allMessages = this.state.messages.map(message => (
      <Message key={message.id} message={message} />
    ));

    const asyncSection = this.state.loading ? (
      <Loading />
    ) : (
      <div>
        <NavBar />
        {allMessages}
        <ChatBar
          currentUser={this.state.currentUser}
          addNewMessage={this.addNewMessage}
          handleChangeUsername={this.changeUsername}
        />
      </div>
    );
    return <div>{asyncSection}</div>;
  }
}
