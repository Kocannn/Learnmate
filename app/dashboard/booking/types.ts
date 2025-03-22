export interface Mentor {
  id: string;
  name: string;
  profileImage?: string;
  expertise?: string;
  rate?: number;
}

export interface Booking {
  id: string;
  mentorId: string;
  studentId: string;
  topic: string;
  date: string;
  duration: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  zoomJoinUrl?: string;
  zoomStartUrl?: string;
  zoomPassword?: string;
  zoomMeetingId?: string;
  notes?: string;
  time?: string;
  reviewed: boolean;
  mentor: Mentor;
}
