import "../../compile-css/output.css";
import {
  Input,
  Button,
  Select,
  SelectSection,
  SelectItem,
  Image,
  CheckboxGroup,
  Checkbox,
} from "@nextui-org/react";
import logoInventario from "/logo-inventario.jpeg";
import { v4 as uuidv4 } from 'uuid';
import request from "../data/request";
import { useEffect, useState } from "react";
function AddProducts() {
  const nuevoUuid = uuidv4();
  const [sendParams, setSendParams] = useState({
    idProducto: nuevoUuid,
    nombreProducto: "",
    categoria: "",
    fechaCompra: "",
    fechaIngresoAlmacen: "",
    almacen: "",
    fechaExpiracion: "",
    valorCompra: "",
  });

  const [productsValues, setProductsValues] = useState([]);
  const [categorieValues, setCategorieValues] = useState([]);
  const [showProductsSelect, setShowProductosSelect] = useState(false);
  const [showCategoriesSelect, setShowCategoriesSelect] = useState(false);

  useEffect(() => {
    if (productsValues.find((e) => e === "productos")) {
      setShowProductosSelect(true);
    } else {
      setShowProductosSelect(false);
    }
  }, [productsValues.length]);

  useEffect(() => {
    if (categorieValues.find((e) => e === "categorias")) {
      setShowCategoriesSelect(true);
    } else {
      setShowCategoriesSelect(false);
    }
  }, [categorieValues.length]);

  async function handleSubmit(e) {
    e.preventDefault();
    for (let key in sendParams) {
      if (sendParams[key] === null) {
        alert(`El valor ${key} está vacío`);
      } else {
        const response = await request.savedata(sendParams);
        if (response) {
        }
      }
    }
  }
  return (
    <div
      className="flex flex-col align-middle justify-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="text-center flex flex-col items-center py-4">
        <h1 className="py-2" style={{ fontSize: "2rem" }}>
          Formulario de agregar facturas
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border-2 border-solid rounded p-4"
          style={{
            width: "500px",
            minWidth: "400px",
            gap: "15px",
            backgroundColor: "white",
          }}
        >
          <div className="flex justify-center">
            <Image
              width={200}
              alt="logo-inventario"
              src={logoInventario}
              radius="full"
            />
          </div>
          <div>
            {showProductsSelect === false ? (
              <fieldset>
                <Input
                  isRequired
                  type="text"
                  label="Nombre del producto"
                  placeholder="Ingresa el nombre del producto"
                  value={sendParams.nombreProducto}
                  onChange={(e) =>
                    setSendParams({
                      ...sendParams,
                      nombreProducto: e.target.value,
                    })
                  }
                />
              </fieldset>
            ) : (
              <fieldset className="flex flex-col" style={{ gap: "15px" }}>
                <Select
                  label="Selecciona un producto"
                  selectedKeys={sendParams.nombreProducto}
                  onSelectionChange={(newSelection) =>
                    setSendParams({ ...sendParams, nombreProducto: newSelection})
                  }
                >
                  <SelectItem key="jamon">Jamón, queso</SelectItem>
                  <SelectItem key="ensalada">Ensalada, queso</SelectItem>
                </Select>
              </fieldset>
            )}
            <div>
              <CheckboxGroup
                className="py-4"
                value={productsValues}
                onChange={setProductsValues}
              >
                <p style={{ fontSize: "12px", color: "red" }}>
                  Marca esta opción solo si el producto ya se encuentra
                  registrado
                </p>
                <Checkbox value="productos">Escoger productos</Checkbox>
              </CheckboxGroup>
            </div>
          </div>
          <div>
            {showCategoriesSelect === false ? (
              <fieldset>
                <Input
                  isRequired
                  type="text"
                  label="Categoría del producto"
                  placeholder="Ingresa la categoría del producto"
                  value={sendParams.categoria}
                  onChange={(e) =>
                    setSendParams({
                      ...sendParams,
                      categoria: e.target.value,
                    })
                  }
                />
              </fieldset>
            ) : (
              <fieldset className="flex flex-col" style={{ gap: "15px" }}>
                <Select
                  label="Selecciona una categoría de los productos"
                  selectedKeys={sendParams.categoria}
                  onSelectionChange={(newSelection) =>
                    setSendParams({ ...sendParams, categoria: newSelection })
                  }
                >
                  <SelectItem value="emparedados">Emparedados</SelectItem>
                  <SelectItem value="entrada">Entrada</SelectItem>
                </Select>
              </fieldset>
            )}
            <div>
              <CheckboxGroup
                className="py-4"
                value={categorieValues}
                onChange={setCategorieValues}
              >
                <p style={{ fontSize: "12px", color: "red" }}>
                  Marca esta opción solo si la categoria se encuentra registrada
                </p>
                <Checkbox value="categorias">Escoger categoria</Checkbox>
              </CheckboxGroup>
            </div>
          </div>
          <fieldset>
            <Input
              isRequired
              type="date"
              label="Fecha de la compra"
              placeholder="Ingresa la fecha de la compra"
              value={sendParams.fechaCompra}
              onChange={(e) =>
                setSendParams({ ...sendParams, fechaCompra: e.target.value })
              }
            />
          </fieldset>
          <fieldset>
            <Input
              isRequired
              type="date"
              label="Fecha de ingreso"
              placeholder="Ingresa la fecha del ingreso del producto al almacen"
              value={sendParams.fechaIngresoAlmacen}
              onChange={(e) =>
                setSendParams({ ...sendParams, fechaIngresoAlmacen: e.target.value })
              }
            />
          </fieldset>
          <fieldset>
            <Input
              isRequired
              type="text"
              label="Nombre del almacen"
              placeholder="Ingresa el nombre del almacen"
              value={sendParams.almacen}
              onChange={(e) =>
                setSendParams({ ...sendParams, almacen: e.target.value })
              }
            />
          </fieldset>
          <fieldset>
            <Input
              isRequired
              type="date"
              label="Fecha de expiración"
              placeholder="Ingresa la fecha de expiración del producto"
              value={sendParams.fechaExpiracion}
              onChange={(e) =>
                setSendParams({ ...sendParams, fechaExpiracion: e.target.value })
              }
            />
          </fieldset>
          <fieldset>
            <Input
              isRequired
              type="number"
              label="Total"
              placeholder="Ingresa el total del pago"
              value={sendParams.valorCompra}
              onChange={(e) =>
                setSendParams({ ...sendParams, valorCompra: e.target.value })
              }
            />
          </fieldset>
          <Button color="success" type="submit">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddProducts;
