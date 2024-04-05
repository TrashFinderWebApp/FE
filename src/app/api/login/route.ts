import { NextResponse } from "next/server";

export const POST = async () => {
  const response = NextResponse.json(
    {
      accessToken: "123",
    },
    {
      status: 200,
    },
  );

  response.cookies.set({
    name: "refreshToken",
    value: "refreshToken",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
};
