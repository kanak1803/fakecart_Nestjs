import { dbConnect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(request) {
  try {
    //getting data from database
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    // getting user from db based on email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }
    console.log("User exist");
    //checking password by using bcryptjs compare function
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 400 }
      );
    }
    //JWT TOKEN implentation
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Logged In Successesfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
