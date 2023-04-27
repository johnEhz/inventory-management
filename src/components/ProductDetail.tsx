import React from "react";
import CustomModal from "../components/CustomModal";
import ProductInfo from "../components/ProductInfo";
import { Product } from "../types";
import { formatDate } from "../utils/formatDate";

interface ProductDetailProps {
  toggleShow: () => void;
  show: boolean;
  product: Product | undefined;
}

const ProductDetail = ({ show, product, toggleShow }: ProductDetailProps) => {
  return (
    <CustomModal show={show} min_heigth="min-h-[800px]">
      <>
        {!product ? (
          <div className="bg-white rounded p-4 max-w-[300px] w-full flex flex-col gap-2 text-center">
            <h2 className="text-red-600 font-bold">Error</h2>
            <p className="text-gray-500">Producto no incluido</p>
            <button
              onClick={() => toggleShow()}
              className="text-center bg-red-600 w-full p-1 rounded text-white"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <div className="bg-white max-w-[500px] w-full p-4 py-5 flex flex-col gap-5 rounded">
            <h2 className="text-center text-lg font-bold">Product Info</h2>
            <ul className="flex flex-col gap-4">
              <li>
                <ProductInfo info="ID" definition={product._id} />
              </li>
              <li>
                <ProductInfo
                  info="Referencia"
                  definition={product._reference}
                />
              </li>
              <li>
                <ProductInfo info="Nombre" definition={product.name} />
              </li>
              <li>
                <ProductInfo
                  info="Descripción"
                  definition={product.description}
                />
              </li>
              <li>
                <ProductInfo info="Stock" definition={product.quantity} />
              </li>
              <li>
                <ProductInfo
                  info="Precio unitario"
                  definition={product.price}
                />
              </li>
              <li>
                <ProductInfo
                  info="Inversión total"
                  definition={product.invest}
                />
              </li>
              <li>
                <ul className="grid grid-cols-2">
                  <li className="text-center">
                    <ProductInfo
                      info="Marca"
                      definition={product.brand?.name}
                    />
                  </li>
                  <li className="text-center">
                    <ProductInfo
                      info="Proveedor"
                      definition={product.provider?.name}
                    />
                  </li>
                </ul>
              </li>
              <li>
                <ul className="text-center flex flex-col gap-3">
                  <li>
                    <ProductInfo
                      info="Fecha de registro"
                      definition={formatDate(product.createdAt)}
                    />
                  </li>
                  <li>
                    <ProductInfo
                      info="Ultima actualización"
                      definition={formatDate(product.updatedAt)}
                    />
                  </li>
                </ul>
              </li>
            </ul>
            <button
              onClick={() => toggleShow()}
              className="text-center bg-red-500 hover:bg-red-600 transition-colors w-full p-1 rounded text-white"
            >
              Cerrar
            </button>
          </div>
        )}
      </>
    </CustomModal>
  );
};

export default ProductDetail;
