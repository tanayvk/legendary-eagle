const firebase = require("firebase-admin");
const CryptoJS = require("crypto-js");
const Base64 = require("crypto-js/enc-base64");
const querystring = require("querystring");

var serviceAccount = JSON.parse( process.env.FIREBASE_KEY );
if ( firebase.apps.length == 0 )
{
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: "https://legendary-eagle-default-rtdb.firebaseio.com",
    });
}
else
    firebase.app();
var database = firebase.database();

exports.handler = async function(event, context) {
    var body = {};
    if ( event.body )
    {
        try {
            body = JSON.parse(event.body);
        } catch (e) {
            body = querystring.parse(event.body);
        }
    }
    
    if (! (body.workspaceName && body.passwordHash ) )
        return { statusCode: 400 };

    const { workspaceName, passwordHash } = body;
    const workspaceRef = database.ref('workspaces/' + workspaceName);
    const workspaceVal = await workspaceRef.once('value');
    if (workspaceVal.val() == undefined)
        return { statusCode: 400 };
    // Workspace exists
    const workspaceObject = workspaceVal.val();
    let passwordHashHash = Base64.stringify(CryptoJS.SHA256(passwordHash));
    if (passwordHashHash != workspaceObject.password)
        return { statusCode: 401 };
    // Authorized to get workspace
    content = workspaceObject.content;
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content,
        })
    };
}
