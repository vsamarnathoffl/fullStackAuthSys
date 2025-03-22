import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 404 }
      );
    }
    const isValidate = await bcryptjs.compare(password, user.password);
    if (!isValidate) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 401 }
      );
    }
    if (user.isVerfied === false) {
      return NextResponse.json(
        {
          error:
            "User is not verified, please check your mail for your verification",
        },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "LoggedIn Successfully!", user },
      { status: 200 }
    );

    response.cookies.set("token",token,{
        httpOnly:true
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
        {error:"Something went wrong while processing user authentication"},
        {status:500}
    )
  }
}
