"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { useSearch } from "@/searchContext";

const SearchBar = () => {
  const router = useRouter();
  const { query, setQuery, searchProduct } = useSearch();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchProduct(query);
      router.push("/search");
      setQuery("")
      // Trigger search action here
      //   router.push(`/search/${searchQuery}`);
    }
  };
  //   function handleSubmit(e) {
  //     e.preventDefault();

  //   }

  return (
    <div>
      <input
        type="text"
        id="search-navbar"
        className="block w-full p-2 ps-10 text-sm   border rounded-lg  focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      {/* <button onClick={handleSubmit} className="btn btn-primary">
        Search
      </button> */}
    </div>
  );
};

export default SearchBar;
