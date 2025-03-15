"use client"

import { useState } from "react"
import Link from "next/link"
import { Filter, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for mentors
  const mentors = [
    {
      id: 1,
      name: "Budi Santoso",
      category: "Programming",
      subcategory: "Web Development",
      rating: 4.9,
      price: 350000,
      image: "/placeholder.svg?height=80&width=80",
      bio: "Senior Software Engineer dengan 10 tahun pengalaman di berbagai teknologi web dan mobile.",
    },
    {
      id: 2,
      name: "Siti Rahayu",
      category: "UI/UX Design",
      subcategory: "Product Design",
      rating: 4.8,
      price: 400000,
      image: "/placeholder.svg?height=80&width=80",
      bio: "UI/UX Designer dengan pengalaman di perusahaan teknologi terkemuka.",
    },
    {
      id: 3,
      name: "Ahmad Hidayat",
      category: "Data Science",
      subcategory: "Machine Learning",
      rating: 4.7,
      price: 450000,
      image: "/placeholder.svg?height=80&width=80",
      bio: "Data Scientist dengan keahlian di machine learning dan analisis data.",
    },
    {
      id: 4,
      name: "Dewi Lestari",
      category: "Programming",
      subcategory: "Mobile Development",
      rating: 4.6,
      price: 375000,
      image: "/placeholder.svg?height=80&width=80",
      bio: "Mobile Developer dengan fokus pada pengembangan aplikasi Android dan iOS.",
    },
    {
      id: 5,
      name: "Rudi Hartono",
      category: "Business",
      subcategory: "Marketing",
      rating: 4.8,
      price: 500000,
      image: "/placeholder.svg?height=80&width=80",
      bio: "Marketing Specialist dengan pengalaman di berbagai industri.",
    },
    {
      id: 6,
      name: "Rina Wijaya",
      category: "Business",
      subcategory: "Entrepreneurship",
      rating: 4.9,
      price: 550000,
      image: "/placeholder.svg?height=80&width=80",
      bio: "Entrepreneur sukses dengan pengalaman membangun beberapa startup.",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cari Mentor</h1>
        <p className="text-muted-foreground">Temukan mentor yang sesuai dengan kebutuhan belajar Anda</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari berdasarkan nama atau keahlian..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="design">UI/UX Design</SelectItem>
              <SelectItem value="data">Data Science</SelectItem>
              <SelectItem value="business">Business</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
        <div>
          <h3 className="text-sm font-medium mb-2">Rating</h3>
          <Select defaultValue="4">
            <SelectTrigger>
              <SelectValue placeholder="Minimum Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3+ Bintang</SelectItem>
              <SelectItem value="4">4+ Bintang</SelectItem>
              <SelectItem value="4.5">4.5+ Bintang</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Harga per Sesi</h3>
          <div className="pt-4">
            <Slider defaultValue={[500000]} max={1000000} step={50000} />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Rp 100.000</span>
              <span>Rp 1.000.000</span>
            </div>
          </div>
        </div>
        <div className="flex items-end">
          <Button className="w-full">Terapkan Filter</Button>
        </div>
      </div>

      {/* Mentor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
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
                  <span className="text-sm text-muted-foreground">{mentor.subcategory}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm ml-1">{mentor.rating}</span>
                </div>
                <p className="text-sm text-center text-muted-foreground mt-3">{mentor.bio}</p>
                <div className="mt-4 text-center">
                  <span className="font-medium">Rp {mentor.price.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground"> / sesi</span>
                </div>
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
  )
}

