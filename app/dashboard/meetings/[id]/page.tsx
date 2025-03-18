"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, User, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MeetingRoom() {
  const [meeting, setMeeting] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState("");
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    async function fetchMeeting() {
      try {
        const res = await fetch(`/api/v1/meetings/${id}`);
        if (!res.ok) throw new Error("Failed to fetch meeting");
        const data = await res.json();
        setMeeting(data);

        // Debug: Log the meeting data to inspect zoomJoinUrl
        console.log("Meeting data:", data);
      } catch (err) {
        setError("Could not load meeting details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMeeting();
  }, [id]);

  // Function to directly open Zoom meeting in new tab (most reliable method)
  const openZoomMeeting = () => {
    if (meeting?.zoomJoinUrl) {
      window.open(meeting.zoomJoinUrl, "_blank");
    }
  };

  // Function to attempt browser-based meeting join
  const joinInBrowser = () => {
    if (!meeting?.zoomJoinUrl) {
      setJoinError(
        "Meeting URL is missing. Please try joining with the Zoom app instead.",
      );
      return;
    }

    setJoining(true);
    setJoinError("");

    try {
      // Extract meeting number from URL
      // Example URL: https://us04web.zoom.us/j/1234567890?pwd=abcdef
      const urlMatch = meeting.zoomJoinUrl.match(
        /\/j\/(\d+)(?:\?pwd=([^&]+))?/,
      );

      if (!urlMatch) {
        throw new Error("Could not extract meeting details from URL");
      }

      const meetingNumber = urlMatch[1];
      const password = urlMatch[2] || "";

      console.log("Meeting number:", meetingNumber);
      console.log("Password:", password);

      // Redirect to the browser version
      const browserUrl = `https://zoom.us/wc/${meetingNumber}/join?pwd=${password}`;
      window.open(browserUrl, "_blank");
    } catch (err) {
      console.error("Error joining meeting:", err);
      setJoinError(
        "Failed to join meeting in browser. Please try using the Zoom app option.",
      );
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading meeting...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  if (!meeting) {
    return <div className="p-10 text-center">Meeting not found</div>;
  }

  if (!meeting.zoomJoinUrl) {
    return (
      <div className="container max-w-3xl mx-auto p-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-red-500">
              <AlertCircle className="inline mr-2 h-6 w-6" />
              Meeting Link Not Found
            </CardTitle>
            <CardDescription>
              This meeting doesn't have a Zoom link yet.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Zoom meeting might not have been created yet. Please try the
              following:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Return to the booking page and confirm your booking</li>
              <li>Contact your mentor to set up a Zoom meeting</li>
              <li>Try refreshing this page</li>
            </ul>
            <Button
              className="w-full mt-4"
              onClick={() => router.push("/dashboard/booking")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Bookings
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const meetingDate = meeting.date ? new Date(meeting.date) : new Date();

  return (
    <div className="container max-w-6xl mx-auto p-4">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/dashboard/booking">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Jadwal Sesi
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-6">{meeting.topic}</h1>

      <Tabs defaultValue="meeting" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="meeting">Sesi Meeting</TabsTrigger>
          <TabsTrigger value="info">Informasi Sesi</TabsTrigger>
        </TabsList>

        <TabsContent value="meeting">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Zoom Meeting</CardTitle>
              <CardDescription>
                Sesi mentoring online dengan {meeting.mentor?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center rounded-md p-6 bg-muted/30 min-h-80">
                <Image
                  src="https://zoom.us/cms/images/zoom-logo-transparent.png"
                  alt="Zoom"
                  width={120}
                  height={30}
                  className="mb-6"
                />
                <h3 className="text-xl font-bold mb-2">
                  Bergabung Dalam Sesi Meeting
                </h3>
                <p className="text-gray-500 mb-8 text-center max-w-md">
                  Pilih metode untuk bergabung dengan sesi Zoom meeting
                </p>

                {joinError && (
                  <div className="w-full max-w-md bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    <p className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      {joinError}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1"
                    onClick={joinInBrowser}
                    disabled={joining}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Join in Browser
                  </Button>

                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={openZoomMeeting}
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Open in Zoom App
                  </Button>
                </div>

                <p className="mt-6 text-xs text-muted-foreground max-w-md text-center">
                  Menggunakan browser lebih praktis, namun fitur mungkin
                  terbatas. Untuk pengalaman terbaik, gunakan aplikasi Zoom.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Info tab content remains the same */}
        <TabsContent value="info">
          {/* Your existing info tab content */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
