import { dbConnect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

dbConnect();

export async function DELETE(request) {
  try {
    //getting id by using useParams from router
    const id = request.nextUrl.searchParams.get("id");
    const deletedProduct = await Product.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "product deleted successfully",deletedProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "error while deleting product from database" },
      { status: 500 }
    );
  }
}
