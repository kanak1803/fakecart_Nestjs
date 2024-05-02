"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { logout } from "@/helpers/authUtils";
import { useAuth } from "@/authContext";
import { useCart } from "@/cartContext";
import { FaCartShopping } from "react-icons/fa6";
import CartIcon from "./CartIcon";
import SearchProduct from "./SearchBar";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const category = {
    ELECTRONICS: "Electronics",
    CLOTHS: "Clothing",
    Books: "Books",
    Other: "Other",
  };

  const { cart } = useCart();

  const totalItems = cart?.cartItems?.reduce(
    (acc, item) => acc + item?.quantity,
    0
  );

  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <div data-theme="dark" className="navbar bg-base-100 sticky top-0 z-10">
      <div className="flex-1">
        <FaShoppingCart size={22} />
        <Link className="btn btn-ghost text-xl mr-[40px]" href={"/"}>
          FakeCart
        </Link>
        <ul className="flex gap-5">
          <Link href={`/category/${category.CLOTHS}`}>CLOTHS</Link>
          <Link href={`/category/${category.ELECTRONICS}`}>ELECTRONICS</Link>
          <Link href={`/category/${category.Books}`}>BOOKS</Link>
        </ul>
      </div>

      <CartIcon totalItems={totalItems} />

      <div className="flex-none gap-2">
        <SearchProduct />
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={"/profile"} className="justify-between ">
                  Profile
                </Link>
                <Link href={"/adminpanel"} className="justify-between">
                  Admin
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className=" flex gap-5">
            <Link className="btn  " href={"/signup"}>
              SignUp
            </Link>
            <Link className="btn btn-outline" href={"/login"}>
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
