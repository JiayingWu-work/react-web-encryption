import React from "react";

import Chat from "../src/Components/Chat/Chat";
import JoinChat from "./Components/JoinChat/JoinChat";
import CreateChat from "../src/Components/CreateChat/CreateChat";

import { BrowserRouter as Router, Route } from "react-router-dom";
import QR from "./Components/QRCode/QR";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={CreateChat} />
      <Route path="/join" exact component={JoinChat} />
      <Route path="/chat" exact component={Chat} />
    </Router>
  );
};

export default App;
