LearnMate adalah platform mentoring online yang menghubungkan mentor dengan mentee untuk sesi pembelajaran interaktif. Platform ini menyediakan sistem booking, integrasi Zoom untuk pertemuan virtual, dan manajemen profil lengkap.

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Teknologi](#teknologi)
- [Arsitektur](#arsitektur)
- [Alur Kerja](#alur-kerja)
- [Struktur Proyek](#struktur-proyek)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Instalasi dan Konfigurasi](#instalasi-dan-konfigurasi)

## Fitur Utama

- 👤 **Manajemen Profil**: Profil lengkap untuk mentor dan mentee
- 🗓️ **Sistem Booking**: Pencarian dan pemesanan jadwal mentoring
- 📝 **Preferensi Pembelajaran**: Penyesuaian pengalaman belajar
- 📹 **Integrasi Zoom**: Pembuatan meeting otomatis untuk sesi
- ⭐ **Sistem Rating & Review**: Ulasan untuk meningkatkan kualitas mentoring
- 📊 **Dashboard**: Pantau sesi mendatang dan riwayat sesi

## Teknologi

- **Frontend**: Next.js, React, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL dengan Prisma ORM
- **Autentikasi**: NextAuth.js
- **Integrasi**: Zoom API

## Arsitektur

### High-Level Architecture

```
├── Client Layer
│   ├── Dashboard Pages (React Components)
│   ├── Authentication UI
│   └── Profile Management UI
│
├── API Layer (Next.js API Routes)
│   ├── Authentication (/api/auth/*)
│   ├── Bookings (/api/v1/bookings/*)
│   ├── Meetings (/api/v1/meetings/*)
│   └── Users (/api/v1/users/*)
│
├── Service Layer
│   ├── Authentication Service
│   ├── Booking Service
│   ├── Meeting Service
│   └── User Service
│
├── Data Access Layer
│   └── Prisma ORM
│
└── Database
    └── PostgreSQL
```

### Routing Structure

```
/
├── app/
│   ├── auth/         # Authentication pages (login, register)
│   ├── dashboard/    # Protected dashboard routes
│   │   ├── bookings/ # Booking management
│   │   │   └── confirm/ # Confirm booking page
│   │   ├── meetings/ # Meeting management
│   │   └── profile/  # User profile management
│   └── api/         # API routes
│       └── v1/      # API version 1
│           ├── bookings/ # Booking API endpoints
│           ├── meetings/ # Meeting API endpoints
│           └── users/    # User API endpoints
├── components/      # Shared UI components
│   ├── ui/          # Base UI components
│   └── profile/     # Profile-specific components
└── lib/            # Utility functions and services
```

## Alur Kerja

1. **Registrasi/Login**: Pengguna mendaftar sebagai mentor atau mentee
2. **Profil**: Melengkapi profil dengan pengalaman, pendidikan, dan preferensi
3. **Pencarian**: Mentee mencari mentor berdasarkan keahlian dan rating
4. **Booking**: Mentee memilih jadwal dan membuat booking dengan mentor
5. **Konfirmasi**: Mentor mengkonfirmasi booking dan sistem membuat Zoom meeting
6. **Meeting**: Kedua pihak menghadiri meeting melalui link Zoom yang diberikan
7. **Review**: Setelah sesi selesai, mentee memberikan rating dan review

## API Endpoints

### Booking API

#### `GET /api/v1/bookings`

Mengambil semua booking milik user yang sedang login.

**Response**:

```json
{
  "bookings": [
    {
      "id": "clg2u3jk50000v9qt7s8j3l5b",
      "mentorId": "clg2u3jk50000v9qt7s8j3l5a",
      "studentId": "clg2u3jk50000v9qt7s8j3l5c",
      "topic": "JavaScript Fundamentals",
      "date": "2023-06-15T13:00:00Z",
      "duration": 60,
      "status": "confirmed",
      "zoomJoinUrl": "https://zoom.us/j/123456789",
      "zoomStartUrl": "https://zoom.us/s/123456789",
      "zoomPassword": "123456",
      "mentor": {
        "id": "clg2u3jk50000v9qt7s8j3l5a",
        "name": "Budi Santoso",
        "profileImage": "/placeholder.svg?height=200&width=200",
        "expertise": "JavaScript, React, Node.js"
      }
    }
  ]
}
```

#### `GET /api/v1/bookings/:id`

Mengambil detail booking tertentu.

**Response**:

```json
{
  "id": "clg2u3jk50000v9qt7s8j3l5b",
  "mentorId": "clg2u3jk50000v9qt7s8j3l5a",
  "studentId": "clg2u3jk50000v9qt7s8j3l5c",
  "topic": "JavaScript Fundamentals",
  "date": "2023-06-15T13:00:00Z",
  "duration": 60,
  "status": "confirmed",
  "mentor": {
    "id": "clg2u3jk50000v9qt7s8j3l5a",
    "name": "Budi Santoso",
    "profileImage": "/placeholder.svg?height=200&width=200",
    "expertise": "JavaScript, React, Node.js",
    "rate": 350000
  }
}
```

#### `PUT /api/v1/bookings/:id/confirm`

Mengkonfirmasi booking tertentu.

**Response**:

```json
{
  "success": true,
  "booking": {
    "id": "clg2u3jk50000v9qt7s8j3l5b",
    "status": "confirmed"
  }
}
```

### Meeting API

#### `POST /api/v1/meetings/create`

Membuat Zoom meeting untuk booking.

**Request**:

```json
{
  "topic": "Sesi Mentoring dengan Budi Santoso",
  "start_time": "2023-06-15T13:00:00Z",
  "duration": 60
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "id": "123456789",
    "join_url": "https://zoom.us/j/123456789",
    "start_url": "https://zoom.us/s/123456789",
    "password": "123456"
  }
}
```

## Database Schema

### User

- `id`: String (Primary Key)
- `name`: String
- `email`: String (Unique)
- `emailVerified`: DateTime
- `phone`: String
- `location`: String
- `hasCompletedOnboarding`: Boolean
- `bio`: Text
- `profileImage`: String
- `interests`: String[]
- `isMentor`: Boolean
- `expertise`: String[]
- `rate`: Float
- `rating`: Float
- `reviewCount`: Int
- `completedSessions`: Int
- `totalHours`: Float
- `mentorCount`: Int

### Booking

- `id`: String (Primary Key)
- `mentorId`: String (Foreign Key)
- `studentId`: String (Foreign Key)
- `topic`: String
- `date`: DateTime
- `duration`: Int
- `status`: String
- `zoomMeetingId`: String
- `zoomJoinUrl`: Text
- `zoomStartUrl`: Text
- `zoomPassword`: String

### Experience

- `id`: String (Primary Key)
- `userId`: String (Foreign Key)
- `company`: String
- `position`: String
- `duration`: String

### Education

- `id`: String (Primary Key)
- `userId`: String (Foreign Key)
- `institution`: String
- `degree`: String
- `year`: String

### Availability

- `id`: String (Primary Key)
- `userId`: String (Foreign Key)
- `day`: String
- `slots`: String[]

## Instalasi dan Konfigurasi

1. Clone repositori

   ```bash
   git clone https://github.com/username/learnmate.git
   cd learnmate
   ```

2. Instal dependensi

   ```bash
   npm install
   ```

3. Konfigurasi variabel lingkungan

   ```
   # .env
   DATABASE_URL="postgresql://user:password@localhost:5432/learnmate"
   DIRECT_URL="postgresql://user:password@localhost:5432/learnmate"
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"

   # Zoom API credentials
   ZOOM_CLIENT_ID="your-zoom-client-id"
   ZOOM_CLIENT_SECRET="your-zoom-client-secret"
   ZOOM_ACCOUNT_ID="your-zoom-account-id"
   ```

4. Siapkan database dan jalankan migrasi

   ```bash
   npx prisma migrate dev
   ```

5. Seed database dengan data awal

   ```bash
   npx prisma db seed
   ```

6. Jalankan aplikasi

   ```bash
   npm run dev
   ```

7. Buka browser dan akses `http://localhost:3000`

## Pengembangan ke Depan

- [ ] Implementasi sistem pembayaran
- [ ] Fitur chat real-time
- [ ] Sistem notifikasi lanjutan
- [ ] Rekomendasi mentor berbasis AI
- [ ] Mobile app integration

## Kontributor

- Dwi Candra Andika (F 551 23 028)

## Lisensi

Hak Cipta © 2025 LearnMate. Seluruh hak dilindungi.

---

Dokumentasi dibuat dengan 💙 untuk LearnMate.
