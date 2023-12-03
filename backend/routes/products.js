// En el archivo routes/products.js
const express = require("express");
const router = express.Router();
const { Product, User } = require("../models/product");
const multer = require("multer");
const upload = multer();

router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const foundUser = await User.findOne({ where: { usuario: data.usuario } });

    if (!foundUser) {
      return res
        .status(401)
        .json({ salida: "Error", mensaje: "Usuario no encontrado" });
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    if (data.contrasena === foundUser.contrasena) {
      // Enviar todos los datos del usuario en la respuesta
      return res.json({
        salida: "exito",
        mensaje: "Inicio de sesión exitoso",
        data: foundUser.toJSON(),
      });
    } else {
      return res
        .status(401)
        .json({ salida: "Error", mensaje: "Contraseña incorrecta" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ salida: "Error", mensaje: "Error en el servidor" });
  }
});

router.post("/signup", upload.none(), async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    // Crea el nuevo usuario en la base de datos
    const newUser = await User.create({
      usuario,
      contrasena,
    });

    res.json({ salida: "exito", mensaje: "Usuario registrado con éxito" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ salida: "Error!", mensaje: "Error al registrar usuario" });
  }
});
// Ruta para guardar datos
router.post("/savedata", upload.none(), async (req, res) => {
  try {
    const {
      idusuario,
      nombreproducto,
      categoria,
      fechacompra,
      fechaingresoalmacen,
      almacen,
      fechaexpiracion,
      valorcompra,
    } = req.body;
    const result = await Product.create({
      idusuario: idusuario,
      nombreproducto: nombreproducto,
      categoria: categoria,
      fechacompra: fechacompra,
      fechaingresoalmacen: fechaingresoalmacen,
      almacen: almacen,
      fechaexpiracion: fechaexpiracion,
      valorcompra: valorcompra,
    });
    res.json({
      salida: "exito",
      mensaje: "Los datos fueron enviados y guardados correctamente",
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
router.get("/loaddata/:idusuario", async (req, res) => {
  try {
    const idusuario = req.params.idusuario;

    const data = await Product.findAll({
      where: { idusuario: idusuario },
      raw: true,
    });

    res.json({ salida: "exito", data: data });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ salida: "Error!", mensaje: "Error al cargar los datos" });
  }
});

router.post("/updatedata", upload.none(), async (req, res) => {
  console.log(req);
  try {
    const {
      idproducto,
      nombreproducto,
      categoria,
      fechacompra,
      fechaingresoalmacen,
      almacen,
      fechaexpiracion,
      valorcompra,
    } = req.body;

    // Verificar si el producto ya existe
    const existingProduct = await Product.findOne({
      where: {
        idproducto: idproducto,
      },
    });

    if (existingProduct) {
      // Si el producto existe, realizar la actualización
      await Product.update(
        {
          nombreproducto: nombreproducto,
          categoria: categoria,
          fechacompra: fechacompra,
          fechaingresoalmacen: fechaingresoalmacen,
          almacen: almacen,
          fechaexpiracion: fechaexpiracion,
          valorcompra: valorcompra,
        },
        {
          where: {
            idproducto: idproducto,
          },
        }
      );

      res.json({
        salida: "exito",
        mensaje: "Los datos del producto se actualizaron correctamente",
        idproducto: idproducto,
      });
    } else {
      // Si el producto no existe, realizar la inserción
      const result = await Product.create({
        idproducto: idproducto,
        nombreproducto: nombreproducto,
        categoria: categoria,
        fechacompra: fechacompra,
        fechaingresoalmacen: fechaingresoalmacen,
        almacen: almacen,
        fechaexpiracion: fechaexpiracion,
        valorcompra: valorcompra,
      });

      res.json({
        salida: "exito",
        mensaje: "Los datos fueron enviados y guardados correctamente.",
        idproducto: result.idproducto,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      salida: "Error!",
      mensaje: "No se pudo insertar o actualizar los datos en la base de datos",
    });
  }
});

module.exports = router;
