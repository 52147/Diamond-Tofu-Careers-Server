const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express.Router();
app.use(cors());
const db = admin.firestore();
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const resumesRef = db.collection("resumes");
    const snapshot = await resumesRef.get();

    const data = [];
    snapshot.forEach((doc) => {
      const docData = doc.data();
      data.push({ ...docData, id: doc.id });
    });
    return res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

app.post("/update", async (req, res) => {
  const { id, status } = req.body;
  console.log(req.body);
  console.log(id);
  const docRef = db.collection("resumes").doc(id);
  try {
    await docRef.update({ status });
    console.log("Resume status updated successfully.");
    res.status(200).send("Success");
  } catch (error) {
    console.error("Error updating resume status:", error);
    res.status(500).send("Error");
  }
});

module.exports = app;
