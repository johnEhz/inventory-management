import React from "react";

interface ProductInfoProps {
  info: string;
  definition?: string | number | undefined;
}

const ProductInfo = ({ info, definition }: ProductInfoProps) => {
  return (
    <>
      <h2 className="text-black font-bold">{info}</h2>
      <p className="text-gray-600">{definition ? definition : "Not provided"}</p>
    </>
  );
};

export default ProductInfo;
