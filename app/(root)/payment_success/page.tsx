"use client";
import useCart from "@/lib/hooks/useCart";
import Link from "next/link";
import { useEffect } from "react";

const SuccessfulPayment = () => {
  const cart = useCart();

  useEffect(() => {
    cart.clearCart();
  }, []);

  return (
    <div className="h-screen bg-white text-black flex flex-col justify-center items-center gap-5">
      <p className="text-heading4-bold text-red-1">Successful Payment</p>
      <p className="text-heading4-bold text-black">
        Thank you for your purchase!
      </p>
      <Link
        href="/"
        className="p-4 border text-base-bold hover:bg-black hover:text-white rounded-lg bg-white text-black"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default SuccessfulPayment;
