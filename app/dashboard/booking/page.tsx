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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

// Define types to match our database schema

export default function BookingsPage() {
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);

        // Fetch bookings from your API
        const response = await fetch("/api/v1/bookings");

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();

        // Separate bookings into upcoming and past based on date and status
        const now = new Date();
        const upcoming = data.bookings.filter(
          (booking: Booking) =>
            new Date(booking.date) > now ||
            (booking.status !== "completed" && booking.status !== "cancelled"),
        );

        const past = data.bookings.filter(
          (booking: Booking) =>
            new Date(booking.date) < now ||
            booking.status === "completed" ||
            booking.status === "cancelled",
        );

        setUpcomingBookings(upcoming);
        setPastBookings(past);
        setCurrentPage(1); // Reset to first page when data changes
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on search term
  const filteredUpcoming = upcomingBookings.filter(
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
  const totalPages = Math.ceil(
    (activeTab === "upcoming" ? filteredUpcoming.length : filteredPast.length) /
      itemsPerPage,
  );

  // Get current page items
  const currentItems =
    activeTab === "upcoming"
      ? filteredUpcoming.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage,
        )
      : filteredPast.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage,
        );

  // Format date function
  const formatSessionDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Format time function
  const formatSessionTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  // Calculate time until session
  const getTimeUntil = (dateString: string) => {
    return formatDistance(new Date(dateString), new Date(), {
      addSuffix: true,
      locale: id,
    });
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor = "";
    let textColor = "";
    let label = "";

    switch (status) {
      case "confirmed":
        bgColor = "bg-green-100";
        textColor = "text-green-800";
        label = "Terkonfirmasi";
        break;
      case "pending":
        bgColor = "bg-yellow-100";
        textColor = "text-yellow-800";
        label = "Menunggu Konfirmasi";
        break;
      case "cancelled":
        bgColor = "bg-red-100";
        textColor = "text-red-800";
        label = "Dibatalkan";
        break;
      case "completed":
        bgColor = "bg-blue-100";
        textColor = "text-blue-800";
        label = "Selesai";
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-800";
        label = status;
    }

    return (
      <Badge
        className={`${bgColor} hover:${bgColor} ${textColor} px-3 py-1.5 rounded-full text-sm`}
      >
        {label}
      </Badge>
    );
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when filtering
              }}
            />
          </div>
          <Button variant="outline" className="sm:w-auto w-full">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs
          defaultValue="upcoming"
          className="w-full"
          onValueChange={(value) => {
            setActiveTab(value);
            setCurrentPage(1); // Reset to first page when switching tabs
          }}
        >
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
            ) : activeTab === "upcoming" && currentItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentItems.map((booking) => (
                    <Card
                      key={booking.id}
                      className="overflow-hidden border-l-4 border-l-primary shadow-md hover:shadow-lg transition-all"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="space-y-4">
                            <CardTitle className="text-2xl">
                              {booking.topic || "Sesi Mentoring"}
                            </CardTitle>
                            <div className="flex items-center gap-3">
                              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                <Image
                                  src={
                                    booking.mentor.profileImage ||
                                    "/placeholder-avatar.jpg"
                                  }
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
                          <div className="flex flex-col items-end gap-2">
                            <StatusBadge status={booking.status} />
                            <div className="text-sm text-muted-foreground">
                              {getTimeUntil(booking.date)}
                            </div>
                          </div>
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
                        {booking.zoomJoinUrl && (
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
                        )}
                      </CardContent>

                      <CardFooter className="flex gap-4 border-t pt-6">
                        <Button
                          variant="outline"
                          className="flex-1 h-12"
                          asChild
                        >
                          <Link href={`/dashboard/mentors/${booking.mentorId}`}>
                            <User className="h-4 w-4 mr-2" /> Profil Mentor
                          </Link>
                        </Button>
                        {booking.status === "confirmed" &&
                        booking.zoomJoinUrl ? (
                          <Button
                            className="flex-1 h-12 bg-primary hover:bg-primary/90"
                            asChild
                          >
                            <Link href={`/dashboard/meetings/${booking.id}`}>
                              <Video className="h-4 w-4 mr-2" /> Join Meeting
                            </Link>
                          </Button>
                        ) : booking.status === "pending" ? (
                          <Button
                            className="flex-1 h-12 bg-amber-500 hover:bg-amber-600"
                            asChild
                          >
                            <Link
                              href={`/dashboard/booking/confirm?id=${booking.id}`}
                            >
                              <Calendar className="h-4 w-4 mr-2" /> Konfirmasi
                              Booking
                            </Link>
                          </Button>
                        ) : null}
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {totalPages > 1 && (
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

                      {Array.from({ length: totalPages }, (_, i) => (
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
                              Math.min(prev + 1, totalPages),
                            );
                          }}
                          aria-disabled={currentPage === totalPages}
                          className={
                            currentPage === totalPages
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

          {/* Past Sessions Tab Content */}
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
            ) : activeTab === "past" && currentItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentItems.map((booking) => (
                    <Card
                      key={booking.id}
                      className="overflow-hidden border-l-4 border-l-gray-400 shadow-md hover:shadow-lg transition-all"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="space-y-4">
                            <CardTitle className="text-2xl">
                              {booking.topic || "Sesi Mentoring"}
                            </CardTitle>
                            <div className="flex items-center gap-3">
                              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                <Image
                                  src={
                                    booking.mentor.profileImage ||
                                    "/placeholder-avatar.jpg"
                                  }
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
                          <StatusBadge status={booking.status} />
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <span>{formatSessionDate(booking.date)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-gray-500" />
                          <span>
                            {formatSessionTime(booking.date)} (
                            {booking.duration} menit)
                          </span>
                        </div>
                      </CardContent>

                      <CardFooter className="flex gap-4 border-t pt-6">
                        <Button
                          variant="outline"
                          className="flex-1 h-12"
                          asChild
                        >
                          <Link href={`/dashboard/mentors/${booking.mentorId}`}>
                            <User className="h-4 w-4 mr-2" /> Profil Mentor
                          </Link>
                        </Button>
                        {booking.status === "completed" &&
                          !booking.reviewed && (
                            <Button
                              className="flex-1 h-12 bg-primary hover:bg-primary/90"
                              asChild
                            >
                              <Link
                                href={`/dashboard/reviews/create?bookingId=${booking.id}`}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-2" /> Beri
                                Ulasan
                              </Link>
                            </Button>
                          )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {totalPages > 1 && (
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

                      {Array.from({ length: totalPages }, (_, i) => (
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
                              Math.min(prev + 1, totalPages),
                            );
                          }}
                          aria-disabled={currentPage === totalPages}
                          className={
                            currentPage === totalPages
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
