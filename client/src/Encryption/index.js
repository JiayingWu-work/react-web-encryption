import React from "react";
import ReactDOM from "react-dom";

export const encryptMessage = (message) => {
  console.log("message:" + message);
  var encryptedMessage;
  let enc = new TextEncoder();
  //message needs to be converted into arrayBuffer so aes-gcm can take it as a parameter
  var arrayBufferMessage = enc.encode(message);
  console.log("message:" + arrayBufferMessage);

  //get the key first
  window.crypto.subtle
    .generateKey({ name: "AES-GCM", length: 256 }, false, [
      "encrypt",
      "decrypt",
    ])
    .then(function(key) {
      console.log("key:" + key);
      const keyData = key.decrypt(key);
      console.log("key type:" + keyData);
      //iv is something can make encryption more secure
      var iv = window.crypto.getRandomValues(new Uint8Array(12));
      console.log("iv:" + iv);
      //encrypt the array buffer message
      window.crypto.subtle
        .encrypt({ name: "AES-GCM", iv: iv }, key, arrayBufferMessage)
        .then(function(encrypted) {
          console.log("encrypted!!!");
          // encryptedMessage = `${buffer}...[${ciphertext.byteLength} bytes total]`;
          encryptedMessage = new Uint8Array(encrypted, 0, 5);
          console.log("encrypted message:" + encryptedMessage);
        })
        .catch(function(err) {
          console.error(err);
        });
    })
    .catch(function(err) {
      console.error(err);
    });

  //probably we can fetch data directly but this works for now
  if (encryptedMessage != "") {
    return encryptedMessage + " " + "actually encrypted";
  }
};

//waiting to be implemented
//abMessage --> array buffer message
export const decryptMessage = (abMessage, key) => {
  window.crypto.subtle
    .decrypt(
      {
        name: "AES-GCM",
        iv: ArrayBuffer(12), //The initialization vector you used to encrypt
      },
      key, //from generateKey or importKey above
      abMessage //ArrayBuffer of the data
    )
    .then(function(decrypted) {
      //returns an ArrayBuffer containing the decrypted data
      console.log(new Uint8Array(decrypted));
      // console.log(key);
    })
    .catch(function(err) {
      console.error(err);
    });
};
