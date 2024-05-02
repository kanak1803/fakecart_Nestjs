"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/searchContext";
import ProductCard from "../Components/ProductCard";

const Search = () => {
  const { searchResults, loading, error } = useSearch();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      {searchResults.length === 0 ? (
        <div className="font-semibold text-center text-2xl m-10">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 2xl:p-10">
          {searchResults.map((product) => (
            <ProductCard key={product._id} productData={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
