<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require("db/MysqliDb.php");
if (isset($_POST["action"]) || isset($_GET["action"])) {
    switch ($_GET["action"]) {
        case "savedata":
            if (isset($_POST["idproducto"], $_POST["nombreproducto"], $_POST["categoria"], $_POST["fechacompra"], $_POST["fechaingresoalmacen"], $_POST["almacen"], $_POST["fechaexpiracion"], $_POST["valorcompra"])) {
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
            } else {
                echo json_encode(["salida" => "Error!", "mensaje" => "Faltan campos obligatorios"]);
            }

            break;

        case "loaddata":
            $data = $db->get("productos");
            if ($db->count > 0) {
                echo json_encode(["salida" => "exito", "data" => $data]);
            } else {
                echo json_encode(["salida" => "exito", "data" => "No se encontraron registros en la tabla productos"]);
            }
            break;
    }
    exit;
}
