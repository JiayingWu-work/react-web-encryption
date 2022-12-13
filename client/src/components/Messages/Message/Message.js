import React, { useState, useEffect } from "react";
import "./Message.css";
import queryString from "query-string";
import ReactEmoji from "react-emoji";
import { decryptMessage } from "../../../Encryption/index.js";

const Message = ({ message: { text, user }, name }) => {
  const [decrypt, setDecrypt] = useState("");
  const { key } = queryString.parse(window.location.search);

  //////////////////////this chuck is for testing
  console.log("type of text:" + typeof text);

  console.log("text content:" + text);
  ///////////////////////////////////////////////

  let indexofV = text.indexOf("iv:");
  console.log(indexofV);

  // if index == -1 then the message is from the server
  if (indexofV !== -1) {
    const u8aEncrypted = text.substr(0, indexofV);
    const array_u8aEncrypted = Uint8Array.from(u8aEncrypted.split(","));
    console.log("unit8ArrayEncryption in message:" + text.substr(0, indexofV));
    console.log(array_u8aEncrypted + "I'm type of" + typeof array_u8aEncrypted);
    console.log(
      "type of text[0]:" +
        typeof array_u8aEncrypted +
        "content:" +
        array_u8aEncrypted
    );

    const u8aIv = text.substr(indexofV + 3);
    const array_u8aIv = Uint8Array.from(u8aIv.split(","));
    console.log("unit8ArrayIv in message:" + text.substr(indexofV + 3));
    console.log(
      "type of text[1]" + typeof array_u8aIv + "content:" + array_u8aIv
    );
    console.log("array buffer encryption:" + array_u8aEncrypted.buffer);

    // use useEffect to avoid effor: Too many re-renders.
    // React limits the number of renders to prevent an infinite loop
    useEffect(() => {
      const decrypteText = async () => {
        console.log("key in message:" + key);
        if (array_u8aEncrypted !== null) {
          const arrayBufferDecrypt = await decryptMessage(
            array_u8aEncrypted.buffer,
            key, //pass string key here bc we convert it to cryptoKey in decryption in index.js
            array_u8aIv
          );
          let decryptedMessage = new TextDecoder().decode(arrayBufferDecrypt);
          console.log("print decryptedMessage:" + decryptedMessage);
          setDecrypt(decryptedMessage);
          console.log("print decrypt:" + decrypt);
        }
      };
      decrypteText();
    });
    console.log("print decrypt:" + decrypt);
  } else {
    // case when message is from the server directly
    useEffect(() => {
      setDecrypt(text);
    }, []);
    console.log("print welcome:" + text);
  }

  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      {/* <div className="messageBox backgroundYellow">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div> */}
      <div
        className="messageBox backgroundYellow"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <p className="messageText colorWhite">{ReactEmoji.emojify(decrypt)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      {/* <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div> */}
      <div
        className="messageBox backgroundLight"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {isHovering ? (
          <p className="messageText colorDark">{ReactEmoji.emojify(decrypt)}</p>
        ) : (
          <p className="messageText colorDark">
            Hover to reveal the encrypted message
          </p>
        )}
        {/* <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p> */}
      </div>
      <p className="sentText pl-10 ">{user}</p>
    </div>
  );
};

export default Message;
