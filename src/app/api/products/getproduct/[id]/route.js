import { dbConnect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

dbConnect();

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const product = await Product.findById({ _id: id });
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
