import React, { useState } from "react";
import { MdEmail, MdKey } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from '../hooks/useAuth'

//Services
import { createUser } from "../services/auth/userServices";

//Utils
import { checkConfirmPassword } from "../utils/checkConfirmPassword";

//Types - Interfaces
import { UserRegistration } from "../types";

const INPUT_STYLE =
  "w-full ml-1 p-1 px-2 text-md outline-0 bg-transparent rounded";

const REGISTER_INITIAL_STATE: UserRegistration = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const { login } = useAuth()
  const [userRegistration, setUserRegistration] = useState<UserRegistration>(
    REGISTER_INITIAL_STATE
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserRegistration((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { password, confirmPassword } = userRegistration;
      if (!checkConfirmPassword(password, confirmPassword)) {
        throw new Error("Las contraseñas ingresadas no coninciden");
      }
      const result = await createUser(userRegistration);
      const { name } = result.data;
      login && login(result.data)
      toast.success(`Usuario ${name} registrado exitosamente`);
    } catch (error: any) {
      toast.error(`${error}`);
      return;
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 w-full h-screen min-h-[700px] flex flex-col justify-center items-center p-2 gap-5">
      <h1 className="text-gray-50 font-bold text-5xl message">Crear cuenta</h1>
      <form
        onSubmit={handleRegisterUser}
        className="bg-gray-50 max-w-[480px] w-full flex flex-col gap-7 py-10 px-2 sm:px-4 m-5 text-[#11111D] rounded"
      >
        <h2 className="text-center text-3xl font-bold">Registrarse</h2>
        <ul className="flex flex-col gap-4">
          <li className="flex flex-row items-center p-2 border rounded">
            <RiPencilFill className="text-[#9B9B98]" size={20} />
            <input
              className={INPUT_STYLE}
              type="text"
              name="name"
              value={userRegistration.name}
              placeholder="Nombre Completo"
              onChange={handleChangeInput}
              required
            />
          </li>
          <li className="flex flex-row items-center p-2 border rounded">
            <MdEmail className="text-[#9B9B98]" size={20} />
            <input
              className={INPUT_STYLE}
              type="email"
              name="email"
              value={userRegistration.email}
              placeholder="Correo Electronico"
              onChange={handleChangeInput}
              required
            />
          </li>
          <li className="flex flex-row items-center p-2 border rounded">
            <MdKey className="text-[#9B9B98]" size={20} />
            <input
              className={INPUT_STYLE}
              type="password"
              name="password"
              value={userRegistration.password}
              placeholder="Contraseña"
              onChange={handleChangeInput}
              required
            />
          </li>
          <li className="flex flex-row items-center p-2 border rounded">
            <MdKey className="text-[#9B9B98]" size={20} />
            <input
              className={INPUT_STYLE}
              type="password"
              name="confirmPassword"
              value={userRegistration.confirmPassword}
              placeholder="Confirmar Contraseña"
              onChange={handleChangeInput}
              required
            />
          </li>
        </ul>
        <button
          className="bg-[#6184FF] text-gray-50 py-[12px] font-normal rounded hover:bg-[#4565db] transition-colors"
          type="submit"
        >
          Registrarse
        </button>
      </form>
      <ul className="flex flex-col gap-3 text-gray-50 font-normal text-center">
        <li>Términos y condiciones de registro</li>
        <li>
          <NavLink
            className="block bg-blue-200 rounded-md p-2 text-gray-600 font-semibold"
            to="/login"
          >
            ¿Ya tienes una cuenta?
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Register;
