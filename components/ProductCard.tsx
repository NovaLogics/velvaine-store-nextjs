"use client";
import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("api/users");
      const data = await response.json();
      setSignedInUser(data);
      setIsLiked(data.wishlist?.includes(product._id));
      setLoading(false);
    } catch (error) {
      console.log("[user_GET]", error);
    }
  };

  useEffect(() => {
    if (user) getUser();
  }, [user]);

  const handleLike = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    try {
      if (!user) {
        router.push("/sign-in");
        return;
      }

      setLoading(true);
      const response = await fetch("api/users/wishlist", {
        method: "POST",
        body: JSON.stringify({ productId: product._id }),
      });
      const updateUser = await response.json();
      setSignedInUser(updateUser);
      setIsLiked(updateUser.wishlist.includes(product._id));
    } catch (error) {
      console.log("[wishlist_POST]", error);
    }
  };

  return (
    <Link
      className="w-[220px] flex flex-col gap-2"
      href={`/products/${product._id}`}
    >
      <Image
        className="h-[250px] rounded-lg object-cover"
        src={product.media[0]}
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
        <button onClick={handleLike}>
          <Heart fill={`${isLiked ? "red" : "white"}`} />
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
