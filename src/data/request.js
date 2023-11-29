import axios from "axios";
const request = {
  login: async function (data) {
    const formData = new FormData();
    formData.append("user", data.user);
    formData.append("password", data.password);
    try {
      const response = await axios.post(
        "/backend/api.php?action=login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },
  savedata: async function (data) {
    const formData = new FormData();
    formData.append("idproducto", data.idProducto);
    formData.append(
      "nombreproducto",
      typeof data.nombreProducto === "string"
        ? data.nombreProducto
        : data.nombreProducto.values().next().value.toString()
    );
    formData.append(
      "categoria",
      typeof data.categoria === "string"
        ? data.categoria
        : data.categoria.values().next().value.toString()
    );

    formData.append("fechacompra", data.fechaCompra);
    formData.append("fechaingresoalmacen", data.fechaIngresoAlmacen);
    formData.append("almacen", data.almacen);
    formData.append("fechaexpiracion", data.fechaExpiracion);
    formData.append("valorcompra", data.valorCompra);
    try {
      const response = await axios.post(
        "/backend/api.php?action=savedata",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },
  loaddata: async function () {
    try {
      const response = await axios.get("/backend/api.php?action=loaddata");
      if (response) {
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default request;
