const firebase = require("firebase-admin");
const CryptoJS = require("crypto-js");
const Base64 = require("crypto-js/enc-base64");
const querystring = require("querystring");

var serviceAccount = JSON.parse(process.env.FIREBASE_KEY);
if (firebase.apps.length == 0) {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://legendary-eagle-default-rtdb.firebaseio.com",
  });
} else firebase.app();
var database = firebase.database();

exports.handler = async function (event, context) {
  var body = {};
  if (event.body) {
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      body = querystring.parse(event.body);
    }
  }

  if (
    !(
      body.workspaceName != undefined &&
      body.passwordHash != undefined &&
      body.workspaceContent != undefined
    )
  ) {
    console.log(body);
    return { statusCode: 400 };
  }

  const { workspaceName, passwordHash, workspaceContent } = body;
  const workspaceRef = database.ref("workspaces/" + workspaceName);
  const workspaceVal = await workspaceRef.once("value");
  if (workspaceVal.val() == undefined) return { statusCode: 400 };
  // Workspace exists
  const workspaceObject = workspaceVal.val();
  let passwordHashHash = Base64.stringify(CryptoJS.SHA256(passwordHash));
  if (passwordHashHash != workspaceObject.password) return { statusCode: 401 };
  // Authorized to save to workspace
  try {
    await workspaceRef.child("content").set(workspaceContent);
    if (body.newPasswordHash) {
      const newPasswordHashHash = Base64.stringify(
        CryptoJS.SHA256(body.newPasswordHash)
      );
      await workspaceRef.child("password").set(newPasswordHashHash);
    }
  } catch (err) {
    console.log(err);
    return { statusCode: 500 };
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://workspaces.tanay.xyz",
    },
    body: JSON.stringify({
      request: body,
    }),
  };
};
