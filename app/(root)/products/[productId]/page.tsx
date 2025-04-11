import Gallery from "@/components/Gallery";
import ProductInfo from "@/components/ProductInfo";
import { getProductDetails } from "@/lib/actions/actions";
import React from "react";

const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const { productId } = await params;
  const productDetails = await getProductDetails(productId);

  console.log(productDetails);

  return (
    <div className="bg-white text-black flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
      <Gallery productMedia={productDetails.media} />
      <ProductInfo productInfo={productDetails}/>
    </div>
  );
};

export default ProductDetails;
