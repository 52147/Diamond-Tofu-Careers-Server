const express = require('express');
const admin = require('firebase-admin');
const cors = require("cors");
// Initialize Firebase Admin SDK
const serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://diamond-tofu-career-default-rtdb.firebaseio.com'
});

// Create Express app
const app = express();
const db = admin.firestore();
app.use(cors()); 

// Handle API requests
app.get('/', (req, res) => {
  res.status(200).send("Success");
});

// app.get("/resumes", async (req, res) => {
//   try {
//     const resumesRef = db.collection("resumes");
//     const snapshot = await resumesRef.get();

//     const data = [];
//     snapshot.forEach((doc) => {
//       const docData = doc.data();
//       data.push({ ...docData, id: doc.id });
//     });
//     return res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error");
//   }
// });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



const table = require("./controllers/table-controller");
// …
app.use("/resumes", table);

const login = require("./controllers/login-controller");
// …
app.use("/login", login);

const profilemiddleware = require("./controllers/profile-controller");
// …
app.use("/profile", profilemiddleware);
