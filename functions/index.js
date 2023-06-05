const functions = require("firebase-functions");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started




exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

admin.initializeApp();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Success");
});

const table = require("./controllers/table-controller");
app.use("/resumes", table);

const login = require("./controllers/login-controller");
app.use("/login", login);

const profilemiddleware = require("./controllers/profile-controller");
app.use("/profile", profilemiddleware);

const form = require("./controllers/form-controller");
app.use("/form", form);

// Export the Express app as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);