import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data in the correct order (respecting foreign key constraints)
  await prisma.booking.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationRequest.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding database...");

  // Create mentors
  const mentors = [
    {
      name: "Budi Santoso",
      email: "budi.santoso@example.com",
      phone: "+62812345678",
      location: "Jakarta",
      hasCompletedOnboarding: true,
      bio: "Senior Software Engineer dengan 10 tahun pengalaman di berbagai teknologi web dan mobile. Spesialisasi di JavaScript, React, dan Node.js. Saya telah membantu lebih dari 50 mentee untuk mengembangkan karir mereka di bidang pengembangan web.",
      profileImage: "/placeholder.svg?height=200&width=200",
      password: await hash("password123", 10),
      interests: ["Web Development", "Mobile Development", "JavaScript"],
      isMentor: true,
      expertise: [
        "JavaScript",
        "React",
        "Node.js",
        "TypeScript",
        "Next.js",
        "Express",
        "MongoDB",
      ],
      rate: 350000,
      rating: 4.9,
      reviewCount: 15,
      completedSessions: 25,
      totalHours: 50.5,
      mentorCount: 0,
      emailVerified: new Date(),
    },
    {
      name: "Siti Rahma",
      email: "siti.rahma@example.com",
      phone: "+62856789012",
      location: "Bandung",
      hasCompletedOnboarding: true,
      bio: "UI/UX Designer dengan pengalaman 8 tahun di industri teknologi. Mengutamakan desain yang berpusat pada pengguna dan estetika yang clean. Saya senang membantu talenta baru menemukan jalan mereka di dunia desain digital.",
      profileImage: "/placeholder.svg?height=200&width=200",
      password: await hash("password123", 10),
      interests: ["UI/UX Design", "User Research", "Prototyping"],
      isMentor: true,
      expertise: [
        "UI Design",
        "UX Design",
        "Figma",
        "Adobe XD",
        "User Research",
        "Prototyping",
        "Design Systems",
      ],
      rate: 300000,
      rating: 4.8,
      reviewCount: 12,
      completedSessions: 18,
      totalHours: 36.0,
      mentorCount: 0,
      emailVerified: new Date(),
    },
    {
      name: "Ahmad Wijaya",
      email: "ahmad.wijaya@example.com",
      phone: "+62878901234",
      location: "Surabaya",
      hasCompletedOnboarding: true,
      bio: "Data Scientist dengan latar belakang matematika dan statistik. Berpengalaman dalam machine learning, data visualization, dan analytics. Saya percaya data adalah kunci pengambilan keputusan yang lebih baik di era digital.",
      profileImage: "/placeholder.svg?height=200&width=200",
      password: await hash("password123", 10),
      interests: ["Data Science", "Machine Learning", "Data Visualization"],
      isMentor: true,
      expertise: [
        "Python",
        "R",
        "SQL",
        "TensorFlow",
        "PyTorch",
        "Tableau",
        "Power BI",
      ],
      rate: 400000,
      rating: 4.7,
      reviewCount: 9,
      completedSessions: 15,
      totalHours: 30.0,
      mentorCount: 0,
      emailVerified: new Date(),
    },
  ];

  // Create mentees
  const mentees = [
    {
      name: "Rina Wati",
      email: "rina.wati@example.com",
      phone: "+62834567890",
      location: "Jakarta",
      hasCompletedOnboarding: true,
      bio: "Junior Web Developer yang sedang mengembangkan keterampilan dalam React dan Node.js.",
      profileImage: "/placeholder.svg?height=200&width=200",
      password: await hash("password123", 10),
      interests: ["Web Development", "JavaScript", "React"],
      isMentor: false,
      completedSessions: 0,
      totalHours: 0,
      mentorCount: 0,
      emailVerified: new Date(),
    },
    {
      name: "Deni Susanto",
      email: "deni.susanto@example.com",
      phone: "+62890123456",
      location: "Yogyakarta",
      hasCompletedOnboarding: true,
      bio: "Mahasiswa jurusan Ilmu Komputer yang ingin memperdalam pengetahuan di bidang data science.",
      profileImage: "/placeholder.svg?height=200&width=200",
      password: await hash("password123", 10),
      interests: ["Data Science", "Python", "Machine Learning"],
      isMentor: false,
      completedSessions: 0,
      totalHours: 0,
      mentorCount: 0,
      emailVerified: new Date(),
    },
    {
      name: "Maya Putri",
      email: "maya.putri@example.com",
      phone: "+62845678901",
      location: "Bandung",
      hasCompletedOnboarding: true,
      bio: "UI Designer pemula yang ingin belajar lebih banyak tentang UX dan user research.",
      profileImage: "/placeholder.svg?height=200&width=200",
      password: await hash("password123", 10),
      interests: ["UI Design", "UX Design", "Figma"],
      isMentor: false,
      completedSessions: 0,
      totalHours: 0,
      mentorCount: 0,
      emailVerified: new Date(),
    },
  ];

  // Insert mentors and create related data
  for (const mentorData of mentors) {
    const mentor = await prisma.user.create({
      data: mentorData,
    });

    console.log(`Created mentor: ${mentor.name}`);

    // Create education for mentors
    if (mentor.email === mentors[0].email) {
      // Budi Santoso
      await prisma.education.createMany({
        data: [
          {
            institution: "Universitas Indonesia",
            degree: "S1 Ilmu Komputer",
            year: "2013 - 2017",
            userId: mentor.id,
          },
        ],
      });
    } else if (mentor.email === mentors[1].email) {
      // Siti Rahma
      await prisma.education.createMany({
        data: [
          {
            institution: "Institut Teknologi Bandung",
            degree: "S1 Desain Komunikasi Visual",
            year: "2012 - 2016",
            userId: mentor.id,
          },
          {
            institution: "School of Visual Arts New York",
            degree: "Digital Experience Design Certificate",
            year: "2018",
            userId: mentor.id,
          },
        ],
      });
    } else if (mentor.email === mentors[2].email) {
      // Ahmad Wijaya
      await prisma.education.createMany({
        data: [
          {
            institution: "Institut Teknologi Sepuluh November",
            degree: "S1 Matematika",
            year: "2010 - 2014",
            userId: mentor.id,
          },
          {
            institution: "Universitas Gadjah Mada",
            degree: "S2 Data Science",
            year: "2016 - 2018",
            userId: mentor.id,
          },
        ],
      });
    }

    // Create experience for mentors
    if (mentor.email === mentors[0].email) {
      // Budi Santoso
      await prisma.experience.createMany({
        data: [
          {
            company: "Tech Company A",
            position: "Senior Software Engineer",
            duration: "2020 - Sekarang",
            userId: mentor.id,
          },
          {
            company: "Tech Company B",
            position: "Software Engineer",
            duration: "2017 - 2020",
            userId: mentor.id,
          },
        ],
      });
    } else if (mentor.email === mentors[1].email) {
      // Siti Rahma
      await prisma.experience.createMany({
        data: [
          {
            company: "Digital Agency X",
            position: "Senior UI/UX Designer",
            duration: "2019 - Sekarang",
            userId: mentor.id,
          },
          {
            company: "Startup Y",
            position: "UI Designer",
            duration: "2016 - 2019",
            userId: mentor.id,
          },
        ],
      });
    } else if (mentor.email === mentors[2].email) {
      // Ahmad Wijaya
      await prisma.experience.createMany({
        data: [
          {
            company: "Tech Unicorn Z",
            position: "Lead Data Scientist",
            duration: "2021 - Sekarang",
            userId: mentor.id,
          },
          {
            company: "Consulting Firm",
            position: "Data Analyst",
            duration: "2018 - 2021",
            userId: mentor.id,
          },
          {
            company: "Research Institute",
            position: "Research Assistant",
            duration: "2014 - 2018",
            userId: mentor.id,
          },
        ],
      });
    }

    // Create availability with dynamic dates
    const today = new Date();
    await prisma.availability.createMany({
      data: [
        {
          day: new Date(today.setDate(today.getDate() + 1))
            .toISOString()
            .split("T")[0],
          slots: ["09:00", "13:00", "15:00"],
          userId: mentor.id,
        },
        {
          day: new Date(today.setDate(today.getDate() + 1))
            .toISOString()
            .split("T")[0],
          slots: ["10:00", "14:00"],
          userId: mentor.id,
        },
        {
          day: new Date(today.setDate(today.getDate() + 1))
            .toISOString()
            .split("T")[0],
          slots: ["09:00", "11:00", "16:00"],
          userId: mentor.id,
        },
      ],
    });
  }

  // Insert mentees
  for (const menteeData of mentees) {
    const mentee = await prisma.user.create({
      data: menteeData,
    });

    console.log(`Created mentee: ${mentee.name}`);
  }

  // Create sample bookings
  const sampleBookings = [
    {
      mentorId: (await prisma.user.findUnique({
        where: { email: mentors[0].email },
      }))!.id,
      studentId: (await prisma.user.findUnique({
        where: { email: mentees[0].email },
      }))!.id,
      topic: "JavaScript Fundamentals",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      duration: 60,
      status: "confirmed",
      notes: "Focus on ES6+ features",
    },
    {
      mentorId: (await prisma.user.findUnique({
        where: { email: mentors[1].email },
      }))!.id,
      studentId: (await prisma.user.findUnique({
        where: { email: mentees[1].email },
      }))!.id,
      topic: "UI/UX Design Principles",
      date: new Date(Date.now() + 48 * 60 * 60 * 1000), // Day after tomorrow
      duration: 90,
      status: "pending",
      notes: "Portfolio review session",
    },
    {
      mentorId: (await prisma.user.findUnique({
        where: { email: mentors[2].email },
      }))!.id,
      studentId: (await prisma.user.findUnique({
        where: { email: mentees[2].email },
      }))!.id,
      topic: "Data Science Basics",
      date: new Date(Date.now() + 72 * 60 * 60 * 1000), // 3 days from now
      duration: 120,
      status: "confirmed",
      notes: "Introduction to Python for Data Science",
    },
  ];

  for (const bookingData of sampleBookings) {
    await prisma.booking.create({
      data: bookingData,
    });
    console.log(`Created booking for topic: ${bookingData.topic}`);
  }

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
