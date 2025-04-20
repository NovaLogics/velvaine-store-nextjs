import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import ProductInfo from "@/components/ProductInfo";
import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions";
import React from "react";

const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const { productId } = await params;
  const productDetails = await getProductDetails(productId);
  const relatedProducts = await getRelatedProducts(productId);

  console.log(productDetails);

  return (
    <>
      <div className="bg-white text-black flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        <Gallery productMedia={productDetails.media} />
        <ProductInfo productInfo={productDetails} />
      </div>

      <div className="flex flex-col items-center px-10 py-5 max-sm:px-3">
        <p className="text-heading3-bold font-semibold">Related Products</p>

        <div className="flex flex-wrap gap-16 mx-auto mt-8">
          {relatedProducts.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
