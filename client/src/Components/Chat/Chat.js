import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import { encryptMessage } from "../../Encryption/index.js";
import "./chat.css";

const ENDPOINT = "https://nameless-gorge-00432.herokuapp.com/";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [key, setKey] = useState("");

  const urlToClipboard = () => {
    const joinURL = "http://localhost:3000" + "/join?room=" + key;
    navigator.clipboard.writeText(joinURL);
  };

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

    setInterval(() => {
      window.location.href = "/";
    }, 240000);
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message) {
      // console.log("test the message in send message" + message);
      //encrypting messages with encryptMessage() before sending them to the server
      // encryptionPackage = [array buffer from encryption, iv in uint8array]
      const encryptionPackage = await encryptMessage(message, key);

      // here is to test if the decryption works without passing the parameters between files
      // const decryptedBuffer = await decryptMessage(
      //   encryptionPackage[0],
      //   key,
      //   encryptionPackage[1]
      // );
      // const decryptedM = arraybufferToString(decryptedBuffer);
      // console.log("decrypte message before sending:" + decryptedM);
      ///////////////////////////////////////////////////////////////////////////////////////

      // convert them into string
      const encryptionUnit8ArrayInString = `${new Uint8Array(
        encryptionPackage[0]
      )}`;
      const ivInString = `${encryptionPackage[1]}`;
      const StringToSend = encryptionUnit8ArrayInString + "iv:" + ivInString;
      // console.log(
      //   "test encryption array buffer and iv in string:" + StringToSend
      // );
      socket.emit("sendMessage", StringToSend, () => setMessage(""));
    }
  };

  return (
    <>
      <div className="everythingContainer">
        <div className="headingContainer">
          <div className="chat-heading">Y O U R _ S E C U R E _ C H A T</div>
          <div className="subheading">
            <button className="subButton" onClick={urlToClipboard}>
              CLICK TO COPY CHAT URL
            </button>
          </div>
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
