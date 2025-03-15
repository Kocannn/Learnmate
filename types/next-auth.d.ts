import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      hasCompletedOnboarding?: boolean;
      location?: string | null;
      phone?: string | null;
      bio?: string | null;
      profileImage?: string | null;
      joinDate?: string | null;
      interests?: string[] | null;
      completedSessions?: number;
      totalHours?: number;
      mentorCount?: number;
      isMentor?: boolean;
      expertise?: string[] | null;
      rate?: number | null;
      rating?: number | null;
      reviewCount?: number;
    };
  }

  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    hasCompletedOnboarding?: boolean;
    location?: string | null;
    phone?: string | null;
    bio?: string | null;
    profileImage?: string | null;
    joinDate?: string | null;
    interests?: string[] | null;
    completedSessions?: number;
    totalHours?: number;
    mentorCount?: number;
    isMentor?: boolean;
    expertise?: string[] | null;
    rate?: number | null;
    rating?: number | null;
    reviewCount?: number;
  }
}
