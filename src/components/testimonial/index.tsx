import React from "react";
import { ArrowRight, BookOpen, Calendar, Star, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Testimonial = () => {
  return (
    <>
      <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 ">
              Testimoni Pengguna
            </h2>
            <p className="mt-4 text-lg text-slate-600 ">
              Apa kata mereka yang telah menggunakan platform kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white ">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src={`/placeholder.svg?height=50&width=50`}
                      alt={`User ${i}`}
                      className="rounded-full h-12 w-12"
                    />
                    <div>
                      <CardTitle className="text-base">Pengguna {i}</CardTitle>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className="h-4 w-4 fill-current text-yellow-500"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 ">
                    "Platform ini sangat membantu saya dalam mempelajari
                    keterampilan baru. Mentor yang saya dapatkan sangat
                    profesional dan memberikan arahan yang jelas."
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
