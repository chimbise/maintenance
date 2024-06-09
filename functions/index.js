/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import logger from "firebase-functions/logger";

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp();

// exports.createUser = functions.https.onCall(async (data, context) => {
//   // Authentication/Authorization check
//   if (!context.auth) {
//     // Throwing an HttpsError so that the client gets the error details.
//     throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
//   }

//   try {
//     const userRecord = await admin.auth().createUser({
//       email: data.email,
//       emailVerified: false,
//       password: data.password,
//       displayName: data.displayName,
//       disabled: false,
//     });
//     return { uid: userRecord.uid };
//   } catch (error) {
//     throw new functions.https.HttpsError('internal', error.message, error);
//   }
// });
