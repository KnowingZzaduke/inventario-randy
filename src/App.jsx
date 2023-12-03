import { useState, useEffect } from "react";
import "../compile-css/output.css";
import { Input, Button, Image } from "@nextui-org/react";
import logoInventario from "/logo-inventario.jpeg";
import request from "./data/request";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const [paramsLogin, setParamsLogin] = useState({
    usuario: "",
    contrasena: "",
  });
  const navigate = useNavigate();
  const [showTextErrorLogin, setShowTextErrorLogin] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    for (let key in paramsLogin) {
      if (paramsLogin[key] === "") {
        setShowTextErrorLogin(true);
        setTimeout(() => {
          setShowTextErrorLogin(false);
        }, 3000);
      }
    }
    try {
      const response = await request.login(paramsLogin);
      if (response.data.salida === "exito") {
        let cookkieD = request.encryptData(response.data);
        Cookies.set("dyzam-app", cookkieD, {
          SameSite: "none",
          secure: true,
        });
        if (cookkieD) {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className="flex flex-col align-middle justify-center bg_signin"
      style={{ minHeight: "100vh" }}
    >
      <div className="text-center flex flex-col items-center">
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
            <Input
              type="text"
              label="Usuario"
              placeholder="Ingresa tu usuario"
              required
              value={setParamsLogin.user}
              onChange={(e) =>
                setParamsLogin({ ...paramsLogin, usuario: e.target.value })
              }
            />
          </div>
          <div>
            <Input
              type="password"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              required
              value={setParamsLogin.password}
              onChange={(e) =>
                setParamsLogin({ ...paramsLogin, contrasena: e.target.value })
              }
            />
          </div>
          <div className="py-2">
            <Button className="w-full" type="submit" color="success">
              Iniciar sesión
            </Button>
          </div>
          {showTextErrorLogin === true ? (
            <p
              className="underline decoration-red-600"
              style={{ color: "red" }}
            >
              ¡Por favor ingresa carácteres válidos!
            </p>
          ) : (
            <></>
          )}
          <div>
            <Link className="underline bg-opacity-hover" to="/signup">
              Crear usuario
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
