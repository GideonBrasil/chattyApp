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
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
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
        loading: false,
        messages
      });
    }, 2500);
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
        <ChatBar currentUser={this.state.currentUser} />
      </div>
    );
    return <div>{asyncSection}</div>;
  }
}
