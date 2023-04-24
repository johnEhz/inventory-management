import React from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { Brand } from "../types";
import { useAuth } from "../hooks/useAuth";
import { formatDate } from "../utils/formatDate";

interface BrandListProps {
  brands: Brand[] | undefined;
}

const BrandList = ({ brands }: BrandListProps) => {
  const { user } = useAuth();
  return (
    <div>
      {brands && brands.length > 0 ? (
        <table className="border">
          <thead>
            <tr>
              <td>ID</td>
              <td>Autor</td>
              <td>Nombre</td>
              <td>Fecha Creación</td>
              <td>Fecha Modificación</td>
              <td>Acciones</td>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand._id}>
                <td>{brand._id}</td>
                <td>{user?.name}</td>
                <td>{brand.name}</td>
                <td>{formatDate(brand.createdAt)}</td>
                <td>{formatDate(brand.updatedAt)}</td>
                <td className="">
                  <ul className="flex flex-row gap-2 bg-blue-300">
                    <li>
                      <button>Update</button>
                    </li>
                    <li>
                      <button>Delete</button>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2 className="text-red-500 font-normal flex flex-row items-center gap-2">
          No se encontraron marcas registradas
          <AiOutlineWarning size={18} />
        </h2>
      )}
    </div>
  );
};

export default BrandList;
