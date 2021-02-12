const CryptoJS = require("crypto-js");
const Base64 = require("crypto-js/enc-base64");

function computeHash(data) {
  return Base64.stringify(CryptoJS.SHA256(data));
}

module.exports = {
  computeHash,
};
