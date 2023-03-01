import React, { useState, useEffect } from "react";
import "./Message.css";
import queryString from "query-string";
import ReactEmoji from "react-emoji";
import { decryptMessage } from "../../../Encryption/index.js";

const Message = ({ message: { text, user }, name }) => {
  let indexofV = text.indexOf("iv:");
  if (indexofV == -1) indexofV = 100000;

  // const originalDecrption = text.substr(0, indexofV);
  let partCipher = text.substr(0, 40);
  let originalDecrption = null;
  if (indexofV == 100000) {
    originalDecrption = text.substr(0, indexofV);
  } else {
    originalDecrption = `${partCipher}...[${indexofV} bytes total]`;
  }

  console.log("orginalDecryption:" + originalDecrption);
  const [decrypt, setDecrypt] = useState("");
  const { key } = queryString.parse(window.location.search);

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

  let isSentByAdmin = false;
  if (indexofV == 100000) {
    isSentByAdmin = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
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
      <div
        className="messageBox backgroundLight"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {isSentByAdmin ? (
          <p className="messageText colorDark">
            {ReactEmoji.emojify(originalDecrption)}
          </p>
        ) : isHovering ? (
          <p className="messageText colorDark">{ReactEmoji.emojify(decrypt)}</p>
        ) : (
          <p className="messageText colorDark">
            {ReactEmoji.emojify(originalDecrption)}
          </p>
        )}
        {/* {isHovering ? (
          <p className="messageText colorDark">{ReactEmoji.emojify(decrypt)}</p>
        ) : (
          <p className="messageText colorDark">
            {ReactEmoji.emojify(originalDecrption)}
          </p>
        )} */}
      </div>
      <p className="sentText pl-10 ">{user}</p>
    </div>
  );
};

export default Message;
