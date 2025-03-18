"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistance } from "date-fns";
import { id } from "date-fns/locale";
import {
  Calendar,
  Clock,
  Video,
  User,
  Search,
  Filter,
  ArrowRight,
  Calendar as CalendarIcon,
  CheckCircle2,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 4;

  useEffect(() => {
    // Simulate fetching booking data
    const fetchBookings = async () => {
      try {
        // In production, replace this with actual API call
        // const response = await fetch('/api/bookings');
        // const data = await response.json();

        // Simulating API response with sample data
        const data = {
          upcoming: [
            {
              id: "cm8d8z9wm0005sbvbhr6vtauw",
              mentor: {
                id: 1,
                name: "Budi Santoso",
                profileImage: "https://i.pravatar.cc/150?img=32",
                expertise: "Frontend Development",
              },
              topic: "JavaScript Fundamentals",
              date: "2025-03-10T14:00:00.000Z",
              duration: 60,
              status: "confirmed",
              zoomJoinUrl:
                "https://us05web.zoom.us/j/85935639971?pwd=RXg0yCYg1eAGLKaIeRQtaShFWHuCPa.1",
            },
            {
              id: 2,
              mentor: {
                id: 2,
                name: "Siti Rahayu",
                profileImage: "https://i.pravatar.cc/150?img=25",
                expertise: "UI Design",
              },
              topic: "UI Design Principles",
              date: "2025-03-12T10:00:00.000Z",
              duration: 60,
              status: "confirmed",
              zoomJoinUrl:
                "https://us05web.zoom.us/j/85935639971?pwd=RXg0yCYg1eAGLKaIeRQtaShFWHuCPa.1",
            },
            {
              id: 3,
              mentor: {
                id: 3,
                name: "Ahmad Hidayat",
                profileImage: "https://i.pravatar.cc/150?img=42",
                expertise: "Backend Development",
              },
              topic: "API Design Best Practices",
              date: "2025-03-15T11:30:00.000Z",
              duration: 90,
              status: "confirmed",
              zoomJoinUrl:
                "https://us05web.zoom.us/j/85935639971?pwd=RXg0yCYg1eAGLKaIeRQtaShFWHuCPa.1",
            },
            {
              id: 4,
              mentor: {
                id: 4,
                name: "Dewi Anggraini",
                profileImage: "https://i.pravatar.cc/150?img=20",
                expertise: "Product Management",
              },
              topic: "Product Roadmap Development",
              date: "2025-03-18T15:00:00.000Z",
              duration: 60,
              status: "confirmed",
              zoomJoinUrl:
                "https://us05web.zoom.us/j/85935639971?pwd=RXg0yCYg1eAGLKaIeRQtaShFWHuCPa.1",
            },
          ],
          past: [
            {
              id: 5,
              mentor: {
                id: 3,
                name: "Ahmad Hidayat",
                profileImage: "https://i.pravatar.cc/150?img=42",
                expertise: "Data Science",
              },
              topic: "Introduction to Data Science",
              date: "2025-03-05T13:00:00.000Z",
              duration: 60,
              status: "completed",
              reviewed: true,
            },
            {
              id: 6,
              mentor: {
                id: 5,
                name: "Indra Kusuma",
                profileImage: "https://i.pravatar.cc/150?img=66",
                expertise: "Mobile Development",
              },
              topic: "Flutter Development Workshop",
              date: "2025-03-02T11:00:00.000Z",
              duration: 120,
              status: "completed",
              reviewed: false,
            },
          ],
        };

        setBookings(data.upcoming);
        setPastBookings(data.past);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on search term
  const filteredUpcoming = bookings.filter(
    (booking) =>
      booking.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.mentor.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredPast = pastBookings.filter(
    (booking) =>
      booking.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.mentor.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Calculate pagination
  const totalUpcomingPages = Math.ceil(filteredUpcoming.length / itemsPerPage);
  const totalPastPages = Math.ceil(filteredPast.length / itemsPerPage);

  const paginatedUpcoming = filteredUpcoming.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const paginatedPast = filteredPast.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Format date function
  const formatSessionDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Format time function
  const formatSessionTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  // Calculate time until session
  const getTimeUntil = (dateString) => {
    return formatDistance(new Date(dateString), new Date(), {
      addSuffix: true,
      locale: id,
    });
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-8 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Jadwal Sesi
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Kelola sesi mentoring yang telah Anda jadwalkan
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan topik atau nama mentor"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="sm:w-auto w-full">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="h-14 w-full bg-background mb-6">
            <TabsTrigger
              value="upcoming"
              className="text-lg data-[state=active]:bg-primary data-[state=active]:text-white py-2 px-6"
            >
              <CalendarIcon className="h-5 w-5 mr-2" /> Mendatang
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="text-lg data-[state=active]:bg-primary data-[state=active]:text-white py-2 px-6"
            >
              <CheckCircle2 className="h-5 w-5 mr-2" /> Selesai
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Sessions */}
          <TabsContent value="upcoming">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((item) => (
                  <Card key={item} className="overflow-hidden">
                    <CardHeader className="p-6">
                      <div className="flex justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-6 w-40" />
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-28 rounded-full" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 border-t">
                      <div className="flex gap-4 w-full">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : paginatedUpcoming.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedUpcoming.map((booking) => (
                    <Card
                      key={booking.id}
                      className="overflow-hidden border-l-4 border-l-primary shadow-md hover:shadow-lg transition-all"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="space-y-4">
                            <CardTitle className="text-2xl">
                              {booking.topic}
                            </CardTitle>
                            <div className="flex items-center gap-3">
                              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                <Image
                                  src={booking.mentor.profileImage}
                                  alt={booking.mentor.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-semibold">
                                  {booking.mentor.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {booking.mentor.expertise}
                                </div>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-green-100 hover:bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm">
                            {getTimeUntil(booking.date)}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-primary" />
                          <span>{formatSessionDate(booking.date)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-primary" />
                          <span>
                            {formatSessionTime(booking.date)} (
                            {booking.duration} menit)
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Video className="h-5 w-5 text-primary" />
                          <a
                            href={booking.zoomJoinUrl}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Link Zoom Meeting
                          </a>
                        </div>
                      </CardContent>

                      <CardFooter className="flex gap-4 border-t pt-6">
                        <Button
                          variant="outline"
                          className="flex-1 h-12"
                          asChild
                        >
                          <Link
                            href={`/dashboard/mentors/${booking.mentor.id}`}
                          >
                            <User className="h-4 w-4 mr-2" /> Profil Mentor
                          </Link>
                        </Button>
                        <Button
                          className="flex-1 h-12 bg-primary hover:bg-primary/90"
                          asChild
                        >
                          <Link href={`/dashboard/meetings/${booking.id}`}>
                            <Video className="h-4 w-4 mr-2" /> Join Meeting
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {totalUpcomingPages > 1 && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage((prev) => Math.max(prev - 1, 1));
                          }}
                          aria-disabled={currentPage === 1}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {Array.from({ length: totalUpcomingPages }, (_, i) => (
                        <PaginationItem key={i + 1}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(i + 1);
                            }}
                            isActive={currentPage === i + 1}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalUpcomingPages),
                            );
                          }}
                          aria-disabled={currentPage === totalUpcomingPages}
                          className={
                            currentPage === totalUpcomingPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              <Card className="w-full border-dashed bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Belum Ada Sesi Mendatang
                  </h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    Anda belum memiliki jadwal sesi mentoring yang akan datang.
                    Jadwalkan sesi dengan mentor untuk mulai belajar.
                  </p>
                  <Button asChild>
                    <Link href="/dashboard/mentors">
                      Temukan Mentor <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Past Sessions Tab Content (abbreviated - similar structure to Upcoming) */}
          <TabsContent value="past">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((item) => (
                  <Card key={item} className="overflow-hidden">
                    <CardHeader className="p-6">
                      <Skeleton className="h-6 w-40" />
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 border-t">
                      <div className="flex gap-4 w-full">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : paginatedPast.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Similar card structure as upcoming but with past-specific elements */}
                  {/* Full implementation omitted for brevity */}
                </div>
              </>
            ) : (
              <Card className="w-full border-dashed bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Belum Ada Sesi Selesai
                  </h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    Anda belum menyelesaikan sesi mentoring apapun. Selesaikan
                    sesi untuk melihat riwayatnya di sini.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
