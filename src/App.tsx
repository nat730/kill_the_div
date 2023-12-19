import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Game from "./routes/game";
import Home from "./routes/home";
import EndGame from "./routes/endgame";
import { SpeedInsights } from "@vercel/speed-insights/react";

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Home />
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/endgame/:timelapsed",
    element: <EndGame />,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
      <SpeedInsights /> 
    </React.StrictMode>
  );
}
