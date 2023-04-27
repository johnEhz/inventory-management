import React, { useEffect, useState } from "react";
import { ProductCreation, Product, Brand, Provider, Inventory } from "../types";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

//SERVICES
import { getBrands } from "../services/brands/getBrands";
import { getProviders } from "../services/providers/getProviders";
import { updateInventoryById } from "../services/inventories/updateInventoryById";

//MODAL
import CustomModal from "./CustomModal";

interface ProductModalFormProps {
  id?: string;
  inventory?: Inventory;
  reloadInventory: () => void;
  toggleShowProductModal: () => void;
  show: boolean
}

const INPUT_STYLE = "px-3 py-2 rounded outline-none text-normal border";
const CONTROL_STYLE = "flex flex-col gap-1";

const PRODUCT_INITIAL_STATE: ProductCreation = {
  _reference: "",
  name: "",
  brand: undefined,
  provider: undefined,
  description: "",
  quantity: 0,
  price: 0,
};

const ProductModalForm = ({
  id,
  inventory,
  reloadInventory,
  toggleShowProductModal,
  show
}: ProductModalFormProps) => {
  const [brands, setBrands] = useState<Brand[]>();
  const [providers, setProviders] = useState<Provider[]>();
  const [product, setProduct] = useState<ProductCreation>(
    PRODUCT_INITIAL_STATE
  );
  const { inventoryId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    try {
      loadBrands();
      loadProviders();
    } catch (error) {
      toast.error("Error al cargar datos...");
    }
  }, []);

  const loadBrands = () => {
    if (!user?.token) throw new Error("No Autorizado");

    getBrands(user.token).then((res) => {
      setBrands(res.data);
    });
  };

  const loadProviders = () => {
    if (!user?.token) throw new Error("No Autorizado");

    getProviders(user.token).then((res) => {
      setProviders(res.data);
    });
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.value === "Unknow"
      ? setProduct({
          ...product,
          [e.target.name]: undefined,
        })
      : setProduct({
          ...product,
          [e.target.name]: {
            name: e.target.value,
          },
        });
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!user?.token) throw new Error("No autorizado");

      await updateInventoryById(user?.token, inventoryId, {
        name: inventory?.name,
        description: inventory?.description,
        items: [...inventory?.items, product],
      });

      await reloadInventory();

      toggleShowProductModal();

      toast.success(`Producto con referencia ${product._reference} añadido.`);
      setProduct(PRODUCT_INITIAL_STATE);
    } catch (error) {
      toast.error("Error al registrar el producto");
    }
  };

  return (
    <CustomModal min_heigth="min-h-[900px]" show={show}>
      <div className="bg-white flex flex-col gap-5 p-2 sm:px-5 py-8 rounded max-w-[500px] w-full">
        <h2 className="text-center text-2xl">Nuevo Producto</h2>
        <form onSubmit={handleAddProduct} className="flex flex-col gap-5">
          <ul className="flex flex-col gap-7">
            <li className={CONTROL_STYLE}>
              <label htmlFor="_reference">Referencia</label>
              <input
                onChange={handleChangeInput}
                value={product._reference}
                name="_reference"
                type="text"
                className={INPUT_STYLE}
                placeholder="ID"
              />
            </li>
            <li className={CONTROL_STYLE}>
              <label htmlFor="name">Nombre</label>
              <input
                onChange={handleChangeInput}
                value={product.name}
                name="name"
                type="text"
                className={INPUT_STYLE}
                placeholder="Nombre del producto"
              />
            </li>
            <li className={CONTROL_STYLE}>
              <label htmlFor="description">Descripción</label>
              <textarea
                onChange={handleChangeInput}
                value={product.description}
                name="description"
                rows={4}
                className={`${INPUT_STYLE} resize-none`}
                placeholder="Descripción del producto"
              />
            </li>
          </ul>
          <ul className="grid grid-cols-2 grid-rows-2 gap-5">
            <li className={CONTROL_STYLE}>
              <label htmlFor="brand">Marca</label>
              <select
                onChange={handleChangeSelected}
                value={product.brand ? product.brand.name : "Unknow"}
                id="brand"
                name="brand"
                className={INPUT_STYLE}
                placeholder="Marca del producto"
              >
                <option value="Unknow">Unknow</option>
                {brands &&
                  brands.map((brand) => (
                    <option key={brand._id} value={brand.name}>
                      {brand.name.toUpperCase()}
                    </option>
                  ))}
              </select>
            </li>
            <li className={CONTROL_STYLE}>
              <label htmlFor="provider">Proveedores</label>
              <select
                onChange={handleChangeSelected}
                value={product.provider ? product.provider.name : "Unknow"}
                id="provider"
                name="provider"
                className={INPUT_STYLE}
                placeholder="Proveedor del producto"
              >
                <option value="Unknow">Unknow</option>
                {providers &&
                  providers.map((provider) => (
                    <option key={provider._id} value={provider.name}>
                      {provider.name.toUpperCase()}
                    </option>
                  ))}
              </select>
            </li>
            <li className={CONTROL_STYLE}>
              <label htmlFor="quantity">Cantidad</label>
              <input
                onChange={handleChangeInput}
                value={product.quantity}
                id="quantity"
                name="quantity"
                type="number"
                className={INPUT_STYLE}
                placeholder="Stock"
              />
            </li>
            <li className={CONTROL_STYLE}>
              <label htmlFor="price">Precio Unitario</label>
              <input
                onChange={handleChangeInput}
                value={product.price}
                id="price"
                name="price"
                type="number"
                className={INPUT_STYLE}
                placeholder="Precio"
              />
            </li>
          </ul>
          <ul className="flex flex-col gap-2 text-center">
            <li>
              <button className="bg-green-500 text-white w-full p-2 rounded">
                Crear
              </button>
            </li>
            <li>
              <button
                onClick={toggleShowProductModal}
                className="text-red-500 p-2 rounded"
              >
                Cancelar
              </button>
            </li>
          </ul>
        </form>
      </div>
    </CustomModal>
  );
};

export default ProductModalForm;
