import ProductCard from "@/components/ProductCard";
import { getCollectionDetails } from "@/lib/actions/actions";
import Image from "next/image";
import React from "react";

const CollectionDetails = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const { collectionId } = await params;

  const collectionDetails = await getCollectionDetails(collectionId);

  return (
    <div className="px-10 py-5 flex flex-col items-center gap-8">
      <Image
        className="w-full h-[400px] object-cover rounded-xl"
        src={collectionDetails.image}
        width={1500}
        height={1000}
        alt="collection"
      />
      <p className="text-heading3-bold font-bold text-grey-1">{collectionDetails.title}</p>
      <p className="text-body-bold text-center max-w-[900px] text-grey-1">
        {collectionDetails.description}
      </p>
      <div className="flex flex-wrap gap-18 mx-auto">
        {collectionDetails.products?.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CollectionDetails;
