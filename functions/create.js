const firebase = require("firebase-admin");

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
    message = "success";

    data = [];
    await database.ref('hello').get().then(x => { console.log(x.val()) });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: message, data: data })
    };
}

