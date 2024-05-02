import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

dbConnect();

export async function POST(request) {
  try {
    // getting user id from jwt token
    const userId = await getDataFromToken(request);
    //geting user with input id and excluding password from user data
    const user = await User.findOne({ _id: userId }).select("-password");
    //checking if user is not found
    if (!user) {
      return NextResponse.json({ error: "invalid token" }, { status: 400 });
    }
    return NextResponse.json({ message: "User found", data: user });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
