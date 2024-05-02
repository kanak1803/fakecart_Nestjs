import { dbConnect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

dbConnect();

export async function GET(request, { params }) {
  const { name } = params;

  try {
    const productCategory = await Product.find({ category: name });
    return NextResponse.json(
        { message: "Successfully fetched Category product", productCategory },
        { status: 200 }
      );
  } catch (error) {
    console.log("failed to get category product from database", error);
    return NextResponse.json(
      { error: "failed to get category product from database" },
      { status: 500 }
    );
  }
}
