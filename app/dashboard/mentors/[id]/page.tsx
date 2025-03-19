"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, Award, MapPin } from "lucide-react";
import { format, parse } from "date-fns";
import { getAvailableDates } from "@/lib/date-utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

// This function gets the next 7 days as options for booking
const availableDates = getAvailableDates();
// This function gets available time slots
function getAvailableTimeSlots() {
  return [
    { value: "09:00:00", label: "09:00" },
    { value: "10:30:00", label: "10:30" },
    { value: "13:00:00", label: "13:00" },
    { value: "14:30:00", label: "14:30" },
    { value: "16:00:00", label: "16:00" },
  ];
}

export default function MentorProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [mentor, setMentor] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const availableDates = getAvailableDates();
  const availableTimes = getAvailableTimeSlots();

  useEffect(() => {
    async function fetchMentorData() {
      try {
        const response = await fetch(`/api/v1/mentors/${id}`);
        if (!response.ok) throw new Error("Failed to fetch mentor data");
        const data = await response.json();
        setMentor(data);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMentorData();
  }, [id]);

  if (mentor) console.log(mentor);
  async function handleBookSession() {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Informasi tidak lengkap",
        description: "Pilih tanggal dan waktu sesi terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);

    try {
      // Format date for the API
      const sessionDateTime = `${selectedDate}T${selectedTime}`;

      // Create booking in the database
      const response = await fetch("/api/v1/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mentorId: mentor?.id,
          date: sessionDateTime,
          time: selectedTime.slice(0, 5), // Extract HH:MM format from selectedTime
          duration: 60, // 1 hour sessions
          topic: `Sesi dengan ${mentor?.name}`,
          notes: notes,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal membuat booking");
      }

      const bookingData = await response.json();

      // Navigate to booking confirmation page with the booking ID
      router.push(`/dashboard/booking/confirm?id=${bookingData.id}`);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: "Gagal membuat booking",
        description:
          "Terjadi kesalahan saat membuat booking. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Mentor tidak ditemukan</h2>
          <p className="mt-2">Mentor yang Anda cari tidak tersedia</p>
          <Button
            className="mt-4"
            onClick={() => router.push("/dashboard/mentors")}
          >
            Kembali ke Daftar Mentor
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mentor Profile Section */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src={mentor.profileImage || "/placeholder.svg"}
                    alt={mentor.name || "Mentor"}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold">{mentor.name}</h2>
                <p className="text-muted-foreground">
                  {mentor.expertise.join(", ")}
                </p>

                <div className="flex items-center mt-2">
                  <MapPin size={16} className="mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {mentor.location || "Indonesia"}
                  </span>
                </div>

                <div className="mt-4 flex space-x-2">
                  {mentor.interests?.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="w-full">
                  <div className="flex justify-between mb-2">
                    <span>Rating</span>
                    <span className="font-medium">
                      {mentor.rating || "4.8"}/5
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sesi Selesai</span>
                    <span className="font-medium">
                      {mentor.sessionsCompleted || "24"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Section */}
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="about">Tentang</TabsTrigger>
              <TabsTrigger value="schedule">Jadwal Sesi</TabsTrigger>
              <TabsTrigger value="reviews">Ulasan</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>Tentang Mentor</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {mentor.bio || "Tidak ada deskripsi tersedia."}
                  </p>

                  <h3 className="font-semibold mt-6 mb-2 flex items-center">
                    <Award size={18} className="mr-2 text-primary" />
                    Pengalaman
                  </h3>
                  <ul className="space-y-2">
                    {mentor.experience?.map((exp, index) => (
                      <li key={index} className="border-b border-border pb-2">
                        <div className="font-medium">{exp.position}</div>
                        <div className="text-sm text-muted-foreground">
                          {exp.company} • {exp.years}
                        </div>
                      </li>
                    )) || <li>Tidak ada data pengalaman</li>}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Jadwalkan Sesi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base">Pilih Tanggal</Label>
                      <Carousel className="mt-2">
                        <CarouselContent>
                          {availableDates.map((date) => (
                            <CarouselItem
                              key={date.value}
                              className="basis-auto"
                            >
                              <div
                                className={`py-3 px-5 border rounded-md cursor-pointer transition-colors ${
                                  selectedDate === date.value
                                    ? "border-primary bg-primary/10"
                                    : "hover:border-primary/50"
                                }`}
                                onClick={() => setSelectedDate(date.value)}
                              >
                                <div className="text-center">
                                  <Calendar
                                    size={16}
                                    className="mx-auto mb-1"
                                  />
                                  <div className="text-sm font-medium">
                                    {(() => {
                                      try {
                                        return format(
                                          parse(
                                            date.value,
                                            "yyyy-MM-dd",
                                            new Date(),
                                          ),
                                          "EEEE",
                                          { locale: id },
                                        );
                                      } catch (error) {
                                        // Fallback to simple day name if formatting fails
                                        return new Date(
                                          date.value,
                                        ).toLocaleDateString("id-ID", {
                                          weekday: "long",
                                        });
                                      }
                                    })()}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {(() => {
                                      try {
                                        return format(
                                          parse(
                                            date.value,
                                            "yyyy-MM-dd",
                                            new Date(),
                                          ),
                                          "dd MMM",
                                          { locale: id },
                                        );
                                      } catch (error) {
                                        return new Date(
                                          date.value,
                                        ).toLocaleDateString("id-ID", {
                                          day: "2-digit",
                                          month: "short",
                                        });
                                      }
                                    })()}
                                  </div>
                                </div>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <div className="hidden md:block">
                          <CarouselPrevious />
                          <CarouselNext />
                        </div>
                      </Carousel>
                    </div>

                    <div>
                      <Label className="text-base">Pilih Waktu</Label>
                      <RadioGroup
                        value={selectedTime}
                        onValueChange={setSelectedTime}
                        className="grid grid-cols-3 gap-2 mt-2"
                      >
                        {availableTimes.map((time) => (
                          <div key={time.value} className="relative">
                            <RadioGroupItem
                              value={time.value}
                              id={`time-${time.value}`}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={`time-${time.value}`}
                              className="flex items-center justify-center py-2 border rounded-md cursor-pointer transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 hover:border-primary/50"
                            >
                              <Clock size={14} className="mr-1" />
                              {time.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-base">Catatan (Opsional)</Label>
                      <Textarea
                        placeholder="Jelaskan topik yang ingin dibahas dalam sesi"
                        className="mt-2"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full h-12"
                    onClick={handleBookSession}
                    disabled={!selectedDate || !selectedTime || isBooking}
                  >
                    {isBooking ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent mr-2"></div>
                        Membuat Booking...
                      </>
                    ) : (
                      "Jadwalkan Sesi"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Ulasan Mentee</CardTitle>
                </CardHeader>
                <CardContent>
                  {mentor.reviews?.length > 0 ? (
                    <div className="space-y-4">
                      {mentor.reviews.map((review, index) => (
                        <div key={index} className="border-b pb-4">
                          <div className="flex items-center">
                            <div className="font-medium">{review.name}</div>
                            <div className="text-xs ml-2 bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded">
                              {review.rating}/5
                            </div>
                          </div>
                          <div className="text-sm mt-2">{review.comment}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      Belum ada ulasan untuk mentor ini.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
