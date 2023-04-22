const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express.Router();
app.use(cors());
const db = admin.firestore();
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  try {
    const user = req.body.user;
    const uid = user.uid;

    const email = user.email;

    const accessRef = db.collection("access");
    const accessQuery = await accessRef.where("email", "==", email).get();
    if (!accessQuery.empty) {
      console.log("Email is authorized.");
      // localStorage.setItem("role", "1");
      res.status(200).send("1");
    } else {
      console.log("Email is not authorized. Checking UID...");
      const resumesRef = db.collection("resumes");
      const resumesQuery = await resumesRef.where("uid", "==", uid).get();
      if (!resumesQuery.empty) {
        console.log("UID is authorized.");
        // localStorage.setItem("role", "2");
        res.status(200).send("2");
      } else {
        console.log("UID is not authorized.");
        res.status(200).send("3");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/later", async (req, res) => {
  const uid = req.query.uid;
  const docId = req.body.docID;
  console.log(docId);

  if (!docId) {
    console.error("Invalid data");
    return res.status(400).send("Invalid data");
  }

  const resumesRef = db.collection("resumes");

  try {
    const docSnapshot = await resumesRef.doc(docId).get();

    if (!docSnapshot.exists) {
      console.log("No matching document found");
      return res.status(404).send("Resume not found");
    }

    const docData = docSnapshot.data();

    await resumesRef.doc(docId).update({
      ...docData,
      uid,
    });

    console.log("Resume updated with UID:", uid);

    return res.status(200).send("Resume updated");
  } catch (error) {
    console.error("Error updating resume:", error);
    return res.status(500).send("An error occurred while updating the resume");
  }
});

module.exports = app;
