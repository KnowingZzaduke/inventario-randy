import { Outlet } from "react-router-dom/dist";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { DataContext } from "../context/DataContext";
import request from "../data/request";

export function HOC({ children }) {
  const { validateSession } = useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {
    const SESSION = Cookies.get("dyzam-app");
    if (SESSION == undefined) {
      navigate("/");
    } else {
      const SESSIONDECRYPT = request.decryptdata(SESSION);
      if (validateSession()) {
        if (SESSIONDECRYPT.salida === "exito") {
          navigate("/dashboard");
        } else {
          Cookies.remove("dyzam-app");
        }
      }
    }
  }, []);
  return children ? children : <Outlet />;
}
