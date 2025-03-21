"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, Award, MapPin, Star } from "lucide-react";
import { format, parse, formatDistanceToNow } from "date-fns";
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

// Star Rating component
function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  // Convert rating to a scale of 5 stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex">
      {/* Full stars */}
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Star
            key={`full-${i}`}
            size={size}
            className="text-yellow-400 fill-yellow-400"
          />
        ))}

      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star size={size} className="text-yellow-400" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star size={size} className="text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      )}

      {/* Empty stars */}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-yellow-400" />
        ))}
    </div>
  );
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
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    async function fetchMentorData() {
      try {
        const response = await fetch(
          `/api/v1/mentors/${id}?includeReviews=true`,
        );
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

  async function handleSubmitReview() {
    if (!reviewComment) {
      toast({
        title: "Informasi tidak lengkap",
        description: "Mohon isi komentar ulasan",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingReview(true);

    try {
      const response = await fetch("/api/v1/reviews/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mentorId: mentor?.id,
          rating: reviewRating,
          comment: reviewComment,
        }),
      });

      if (!response.ok) throw new Error("Gagal menambahkan ulasan");

      toast({ title: "Berhasil", description: "Ulasan berhasil ditambahkan" });
      setShowReviewForm(false);
      setReviewComment("");
      // Refresh mentor data to show the new review
      const updatedMentor = await fetch(`/api/v1/mentors/${id}`).then((r) =>
        r.json(),
      );
      setMentor(updatedMentor);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Gagal menambahkan ulasan",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingReview(false);
    }
  }

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
                <div className="flex flex-col items-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    Expertise
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 ">
                    {mentor.expertise?.map((exp, index) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full inline-block min-w-[60px] text-center"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center mt-2">
                  <MapPin size={16} className="mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {mentor.location || "Indonesia"}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {mentor.interests?.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full inline-block min-w-[60px] text-center"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="w-full">
                  <div className="flex justify-between mb-2 items-center">
                    <span>Rating</span>
                    <div className="flex items-center gap-1">
                      <StarRating
                        rating={parseFloat(mentor.rating || "4.8")}
                        size={14}
                      />
                      <span className="font-medium ml-1">
                        {mentor.rating || "4.8"}/5
                      </span>
                    </div>
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
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Ulasan Mentee
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {mentor.reviewCount || 0} ulasan dari mentee
                    </p>
                  </div>
                  {!showReviewForm && (
                    <Button
                      variant="outline"
                      onClick={() => setShowReviewForm(true)}
                      className="text-sm flex items-center gap-2"
                    >
                      <Star className="h-4 w-4" /> Tambah Ulasan
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {showReviewForm && (
                    <div className="mb-8 border rounded-lg p-6 bg-card shadow-sm">
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <Star className="h-5 w-5 text-primary" />
                        Tambahkan Ulasan
                      </h3>
                      <div className="mb-6">
                        <Label
                          htmlFor="rating"
                          className="block mb-2 font-medium"
                        >
                          Rating
                        </Label>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => setReviewRating(rating)}
                              className="p-1.5 rounded-md transition-all hover:scale-110"
                              title={`${rating} star${rating > 1 ? "s" : ""}`}
                            >
                              <Star
                                size={28}
                                className={
                                  reviewRating >= rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mb-6">
                        <Label
                          htmlFor="comment"
                          className="block mb-2 font-medium"
                        >
                          Komentar
                        </Label>
                        <Textarea
                          id="comment"
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="Bagikan pengalaman Anda dengan mentor ini..."
                          className="w-full min-h-[120px] resize-none focus:ring-primary"
                          rows={4}
                        />
                      </div>
                      <div className="flex space-x-3">
                        <Button
                          onClick={handleSubmitReview}
                          disabled={isSubmittingReview || !reviewComment}
                          className="px-6"
                        >
                          {isSubmittingReview ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent mr-2"></div>
                              Mengirim...
                            </>
                          ) : (
                            "Kirim Ulasan"
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowReviewForm(false)}
                        >
                          Batal
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Display existing reviews */}

                  {mentor.receivedReviews &&
                  mentor.receivedReviews.length > 0 ? (
                    <div className="space-y-6 mt-6">
                      {mentor.receivedReviews.map((review) => (
                        <div
                          key={review.id}
                          className="border rounded-lg p-5 bg-card shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {review.user?.profileImage ? (
                                <div className="h-12 w-12 rounded-full overflow-hidden">
                                  <Image
                                    src={review.user.profileImage}
                                    alt={review.user?.name || "User"}
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-white font-semibold text-lg">
                                  {review.user?.name?.charAt(0) || "U"}
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-foreground">
                                  {review.user?.name || "Anonymous"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(
                                    review.createdAt,
                                  ).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                  <span className="ml-1 text-xs font-medium text-primary">
                                    •{" "}
                                    {formatDistanceToNow(
                                      new Date(review.createdAt),
                                      { addSuffix: true },
                                    )}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="bg-secondary px-3 py-1.5 rounded-full">
                              <StarRating rating={review.rating} size={16} />
                            </div>
                          </div>
                          <div className="mt-4 text-sm text-card-foreground border-t pt-3">
                            <p className="leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 px-6 border-2 border-dashed rounded-lg mt-6">
                      <Star className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
                      <p className="text-muted-foreground font-medium">
                        Belum ada ulasan untuk mentor ini
                      </p>
                      <p className="text-sm text-muted-foreground/70 mt-1">
                        Jadilah yang pertama memberikan ulasan
                      </p>
                    </div>
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
