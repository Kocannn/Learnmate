import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      date?: Date;
      name?: string;
      email?: string | null;
      image?: string | null;
      hasCompletedOnboarding?: boolean;
      location?: string;
      phone?: string | null;
      bio?: string;
      profileImage?: string | null;
      joinDate?: string | null;
      interests?: string[] | null;
      completedSessions?: number;
      totalHours?: number;
      mentorCount?: number;
      isMentor?: boolean;
      expertise?: string[] | null;
      rate?: number;
      rating?: number | null;
      reviewCount?: number;
    };
  }

  interface User {
    id?: string;
    name?: string;
    email?: string | null;
    image?: string | null;
    hasCompletedOnboarding?: boolean;
    location?: string;
    phone?: string | null;
    bio?: string;
    profileImage?: string | null;
    joinDate?: string | null;
    interests?: string[] | null;
    completedSessions?: number;
    totalHours?: number;
    mentorCount?: number;
    isMentor?: boolean;
    expertise?: string[] | null;
    rate?: number;
    rating?: number | null;
    reviewCount?: number;
  }
}
