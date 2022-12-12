import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

import "./JoinChat.css";

export default function SignIn() {
  const [name, setName] = useState("");
  const [chatRoom, setchatRoom] = useState("");
  const [key, setKey] = useState("");
  const { room } = queryString.parse(window.location.search);
  console.log("print chat room" + room);

  useEffect(() => {
    setchatRoom(room);
    console.log("print room" + chatRoom);
    setKey(chatRoom);
    console.log("print key" + key);
  }, []);

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Encrypted Messaging</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${chatRoom}&key=${key}`}
        >
          <button className={"button mt-20"} type="submit">
            join chat!
          </button>
        </Link>
      </div>
    </div>
  );
}
