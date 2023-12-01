import axios from "axios";
const request = {
  login: async function (data) {
    const formData = new FormData();
    formData.append("usuario", data.user);
    formData.append("contrasena", data.password);
    try {
      const response = await axios.post(
        "http://localhost:3001/products/login",
        formData
      );
      console.log(response);
      if (response) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },
  savedata: async function (data) {
    const formData = new FormData();
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
        "http://localhost:3001/products/savedata",
        formData
      );
      console.log(response);
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
  loaddata: async function () {
    try {
      const response = await axios.get(
        "http://localhost:3001/products/loaddata"
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  updatedata: async function (data) {
    const formData = new FormData();
    formData.append("idproducto", data.idproducto);
    formData.append(
      "nombreproducto",
      typeof data.nombreproducto === "string"
        ? data.nombreproducto
        : data.nombreproducto.values().next().value.toString()
    );
    formData.append(
      "categoria",
      typeof data.categoria === "string"
        ? data.categoria
        : data.categoria.values().next().value.toString()
    );

    formData.append("fechacompra", data.fechacompra);
    formData.append("fechaingresoalmacen", data.fechaingresoalmacen);
    formData.append("almacen", data.almacen);
    formData.append("fechaexpiracion", data.fechaexpiracion);
    formData.append("valorcompra", data.valorcompra);
    try {
      const response = await axios.post(
        "http://localhost:3001/products/updatedata",
        formData
      );
      if (response) {
        return response.data;
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
};

export default request;
