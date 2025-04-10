import { getProducts } from "@/lib/actions";
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = async () => {
  const productData= await getProducts();

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Products</p>
      {!productData.products || productData.products.length === 0 ? (
        <p className="text-body-bold">No Products Found!</p>
      ) : (
       <div className="flex flex-wrap justify-center gap-16">
          {productData.products.map((product: ProductType) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
