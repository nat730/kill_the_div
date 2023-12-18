import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import Game from "./routes/game";
import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/home";


const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Home />
  },
  {
    path: "/game",
    element: <Game />,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}