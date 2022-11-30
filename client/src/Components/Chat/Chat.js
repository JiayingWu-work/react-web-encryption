import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import encryptMessage from "../../Encryption/index.js";

import "./chat.css";

const ENDPOINT = "http://localhost:3001";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, window.location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <>
      <div className="everythingContainer">
        <div className="headingContainer">
          <div className="chat-heading">Y O U R _ S E C U R E _ M E S S A G E</div>
          <div className="subheading">YOU GOT A SECURE MESSAGE</div>
          <div class="box"></div>
        </div>

        <div className="outerContainer">
          <div className="container">
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
          <div className="vertical">
            ENCRYPTED ENCRYPTED ENCRYPTED ENCRYPTED ENCRYPTED
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
