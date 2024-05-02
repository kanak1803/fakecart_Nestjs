"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCart } from "@/cartContext";

const ProductCard = ({ product, productData, productCategory }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const HandleAddToCart = () => {
    addToCart({
      product_id: product?._id || productData?._id || productCategory?._id,
      name: product?.name || productData?.name || productCategory?.name,
      price: product?.price || productData?.price || productCategory?.price,
      image:
        product?.imageURL || productData?.imageURL || productCategory?.imageURL,
    });
    setIsAddedToCart(true);
    setShowToast(true);
    setTimeout(() => {
      setIsAddedToCart(false);
      setShowToast(false);
    }, 2000);
  };

  const handleDeleteProduct = async () => {
    try {
      const confirmed = confirm("Are you sure you want to delete this Product");
      if (confirmed) {
        await axios.delete(
          `/api/products/delete?id=${
            product?._id || productData?._id || productCategory?._id
          }`
        );
      }
    } catch (error) {
      console.error("Error while deleting the product", error);
    } finally {
      router.push("/");
      location.reload();
    }
  };

  return (
    <div className="flex flex-col max-sm:w-full bg-slate-200 p-6 rounded-xl shadow-md hover:shadow-lg">
      <div className="relative">
        <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 relative">
          <Image
            src={
              product?.imageURL ||
              productData?.imageURL ||
              productCategory?.imageURL
            }
            alt={product?.name || productData?.name || productCategory?.name}
            layout="fill"
            objectFit="contain"
            className="rounded-md transform transition duration-500 hover:scale-110"
          />
        </div>
      </div>
      <div className="mt-4">
        <Link
          href={`/productdetail/${
            product?._id || productData?._id || productCategory?._id
          }`}
        >
          <h3 className="text-lg font-semibold cursor-pointer hover:text-blue-500">
            {product?.name || productData?.name || productCategory?.name}
          </h3>
        </Link>
        <p className="mt-2 text-lg font-semibold text-coral-red">
          ₹{product?.price || productData?.price || productCategory?.price}
        </p>
        <div className="flex items-center 2xl:space-x-24 xl:space-x-18 md:space-x-4 sm:space-x-4">
          <div>
            {isAddedToCart ? (
              <button className="btn btn-primary mt-5">
                Adding to Cart...
              </button>
            ) : (
              <button
                onClick={HandleAddToCart}
                className="btn btn-primary mt-5"
              >
                Add to Cart
              </button>
            )}
          </div>
          {showToast && (
            <div className="2xl:toast">
              <div className="alert alert-info">
                <span>
                  {product?.name || productData?.name || productCategory?.name}{" "}
                  added to Cart
                </span>
              </div>
            </div>
          )}
          <div className=" top-2 right-2 flex space-x-2 ">
            <Link
              href={`editproduct/${
                product?._id || productData?._id || productCategory?._id
              }`}
            >
              <p className="text-blue-500 hover:text-blue-600 cursor-pointer">
                <FaEdit className="w-6 h-6" />
              </p>
            </Link>
            <button onClick={handleDeleteProduct}>
              <MdDeleteForever className="text-red-500 hover:text-red-600 w-6 h-6 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
