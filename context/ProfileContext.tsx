"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { formatDate } from "@/lib/utils";

type UserType = "mentor" | "mentee";

interface ProfileContextType {
  user: User | null;
  userData: any; // Sample data
  userType: UserType;
  editMode: boolean;
  formData: any;
  isSubmitting: boolean;
  showAddEducation: boolean;
  showAddExperience: boolean;
  setEditMode: (value: boolean) => void;
  setFormData: (value: any) => void;
  setShowAddEducation: (value: boolean) => void;
  setShowAddExperience: (value: boolean) => void;
  handleSaveProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [userType, setUserType] = useState<UserType>("mentee");
  const [editMode, setEditMode] = useState(false);
  const [showAddEducation, setShowAddEducation] = useState(false);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [user, setUser] = useState<User | null>(null);
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
          ? formatDate(session.user.joinDate.toString())
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

  // Sample user data (tetap disimpan di context untuk kemudahan akses)
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    profileImage: "/placeholder.svg",
    bio: "Software developer with 5 years of experience",
    location: "Jakarta, Indonesia",
    phone: "+62 812 3456 7890",
    joinDate: "January 2022",
    completedSessions: 12,
    totalHours: 24,
    mentors: 3,
    mentorCount: 3,
    rate: 250000,
    rating: 4.8,
    reviewCount: 25,
    // Add education array
    education: [
      {
        institution: "Universitas Indonesia",
        degree: "S1 Ilmu Komputer",
        year: "2016 - 2020",
      },
      {
        institution: "Institut Teknologi Bandung",
        degree: "S2 Teknik Informatika",
        year: "2021 - 2023",
      },
    ],
    // Add experience array for mentor profile
    experience: [
      {
        company: "Tech Solutions",
        position: "Software Engineer",
        duration: "2020 - 2022",
      },
      {
        company: "Digital Innovations",
        position: "Senior Developer",
        duration: "2022 - Present",
      },
    ],
    // Add skills array
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "Next.js"],
    availability: [
      {
        day: "Senin",
        slots: ["09:00 - 10:00", "13:00 - 14:00", "19:00 - 20:00"],
      },
      {
        day: "Rabu",
        slots: ["10:00 - 11:00", "15:00 - 16:00"],
      },
      {
        day: "Jumat",
        slots: ["14:00 - 15:00", "16:00 - 17:00"],
      },
    ],
  };

  const handleSaveProfile = async () => {
    if (!formData) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/v1/profile/update", {
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
    <ProfileContext.Provider
      value={{
        user,
        userData,
        userType,
        editMode,
        formData,
        isSubmitting,
        showAddEducation,
        showAddExperience,
        setEditMode,
        setFormData,
        setShowAddEducation,
        setShowAddExperience,
        handleSaveProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }

  return context;
}
