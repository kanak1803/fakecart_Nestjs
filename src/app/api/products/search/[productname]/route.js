import { dbConnect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

dbConnect();

export async function GET(request, { params }) {
  try {
    const { productname } = params;
    const product = await Product.find({
      $or: [
        { name: { $regex: productname, $options: "i" } }, // Search by product name ignoring case
        { description: { $regex: productname, $options: "i" } }, // Search by description ignoring case
      ],
    });
    return NextResponse.json(
      { message: "Successfully fetched user product", product },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Faild to fetch selected products from DB" },
      { status: 500 }
    );
  }
}
