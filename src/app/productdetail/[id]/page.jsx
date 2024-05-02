"use client";
import ProductDetailPage from "@/app/Components/ProductDetailPage";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductDetail = ({ params }) => {
  const productId = params.id;
  const [productdetailFromAPI, setProductDetailFromAPI] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`/api/products/getproduct/${productId}`);
        console.log(res);
        setProductDetailFromAPI(res.data.product);
      } catch (error) {
        console.error("failed to get product detail from DB", error);
      }
    };
    fetchProductDetails();
  }, []);
  return (
    <div>
      <ProductDetailPage ProductDetail={productdetailFromAPI} />
    </div>
  );
};

export default ProductDetail;
