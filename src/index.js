const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
// Initialize Firebase Admin SDK
const serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://diamond-tofu-career-default-rtdb.firebaseio.com",
});

// Create Express app
const app = express();
app.use(cors());

// Handle API requests
app.get("/", (req, res) => {
  res.status(200).send("Success");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const table = require("./controllers/table-controller");
app.use("/resumes", table);

const login = require("./controllers/login-controller");
app.use("/login", login);

const profilemiddleware = require("./controllers/profile-controller");
app.use("/profile", profilemiddleware);

const form = require("./controllers/form-controller");
app.use("/form", form);
