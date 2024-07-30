const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
//const userRouter = require('./routes/user');
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const admin = require("firebase-admin");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


// Configuración de Firebase Admin
const serviceAccount = require("./esp32.json");
//const serviceAccount = require("./angular.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://esp32mms-default-rtdb.firebaseio.com/"
  //databaseURL: "https://angular-b3897-default-rtdb.firebaseio.com/"
});

const db = admin.database();


mongoose
  .connect("mongodb://localhost:27017/Proyecto_Integrador", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Import routes
const authRoutes = require("./routes/auth");
const tempRoutes = require("./routes/temperature");
const userRoutes = require("./routes/users");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/temperature", tempRoutes);
app.use("/api/users", userRoutes);

// Configuración de Multer
const storage = multer.memoryStorage(); // Guardar en memoria para procesar el archivo
const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json());

// Configuración de modelo flexible
const DataSchema = new mongoose.Schema({}, { strict: false });
const Data = mongoose.model("Data", DataSchema, "datos");

app.get("/data", async (req, res) => {
  try {
    const ref = db.ref('/');
    const limit = parseInt(req.query.limit, 10) || 100; // Valor por defecto
    const skip = parseInt(req.query.skip, 10) || 0; // Valor por defecto

    ref.orderByKey().limitToFirst(limit + skip).once('value', (snapshot) => {
      const data = snapshot.val();
      const result = Object.keys(data).slice(skip).reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {});

      res.json(result);
    }, (errorObject) => {
      res.status(500).send("The read failed: " + errorObject.name);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
