import React from "react";
import { useAuth } from '../hooks/useAuth'

const Application = () => {
  const { user } = useAuth()
  return (
    <div className="flex flex-col items-center min-h-[400px] w-full justify-center gap-4">
      <h2 className="message text-6xl">¡Bienvenido!</h2>
      <h2 className="message text-gray-500">Te encuentras autenticado como</h2>
      <span className="message">{user?.email}</span>
    </div>
  );
};

export default Application;
