import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: any) {
  try {
    const reqBody: any = await request.json();
    const { email } = reqBody;

    const user: any = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid Email" }, { status: 400 });
    }

    const userId: any = user._id;

    await sendEmail({ email, emailType: "RESET", userId } as any);

    return NextResponse.json(
      { message: "Token is sent to mail successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
