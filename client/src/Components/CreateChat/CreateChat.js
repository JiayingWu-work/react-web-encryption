import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./CreateChat.css";

export default function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    window.crypto.subtle
      .generateKey({ name: "AES-GCM", length: 256 }, true, [
        "encrypt",
        "decrypt",
      ])
      .then(function(key) {
        console.log("cryptokey generated initially" + key);
        window.crypto.subtle
          .exportKey(
            "jwk", //can be "jwk" or "raw"
            key //extractable must be true
          )
          .then(function(jsonWebKey) {
            console.log("string key generated initially:" + jsonWebKey.k);
            setKey(jsonWebKey.k);
            setRoom(jsonWebKey.k);
          })
          .catch(function(err) {
            console.error(err);
          });
      });
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
          to={`/chat?name=${name}&room=${room}&key=${key}`}
        >
          <button className={"button mt-20"} type="submit">
            start chatting!
          </button>
        </Link>
      </div>
    </div>
  );
}
