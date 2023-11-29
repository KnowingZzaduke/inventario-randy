import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Welcome from "./components/Welcome.jsx";
import AddProducts from "./components/AddProducts.jsx";
import TableData from "./components/Table.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
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
        element: <TableData/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
