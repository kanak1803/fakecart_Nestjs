import { dbConnect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

dbConnect();

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const {
      name: name,
      description: description,
      price: price,
      category: category,
      imageURL: imageURL,
    } = await request.json();

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        imageURL,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Product updated successfully", updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: " Failed to update Product", updatedProduct },
      { status: 500 }
    );
  }
}
