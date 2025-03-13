import Link from "next/link";
import { Calendar, ChevronRight, Clock, Video } from "lucide-react";

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
    {
      id: 4,
      mentor: "Dewi Lestari",
      mentorId: 4,
      topic: "Mobile App Development",
      date: "3 Maret 2025",
      time: "11:00 - 12:00",
      status: "completed",
      reviewed: false,
    },
  ];

  return (
    <div className="w-screen">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Jadwal Sesi</h1>
          <p className="text-muted-foreground">
            Kelola sesi mentoring yang telah Anda jadwalkan
          </p>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Mendatang</TabsTrigger>
            <TabsTrigger value="past">Selesai</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6 max-w-3xl mx-auto">
            <div className="grid gap-6">
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{booking.topic}</CardTitle>
                          <CardDescription>
                            dengan {booking.mentor}
                          </CardDescription>
                        </div>
                        <div className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                          Terkonfirmasi
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{booking.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{booking.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">Zoom Meeting</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/mentors/${booking.mentorId}`}>
                          Lihat Profil Mentor
                        </Link>
                      </Button>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button size="sm" asChild>
                          <a
                            href={booking.zoomLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Join Zoom
                          </a>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg">
                      Tidak Ada Sesi Mendatang
                    </h3>
                    <p className="text-muted-foreground text-center mt-2">
                      Anda belum memiliki sesi mentoring yang dijadwalkan.
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href="/dashboard/search">
                        Cari Mentor
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-6 max-w-3xl mx-auto">
            <div className="grid gap-6">
              {pastBookings.length > 0 ? (
                pastBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{booking.topic}</CardTitle>
                          <CardDescription>
                            dengan {booking.mentor}
                          </CardDescription>
                        </div>
                        <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 rounded-full text-xs font-medium">
                          Selesai
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{booking.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{booking.time}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/mentors/${booking.mentorId}`}>
                          Lihat Profil Mentor
                        </Link>
                      </Button>
                      {!booking.reviewed && (
                        <Button size="sm">Berikan Ulasan</Button>
                      )}
                      {booking.reviewed && (
                        <Button variant="outline" size="sm" disabled>
                          Ulasan Terkirim
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg">
                      Tidak Ada Sesi Selesai
                    </h3>
                    <p className="text-muted-foreground text-center mt-2">
                      Anda belum memiliki sesi mentoring yang telah selesai.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
