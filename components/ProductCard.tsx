"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LikeHeart from "./LikeHeart";

interface ProductCardProps {
  product: ProductType;
  updatedSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, updatedSignedInUser }) => {

  return (
    <Link
      className="w-[220px] flex flex-col gap-2"
      href={`/products/${product._id}`}
    >
      <Image
        className="h-[250px] rounded-lg object-cover"
        src={product?.media[0]}
        alt="product"
        width={250}
        height={300}
      />

      <div>
        <p className="text-base-bold font-bold">{product.title}</p>
        <p className="text-small-medium text-grey-1">{product.category}</p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-base-medium font-semibold">${product.price}</p>
        <LikeHeart product={product} updatedSignedInUser={updatedSignedInUser}/>
      </div>
    </Link>
  );
};

export default ProductCard;
