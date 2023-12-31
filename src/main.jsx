import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Welcome from "./components/Welcome.jsx";
import AddProducts from "./components/AddProducts.jsx";
import TableData from "./components/Table.jsx";
import Signup from "./routes/Signup.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HOC } from "./validation/Hoc.jsx";
import DataContextProvider from "./context/DataContext.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HOC>
        <App />
      </HOC>
    ),
  },
  {
    path: "/signup",
    element: (
      <HOC>
        <Signup />
      </HOC>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <HOC>
        <Dashboard />
      </HOC>
    ),
    children: [
      {
        path: "/dashboard/welcome",
        element: <Welcome />,
      },
      {
        path: "/dashboard/form-add-products",
        element: <AddProducts />,
      },
      {
        path: "/dashboard/table",
        element: <TableData />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataContextProvider>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </DataContextProvider>
  </React.StrictMode>
);
