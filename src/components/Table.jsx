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
} from "@nextui-org/react";
import { useMemo, useState, useCallback, useEffect } from "react";
import request from "../data/request";
import { Link } from "react-router-dom";
function TableData() {
  const [showModalNotResults, setShowModalNotResults] = useState(false);
  const [p, setP] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(p?.length / rowsPerPage);
  const d = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return p.slice(start, end);
  }, [page, p]);
  console.log(d);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = useCallback(async () => {
    try {
      const response = await request.loaddata();
      if (response.data && response.data.salida === "exito") {
        setP(response.data.data);
      } else {
        console.log("No se encontraron registros en la tabla");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (p === undefined || p === null) {
      setShowModalNotResults(true);
      onOpen();
    } else {
      setShowModalNotResults(false);
    }
  }, [p]);

  const handleOptionClick = (item) => {
    // Realizar acciones según la fila en la que se hizo clic
    console.log(
      `Hiciste clic en una opción para el elemento con número ${item.numero}`
    );
  };

  return (
    <div
      className="flex flex-col justify-center relative"
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      <div>
        {showModalNotResults === false ? (
          <div className="p-4">
            <h1 className="py-3 font-semibold" style={{ fontSize: "30px" }}>
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
                <TableColumn>OPCIONES</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No users found"} items={d}>
                {(item) => (
                  <TableRow key={item.idproducto}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
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
            <h1 style={{ fontSize: "2rem" }}>¡Mensaje!</h1>
            <p className="mt-4 text-center">
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

      {showModalNotResults && (
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Alerta!
              </ModalHeader>
              <ModalBody>
                <p className="text-black">
                  No se han guardado datos en la tabla!
                </p>
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
