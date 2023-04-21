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
    // localStorage.setItem("uid", uid);
    // localStorage.setItem("isLoggedIn", true);

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
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/later", async (req, res) => {
  const handleSignIn = async () => {
    try {
      const response = await signInWithGooglePopup();
      const email = response.user.email;
      console.log(response.user);
      console.log(response.user.uid);
      setLoading(true);

      const db = getFirestore();
      const resumesRef = collection(db, "resumes");

      try {
        const docRef = doc(resumesRef, setDocument); // 用doc() 拿到document idsetDocument is the document ID
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const docData = docSnapshot.data();
          // do something with the document data
          console.log("hello");
          await updateDoc(docRef, { uid: response.user.uid }); // Update the document
          console.log("123456");
          setShowModal(true);
        } else {
          console.log("No matching document found");
        }
      } catch (error) {
        console.error("Error updating document:", error);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  // Call handleSignIn function here
  handleSignIn();

  // Send response
  res.send("Sign in process started...");
});

module.exports = app;
