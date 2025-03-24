"use client";

import ProfileTab from "@/components/profile/Profile-tab";
import AccountTab from "@/components/profile/AccountTab";
import AvailabilityTab from "@/components/profile/Availability";
import PreferencesTab from "@/components/profile/PreferencesTab";
import AddEducationDialog from "@/components/profile/AddEducationDialog";
import AddExperienceDialog from "@/components/profile/AddExperienceDialog";
import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [formData, setFormData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session) {
      const userData = {
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
      };
      setUser(userData);
      setFormData(userData);
      setUserType(session.user.isMentor ? "mentor" : "mentee");
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

  const handleSaveProfile = async () => {
    if (!formData) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/v1/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profil Saya</h1>
        <p className="text-muted-foreground">
          Kelola informasi profil dan pengaturan akun Anda
        </p>
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
          formData={formData}
          setFormData={setFormData}
          isSubmitting={isSubmitting}
          onSave={handleSaveProfile}
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
                formData={formData}
                setFormData={setFormData}
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
                <PreferencesTab userData={userData} isMentor={user?.isMentor} />
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
