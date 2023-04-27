import React, { useState, useEffect } from "react";
import CustomList from "../components/CustomList";
import { getProviders } from "../services/providers/getProviders";
import { createProvider } from "../services/providers/createProvider";
import { useAuth } from "../hooks/useAuth";
import { Provider, ProviderCreation } from "../types";
import { toast } from "react-toastify";

const INPUT_STYLE = "px-3 py-2 rounded outline-none text-normal border";
const CONTROL_STYLE = "flex flex-col gap-1";
const PROVIDER_INITIAL_STATE: ProviderCreation = {
  name: "",
};

const ProvidersManagement = () => {
  const { user, logout } = useAuth();
  const [providers, setProviders] = useState<Provider[]>();
  const [provider, setProvider] = useState<ProviderCreation>(
    PROVIDER_INITIAL_STATE
  );

  const loadProviders = async () => {
    try {
      if (!user?.token) {
        throw new Error("No autorizado...");
      }
      getProviders(user.token).then((res) => {
        setProviders(res.data);
      });
    } catch (error) {
      console.error(error);
      logout && logout();
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProvider({ ...provider, [e.target.name]: e.target.value });
  };

  const handleCreateProvider = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createProvider(user?.token, provider);
      toast.success(`Nuevo proveedor registrada!`);
      await loadProviders();
      setProvider(PROVIDER_INITIAL_STATE);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadProviders();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="bg-white flex flex-col gap-5 max-w-[600px] w-full rounded sm:p-6 px-3 py-9 shadow-lg">
        <h2 className="text-center text-3xl font-normal">
          Gestión de Proovedores
        </h2>
        <form onSubmit={handleCreateProvider} className="bg-white">
          <ul className="flex flex-col gap-7">
            <li className={`${CONTROL_STYLE}`}>
              <label htmlFor="provider-name" className="font-bold">
                Nombre
              </label>
              <input
                type="text"
                id="provider-name"
                onChange={handleChangeInput}
                value={provider.name}
                name="name"
                placeholder="Ej: MERCOLANTA, KALLEY.SA"
                className={`${INPUT_STYLE}`}
              />
            </li>
            <li className={`${CONTROL_STYLE}`}>
              <button className="bg-green-600 hover:bg-green-700 p-2 rounded text-white text-normal transition-colors">
                Añadir proovedor
              </button>
            </li>
          </ul>
        </form>
      </div>
      <CustomList data={providers} />
    </div>
  );
};

export default ProvidersManagement;
