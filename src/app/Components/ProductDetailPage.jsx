import { useCart } from "@/cartContext";
import Image from "next/image";
import React from "react";

const ProductDetailPage = ({ ProductDetail }) => {
  const { addToCart } = useCart();

  const HandleaddToCart = () => {
    addToCart({
      product_id: ProductDetail._id,
      name: ProductDetail.name,
      price: ProductDetail.price,
      image: ProductDetail.imageURL,
    });
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
          <div className="w-full md:w-1/2 relative mb-6 md:mb-0">
            {ProductDetail?.imageURL ? (
              <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden w-[300px] h-[350px]">
                <Image
                  src={ProductDetail?.imageURL}
                  fill
                  objectFit="contain"
                  alt={ProductDetail?.name || "Product Image"}
                  className="w-48 h-48 object-cover transform transition duration-500 hover:scale-125"
                />
              </div>
            ) : (
              <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">{ProductDetail?.category}</p>
              <h1 className="font-bold text-2xl md:text-3xl text-gray-800 mb-4">
                {ProductDetail?.name}
              </h1>
              <p className="text-lg font-semibold text-gray-700 mb-4">
                ₹{ProductDetail?.price}
              </p>
              <p className="text-gray-600">{ProductDetail?.description}</p>
              <button
                onClick={HandleaddToCart}
                className="btn btn-primary mt-4 md:mt-6 px-8 py-3 md:px-10 md:py-4 inline-block"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
