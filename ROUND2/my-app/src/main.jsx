import React from "react";
import ReactDOM from "react-dom/client";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = React.useState("login");

  if (page === "login") {
    return <Login onNavigate={setPage} />;
  }

  if (page === "register") {
    return <Register onNavigate={setPage} />;
  }

  return <Dashboard onNavigate={setPage} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);