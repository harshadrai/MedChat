const functions = require('firebase-functions');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var firestore = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.webhook = functions.https.onRequest((request, response) => {

	console.log("request.body.result.parameters: ", request.body.result.parameters);

	let params = request.body.result.parameters;

	firestore.collection('Symptoms').add(params).then(() => {
		response.send({
			speech: 'Your symptoms have been added to the database!'
		});
		return;
	}).catch((error => {
		console.log("error: ", e);
		response.send({
			speech:"Something went wrong while writing on database"
		});
		return;
	}))
	// response.send({
	//  	speech:
	//  		'New. You have the following symptoms ' + params.Symptoms
	// 	});
});


