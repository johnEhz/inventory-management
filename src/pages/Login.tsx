import React from "react";
import { MdEmail, MdKey } from "react-icons/md";
import { NavLink } from "react-router-dom";

const INPUT_STYLE =
  "w-full ml-1 p-1 px-2 text-md outline-0 bg-transparent rounded";

const Login = () => {
  return (
    <div className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 w-full h-screen min-h-[600px] flex flex-col justify-center items-center p-2 gap-5">
      <h1 className="text-gray-50 font-bold text-5xl welcome-message">
        Bienvenido!
      </h1>
      <form className="bg-gray-50 max-w-[480px] w-full flex flex-col gap-7 py-10 px-2 sm:px-4 m-5 text-[#11111D] rounded">
        <h2 className="text-center text-3xl font-bold">Login</h2>
        <ul className="flex flex-col gap-4">
          <li className="flex flex-row items-center p-2 border">
            <MdEmail className="text-[#9B9B98]" size={20} />
            <input
              className={INPUT_STYLE}
              type="email"
              placeholder="Correo Electronico"
              required
            />
          </li>
          <li className="flex flex-row items-center p-2 border">
            <MdKey className="text-[#9B9B98]" size={20} />
            <input
              className={INPUT_STYLE}
              type="password"
              placeholder="Contraseña"
              required
            />
          </li>
        </ul>
        <button
          className="bg-[#11111D] text-gray-50 py-[12px] font-normal rounded"
          type="submit"
        >
          Login
        </button>
      </form>
      <ul className="flex flex-col gap-3 text-gray-50 font-normal text-center">
        <li>Términos y condiciones para iniciar sesión</li>
        <li className="flex flex-col gap-2">
          ¿No tienes una cuenta?
          <NavLink
            className="block bg-blue-200 rounded-md p-2 text-gray-600 font-semibold"
            to="/register"
          >
            Crear nueva cuenta
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Login;
