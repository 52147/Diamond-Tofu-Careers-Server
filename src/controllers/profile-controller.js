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

router.get("/status", async (req, res) => {
  const uid = req.query.uid;

  if (!uid) {
    return res.status(400).send("UID parameter is missing");
  }

  const query = db.collection("resumes").where("uid", "==", uid);

  try {
    const querySnapshot = await query.get();
    const documents = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const document = {
        id: doc.id,
        title: data.title,
        status: data.status,
      };

      documents.push(document);
    });

    res.status(200).send(documents);
  } catch (error) {
    console.error("Error getting documents: ", error);
    res.status(500).send("An error occurred while getting the documents");
  }
});

router.post("/update", async (req, res) => {
    const uid = req.query.uid;
    const { email, phone, address, resume } = req.body;
    const resumesRef = db.collection("resumes");
  
    try {
      const querySnapshot = await resumesRef.where("uid", "==", uid).get();
  
      if (querySnapshot.empty) {
        console.log("User not found");
        return res.status(404).send("User not found");
      }
  
      const docRef = querySnapshot.docs[0].ref;
      await docRef.update({ email, phone, address, resume });
      console.log("User updated successfully");
      return res.status(200).send("User updated successfully");
    } catch (error) {
      console.error("Error updating user: ", error);
      return res.status(500).send("An error occurred while updating the user");
    }
  });
  
  
  



module.exports = router;
