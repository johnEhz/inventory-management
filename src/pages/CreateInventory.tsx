import React, { useState } from "react";
import { InventoryCreation } from "../types";
import { createInventory } from "../services/inventories/createInventory";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

const INPUT_STYLE = "px-3 py-2 rounded outline-none text-normal border";
const CONTROL_STYLE = "flex flex-col gap-1";
const INITIAL_STATE = {
  name: "",
  description: "",
};

const CreateInventory = () => {
  const { user } = useAuth();
  const [Inventory, setInventory] = useState<InventoryCreation>(INITIAL_STATE);

  const handleCreateInventory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { name, description } = Inventory;
      const res = await createInventory(user?.token, { name, description });
      toast.success(`Nuevo inventario (${res.data.name}) Creado!`)
      setInventory(INITIAL_STATE)
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInventory({
      ...Inventory,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white flex flex-col gap-5 max-w-[600px] w-full rounded sm:p-6 px-3 py-9 shadow-lg">
        <h2 className="text-center text-3xl font-normal">Nuevo Inventario</h2>
        <form className="bg-white" onSubmit={handleCreateInventory}>
          <ul className="flex flex-col gap-7">
            <li className={`${CONTROL_STYLE}`}>
              <label htmlFor="categoria" className="font-bold">
                Categoria
              </label>
              <input
                onChange={handleChangeInput}
                type="text"
                name="name"
                value={Inventory.name}
                id="categoria"
                placeholder="Ej: Joyería, prendas de vestir, equipos electrónicos..."
                className={`${INPUT_STYLE}`}
              />
            </li>
            <li className={`${CONTROL_STYLE}`}>
              <label htmlFor="descripcion" className="font-bold">
                Descripción
              </label>
              <textarea
                onChange={handleChangeInput}
                id="descripcion"
                name="description"
                value={Inventory.description}
                rows={8}
                placeholder="Descripción del inventario"
                className={`${INPUT_STYLE} resize-none`}
              />
            </li>
            <li className={`${CONTROL_STYLE}`}>
              <button className="bg-green-600 hover:bg-green-700 p-2 rounded text-white text-normal transition-colors">
                Crear
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default CreateInventory;
