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
import { users, columns } from "../utilities/columns";
function TableData() {
  const [data, setData] = useState(null);
  const [showModalNotResults, setShowModalNotResults] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(data?.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data ? data.slice(start, end) : [];
  }, [page, data]);
  const loadData = useCallback(async () => {
    try {
      const response = await request.loaddata();
      if (response) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  const handleOptionClick = (item) => {
    // Realizar acciones según la fila en la que se hizo clic
    console.log(`Hiciste clic en una opción para el elemento con número ${item.numero}`);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (
      data === "No se encontraron registros en la tabla nombre-tabla" ||
      data === null
    ) {
      setShowModalNotResults(false);
      onOpen();
    } else {
      setShowModalNotResults(false);
    }
  }, [data]);

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
                <TableColumn key="fecha_hora-actual">FECHA Y HORA</TableColumn>
                <TableColumn key="numero">PRODUCTOS</TableColumn>
                <TableColumn key="saldo">PRECIOS PRODUCTOS</TableColumn>
                <TableColumn key="dias_vencidos">TOTAL VENTA</TableColumn>
                <TableColumn key="fecha">TIPO DE PAGO</TableColumn>
                <TableColumn key="comentario">PRECIO FINAL</TableColumn>
                <TableColumn>OPCIONES</TableColumn>
              </TableHeader>
              <TableBody items={items}>
                {(item) => (
                  <>
                    <TableRow key={item.numero} style={{ color: "black" }}>
                      {(columnKey) => (
                        <>
                          <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                          <TableCell>
                            {/* Renderizar los botones en la columna "Opciones" */}
                            <Button onClick={() => handleOptionClick(item)}>
                              Opción 1
                            </Button>
                            <Button onClick={() => handleOptionClick(item)}>
                              Opción 2
                            </Button>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  </>
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
