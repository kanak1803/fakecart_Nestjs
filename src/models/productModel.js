import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter product name"],
    },
    slug: {
      type: String,
      required: [true, "Please Enter product slug"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter product description"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter product price"],
    },
    category: {
      type: String,
      enum: [
        "Electronics",
        "Clothing",
        "Books",
        "Home & Kitchen",
        "Toys",
        "Other",
      ],
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
//nextjs is edge time server so we have to always check if the model is already created or not.
const Product =
  mongoose.models.products || mongoose.model("products", productSchema);

export default Product;
