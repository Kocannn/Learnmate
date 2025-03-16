"use client";

import ProfileTab from "@/components/profile/Profile-tab";
import AccountTab from "@/components/profile/AccountTab";
import AvailabilityTab from "@/components/profile/Availability";
import PreferencesTab from "@/components/profile/PreferencesTab";
import AddEducationDialog from "@/components/profile/AddEducationDialog";
import AddExperienceDialog from "@/components/profile/AddExperienceDialog";
import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { useSession } from "next-auth/react";
import { formatDate } from "@/lib/utils";

import { User as user } from "next-auth";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [userType, setUserType] = useState<"mentee" | "mentor">("mentee");
  const [editMode, setEditMode] = useState(false);
  const [showAddEducation, setShowAddEducation] = useState(false);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    if (session) {
      setUser({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        hasCompletedOnboarding: session.user.hasCompletedOnboarding,
        location: session.user.location,
        phone: session.user.phone,
        bio: session.user.bio,
        profileImage: session.user.profileImage,
        joinDate: session.user.joinDate
          ? formatDate(new Date(session.user.joinDate))
          : "",
        interests: session.user.interests,
        completedSessions: session.user.completedSessions,
        totalHours: session.user.totalHours,
        mentorCount: session.user.mentorCount,
        isMentor: session.user.isMentor,
        expertise: session.user.expertise,
        rate: session.user.rate,
        rating: session.user.rating,
        reviewCount: session.user.reviewCount,
      });
    }
  }, [session]);

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
  };

  console.log(user);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profil Saya</h1>
        <p className="text-muted-foreground">
          Kelola informasi profil dan pengaturan akun Anda
        </p>
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
        <ProfileSidebar
          userData={userData}
          user={user}
          session={session}
          userType={userType}
          editMode={editMode}
          setEditMode={setEditMode}
        />

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="account">Akun</TabsTrigger>
              {userType === "mentor" && (
                <TabsTrigger value="availability">Ketersediaan</TabsTrigger>
              )}
              {userType === "mentee" && (
                <TabsTrigger value="preferences">Preferensi</TabsTrigger>
              )}
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <ProfileTab
                user={user}
                userData={userData}
                userType={userType}
                editMode={editMode}
                setShowAddEducation={setShowAddEducation}
                setShowAddExperience={setShowAddExperience}
              />
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account">
              <AccountTab userData={userData} userType={userType} />
            </TabsContent>

            {/* Availability Tab (Mentor Only) */}
            {userType === "mentor" && (
              <TabsContent value="availability">
                <AvailabilityTab
                  userData={userData}
                  editMode={editMode}
                  setShowAddExperience={setShowAddExperience}
                />
              </TabsContent>
            )}

            {/* Preferences Tab (Mentee Only) */}
            {userType === "mentee" && (
              <TabsContent value="preferences">
                <PreferencesTab userData={userData} />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>

      {/* Add Education Dialog */}
      <AddEducationDialog
        open={showAddEducation}
        onOpenChange={setShowAddEducation}
        onSubmit={(education) => {
          // Add logic to update education data
          console.log("New education:", education);
        }}
      />

      {/* Add Experience Dialog */}
      <AddExperienceDialog
        open={showAddExperience}
        onOpenChange={setShowAddExperience}
        onSubmit={(experience) => {
          // Add logic to update experience data
          console.log("New experience:", experience);
        }}
      />
    </div>
  );
}
