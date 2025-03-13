import Link from "next/link"
import { ArrowRight, Calendar, ChevronRight, Clock, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  // Sample data for recommended mentors
  const recommendedMentors = [
    {
      id: 1,
      name: "Budi Santoso",
      category: "Programming",
      rating: 4.9,
      image: "/placeholder.svg?height=80&width=80",
      bio: "Senior Software Engineer dengan 10 tahun pengalaman di berbagai teknologi web dan mobile.",
    },
    {
      id: 2,
      name: "Siti Rahayu",
      category: "UI/UX Design",
      rating: 4.8,
      image: "/placeholder.svg?height=80&width=80",
      bio: "UI/UX Designer dengan pengalaman di perusahaan teknologi terkemuka.",
    },
    {
      id: 3,
      name: "Ahmad Hidayat",
      category: "Data Science",
      rating: 4.7,
      image: "/placeholder.svg?height=80&width=80",
      bio: "Data Scientist dengan keahlian di machine learning dan analisis data.",
    },
  ]

  // Sample data for upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      mentor: "Budi Santoso",
      date: "10 Maret 2025",
      time: "14:00 - 15:00",
      topic: "JavaScript Fundamentals",
    },
    {
      id: 2,
      mentor: "Siti Rahayu",
      date: "12 Maret 2025",
      time: "10:00 - 11:00",
      topic: "UI Design Principles",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Selamat datang kembali! Berikut adalah ringkasan aktivitas Anda.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sesi</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jam Belajar</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+4 dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mentor</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating Diberikan</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 dari bulan lalu</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Mentors */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Mentor Rekomendasi</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/search">
              Lihat Semua
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendedMentors.map((mentor) => (
            <Card key={mentor.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-12" />
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="flex flex-col items-center -mt-8">
                  <img
                    src={mentor.image || "/placeholder.svg"}
                    alt={mentor.name}
                    className="rounded-full border-4 border-white dark:border-slate-800 h-16 w-16 bg-white"
                  />
                  <h3 className="mt-2 font-semibold text-lg">{mentor.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm text-muted-foreground">{mentor.category}</span>
                    <span className="text-xs">•</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm ml-1">{mentor.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-center text-muted-foreground mt-3">{mentor.bio}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t p-4">
                <Button asChild>
                  <Link href={`/dashboard/mentors/${mentor.id}`}>Lihat Profil</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Sesi Mendatang</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/bookings">
              Lihat Semua
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {upcomingSessions.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <CardTitle className="text-base">{session.topic}</CardTitle>
                <CardDescription>dengan {session.mentor}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{session.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{session.time}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
                <Button size="sm">Join Zoom</Button>
              </CardFooter>
            </Card>
          ))}
          {upcomingSessions.length === 0 && (
            <Card className="col-span-2">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg">Tidak Ada Sesi Mendatang</h3>
                <p className="text-muted-foreground text-center mt-2">
                  Anda belum memiliki sesi mentoring yang dijadwalkan.
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/dashboard/search">
                    Cari Mentor
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

