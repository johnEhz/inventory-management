import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-[600px] w-full max-h-[500px] h-full flex flex-col justify-center items-center text-center p-12 gap-5">
        <h1 className="text-9xl font-bold message">404</h1>
        <div className="flex flex-col gap-5 items-center">
          <h2 className="italic font-semibold">PAGINA NO ENCONTRADA</h2>
          <p className="italic">
            La página solicitada no se encuentra en los servidores o está
            tamporalmente fuera de servicio.
          </p>
          <NavLink
            className="bg-red-500 rounded-full p-1 text-gray-50 font-bold max-w-[200px] w-full"
            to="/login"
          >
            Regresar
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
