"use client";

import ProductCard from "@/app/Components/ProductCard";
import { fetchCategoryProduct } from "@/helpers/categoryApi";
import { useEffect, useState } from "react";

const CategoryPage = ({ params }) => {
  const { categoryname } = params;
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchCategoryProduct(categoryname);
        setCategoryData(response.data.productCategory); // Assuming response.data contains productCategory array
        console.log(categoryData);
      } catch (error) {
        console.error("Failed to fetch category products:", error);
      }
    };

    fetchProducts();
  }, [categoryname]);

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 2xl:p-10">
          {categoryData.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
