"use client";
import React, { useState } from "react";
import ProductForm from "../Components/ProductForm";
import AllProductsFromDb from "../Components/AllProductsFromDb";

const AdminPanel = () => {
  const [productForm, setProductForm] = useState(false);

  return (
    <div>
      <div>
        <ul className="flex justify-center gap-10 text-2xl font-semibold my-3">
          <button className="btn btn-secondary" onClick={() => setProductForm(true)}>Product Form</button>
          <button className="btn btn-secondary " onClick={() => setProductForm(false)}>All Products</button>
        </ul>
      </div>
      <div>{productForm ? <ProductForm /> : <AllProductsFromDb />}</div>
    </div>
  );
};

export default AdminPanel;
