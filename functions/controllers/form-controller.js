const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(cors());
const db = admin.firestore();
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  const postData = req.body;

  try {
    const docRef = await db.collection("resumes").add(postData);
    console.log("Document written with ID: ", docRef.id);
    res.status(200).send(docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).send("An error occurred while adding the document");
  }
});

module.exports = router;
