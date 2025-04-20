"use client";
import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { getProductDetails } from "@/lib/actions/actions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  const getUser = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      setSignedInUser(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (user && signedInUser === null) {
      getUser();
    }
  }, [user]);

  const getWishlistProducts = async () => {
    setLoading(true);

    if (!signedInUser) return;

    console.log("wishlist:", signedInUser.wishlist);

    const wishlistProducts = await Promise.all(
      signedInUser.wishlist.map(async (productId) => {
        const response = await getProductDetails(productId);
        return response;
      })
    );
    setLoading(false);
    setWishlist(wishlistProducts);
  };

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts();
    }
  }, [signedInUser]);

  const updatedSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser);
  }

  return loading ? (
    <Loader />
  ) : (
    <div className="py-10 py-5">
      <p className="text-heading3-bold my-10">Your Wishlist</p>
      {wishlist?.length === 0 && (<p>No items in your wishlist!</p>)}

      <div className="flex flex-wrap gap-16 justify-center">
        {wishlist.map((product) => (
          <ProductCard key={product._id} product={product} updatedSignedInUser={updatedSignedInUser}/> 
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
