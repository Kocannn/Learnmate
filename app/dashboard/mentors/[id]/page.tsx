import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Star, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MentorDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch this data from your API
  const mentor = {
    id: Number.parseInt(params.id),
    name: "Budi Santoso",
    category: "Programming",
    subcategory: "Web Development",
    rating: 4.9,
    price: 350000,
    image: "/placeholder.svg?height=200&width=200",
    bio: "Senior Software Engineer dengan 10 tahun pengalaman di berbagai teknologi web dan mobile. Spesialisasi di JavaScript, React, dan Node.js. Saya telah membantu lebih dari 50 mentee untuk mengembangkan karir mereka di bidang pengembangan web.",
    experience: [
      {
        company: "Tech Company A",
        position: "Senior Software Engineer",
        duration: "2020 - Sekarang",
      },
      {
        company: "Tech Company B",
        position: "Software Engineer",
        duration: "2017 - 2020",
      },
    ],
    education: [
      {
        institution: "Universitas Indonesia",
        degree: "S1 Ilmu Komputer",
        year: "2013 - 2017",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "Next.js", "Express", "MongoDB"],
    reviews: [
      {
        id: 1,
        user: "Ahmad",
        rating: 5,
        comment: "Mentor yang sangat membantu dan sabar dalam menjelaskan konsep-konsep yang kompleks.",
        date: "2 bulan yang lalu",
      },
      {
        id: 2,
        user: "Siti",
        rating: 5,
        comment: "Saya belajar banyak dari sesi mentoring dengan Pak Budi. Sangat direkomendasikan!",
        date: "3 bulan yang lalu",
      },
      {
        id: 3,
        user: "Rudi",
        rating: 4,
        comment: "Mentor yang baik dengan pengetahuan yang luas tentang pengembangan web.",
        date: "4 bulan yang lalu",
      },
    ],
    availableTimes: [
      { date: "10 Maret 2025", slots: ["09:00", "13:00", "15:00"] },
      { date: "11 Maret 2025", slots: ["10:00", "14:00"] },
      { date: "12 Maret 2025", slots: ["09:00", "11:00", "16:00"] },
    ],
  }

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/dashboard/search">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Pencarian
          </Link>
        </Button>
      </div>

      {/* Mentor Profile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <img
                  src={mentor.image || "/placeholder.svg"}
                  alt={mentor.name}
                  className="rounded-full h-32 w-32 mb-4"
                />
                <h2 className="text-xl font-bold">{mentor.name}</h2>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm text-muted-foreground">{mentor.category}</span>
                  <span className="text-xs">•</span>
                  <span className="text-sm text-muted-foreground">{mentor.subcategory}</span>
                </div>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="ml-1 font-medium">{mentor.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">({mentor.reviews.length} ulasan)</span>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-xl font-bold">Rp {mentor.price.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground"> / sesi</span>
                </div>
                <Button className="w-full mt-6">Jadwalkan Sesi</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="reviews">Ulasan</TabsTrigger>
              <TabsTrigger value="schedule">Jadwal</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tentang Mentor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Bio</h3>
                    <p className="text-sm text-muted-foreground">{mentor.bio}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Pengalaman</h3>
                    <div className="space-y-3">
                      {mentor.experience.map((exp, index) => (
                        <div key={index} className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{exp.position}</p>
                            <p className="text-sm text-muted-foreground">{exp.company}</p>
                            <p className="text-xs text-muted-foreground">{exp.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Pendidikan</h3>
                    <div className="space-y-3">
                      {mentor.education.map((edu, index) => (
                        <div key={index} className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{edu.degree}</p>
                            <p className="text-sm text-muted-foreground">{edu.institution}</p>
                            <p className="text-xs text-muted-foreground">{edu.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Keahlian</h3>
                    <div className="flex flex-wrap gap-2">
                      {mentor.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ulasan Mentee</CardTitle>
                  <CardDescription>Apa kata mentee tentang {mentor.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mentor.reviews.map((review) => (
                      <div key={review.id} className="pb-6 border-b last:border-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-3">
                              <span className="text-sm font-medium">{review.user.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="font-medium">{review.user}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-slate-300 dark:text-slate-600"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Jadwal Tersedia</CardTitle>
                  <CardDescription>Pilih tanggal dan waktu yang tersedia untuk sesi mentoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mentor.availableTimes.map((schedule, index) => (
                      <div key={index} className="pb-6 border-b last:border-0">
                        <div className="flex items-center mb-4">
                          <Calendar className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                          <h3 className="font-medium">{schedule.date}</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {schedule.slots.map((time, i) => (
                            <Button key={i} variant="outline" className="flex items-center justify-center">
                              <Clock className="h-4 w-4 mr-2" />
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Lanjut ke Pembayaran</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

