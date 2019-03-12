import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import Message from "./Message.jsx";
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
      messages: String,
      currentUser: String
    };
    // this.addCurrentUser = this.addCurrentUser.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }
  render() {
    const asyncSection = this.state.loading ? (
      <Loading />
    ) : (
      <div>
        <NavBar />
        <Message />
        <ChatBar addCurrentUser={this.currentUser} />
      </div>
    );
    return <div>{asyncSection}</div>;
  }
}
