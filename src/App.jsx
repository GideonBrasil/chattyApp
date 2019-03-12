import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import Message from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  render() {
    return <NavBar />, <Message />, <ChatBar />;
  }
}
export default App;
