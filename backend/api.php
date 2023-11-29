<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require("db/MysqliDb.php");
if (isset($_POST["action"]) || isset($_GET["action"])) {
    switch ($_GET["action"]) {
        case "savedata":
            $idProducto = $_POST["idproducto"];
            $nombreProducto = $_POST["nombreproducto"];
            $categoria = $_POST["categoria"];
            $fechaCompra = $_POST["fechacompra"];
            $fechaIngresoAlmacen = $_POST["fechaingresoalmacen"];
            $almacen = $_POST["almacen"];
            $fechaExpiracion = $_POST["fechaexpiracion"];
            $valorCompra = $_POST["valorcompra"];
            $fechaCompraParseada = date("Y-m-d", strtotime(str_replace("/", "-", $fechaCompra)));
            $fechaIngresoAlmacenParseada = date("Y-m-d", strtotime(str_replace("/", "-", $fechaIngresoAlmacen)));
            $fechaExpiracionParseada = date("Y-m-d", strtotime(str_replace("/", "-", $fechaExpiracion)));

            $data = array(
                "idproducto" => $idProducto,
                "nombreproducto" => $nombreProducto,
                "categoria" => $categoria,
                "fechacompra" => $fechaCompraParseada,
                "fechaingresoalmacen" => $fechaIngresoAlmacenParseada,
                "almacen" => $almacen,
                "fechaexpiracion" => $fechaExpiracionParseada,
                "valorcompra" => $valorCompra,
            );

            if ($db->insert("productos", $data)) {
                echo json_encode(["salida" => "Éxito", "mensaje" => "Los datos fueron enviados y guardados correctamente."]);
            } else {
                echo json_encode(["salida" => "Error!", "mensaje" => "No se pudo insertar los datos en la base de datos"]);
            }

            break;

        case "loaddata":
            $mysqli = new mysqli("localhost", "root", "", "inventario");

            if ($mysqli->connect_error) {
                echo json_encode(["salida" => "error", "data" => "Error de conexión a la base de datos: " . $mysqli->connect_error]);
            } else {
                $sql = "SELECT * FROM productos";
                $result = $mysqli->query($sql);
                if ($result) {
                    $data = array();
                    while ($row = $result->fetch_assoc()) {
                        $data[] = $row;
                    }
                    if (empty($data)) {
                        echo json_encode(["salida" => "exito", "data" => "No se encontraron registros en la tabla datos_formularios"]);
                    } else {
                        header('Content-Type: application/json');
                        echo json_encode(["salida" => "exito", "data" => $data]);
                    }
                } else {
                    echo json_encode(["salida" => "error", "data" => "Error en la consulta SQL: " . $mysqli->error]);
                }
                $mysqli->close();
            }
            break;
            
    }
    exit;
}

exit;