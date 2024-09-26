import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "patiphan leknok",
    studentId: "660610771",
  });
};
