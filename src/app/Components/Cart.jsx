"use client";
import { useCart } from "@/cartContext";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Cart = () => {
  const { cart, addToCart, deleteItemFromCart } = useCart();
  const totalAmount = cart?.cartItems?.reduce(
    (acc, item) => acc + item?.quantity * item?.price,
    0
  );

  const increaseQty = (cartItem) => {
    let newQty = cartItem?.quantity + 1;

    const item = { ...cartItem, quantity: newQty };

    addToCart(item);
  };
  const decreaseQty = (cartItem) => {
    if (cartItem?.quantity > 0) {
      const newQty = cartItem?.quantity - 1;
      const item = { ...cartItem, quantity: newQty };

      addToCart(item);
    }
  };

  return (
    <>
      <section className="py-5 sm:py-7 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2 text-center">
            {cart?.cartItems?.length === 0 ? (
              "Cart Empty"
            ) : (
              <div>{cart?.cartItems?.length || 0} Item(s) in Cart</div>
            )}
          </h2>
        </div>
      </section>

      {cart?.cartItems?.length > 0 && (
        <section className="py-10">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <main className="md:w-3/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  {cart?.cartItems?.map((cartItem) => (
                    <div>
                      <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                        <div className="w-full lg:w-2/5 xl:w-2/4">
                          <figure className="flex leading-5">
                            <div>
                              <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden relative">
                                <Image
                                  src={cartItem?.image}
                                  alt={cartItem?.name}
                                  fill
                                  objectFit="contain"
                                />
                              </div>
                            </div>
                            <figcaption className="ml-3">
                              <p>
                                <Link
                                  href={`/productdetail/${cartItem?.product_id}`}
                                  className="hover:text-blue-600"
                                >
                                  {cartItem?.name}
                                </Link>
                              </p>
                            </figcaption>
                          </figure>
                        </div>
                        <div className="w-24">
                          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <button
                              data-action="decrement"
                              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                              onClick={() => decreaseQty(cartItem)}
                              disabled={cartItem?.quantity <= 0}
                            >
                              <span className="m-auto text-2xl font-thin">
                                −
                              </span>
                            </button>
                            <input
                              type="number"
                              className=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  outline-none custom-input-number"
                              name="custom-input-number"
                              value={cartItem?.quantity}
                              readOnly
                            ></input>

                            <button
                              data-action="increment"
                              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                              onClick={() => increaseQty(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                +
                              </span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="leading-5">
                            <p className="font-semibold not-italic">
                              ₹
                              {cartItem?.price * cartItem?.quantity?.toFixed(2)}
                            </p>
                            <small className="text-gray-400">
                              {" "}
                              ₹{cartItem?.price} / per item{" "}
                            </small>
                          </div>
                        </div>
                        <div className="flex-auto">
                          <div className="float-right">
                            <a
                              className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                deleteItemFromCart(cartItem?.product_id)
                              }
                            >
                              Remove
                            </a>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />
                    </div>
                  ))}
                </article>
              </main>
              <aside className="md:w-1/4">
                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                  <ul className="mb-5">
                    <li className="flex justify-between text-gray-600  mb-1">
                      <span>Total Units:</span>
                      <span className="text-green-500">
                        {cart?.cartItems?.reduce(
                          (acc, item) => acc + item?.quantity,
                          0
                        )}{" "}
                        (Units)
                      </span>
                    </li>

                    <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                      <span>Total price:</span>
                      <span>₹{totalAmount}</span>
                    </li>
                  </ul>

                  <a className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer">
                    Continue
                  </a>

                  <Link
                    href="/"
                    className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                  >
                    Back to shop
                  </Link>
                </article>
              </aside>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
