"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import useCart from "@/lib/hooks/useCart";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user } = useUser();
  const cart = useCart();
  const router = useRouter();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white text-black max-sm:px-2">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={130} height={100} />
      </Link>

      <div className="flex gap-4 text-base-bold font-semibold max-lg:hidden">
        <Link href="/" className="hover:text-blue-1">
          Home
        </Link>
        <Link
          href={user ? "/wishlist" : "/sign-in"}
          className="hover:text-blue-1"
        >
          Wishlist
        </Link>
        <Link
          href={user ? "/orders" : "/sign-in"}
          className="hover:text-blue-1"
        >
          Orders
        </Link>
      </div>

      <div className="flex gap-3 border border-grey-1 rounded-full px-3 py-1 items-center">
        <input
          className="outline-none max-sm:max-w-[120px]"
          placeholder="Search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button disabled={query === ""} onClick={() => router.push(`/search/${query}`)}>
        <Search className="cursor-pointer h-4 w-4 hover:text-blue-1" />
        </button>
        
      </div>

      <div className="relative flex gap-3 items-center">
        <Link
          href="/cart"
          className="flex item-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
        >
          <ShoppingCart />
          <p className="text-base-bold">Cart ({cart.cartItems?.length || 0})</p>
        </Link>

        <Menu
          className="cursor-pointer lg:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />

        {dropdownMenu && (
          <div className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden">
            <Link href="/" className="hover:text-blue-1">
              Home
            </Link>
            <Link
              href={user ? "/wishlist" : "/sign-in"}
              className="hover:text-blue-1"
            >
              Wishlist
            </Link>
            <Link
              href={user ? "/orders" : "/sign-in"}
              className="hover:text-blue-1"
            >
              Orders
            </Link>

            <Link
              href="/cart"
              className="flex item-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
            >
              <ShoppingCart />
              <p className="text-base-bold">
                Cart ({cart.cartItems?.length || 0})
              </p>
            </Link>
          </div>
        )}

        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <CircleUserRound />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
