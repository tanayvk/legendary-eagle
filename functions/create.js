const firebase = require("firebase-admin");
const CryptoJS = require("crypto-js");
const Base64 = require("crypto-js/enc-base64");

var serviceAccount = JSON.parse( process.env.FIREBASE_KEY );
if ( !firebase.apps.length )
{
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: "https://legendary-eagle-default-rtdb.firebaseio.com",
    });
}
else
    firebase.app();
var database = firebase.database();

function generateRandomLetter()
{
    let letterIndex = Math.floor(Math.random() * 26);
    return String.fromCharCode("a".charCodeAt(0) + letterIndex);
}

function generateWorkspaceName()
{
    let letters = [];
    for (var i = 0; i < 10; i++)
    {
        letters.push(generateRandomLetter());
    }
    return letters.join("");
}

exports.handler = async function(event, context) {
    let workspaceName = generateWorkspaceName();
    let password = generateWorkspaceName();

    // compute the double hash to store in the database
    // Note: password is hashed once on the frontend and once on the backend
    let hash = Base64.stringify(CryptoJS.SHA256(password));
    hash = Base64.stringify(CryptoJS.SHA256(hash));
    console.log(workspaceName, password, hash);

    var workspaceRef = database.ref('workspaces/' + workspaceName);

    await workspaceRef.set({
        'name': workspaceName,
        'password': hash,
    }).then(() => console.log("done"))
      .catch(err => console.log(err));

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'name': workspaceName,
            'password': password,
        })
    };
}

