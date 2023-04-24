import React from "react";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

//PAGES
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Application from "./pages/Application";
import UserInventory from "./pages/UserInventory";
import CreateInventory from "./pages/CreateInventory";
import BrandsManagement from "./pages/BrandsManagement";
import ProvidersManagement from "./pages/ProvidersManagement";

//LAYOUT COMPONENTS
import AppLayout from "./components/AppLayout"; //PROTECTED LAYOUT
import HomeLayout from "./components/HomeLayout";
import AuthLayout from "./components/AuthLayout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<NotFound />} />
      <Route element={<AuthLayout />}>
        <Route path="/" element={<HomeLayout />}>
          <Route path="" element={<Navigate to="/login" />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/app" element={<AppLayout />}>
          <Route path="" element={<Application />} />
          <Route path="inventory/:inventoryId" element={<UserInventory />} />
          <Route path="inventory/new" element={<CreateInventory />} />
          <Route path="brands" element={<BrandsManagement />} />
          <Route path="providers" element={<ProvidersManagement />} />
        </Route>
      </Route>
    </>
  )
);

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
