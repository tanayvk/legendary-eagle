const CryptoJS = require("crypto-js");
const Base64 = require("crypto-js/enc-base64");

function computeHash(data) {
  return Base64.stringify(CryptoJS.SHA256(data));
}

function encrypt(data, key) {
  var encrypted = CryptoJS.AES.encrypt(data, key);
  console.log(encrypted.toString());
  return encrypted.toString();
}

function decrypt(data, key) {
  var decrypted = CryptoJS.AES.decrypt(data, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  computeHash,
  encrypt,
  decrypt,
};
