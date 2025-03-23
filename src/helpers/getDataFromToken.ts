import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return null; 
  }

  const data: any = jwt.verify(token, process.env.TOKEN_SECRET!);
  const decodedTokenId = data.id;

  return decodedTokenId;
};
