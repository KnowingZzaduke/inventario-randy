const express = require("express");
const sequelize = require("./sequelize");
const productRoutes = require("./routes/products");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({ origin: "*" }));
// Asocia las rutas con sus respectivos prefijos
app.use("/products", productRoutes);

// Sincroniza la base de datos y luego inicia el servidor
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });
});

