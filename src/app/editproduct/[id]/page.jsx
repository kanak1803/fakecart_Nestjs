"use client";
import DeleteButton from "@/app/Components/DeleteButton";
import axios from "axios";
import React, { cache, useEffect, useState } from "react";

const EditPage = ({ params }) => {
  const productId = params.id;
  const [ProductDetailFromAPI, setProductDetailFromAPI] = useState({});
  const [productFormData, setProductFormData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`/api/products/getproduct/${productId}`, {
          cache: false,
        });
        const product = res.data.product;

        console.log(product.imageURL);
        setProductDetailFromAPI(product);
      } catch (error) {
        console.error("failed to get product detail from DB", error);
      }
    };
    fetchProductDetails();
  }, [productId]);
  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    if (name === "price") {
      // Check if the entered value is a number
      if (!isNaN(value)) {
        // If it's a number, update the state
        setProductFormData({ ...productFormData, [name]: value });
      }
      // If it's not a number, do nothing (don't update the state)
    } else if (type === "file") {
      // For file inputs, set the file object directly
      setProductFormData({ ...productFormData, [name]: files[0] });
    } else {
      // For other inputs, update the state normally
      setProductFormData({ ...productFormData, [name]: value });
    }
  };
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    // photo validation
    const { imageURL } = productFormData;
    console.log(imageURL);

    if (imageURL) {
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (imageURL.size > maxSize) {
        alert("File size is too large. Please select a file under 5MB.");
        return;
      }
    }

    try {
      const imgurl = await uploadFile();

      // updating imageUrl with uploaded photo url in mongoDB
      const updatedProduct = { ...productFormData, imageURL: imgurl };

      setLoading(true);
      const response = await axios.put(
        `/api/products/update/${productId}`,
        updatedProduct
      );
      console.log("product updated successfully", response);
    } catch (error) {
      console.log("error while updating new product", error);
    } finally {
      setLoading(false);
    }
  };
  const uploadFile = async () => {
    try {
      setLoading(true);
      if (!productFormData.imageURL) return;

      const formData = new FormData();
      formData.append("file", productFormData.imageURL);
      formData.append("upload_preset", "fake_cart_product_images");

      const cloudname = "dyp6swbrc";
      const api = `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`;

      const res = await axios.post(api, formData);
      const { secure_url } = res.data;
      console.log(res);
      return secure_url;
    } catch (error) {
      console.error("Failed to upload image to Cloudinary", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleUpdateProduct}>
            <div className="form-control">
              <label htmlFor="name" className="label">
                Edit Product
              </label>
              <input
                id="productname"
                type="text"
                name="name"
                placeholder="Product Name"
                className="input input-bordered"
                required
                value={productFormData?.name || ProductDetailFromAPI.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="slug" className="label">
                Slug
              </label>
              <input
                id="slug"
                type="text"
                name="slug"
                placeholder="Slug"
                className="input input-bordered"
                required
                value={productFormData?.slug || ProductDetailFromAPI.slug}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                id="description"
                type="text"
                name="description"
                placeholder="Description"
                className="input input-bordered h-40"
                required
                value={
                  productFormData?.description ||
                  ProductDetailFromAPI.description
                }
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="price" className="label">
                Price
              </label>
              <input
                id="price"
                type="text"
                name="price"
                placeholder="Price"
                className="input input-bordered"
                required
                value={productFormData?.price || ProductDetailFromAPI.price}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block">Select an Category</label>
              <select
                name="category"
                onChange={handleInputChange}
                value={
                  productFormData?.category || ProductDetailFromAPI.category
                }
                className="block rounded-lg w-full p-3 bg-primaryColorLight border-2"
              >
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Toys">Toys</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <label className="block mb-2 text-sm font-medium">
              Upload Image
            </label>
            <input
              onChange={handleInputChange}
              type="file"
              name="imageURL"
              accept="image/*"
            />

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                {loading ? "Updating Product..." : "update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
