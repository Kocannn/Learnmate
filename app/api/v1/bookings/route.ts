import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Get the authenticated user
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const userRole = session.user.isMentor ? "MENTOR" : "STUDENT";

    // Get URL parameters
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || "all"; // 'upcoming', 'past', 'all'

    // Define where conditions based on user role and booking type
    const where: any = {};

    if (userRole === "MENTOR") {
      where.mentorId = userId;
    } else {
      where.studentId = userId;
    }

    if (type === "upcoming") {
      where.date = { gte: new Date() };
    } else if (type === "past") {
      where.date = { lt: new Date() };
    }

    // Fetch bookings with mentor and student details
    const bookings = await prisma.booking.findMany({
      where,
      include: {
        mentor: {
          select: {
            id: true,
            name: true,
            profileImage: true,
            expertise: true,
            rate: true,
          },
        },
        student: {
          select: {
            id: true,
            name: true,
            profileImage: true,
          },
        },
      },
      orderBy: {
        date: type === "past" ? "desc" : "asc",
      },
    });

    return NextResponse.json({
      upcoming:
        type !== "past"
          ? bookings.filter((b) => new Date(b.date) >= new Date())
          : [],
      past:
        type !== "upcoming"
          ? bookings.filter((b) => new Date(b.date) < new Date())
          : [],
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}
