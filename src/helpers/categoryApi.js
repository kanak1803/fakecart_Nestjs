import axios from "axios";
import { NextResponse } from "next/server";

export const fetchCategoryProduct = async (category) => {
  try {
    const response = await axios.get(`/api/products/category/${category}`);
    return response;
  } catch (error) {
    console.log("failed to fetch category based product");
    throw new Error("Failed to fetch category-based product");
  }
};
