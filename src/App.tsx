import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//TOASTIFY
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//PAGES
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Application from "./pages/Application";
import Inventory from "./pages/Inventory";
import CreateInventory from "./pages/CreateInventory";
import BrandsManagement from "./pages/BrandsManagement";
import ProvidersManagement from "./pages/ProvidersManagement";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
      />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/application" element={<Application />} />
        <Route path="/user/inventory/:inventoryId" element={<Inventory />} />
        <Route path="/user/inventory/new" element={<CreateInventory />} />
        <Route path="/user/brands" element={<BrandsManagement />} />
        <Route path="/user/providers" element={<ProvidersManagement />} />
      </Routes>
    </div>
  );
}

export default App;
