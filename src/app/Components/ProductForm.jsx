"use client";
import React, { useState } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";

const ProductForm = () => {
  //initailiazing  new product boiler plate
  const initialState = {
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "Electronics",
    imageURL: "",
  };
  const [productdetails, setProductDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  //function to handle any changes in product boiler plate
  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    if (name === "price") {
      // Check if the entered value is a number
      if (!isNaN(value)) {
        // If it's a number, update the state
        setProductDetails({ ...productdetails, [name]: value });
      }
      // If it's not a number, do nothing (don't update the state)
    } else if (type === "file") {
      // For file inputs, set the file object directly
      setProductDetails({ ...productdetails, [name]: files[0] });
    } else {
      // For other inputs, update the state normally
      setProductDetails({ ...productdetails, [name]: value });
    }
  };

  // function to create new product in MongoDB
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    // photo validation
    const { imageURL } = productdetails;

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

      const updatedProductDetails = { ...productdetails, imageURL: imgurl };
      setLoading(true);
      const response = await axios.post(
        "api/products/create",
        updatedProductDetails,
        { cache: false }
      );
      console.log("product created successfully", response);
    } catch (error) {
      console.log("error while creating new product", error);
    } finally {
      setLoading(false);
      setProductDetails(initialState);
    }
  };
  // image upload to cloudinary function
  const uploadFile = async () => {
    try {
      setLoading(true);
      if (!productdetails.imageURL) return;
      //resizing image before upload to the cloudinary using  react-image-file-resizer
      const resizedImage = await new Promise((resolve) => {
        Resizer.imageFileResizer(
          productdetails.imageURL,
          250,
          300,
          "WEBP",
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "file"
        );
      });

      const formData = new FormData();
      formData.append("file", resizedImage);
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
          <form className="card-body" onSubmit={handleCreateProduct}>
            <div className="form-control">
              <label htmlFor="name" className="label">
                Product Name
              </label>
              <input
                id="productname"
                type="text"
                name="name"
                placeholder="Product Name"
                className="input input-bordered"
                required
                value={productdetails.name}
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
                value={productdetails.slug}
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
                className="input input-bordered"
                required
                value={productdetails.description}
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
                value={productdetails.price}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block">Select an Category</label>
              <select
                name="category"
                onChange={handleInputChange}
                value={productdetails.category}
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
            {/* <div className="form-control">
              <label htmlFor="imageURL" className="label">
                Image Url
              </label>
              <input
                id="imageURL"
                type="text"
                name="imageURL"
                placeholder="Product Name"
                className="input input-bordered"
                required
                value={productdetails.imageURL}
                onChange={handleInputChange}
              />
            </div> */}
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
                {loading ? "Creating Product..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
