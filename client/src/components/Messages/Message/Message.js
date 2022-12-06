import React, { useState } from "react";
import "./Message.css";
import ReactEmoji from "react-emoji";
import encryptMessage from "../../../Encryption/index.js";

const Message = ({ message: { text, user }, name }) => {
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
        {isHovering ? (
          <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
        ) : (
          <p className="messageText colorWhite">
            Your Message is encrypted. Hover me to reveal!
          </p>
        )}
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
          <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
        ) : (
          <p className="messageText colorDark">
            Your Message is encrypted. Hover me to reveal!
          </p>
        )}
        {/* <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p> */}
      </div>
      <p className="sentText pl-10 ">{user}</p>
    </div>
  );
};

export default Message;
