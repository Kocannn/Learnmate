"use client"

import { useState } from "react"
import {
  BadgeCheck,
  Calendar,
  Camera,
  Clock,
  CreditCard,
  Edit,
  GraduationCap,
  Lock,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  Star,
  Trash,
  User,
  UserCircle,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const [userType, setUserType] = useState<"mentee" | "mentor">("mentee")
  const [editMode, setEditMode] = useState(false)
  const [showAddEducation, setShowAddEducation] = useState(false)
  const [showAddExperience, setShowAddExperience] = useState(false)

  // Sample user data
  const userData = {
    name: "Andi Wijaya",
    email: "andi.wijaya@example.com",
    phone: "+62 812 3456 7890",
    location: "Jakarta, Indonesia",
    bio: "Mahasiswa Ilmu Komputer yang tertarik dengan pengembangan web dan mobile. Sedang mencari mentor untuk meningkatkan keterampilan dalam React dan Node.js.",
    profileImage: "/placeholder.svg?height=200&width=200",
    joinDate: "Januari 2025",
    education: [
      {
        id: 1,
        institution: "Universitas Indonesia",
        degree: "S1 Ilmu Komputer",
        year: "2022 - 2026 (Sedang Berjalan)",
      },
    ],
    interests: ["Web Development", "Mobile Development", "UI/UX Design"],
    completedSessions: 8,
    totalHours: 12,
    mentors: 3,
    // Mentor specific data
    expertise: ["JavaScript", "React", "Node.js"],
    rate: 350000,
    rating: 4.8,
    reviewCount: 24,
    availability: [
      { day: "Senin", slots: ["09:00 - 11:00", "15:00 - 17:00"] },
      { day: "Rabu", slots: ["13:00 - 15:00", "19:00 - 21:00"] },
      { day: "Jumat", slots: ["10:00 - 12:00", "16:00 - 18:00"] },
    ],
    experience: [
      {
        id: 1,
        company: "Tech Company A",
        position: "Frontend Developer",
        duration: "2022 - Sekarang",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profil Saya</h1>
        <p className="text-muted-foreground">Kelola informasi profil dan pengaturan akun Anda</p>
      </div>

      <div className="flex justify-end">
        <RadioGroup
          defaultValue={userType}
          className="flex"
          onValueChange={(value) => setUserType(value as "mentee" | "mentor")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mentee" id="mentee" />
            <Label htmlFor="mentee">Tampilan Mentee</Label>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <RadioGroupItem value="mentor" id="mentor" />
            <Label htmlFor="mentor">Tampilan Mentor</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={userData.profileImage || "/placeholder.svg"}
                    alt={userData.name}
                    className="rounded-full h-32 w-32 mb-4"
                  />
                  <Button size="icon" className="absolute bottom-4 right-0 rounded-full h-8 w-8" variant="secondary">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{userType === "mentor" ? "Mentor" : "Mentee"}</p>

                {userType === "mentor" && (
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="ml-1 font-medium">{userData.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">({userData.reviewCount} ulasan)</span>
                  </div>
                )}

                <div className="w-full mt-6 space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{userData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Telepon</p>
                      <p className="text-sm text-muted-foreground">{userData.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Lokasi</p>
                      <p className="text-sm text-muted-foreground">{userData.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Bergabung Sejak</p>
                      <p className="text-sm text-muted-foreground">{userData.joinDate}</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6" onClick={() => setEditMode(!editMode)}>
                  {editMode ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Simpan Perubahan
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profil
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {userType === "mentee" && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">Statistik Pembelajaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                      <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sesi Selesai</p>
                    </div>
                  </div>
                  <p className="font-bold">{userData.completedSessions}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                      <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Jam</p>
                    </div>
                  </div>
                  <p className="font-bold">{userData.totalHours}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Mentor</p>
                    </div>
                  </div>
                  <p className="font-bold">{userData.mentors}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {userType === "mentor" && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">Tarif Sesi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-sm">Per sesi (60 menit)</p>
                  <p className="font-bold">Rp {userData.rate.toLocaleString()}</p>
                </div>

                {editMode && (
                  <div className="mt-4">
                    <Label htmlFor="rate">Edit Tarif</Label>
                    <div className="flex items-center mt-2">
                      <span className="text-sm mr-2">Rp</span>
                      <Input id="rate" type="number" defaultValue={userData.rate} className="flex-1" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="account">Akun</TabsTrigger>
              {userType === "mentor" && <TabsTrigger value="availability">Ketersediaan</TabsTrigger>}
              {userType === "mentee" && <TabsTrigger value="preferences">Preferensi</TabsTrigger>}
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Dasar</CardTitle>
                  <CardDescription>Informasi dasar yang akan ditampilkan di profil Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {editMode ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nama Lengkap</Label>
                          <Input id="name" defaultValue={userData.name} className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="location">Lokasi</Label>
                          <Input id="location" defaultValue={userData.location} className="mt-1" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" defaultValue={userData.bio} className="mt-1 min-h-[120px]" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-medium mb-2">Bio</h3>
                      <p className="text-sm text-muted-foreground">{userData.bio}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Pendidikan</CardTitle>
                    <CardDescription>Riwayat pendidikan Anda</CardDescription>
                  </div>
                  {editMode && (
                    <Button variant="outline" size="sm" onClick={() => setShowAddEducation(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.education.map((edu) => (
                      <div key={edu.id} className="flex items-start group">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                          <GraduationCap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{edu.degree}</p>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          <p className="text-xs text-muted-foreground">{edu.year}</p>
                        </div>
                        {editMode && (
                          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}

                    {userData.education.length === 0 && (
                      <div className="text-center py-4">
                        <GraduationCap className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Belum ada data pendidikan</p>
                        {editMode && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => setShowAddEducation(true)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Tambah Pendidikan
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {userType === "mentor" && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Pengalaman</CardTitle>
                      <CardDescription>Riwayat pengalaman kerja Anda</CardDescription>
                    </div>
                    {editMode && (
                      <Button variant="outline" size="sm" onClick={() => setShowAddExperience(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userData.experience.map((exp) => (
                        <div key={exp.id} className="flex items-start group">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                            <UserCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{exp.position}</p>
                            <p className="text-sm text-muted-foreground">{exp.company}</p>
                            <p className="text-xs text-muted-foreground">{exp.duration}</p>
                          </div>
                          {editMode && (
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </div>
                      ))}

                      {userData.experience.length === 0 && (
                        <div className="text-center py-4">
                          <UserCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Belum ada data pengalaman</p>
                          {editMode && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => setShowAddExperience(true)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Tambah Pengalaman
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{userType === "mentor" ? "Keahlian" : "Minat"}</CardTitle>
                    <CardDescription>
                      {userType === "mentor"
                        ? "Bidang keahlian yang Anda kuasai"
                        : "Bidang yang Anda minati untuk dipelajari"}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {editMode ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {(userType === "mentor" ? userData.expertise : userData.interests).map((item, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1.5">
                            {item}
                            <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1">
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                        <Button variant="outline" size="sm" className="rounded-full">
                          <Plus className="h-4 w-4 mr-1" />
                          Tambah
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {(userType === "mentor" ? userData.expertise : userData.interests).map((item, index) => (
                        <Badge key={index} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account" className="mt-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Kontak</CardTitle>
                  <CardDescription>Informasi kontak yang digunakan untuk komunikasi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={userData.email} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input id="phone" type="tel" defaultValue={userData.phone} className="mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Keamanan</CardTitle>
                  <CardDescription>Pengaturan keamanan akun Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Button variant="outline">
                      <Lock className="h-4 w-4 mr-2" />
                      Ubah Password
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="2fa">Verifikasi Dua Faktor</Label>
                      <p className="text-sm text-muted-foreground">
                        Aktifkan verifikasi dua faktor untuk keamanan tambahan
                      </p>
                    </div>
                    <Switch id="2fa" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Metode Pembayaran</CardTitle>
                  <CardDescription>Kelola metode pembayaran Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Visa •••• 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>

                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Metode Pembayaran
                  </Button>
                </CardContent>
              </Card>

              {userType === "mentor" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Pembayaran</CardTitle>
                    <CardDescription>Informasi untuk menerima pembayaran dari sesi mentoring</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="bank">Nama Bank</Label>
                      <Input id="bank" defaultValue="Bank Central Asia (BCA)" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="account-number">Nomor Rekening</Label>
                      <Input id="account-number" defaultValue="1234567890" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="account-name">Nama Pemilik Rekening</Label>
                      <Input id="account-name" defaultValue={userData.name} className="mt-1" />
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">Hapus Akun</CardTitle>
                  <CardDescription>Menghapus akun Anda secara permanen</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Setelah Anda menghapus akun, semua data Anda akan dihapus secara permanen. Tindakan ini tidak dapat
                    dibatalkan.
                  </p>
                  <Button variant="destructive">Hapus Akun</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Availability Tab (Mentor Only) */}
            {userType === "mentor" && (
              <TabsContent value="availability" className="mt-4 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Jadwal Ketersediaan</CardTitle>
                    <CardDescription>Atur jadwal ketersediaan Anda untuk sesi mentoring</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {userData.availability.map((schedule, index) => (
                      <div key={index} className="pb-6 border-b last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                            <h3 className="font-medium">{schedule.day}</h3>
                          </div>
                          {editMode && (
                            <Button variant="ghost" size="sm">
                              <Trash className="h-4 w-4 mr-2 text-destructive" />
                              Hapus
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {schedule.slots.map((time, i) => (
                            <div key={i} className="relative group">
                              <Button variant="outline" className="w-full flex items-center justify-center">
                                <Clock className="h-4 w-4 mr-2" />
                                {time}
                              </Button>
                              {editMode && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          ))}
                          {editMode && (
                            <Button variant="outline" className="border-dashed">
                              <Plus className="h-4 w-4 mr-2" />
                              Tambah Slot
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}

                    {editMode && (
                      <Button className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Hari Baru
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan Sesi</CardTitle>
                    <CardDescription>Konfigurasi pengaturan untuk sesi mentoring Anda</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="session-duration">Durasi Sesi Default</Label>
                      <Select defaultValue="60">
                        <SelectTrigger id="session-duration" className="mt-1">
                          <SelectValue placeholder="Pilih durasi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 menit</SelectItem>
                          <SelectItem value="60">60 menit</SelectItem>
                          <SelectItem value="90">90 menit</SelectItem>
                          <SelectItem value="120">120 menit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="buffer-time">Waktu Jeda Antar Sesi</Label>
                      <Select defaultValue="15">
                        <SelectTrigger id="buffer-time" className="mt-1">
                          <SelectValue placeholder="Pilih waktu jeda" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Tidak ada jeda</SelectItem>
                          <SelectItem value="5">5 menit</SelectItem>
                          <SelectItem value="10">10 menit</SelectItem>
                          <SelectItem value="15">15 menit</SelectItem>
                          <SelectItem value="30">30 menit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-confirm">Konfirmasi Otomatis</Label>
                        <p className="text-sm text-muted-foreground">
                          Otomatis konfirmasi booking sesi tanpa persetujuan manual
                        </p>
                      </div>
                      <Switch id="auto-confirm" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="reminder">Pengingat Sesi</Label>
                        <p className="text-sm text-muted-foreground">Kirim pengingat email/SMS sebelum sesi dimulai</p>
                      </div>
                      <Switch id="reminder" defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Integrasi Zoom</CardTitle>
                    <CardDescription>Konfigurasi integrasi Zoom untuk sesi mentoring online</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center p-4 border rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-blue-600"
                        >
                          <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
                          <rect x="3" y="6" width="12" height="12" rx="2" ry="2" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Zoom</p>
                        <p className="text-sm text-muted-foreground">Akun terhubung: {userData.email}</p>
                      </div>
                      <Badge className="ml-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        <BadgeCheck className="h-3 w-3 mr-1" />
                        Terhubung
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-generate">Generate Link Otomatis</Label>
                        <p className="text-sm text-muted-foreground">
                          Otomatis membuat link Zoom saat booking dikonfirmasi
                        </p>
                      </div>
                      <Switch id="auto-generate" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Preferences Tab (Mentee Only) */}
            {userType === "mentee" && (
              <TabsContent value="preferences" className="mt-4 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferensi Pembelajaran</CardTitle>
                    <CardDescription>
                      Atur preferensi pembelajaran Anda untuk mendapatkan rekomendasi yang lebih baik
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="learning-style">Gaya Belajar</Label>
                      <Select defaultValue="visual">
                        <SelectTrigger id="learning-style" className="mt-1">
                          <SelectValue placeholder="Pilih gaya belajar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="visual">Visual</SelectItem>
                          <SelectItem value="auditory">Auditori</SelectItem>
                          <SelectItem value="reading">Membaca/Menulis</SelectItem>
                          <SelectItem value="kinesthetic">Kinestetik</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="session-frequency">Frekuensi Sesi yang Diinginkan</Label>
                      <Select defaultValue="weekly">
                        <SelectTrigger id="session-frequency" className="mt-1">
                          <SelectValue placeholder="Pilih frekuensi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Harian</SelectItem>
                          <SelectItem value="weekly">Mingguan</SelectItem>
                          <SelectItem value="biweekly">Dua Minggu Sekali</SelectItem>
                          <SelectItem value="monthly">Bulanan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="preferred-time">Waktu yang Disukai</Label>
                      <Select defaultValue="evening">
                        <SelectTrigger id="preferred-time" className="mt-1">
                          <SelectValue placeholder="Pilih waktu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Pagi (08:00 - 12:00)</SelectItem>
                          <SelectItem value="afternoon">Siang (12:00 - 17:00)</SelectItem>
                          <SelectItem value="evening">Malam (17:00 - 21:00)</SelectItem>
                          <SelectItem value="flexible">Fleksibel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Tujuan Pembelajaran</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="goal-1" className="rounded text-indigo-600" defaultChecked />
                          <Label htmlFor="goal-1" className="text-sm font-normal">
                            Meningkatkan Keterampilan Teknis
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="goal-2" className="rounded text-indigo-600" defaultChecked />
                          <Label htmlFor="goal-2" className="text-sm font-normal">
                            Persiapan Karir
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="goal-3" className="rounded text-indigo-600" />
                          <Label htmlFor="goal-3" className="text-sm font-normal">
                            Pengembangan Proyek
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="goal-4" className="rounded text-indigo-600" />
                          <Label htmlFor="goal-4" className="text-sm font-normal">
                            Persiapan Wawancara
                          </Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preferensi Mentor</CardTitle>
                    <CardDescription>Atur preferensi untuk jenis mentor yang Anda inginkan</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="experience-level">Tingkat Pengalaman</Label>
                      <Select defaultValue="mid">
                        <SelectTrigger id="experience-level" className="mt-1">
                          <SelectValue placeholder="Pilih tingkat pengalaman" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level (1-3 tahun)</SelectItem>
                          <SelectItem value="mid">Mid Level (3-5 tahun)</SelectItem>
                          <SelectItem value="senior">Senior (5+ tahun)</SelectItem>
                          <SelectItem value="any">Tidak ada preferensi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="communication-style">Gaya Komunikasi</Label>
                      <Select defaultValue="structured">
                        <SelectTrigger id="communication-style" className="mt-1">
                          <SelectValue placeholder="Pilih gaya komunikasi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="direct">Langsung dan Tegas</SelectItem>
                          <SelectItem value="supportive">Suportif dan Memotivasi</SelectItem>
                          <SelectItem value="structured">Terstruktur dan Sistematis</SelectItem>
                          <SelectItem value="any">Tidak ada preferensi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="ai-recommendations">Rekomendasi AI</Label>
                        <p className="text-sm text-muted-foreground">
                          Aktifkan rekomendasi mentor berbasis AI berdasarkan preferensi Anda
                        </p>
                      </div>
                      <Switch id="ai-recommendations" defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notifikasi</CardTitle>
                    <CardDescription>Atur preferensi notifikasi untuk platform</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email</Label>
                        <p className="text-sm text-muted-foreground">Terima notifikasi melalui email</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS</Label>
                        <p className="text-sm text-muted-foreground">Terima notifikasi melalui SMS</p>
                      </div>
                      <Switch id="sms-notifications" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="browser-notifications">Browser</Label>
                        <p className="text-sm text-muted-foreground">Terima notifikasi melalui browser</p>
                      </div>
                      <Switch id="browser-notifications" defaultChecked />
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Jenis Notifikasi</h3>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="booking-notifications" className="text-sm font-normal">
                          Konfirmasi Booking
                        </Label>
                        <Switch id="booking-notifications" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="reminder-notifications" className="text-sm font-normal">
                          Pengingat Sesi
                        </Label>
                        <Switch id="reminder-notifications" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="promo-notifications" className="text-sm font-normal">
                          Promo dan Penawaran
                        </Label>
                        <Switch id="promo-notifications" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>

      {/* Add Education Dialog */}
      <Dialog open={showAddEducation} onOpenChange={setShowAddEducation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Pendidikan</DialogTitle>
            <DialogDescription>Tambahkan informasi pendidikan Anda</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="institution">Institusi</Label>
              <Input id="institution" placeholder="Nama universitas atau institusi" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="degree">Gelar/Jurusan</Label>
              <Input id="degree" placeholder="Contoh: S1 Ilmu Komputer" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="year">Tahun</Label>
              <Input id="year" placeholder="Contoh: 2020 - 2024" className="mt-1" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEducation(false)}>
              Batal
            </Button>
            <Button onClick={() => setShowAddEducation(false)}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Experience Dialog */}
      <Dialog open={showAddExperience} onOpenChange={setShowAddExperience}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Pengalaman</DialogTitle>
            <DialogDescription>Tambahkan informasi pengalaman kerja Anda</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="company">Perusahaan</Label>
              <Input id="company" placeholder="Nama perusahaan" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="position">Posisi</Label>
              <Input id="position" placeholder="Contoh: Software Engineer" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="duration">Durasi</Label>
              <Input id="duration" placeholder="Contoh: 2020 - Sekarang" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="description">Deskripsi (Opsional)</Label>
              <Textarea
                id="description"
                placeholder="Deskripsi singkat tentang peran dan tanggung jawab Anda"
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddExperience(false)}>
              Batal
            </Button>
            <Button onClick={() => setShowAddExperience(false)}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

