import React from "react";
import ProductCard from "../Components/ProductCard";
import products from "../../../data/products";
import AllProductsFromDb from "../Components/AllProductsFromDb";
import Link from "next/link";

const FeaturedProduct = () => {
  return (
    <div className="w-full h-auto bg-[#F5F7F9] mt-[120px]">
      <div className=" text-center">
        <h1 className="text-[42px] font-bold m-6">Featured Products</h1>
      </div>

      <AllProductsFromDb />
    </div>
  );
};

export default FeaturedProduct;
