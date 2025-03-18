import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;

  const mentor = await prisma.user.findUnique({
    where: {
      id: id,
      isMentor: true,
    },
    include: {
      experience: true,
      education: true,
      availability: true,
    },
  });

  if (!mentor) {
    return NextResponse.json({ error: "Mentor not found" }, { status: 404 });
  }
  return NextResponse.json(mentor);
}
