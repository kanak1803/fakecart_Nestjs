import { dbConnect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

dbConnect();

export async function POST(request) {
  try {
    const { name, slug, description, price, category, imageURL } =
      await request.json();

    const newProduct = await Product.create({
      name,
      slug,
      description,
      price,
      category,
      imageURL,
    });
    return NextResponse.json(
      { message: "Product Created", newProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product in DB" },
      { status: 500 }
    );
  }
}
