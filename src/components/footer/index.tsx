import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <>
      <footer className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Mentor Platform
              </h3>
              <p className="text-slate-400">
                Platform mentoring yang menghubungkan pelajar dengan mentor
                ahli.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Fitur</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-indigo-400">
                    Cari Mentor
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-indigo-400">
                    Booking Sesi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-indigo-400">
                    Pembayaran
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Perusahaan
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-indigo-400">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-indigo-400">
                    Karir
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-indigo-400">
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Bantuan</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-indigo-400">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-indigo-400">
                    Syarat & Ketentuan
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-indigo-400">
                    Kebijakan Privasi
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>© 2025 Mentor Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};
