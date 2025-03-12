import React from "react";

import { ArrowRight, BookOpen, Calendar, Star, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Feature = () => {
  return (
    <>
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <h1 className="text-3xl font-bold">Fitur Utama Platform</h1>
            <p className="text-lg text-gray-400">
              Semua yang kamu butuhkan untuk meningkatkan keterampilan baru
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-indigo-600 " />
              </div>
              <CardTitle>Rekomendasi AI</CardTitle>
              <CardDescription>
                Temukan mentor yang paling sesuai dengan kebutuhanmu melalui
                sistem rekomendasi AI
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-indigo-600 " />
              </div>
              <CardTitle>Booking Sesi</CardTitle>
              <CardDescription>
                Jadwalkan sesi mentoring dengan mudah sesuai waktu yang kamu
                inginkan
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-indigo-100  flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-indigo-600 " />
              </div>
              <CardTitle>Pembelajaran Terstruktur</CardTitle>
              <CardDescription>
                Dapatkan arahan yang jelas dan dukungan berkelanjutan dari
                mentor ahli
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
};
