import React, { useState, useEffect } from "react";
import InventoyRoutes from "./InventoyRoutes";
import { NavLink } from "react-router-dom";
import { MdOutlineInventory } from "react-icons/md";
import links from "../data/navigationLinks";
import { InventoryRoute, Inventory } from "../types";
import { useAuth } from "../hooks/useAuth";
import { getInventories } from "../services/inventories/getInventories";
import { FiRefreshCcw } from "react-icons/fi";
import { toast } from 'react-toastify'

interface NavigationProps {
  showNavigation: boolean;
}

const LINK_STYLE =
  "w-full h-full p-3 px-6 hover:bg-[#1D1B31] hover:text-slate-300 transition-colors flex items-center gap-4";

const Navigation = ({ showNavigation }: NavigationProps) => {
  const { user } = useAuth();
  const [inventoryRoutes, setInventoryRoutes] = useState<InventoryRoute[]>([]);

  useEffect(() => {
    handleLoadInventoryLinks(user?.token)
  }, [user?.token]);

  const handleLoadInventoryLinks = async(token: string | undefined) => {
    if (!token) return
    getInventories(token)
    .then((res) => {
      setInventoryRoutes(
        res.data.map((item: Inventory) => {
          const { _id, name, createdAt } = item;
          return {
            _id,
            name,
            createdAt,
          };
        })
      );
      toast.success('Inventarios cargados!')
    })
    .catch((error) => console.error(error));
  };

  return (
    <div
      className={`bg-[#11111D] text-[#FFFFFF] fixed transition-transform h-screen py-6 z-10 ${
        showNavigation ? "w-[250px]" : "w-0 hidden"
      }`}
    >
      <nav className="flex flex-col gap-6 min-h-[400px] h-full overflow-y-auto">
        <h2 className="text-center font-normal text-2xl">Navegación</h2>
        <ul className="flex flex-col gap-4 text-md font-normal text-[#a3a3a3]">
          <li className="flex flex-col bg-[#1D1B31]">
            <h2 className={`${LINK_STYLE} flex flex-row justify-between`}>
              <span className="flex gap-4">
                <MdOutlineInventory size={20} />
                Inventarios
              </span>
              <button
                onClick={() => handleLoadInventoryLinks(user?.token)}
                className="flex flex-row items-center gap-1 text-[12px] bg-[#3f3892] hover:bg-blue-600 p-1 rounded-md"
              >
                Sync
                <FiRefreshCcw />
              </button>
            </h2>
            <InventoyRoutes inventoryRoutes={inventoryRoutes} />
          </li>
          {links.map(({ route, Icon, name }, idx) => (
            <li key={idx} className="flex">
              <NavLink className={({ isActive }) => (isActive ? 'bg-[#1D1B31] ' : 'inactive ') + LINK_STYLE} to={route}>
                <Icon size={20} />
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
