import React from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Brand, Provider } from "../types";
import { useAuth } from "../hooks/useAuth";
import { formatDate } from "../utils/formatDate";

interface CustomListProps {
  data?: Brand[] | Provider[] | undefined;
}

const CustomList = ({ data }: CustomListProps) => {
  const { user } = useAuth();
  return (
    <>
      <h2 className="text-center font-bold text-lg">Items registrados</h2>
      <div className="table-wrapper">
        {data && data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th scope="col" className="th-style">
                  id
                </th>
                <th scope="col" className="th-style">
                  Autor
                </th>
                <th scope="col" className="th-style">
                  Nombre
                </th>
                <th scope="col" className="th-style">
                  Fecha Creación
                </th>
                <th scope="col" className="th-style">
                  Fecha Modificación
                </th>
                <th scope="col" className="th-style">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="border-b">
                  <th scope="row" className="th-style th-main">
                    {item._id.substring(0, 5)}...
                  </th>
                  <td className="td-style">{user?.name}</td>
                  <td className="td-style">{item.name}</td>
                  <td className="td-style">{formatDate(item.createdAt)}</td>
                  <td className="td-style">{formatDate(item.updatedAt)}</td>
                  <td className="td-style">
                    <ul className="table-controls">
                      <li>
                        <button className="action-button edit-button">
                          <FaEdit size={20} />
                        </button>
                      </li>
                      <li>
                        <button className="action-button delete-button">
                          <RiDeleteBin6Line size={20} />
                        </button>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="text-red-500 font-normal flex flex-row items-center gap-2 justify-center">
            No se encontraron items registradas
            <AiOutlineWarning size={18} />
          </h2>
        )}
      </div>
    </>
  );
};

export default CustomList;
