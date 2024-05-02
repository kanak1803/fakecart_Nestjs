"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Skeleton from "./Skeleton";
import { TailSpin } from "react-loader-spinner";

const AllProductsFromDb = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/products/getallproduct");
        setProducts(response.data.foundProduct);
      } catch (error) {
        console.error("Failed to fetch products from DB", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-5">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-4 gap-8 2xl:p-10">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllProductsFromDb;
