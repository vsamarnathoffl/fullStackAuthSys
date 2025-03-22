import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

export async function GET(request: any) {
  try {
    const userId: any = await getDataFromToken(request);
    const user: any = await User.findById(userId).select("-password");
    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Unable to fetch the data from jwt" },
      { status: 500 }
    );
  }
}
