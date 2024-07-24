const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
//const userRouter = require('./routes/user');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

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

// Endpoint para obtener los datos
app.get("/data", async (req, res) => {
  try {
    const data = await Data.find({});
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoint para subir el archivo JSON
app.post("/upload-json", upload.single("file"), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).send("No file uploaded");
    }

    // Parsear el archivo JSON
    const fileContent = req.file.buffer.toString("utf-8");
    const jsonData = JSON.parse(fileContent);

    // Validar la estructura del JSON
    if (!jsonData.humedad || !jsonData.temperatura) {
      return res.status(400).send("Invalid JSON structure");
    }

    // Guardar o actualizar los datos en la base de datos
    await Data.updateOne({}, jsonData, { upsert: true });

    res.send("Archivo subido y datos actualizados correctamente");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al procesar el archivo JSON");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
