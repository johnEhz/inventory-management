import React from "react";
import { Product } from "../types";

interface ProductListProps {
  products: Product[] | undefined;
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Referencia</td>
            <td>Nombre</td>
            <td>Descripción</td>
            <td>Marca</td>
            <td>Proveedor</td>
            <td>Stock</td>
            <td>Precio/U</td>
            <td>Inversión</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((item, idx) => (
              <tr key={item._reference}>
                <td>{idx}</td>
                <td>{item._reference}</td>
                <td>{item.name}</td>
                <td>{item.description.substring(0, 10)}...</td>
                <td>{item.brand.name}</td>
                <td>{item.provider.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.invest}</td>
                <td>
                  <ul>
                    <li>
                      <button>Edit</button>
                    </li>
                    <li>
                      <button>Delete</button>
                    </li>
                  </ul>
                </td>
              </tr>
            ))
          ) : (
            <h2>No se encontraron productos</h2>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
