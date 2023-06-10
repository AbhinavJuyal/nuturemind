import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import UserProvider from "./provider/UserProvider";

import "./App.css";
import AllRoutes from "./pages/AllRoutes";

function App() {
  return (
    <div className="app h-screen overflow-auto">
      <Router>
        <UserProvider>
          <AllRoutes />
        </UserProvider>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
