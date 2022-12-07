import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import {
  encryptMessage,
  decryptMessage,
  arraybufferToString,
} from "../../Encryption/index.js";

import "./chat.css";

const ENDPOINT = "http://localhost:3001";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [key, setKey] = useState("");

  useEffect(() => {
    const { name, room, key } = queryString.parse(window.location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);
    setKey(key);

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

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message) {
      console.log("test the message in send message" + message);
      //encrypting messages with encryptMessage() before sending them to the server
      const encryptionPackage = await encryptMessage(message, key);
      const encryptedArrayBuffer = encryptionPackage[0];
      // console.log("test before sending to server:" + new Uint8Array(encryptionPackage[0]));
      // const decryptedBuffer = await decryptMessage(encryptionPackage[0], key, encryptionPackage[1]);
      // const decryptedM = arraybufferToString(decryptedBuffer);
      // console.log("decrypte message before sending:" + decryptedM);
      socket.emit(
        "sendMessage",
        "this is the array buffer " + encryptionPackage[0],
        () => setMessage("")
      );
      console.log("sent");
    }
  };

  return (
    <>
      <div className="everythingContainer">
        <div className="headingContainer">
          <div className="chat-heading">
            Y O U R _ S E C U R E _ M E S S A G E
          </div>
          <div className="subheading">YOU GOT A SECURE MESSAGE</div>
          {/* <div className="box"></div> */}
        </div>
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
        {/* <div className="vertical">ENCRYPTED ENCRYPTED ENCRYPTED ENCRYPTED</div> */}
      </div>
    </>
  );
};

export default Chat;
