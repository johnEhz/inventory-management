import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Inventory } from "../types";
import { useAuth } from "../hooks/useAuth";
import ProductList from "../components/ProductList";
import { getInventoryById } from "../services/inventories/getInventoryById";
import { toast } from "react-toastify";

const UserInventory = () => {
  const [useInventory, setInventory] = useState<Inventory>();
  const { user, logout } = useAuth();
  const { inventoryId } = useParams();
  useEffect(() => {
    try {
      if (!user?.token) {
        throw new Error("No autorizado!");
      }
      getInventoryById(user.token, inventoryId).then((res) =>
        setInventory(res.data)
      );
    } catch (error) {
      toast.error("Su sesión ha expirado.");
      logout && logout();
    }
  }, [inventoryId]);
  return <div>Inventory with ID = {inventoryId}
  <ProductList products={useInventory?.items} />
  </div>;
};

export default UserInventory;
