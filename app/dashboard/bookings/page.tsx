import Link from "next/link";
import {
  Calendar,
  ChevronRight,
  Clock,
  Video,
  User,
  Clock4,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BookingsPage() {
  // Sample data for upcoming bookings
  const upcomingBookings = [
    {
      id: 1,
      mentor: "Budi Santoso",
      mentorId: 1,
      topic: "JavaScript Fundamentals",
      date: "10 Maret 2025",
      time: "14:00 - 15:00",
      status: "confirmed",
      zoomLink: "https://zoom.us/j/123456789",
    },
    {
      id: 2,
      mentor: "Siti Rahayu",
      mentorId: 2,
      topic: "UI Design Principles",
      date: "12 Maret 2025",
      time: "10:00 - 11:00",
      status: "confirmed",
      zoomLink: "https://zoom.us/j/987654321",
    },
  ];

  // Sample data for past bookings
  const pastBookings = [
    {
      id: 3,
      mentor: "Ahmad Hidayat",
      mentorId: 3,
      topic: "Introduction to Data Science",
      date: "5 Maret 2025",
      time: "13:00 - 14:00",
      status: "completed",
      reviewed: true,
    },
  ];

  return (
    <div className="min-h-screen w-full p-8 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Jadwal Sesi</h1>
          <p className="text-xl text-muted-foreground">
            Kelola sesi mentoring yang telah Anda jadwalkan
          </p>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList className="h-14 w-full bg-background">
            <TabsTrigger
              value="upcoming"
              className="text-lg data-[state=active]:bg-primary data-[state=active]:text-white py-2 px-6"
            >
              📅 Mendatang
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="text-lg data-[state=active]:bg-primary data-[state=active]:text-white py-2 px-6"
            >
              ✅ Selesai
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Sessions */}
          <TabsContent value="upcoming" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingBookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="shadow-lg hover:shadow-xl transition-all"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-4">
                        <CardTitle className="text-2xl">
                          {booking.topic}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-primary" />
                          <span className="text-lg font-semibold">
                            {booking.mentor}
                          </span>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-base font-medium">
                        Terkonfirmasi
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-6 w-6 text-primary" />
                      <span className="text-lg">{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-6 w-6 text-primary" />
                      <span className="text-lg">{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Video className="h-6 w-6 text-primary" />
                      <a
                        href={booking.zoomLink}
                        className="text-lg text-primary hover:underline"
                        target="_blank"
                        rel="noopener"
                      >
                        Link Zoom Meeting
                      </a>
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col sm:flex-row gap-4 border-t pt-6">
                    <Button
                      variant="outline"
                      className="w-full h-12 text-lg"
                      asChild
                    >
                      <Link href={`/dashboard/mentors/${booking.mentorId}`}>
                        👤 Profil Mentor
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-12 text-lg text-blue-600"
                    >
                      🕒 Reschedule
                    </Button>
                    <Button
                      className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
                      asChild
                    >
                      <a href={booking.zoomLink} target="_blank" rel="noopener">
                        🚀 Join Zoom
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Past Sessions */}
          <TabsContent value="past" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pastBookings.map((booking) => (
                <Card key={booking.id} className="shadow-lg bg-muted/50">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl mb-2">
                          {booking.topic}
                        </CardTitle>
                        <div className="flex items-center gap-2 mb-4">
                          <User className="h-5 w-5 text-primary" />
                          <span className="text-lg font-semibold">
                            {booking.mentor}
                          </span>
                        </div>
                      </div>
                      <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-base font-medium">
                        Selesai
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-6 w-6 text-primary" />
                      <span className="text-lg">{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-6 w-6 text-primary" />
                      <span className="text-lg">{booking.time}</span>
                    </div>
                  </CardContent>

                  <CardFooter className="border-t pt-6">
                    <div className="flex w-full gap-4">
                      <Button
                        variant="outline"
                        className="flex-1 h-12 text-lg"
                        asChild
                      >
                        <Link href={`/dashboard/mentors/${booking.mentorId}`}>
                          👤 Profil Mentor
                        </Link>
                      </Button>
                      {!booking.reviewed ? (
                        <Button className="flex-1 h-12 text-lg bg-primary hover:bg-primary/90">
                          ✍️ Beri Ulasan
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="flex-1 h-12 text-lg"
                          disabled
                        >
                          📩 Ulasan Terkirim
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
