import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

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
      .then(function (key) {
        console.log("cryptokey generated initially" + key);
        window.crypto.subtle
          .exportKey(
            "jwk", //can be "jwk" or "raw"
            key //extractable must be true
          )
          .then(function (jsonWebKey) {
            console.log("string key generated initially:" + jsonWebKey.k);
            setKey(jsonWebKey.k);
          })
          .catch(function (err) {
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
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}&key=${key}`}
        >
          <button className={"button mt-20"} type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}