import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Inventory } from "../types";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { formatDate } from "../utils/formatDate";
import { AiOutlineWarning, AiOutlinePlus } from "react-icons/ai";
import { FiRefreshCcw } from "react-icons/fi";

import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

import { getInventoryById } from "../services/inventories/getInventoryById";
import { deleteInventoryById } from "../services/inventories/deleteInventoryById";

const UserInventory = () => {
  const [userInventory, setUserInventory] = useState<Inventory>();
  const [showProductModal, setShowProductModal] = useState(false);
  const { user, logout } = useAuth();
  const { inventoryId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      if (!user?.token) {
        throw new Error("No autorizado!");
      }
      loadInventoryById();
    } catch (error) {
      toast.error("Su sesión ha expirado.");
      logout && logout();
    }
  }, [inventoryId]);

  const loadInventoryById = async () => {
    if (!user?.token) return;

    await getInventoryById(user.token, inventoryId).then((res) => {
      setUserInventory(res.data);
    });
  };

  const deleteInventory = async () => {
    if (!user?.token) return;

    await deleteInventoryById(user.token, inventoryId);
  };

  const handleDeleteInventory = async () => {
    const ans = window.confirm("¿Esta seguro de eliminar este inventario?");
    if (!ans) return;

    await deleteInventory();
    navigate("/app/");
    toast.success("Inventario eliminado");
  };

  const toggleShowProductModal = () => {
    setShowProductModal(!showProductModal);
  };

  return (
    <>
      <ProductForm
        toggleShowProductModal={toggleShowProductModal}
        inventory={userInventory}
        reloadInventory={loadInventoryById}
        show={showProductModal}
      />
      <div className="sm:px-4">
        <div className="flex flex-col gap-5 sm:flex-row justify-between">
          <div className="flex flex-col gap-5">
            <div className=" flex flex-row gap-2">
              <h2 className="text-2xl font-bold text-gray-700">
                Información del inventario
              </h2>
              <button onClick={loadInventoryById}>
                <FiRefreshCcw />
              </button>
            </div>
            <div>
              <h3 className="flex flex-row gap-2 items-center text-green-700">
                <span className="font-bold">Nombre:</span>
                {userInventory?.name}
              </h3>
              <small className="text-sm italic text-gray-500">
                {inventoryId}
              </small>
            </div>
            <ul className="text-gray-700">
              <li>
                <h3 className="font-bold ">
                  Creacion{"  "}
                  <span className="text-gray-500 text-sm font-normal">
                    {formatDate(userInventory?.createdAt)}
                  </span>
                </h3>
              </li>
              <li>
                <h3 className="font-bold">
                  Actualizado{"  "}
                  <span className="text-gray-500 text-sm font-normal">
                    {formatDate(userInventory?.updatedAt)}
                  </span>
                </h3>
              </li>
            </ul>
            <div className="text-gray-700">
              <h3 className="font-bold">Descripción</h3>
              <p>{userInventory?.description}</p>
            </div>
            <div className="text-gray-700 flex flex-col">
              <h3 className="font-bold">Info</h3>
              <span>{userInventory?.items.length} productos registrados.</span>
              <span>
                Inversión total:{" "}
                {userInventory?.items
                  ? userInventory.items
                      .map((item: any) => item.invest)
                      .reduce(
                        (acum: any, current: any) =>
                          Number(acum) + Number(current),
                        0
                      )
                  : 0}
              </span>
            </div>
          </div>
          <div>
            <ul className="flex flex-col gap-2">
              <li>
                <button
                  onClick={toggleShowProductModal}
                  className="bg-green-400 transition-colors p-2 rounded text-white w-[180px] flex flex-row justify-center items-center gap-2 hover:bg-green-600"
                >
                  <AiOutlinePlus />
                  Agregar Producto
                </button>
              </li>
              <li>
                <button
                  onClick={handleDeleteInventory}
                  className="bg-red-500 transition-colors p-2 rounded text-white w-[180px] flex flex-row justify-center items-center gap-2 hover:bg-red-700"
                >
                  <AiOutlineWarning />
                  Eliminar Inventario
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <ProductList products={userInventory?.items} />
        </div>
      </div>
    </>
  );
};

export default UserInventory;
