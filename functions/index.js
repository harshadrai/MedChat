const functions = require('firebase-functions');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var firestore = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.webhook = functions.https.onRequest((request, response) => {

console.log("request.body.result.parameters: ", request.body.result.parameters);

let action = request.body.result.action;

switch (action) {
	case 'saveSymptoms':{

		let params = request.body.result.parameters;

		var docRef = firestore.collection('Symptoms')

		docRef.add(params).then(() => {
			// response.send({
			// 	speech: 'Your symptoms have been added to the database!'
			// });
			return;
		}).catch((error => {
			console.log("error: ", e);
			response.send({
				speech:"Something went wrong while writing on database"
			});
			return;
		}))
	break;
	}

	case 'findCloseSymptoms':{

		firestore.collection('Symptoms').get().then((querySanpshot) =>{
			var listOfSymptomsList = [];
			querySanpshot.forEach((doc) => {listOfSymptomsList.push(doc.data())});
		
			var symptoms = [];
			// var speech = '';

			listOfSymptomsList.forEach((symptomsList, index) => {
				// symptomsList.Symptoms.forEach((symptom, ind) => {
					symptoms.push(symptomsList.Symptoms)
				// }
			})
			// speech += symptomsList.Symptoms
			// })

			response.send({
				speech: 'All of the symptoms: ' + symptoms
			});


			// Write the remaining part of the code here


			return;
		}).catch((err) => {
			console.log('Error getting symptoms from database', err);
			response.send({
				speech: "Something went wrong while reading the database"
			});
			return;
		})
	break;
	}

	default:{
		response.send({
			speech: 'No action matched.'
		});
	}
}


	// response.send({
	//  	speech:
	//  		'New. You have the following symptoms ' + params.Symptoms
	// 	});
});


