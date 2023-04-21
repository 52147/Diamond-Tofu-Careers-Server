const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(cors());
const db = admin.firestore();
router.use(bodyParser.json());

router.get("/", async (req, res) => {
  const uid = req.query.uid;
  try {
    const q = db.collection("resumes").where("uid", "==", uid).limit(1);
    const querySnapshot = await q.get();
    console.log(querySnapshot);
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();
      const responseData = {
        first_name: data.firstN || "",
        last_name: data.lastN || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        resume: data.resume || "",
        title: data.title || "",
        status: data.status || "",
      };
      res.status(200).json(responseData);
    } else {
      res.status(404).send("Resume not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error");
  }
});

module.exports = router;
