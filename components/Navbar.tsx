"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
  const {user} = useUser();

  const [dropdownMenu, setDropdownMenu] = useState();

  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex justify-between items-center bg-white text-black">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={130} height={100} />
      </Link>

      <div>
        <Link href="/">Home</Link>
      </div>

      <div className="flex gap-3 items-center">
        <Link
          href="/cart"
          className="flex item-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
        >
          <ShoppingCart />
          <p className="text-base-bold">Cart (0)</p>
        </Link>

        {user &&  <Menu className="cursor-pointer" />}
      </div>
    </div>
  );
};

export default Navbar;
