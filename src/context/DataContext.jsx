import { createContext, useState } from "react";
export const DataContext = createContext();
import Cookies from "js-cookie";

function DataContextProvider(props) {
  const [dataUser, setDataUser] = useState([]);
  function validateSession() {
    const SESSION = Cookies.get("dyzam-app");

    if (SESSION !== undefined) {
      return true;
    }
    return false;
  }
  return (
    <DataContext.Provider
      value={{
        validateSession,
        setDataUser,
        dataUser,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
