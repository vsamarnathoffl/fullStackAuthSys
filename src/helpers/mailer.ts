import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    console.log("Email provided:", email); // Check if the email is correctly passed

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 36000000, // 10 hours in milliseconds
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour in milliseconds
      });
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    transport.verify((error, success) => {
      if (error) {
        console.log("Transport Error:", error);
      } else {
        console.log("Transport Ready:", success);
      }
    });

    const mailOptions = {
      from: "amarnath@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>copy and paste the text below. <br> 
      <span style={background:yellow; color:red;}>${hashedToken}</span>
      </p>`,
    };
    try {
      console.log("Attempting to send email...");
      const mailResponse = await transport.sendMail(mailOptions);
      console.log("Email sent successfully:", mailResponse);
      return mailResponse;
    } catch (error: any) {
      console.error("Error while sending email:", error);
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error((error as Error).message);
  }
};
