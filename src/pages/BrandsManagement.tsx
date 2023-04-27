import React, { useState, useEffect } from "react";
import CustomList from "../components/CustomList";
import { getBrands } from "../services/brands/getBrands";
import { createBrand } from "../services/brands/createBrand";
import { useAuth } from "../hooks/useAuth";
import { Brand, BrandCreation } from "../types";
import { toast } from 'react-toastify'

const INPUT_STYLE = "px-3 py-2 rounded outline-none text-normal border";
const CONTROL_STYLE = "flex flex-col gap-1";
const BRAND_INITIAl_STATE: BrandCreation = {
  name: "",
};

const BrandsManagement = () => {
  const { user, logout } = useAuth();
  const [brands, setBrands] = useState<Brand[]>();
  const [brand, setBrand] = useState<BrandCreation>(BRAND_INITIAl_STATE);

  const loadBrands = async () => {
    try {
      if (!user?.token) {
        throw new Error("No autorizado...");
      }
      getBrands(user.token).then((res) => {
        setBrands(res.data);
      });
    } catch (error) {
      console.error(error);
      logout && logout();
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const handleCreateBrand = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createBrand(user?.token, brand)
      toast.success(`Nueva marca registrada!`)
      await loadBrands();
      setBrand(BRAND_INITIAl_STATE)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    loadBrands();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="bg-white flex flex-col gap-5 max-w-[600px] w-full rounded sm:p-6 px-3 py-9 shadow-lg">
        <h2 className="text-center text-3xl font-normal">Gestión de Marcas</h2>
        <form className="bg-white" onSubmit={handleCreateBrand}>
          <ul className="flex flex-col gap-7">
            <li className={`${CONTROL_STYLE}`}>
              <label htmlFor="brand-name" className="font-bold">
                Nombre
              </label>
              <input
                type="text"
                onChange={handleChangeInput}
                value={brand.name}
                name="name"
                id="brand-name"
                placeholder="Ej: COLANTA, SAMSUNG, CHEVROLET"
                className={`${INPUT_STYLE}`}
              />
            </li>
            <li className={`${CONTROL_STYLE}`}>
              <button className="bg-green-600 hover:bg-green-700 p-2 rounded text-white text-normal transition-colors">
                Añadir marca
              </button>
            </li>
          </ul>
        </form>
      </div>
      <CustomList data={brands} />
    </div>
  );
};

export default BrandsManagement;
