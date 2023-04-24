import React from "react";
import { NavLink } from "react-router-dom";
import { InventoryRoute } from "../types";
import { formatDate } from "../utils/formatDate";

interface InventoryRoutesProps {
  inventoryRoutes: InventoryRoute[];
}

const InventoryRoutes = ({ inventoryRoutes }: InventoryRoutesProps) => {
  return (
    <ul
      className={`px-3 flex flex-col ${
        inventoryRoutes.length > 0 && "pb-6"
      }`}
    >
      {inventoryRoutes.map((InvenytoryRoute) => (
        <li key={InvenytoryRoute._id} className="flex flex-col border-b border-[#3c3b4b]">
          <NavLink
            className="text-[#5B5A71] text-sm rounded p-2 hover:bg-[#353455] transition-colors flex flex-col hover:text-slate-200"
            to={`inventory/${InvenytoryRoute._id}`}
          >
            {InvenytoryRoute.name}
            <small className="text-[12px] italic text-[#696969]">
              Creación: {formatDate(InvenytoryRoute.createdAt)}
            </small>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default InventoryRoutes;
