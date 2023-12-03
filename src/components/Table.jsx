import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  useDisclosure,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { FaPenToSquare, FaTriangleExclamation, FaCheck } from "react-icons/fa6";
import { useMemo, useState, useCallback, useEffect } from "react";
import request from "../data/request";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
function TableData() {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showText, setShowText] = useState(false);
  const [p, setP] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const [showSendData, setShowSendData] = useState(false);
  const rowsPerPage = 10;
  const pages = Math.ceil(p?.length / rowsPerPage);
  const d = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return p.slice(start, end);
  }, [page, p]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = useCallback(async () => {
    try {
      const SESSION = Cookies.get("dyzam-app");
      const SESSIONDECRYPT = await request.decryptdata(SESSION);
      if (SESSIONDECRYPT.salida === "exito") {
        const response = await request.loaddata(SESSIONDECRYPT.data.idusuario);
        if (response.data && response.data.salida === "exito") {
          let today = new Date();
          // Recorrer los productos en los datos
          const productosConFechaCercana = response.data.data.map(
            (producto) => {
              // Convertir la cadena de fechaexpiracion a un objeto Date
              const fechaExpiracion = new Date(producto.fechaexpiracion);

              // Calcular la diferencia en milisegundos
              const diferencia = fechaExpiracion - today;

              // Convertir la diferencia a días
              const diasDiferencia = Math.floor(
                diferencia / (1000 * 60 * 60 * 24)
              );

              // Asignar un estado al producto
              producto.estado =
                diasDiferencia <= 7 ? "porVencer" : "noPorVencer";

              return producto;
            }
          );
          setP(productosConFechaCercana);
        } else {
          alert("No se encontraron registros en la tabla");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (p === undefined || p.length === 0) {
      setShowText(true);
    } else {
      setShowText(false);
    }
  }, [p]);

  const handleEditOption = (id) => {
    if ((id !== 0) & (p.length !== 0)) {
      const filterData = p.find((item) => item.idproducto === id);
      if (filterData) {
        setFilteredData(filterData);
        setShowModalEdit(true);
        onOpen();
      }
    }
  };

  async function updateData(e) {
    e.preventDefault();
    try {
      const response = await request.updatedata(filteredData);
      if (response.salida === "exito") {
        loadData();
        setShowSendData(true);
        setTimeout(() => {
          setShowSendData(false);
        }, 3000);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="flex flex-col justify-center relative"
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      <div>
        {showText === false ? (
          <div className="p-4">
            <h1
              className="py-3 font-semibold"
              style={{ fontSize: "30px", color: "blue" }}
            >
              Tabla de facturas
            </h1>
            <Table
              aria-label="Example table with client side pagination"
              bottomContent={
                pages > 0 ? (
                  <div className="flex w-full justify-center">
                    <Pagination
                      isCompact
                      showControls
                      showShadow
                      color="primary"
                      page={page}
                      total={pages}
                      onChange={(page) => setPage(page)}
                    />
                  </div>
                ) : null
              }
              classNames={{
                wrapper: "min-h-[222px]",
              }}
            >
              <TableHeader>
                <TableColumn key="idproducto">ID DEL PRODUCTO</TableColumn>
                <TableColumn key="nombreproducto">PRODUCTO</TableColumn>
                <TableColumn key="categoria">CATEGORIA</TableColumn>
                <TableColumn key="fechacompra">FECHA COMPRA</TableColumn>
                <TableColumn key="fechaingresoalmacen">
                  FECHA INGRESO ALMACEN
                </TableColumn>
                <TableColumn key="fechaexpiracion">
                  FECHA EXPIRACIÓN
                </TableColumn>
                <TableColumn key="valorcompra">VALOR COMPRA</TableColumn>
                <TableColumn key="opciones">OPCIONES</TableColumn>
                <TableColumn key="informacion">INFORMACIÓN</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No hay datos"} items={d}>
                {(item) => (
                  <TableRow key={item.idproducto}>
                    {(columnKey) => (
                      <TableCell>
                        {columnKey === "opciones" ? (
                          <Button
                            onClick={() => handleEditOption(item.idproducto)}
                          >
                            <FaPenToSquare />
                          </Button>
                        ) : columnKey === "informacion" &&
                          item.estado === "porVencer" ? (
                          <Button color="warning" title="Producto por vencer">
                            <FaTriangleExclamation />
                          </Button>
                        ) : columnKey === "informacion" &&
                          item.estado === "noPorVencer" ? (
                          <Button
                            color="success"
                            title="Producto no pronto a vencer"
                          >
                            <FaCheck />
                          </Button>
                        ) : (
                          getKeyValue(item, columnKey)
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div
            className="content_welcome flex flex-col items-center justify-center"
            style={{ minHeight: "100vh" }}
          >
            <h1 style={{ fontSize: "2rem", color: "white" }}>¡Mensaje!</h1>
            <p className="mt-4 text-center" style={{ color: "white" }}>
              Debes agregar productos <br /> para poder visualizar registros en
              la tabla
            </p>
            <div>
              <Link to="/dashboard/formulario">
                <Button
                  color="danger"
                  className="p-4"
                  style={{ marginTop: "2rem" }}
                >
                  <p>Registrar productos</p>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {showModalEdit && filteredData && (
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Alerta!
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={updateData}
                  className="flex flex-col p-4"
                  style={{
                    gap: "15px",
                  }}
                >
                  <fieldset>
                    <Input
                      isRequired
                      type="text"
                      label="Nombre del producto"
                      placeholder="Ingresa el nombre del producto"
                      value={filteredData.nombreproducto}
                      onChange={(e) =>
                        setFilteredData({
                          ...filteredData,
                          nombreproducto: e.target.value,
                        })
                      }
                    />
                  </fieldset>
                  <fieldset>
                    <Input
                      isRequired
                      type="text"
                      label="Categoría del producto"
                      placeholder="Ingresa la categoría del producto"
                      value={filteredData.categoria}
                      onChange={(e) =>
                        setFilteredData({
                          ...filteredData,
                          categoria: e.target.value,
                        })
                      }
                    />
                  </fieldset>
                  <fieldset>
                    <Input
                      isRequired
                      type="date"
                      label="Fecha de la compra"
                      placeholder="Ingresa la fecha de la compra"
                      value={filteredData.fechacompra}
                      onChange={(e) =>
                        setFilteredData({
                          ...filteredData,
                          fechacompra: e.target.value,
                        })
                      }
                    />
                  </fieldset>
                  <fieldset>
                    <Input
                      isRequired
                      type="date"
                      label="Fecha de ingreso"
                      placeholder="Ingresa la fecha del ingreso del producto al almacen"
                      value={filteredData.fechaingresoalmacen}
                      onChange={(e) =>
                        setFilteredData({
                          ...filteredData,
                          fechaingresoalmacen: e.target.value,
                        })
                      }
                    />
                  </fieldset>
                  <fieldset>
                    <Input
                      isRequired
                      type="text"
                      label="Nombre del almacen"
                      placeholder="Ingresa el nombre del almacen"
                      value={filteredData.almacen}
                      onChange={(e) =>
                        setFilteredData({
                          ...filteredData,
                          almacen: e.target.value,
                        })
                      }
                    />
                  </fieldset>
                  <fieldset>
                    <Input
                      isRequired
                      type="date"
                      label="Fecha de expiración"
                      placeholder="Ingresa la fecha de expiración del producto"
                      value={filteredData.fechaexpiracion}
                      onChange={(e) =>
                        setFilteredData({
                          ...filteredData,
                          fechaexpiracion: e.target.value,
                        })
                      }
                    />
                  </fieldset>
                  <fieldset>
                    <Input
                      isRequired
                      type="number"
                      label="Valor compra"
                      placeholder="Ingresa el total del pago"
                      value={filteredData.valorcompra}
                      onChange={(e) =>
                        setFilteredData({
                          ...filteredData,
                          valorcompra: e.target.value,
                        })
                      }
                    />
                  </fieldset>
                  <Button color="success" type="submit">
                    Enviar
                  </Button>
                  {showSendData === true ? (
                    <p className="text-center" style={{ color: "green" }}>
                      ¡Datos enviados correctamente!
                    </p>
                  ) : (
                    <></>
                  )}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="success" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default TableData;
