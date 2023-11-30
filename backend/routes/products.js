// En el archivo routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const multer = require("multer"); // Importa multer
const upload = multer();

// Ruta para guardar datos
router.post("/savedata", upload.none(), async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const result = await Product.create(data);
    res.json({
      salida: "Éxito",
      mensaje: "Los datos fueron enviados y guardados correctamente.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      salida: "Error!",
      mensaje: "No se pudo insertar los datos en la base de datos",
    });
  }
});

// Ruta para cargar datos
router.get("/loaddata", async (req, res) => {
  try {
    const data = await Product.findAll({ raw: true });
    console.log("Esto es data", data);
  
    console.log("esto son los valores", data);
    res.json({ salida: "exito", data: data });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ salida: "Error!", mensaje: "Error al cargar los datos" });
  }
});

module.exports = router;
