"use client"
// ProductSearchContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Create context
const SearchContext = createContext();

// Provider component
export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle product search
  const searchProduct = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/products/search/${query}`);
      setSearchResults(response.data.product);
    } catch (error) {
      setError("Failed to fetch search results. Please try again later.");
    }
    setLoading(false);
  };

  // Context value
  const value = {
    searchResults,
    loading,
    error,
    searchProduct,
    query,
    setQuery,
  };

  // Provide context value to children
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

// Custom hook to use the context
export const useSearch = () => useContext(SearchContext);
