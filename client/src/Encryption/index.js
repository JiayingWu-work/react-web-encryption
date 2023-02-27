

export const encryptMessage = async (message, stringKey) => {

  let iv = window.crypto.getRandomValues(new Uint8Array(12));
  console.log("iv in encryption:"+ iv);

  //message needs to be converted into arrayBuffer so aes-gcm can take it as a parameter
  var unit8ArrayrMessage = new TextEncoder().encode(message)
  console.log("unit8Array message in encryption method:" + unit8ArrayrMessage);

  const cryptoKey = await getCryptoKey(stringKey, "encrypt");

  const encryptedArrayBuffer = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    cryptoKey,
    unit8ArrayrMessage
  );
  console.log("encrypted array buffer message in encryption method:" + encryptedArrayBuffer);
  
  return  [ encryptedArrayBuffer, iv ];
};

// convert the string key from the url back to cryptokey for
// the decryption method
export const getCryptoKey = (key, usage) => {
  return window.crypto.subtle.importKey(
    "jwk",
    {
      alg: "A256GCM",
      ext: true,
      k: key,
      key_ops: ["encrypt", "decrypt"],
      kty: "oct",
    },
    {
      name: "AES-GCM",
      length: 256,
    },
    false, // extractable
    [usage]
  );
};

export const arraybufferToString = (arrayBuffer) => {
  return new TextDecoder("utf-8").decode(new Uint8Array(arrayBuffer));
}

//abMessage --> array buffer message
export const decryptMessage = async (abMessage, stringKey, iv) => {
  console.log("array buffer message passed to decryption method:" + new Uint8Array(abMessage));

  let cryptoKey = await getCryptoKey(stringKey, "decrypt");
  console.log("crypto key converted in decryption method:" + cryptoKey);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv, //The initialization vector you used to encrypt
    },
    cryptoKey, //from generateKey or importKey above
    abMessage //ArrayBuffer of the data
  );
  console.log("decrypted array buffer:" + decryptedBuffer);

  console.log("decrypted unit8Array:" + new Uint8Array(decryptedBuffer));

  return decryptedBuffer;
};
