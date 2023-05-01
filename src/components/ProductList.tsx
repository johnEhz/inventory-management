import React, { useState } from "react";
import { Product, ProductDetailI } from "../types";
import { AiOutlineWarning } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

//DETAIL
import ProductDetail from "./ProductDetail";

//DELETE SERVICE
import { deleteProduct } from "../services/products/deleteProduct";
import { toast } from "react-toastify";

interface ProductListProps {
  products: Product[] | undefined;
  toggleShowProductModal: (id?: string) => void;
  reloadData: () => void;
}

const DETAIL_INITIAL_STATE: ProductDetailI = {
  show: false,
  product: undefined,
};

const ProductList = ({
  products,
  toggleShowProductModal,
  reloadData,
}: ProductListProps) => {
  const [showDetail, setShowDetail] =
    useState<ProductDetailI>(DETAIL_INITIAL_STATE);
  const { inventoryId } = useParams();
  const { user } = useAuth();

  const toggleShowDetail = (product?: Product) => {
    setShowDetail({
      show: !showDetail.show,
      product: product ? product : undefined,
    });
  };

  const handleDeleteProduct = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId?: string
  ) => {
    try {
      e.stopPropagation();
      if (!user?.token) throw new Error("No autorizado");
      if (!productId) throw new Error("Acción imposible");
      if (!inventoryId) throw new Error("No se encontró el inventario");
      await deleteProduct(user.token, productId, inventoryId).then(async () => {
        await reloadData();
      });
      toast.success('Producto eliminado')
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <>
      <ProductDetail
        show={showDetail.show}
        product={showDetail.product}
        toggleShow={toggleShowDetail}
      />
      <h2 className="text-center py-3 font-bold text-lg">
        Productos registrados
      </h2>
      <div className="table-wrapper">
        {products && products.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th scope="col" className="th-style">
                  Id
                </th>
                <th scope="col" className="th-style">
                  Referencia
                </th>
                <th scope="col" className="th-style">
                  Nombre
                </th>
                <th scope="col" className="th-style">
                  Descripción
                </th>
                <th scope="col" className="th-style">
                  Marca
                </th>
                <th scope="col" className="th-style">
                  Proveedor
                </th>
                <th scope="col" className="th-style">
                  Stock
                </th>
                <th scope="col" className="th-style">
                  Precio/U
                </th>
                <th scope="col" className="th-style">
                  Inversión
                </th>
                <th scope="col" className="th-style">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, idx) => (
                <tr
                  onClick={(e) => toggleShowDetail(item)}
                  key={item._id}
                  className="border-b hover:bg-green-100 cursor-pointer transition-colors"
                >
                  <th scope="row" className="th-style th-main">
                    {idx}
                  </th>
                  <td className="td-style">{item._reference}</td>
                  <td className="td-style">{item.name}</td>
                  <td className="td-style">
                    {item.description.substring(0, 12)}...
                  </td>
                  <td className="td-style">
                    {item.brand ? item.brand.name : "Unknow"}
                  </td>
                  <td className="td-style">
                    {item.provider ? item.provider.name : "Unknow"}
                  </td>
                  <td className="td-style text-center">{item.quantity}</td>
                  <td className="td-style">{item.price}</td>
                  <td className="td-style text-green-500 font-bold">
                    {item.invest}
                  </td>
                  <td>
                    <ul className="table-controls">
                      <li>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleShowProductModal(item._id);
                          }}
                          className="action-button edit-button"
                        >
                          <FaEdit size={20} />
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={(e) => handleDeleteProduct(e, item._id)}
                          className="action-button delete-button"
                        >
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
            No se encontraron productos para este inventario.
            <AiOutlineWarning size={18} />
          </h2>
        )}
      </div>
    </>
  );
};

export default ProductList;
