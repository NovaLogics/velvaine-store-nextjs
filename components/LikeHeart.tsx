"use client";
import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LikeHeart = ({ product }: { product: ProductType }) => {
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
    <button onClick={handleLike}>
      <Heart fill={`${isLiked ? "red" : "white"}`} />
    </button>
  );
};

export default LikeHeart;
