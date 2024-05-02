import { dbConnect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

dbConnect();

export async function GET() {
  try {
    const foundProduct = await Product.find();
    if (foundProduct.length == 0) {
      return NextResponse.json(
        { message: "No products in Database", foundProduct },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Found product!", foundProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get product of database" },
      { status: 500 }
    );
  }
}
