import { authOptions } from "@/app/api/auth/[...nextauth]/authoption";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const postReport = async (
  trashcanId: string,
  userId: string,
  description: string,
) => {
  try {
    const res =
      await sql`SELECT * from trashcan_reported WHERE "userId" = ${userId} AND "trashcanId" = ${trashcanId};`;
    if (res.rowCount)
      return NextResponse.json(
        {
          message: "이미 신고한 쓰레기통입니다!",
        },
        { status: 403 },
      );
    await sql`INSERT INTO trashcan_reported values(${trashcanId},${userId},${description});`;

    return NextResponse.json({
      message: "해당 내용은 빠르게 반영하겠습니다!",
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const session = await getServerSession(authOptions);
  const { id: trashcanId } = params;
  const body = await req.json();

  if (!session?.user?.id)
    return NextResponse.json(
      { message: "로그인이 필요합니다." },
      { status: 401 },
    );

  return postReport(trashcanId, session.user.id, body.description);
};
