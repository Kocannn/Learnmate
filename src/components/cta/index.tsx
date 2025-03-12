import React from "react";
import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-indigo-600 dark:bg-indigo-700 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                Siap Untuk Memulai?
              </h2>
              <p className="mt-4 text-lg text-indigo-100">
                Bergabunglah dengan ribuan pengguna yang telah meningkatkan
                keterampilan mereka
              </p>
              <Button
                size="lg"
                className="mt-8 bg-white text-indigo-600 hover:bg-indigo-50"
              >
                Daftar Sekarang
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
