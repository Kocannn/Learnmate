import React from "react";

export const Hero = () => {
  return (
    <div className="flex justify-center items-center py-24 pl-26 gap-4">
      <div className="w-1/2 flex justify-center items-center flex-col gap-8">
        <h1 className="text-6xl font-bold">
          Belajar dari Mentor Ahli, <span>Raih Karier Impianmu</span>
        </h1>
        <p className="text-2xl text-gray-400 font-light">
          Platform mentoring yang menghubungkan pelajar, mahasiswa, dan
          profesional dengan mentor ahli untuk pembelajaran keterampilan baru
        </p>
        <div className="flex flex-row gap-4 w-full">
          <button className="w-1/3 bg-blue-500 text-white px-6 py-2 rounded-xl  hover:border-none hover:bg-blue-600 cursor-pointer">
            Mulai Belajar
          </button>
          <button className="w-1/3 text-black px-6 py-2 rounded-xl border border-gray-200 hover:bg-gray-100  cursor-pointer">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>
      <div className="w-1/2">
        <img
          src="https://placehold.co/600x400 "
          alt="hero"
          className="shadow-xl rounded-xl"
        />
      </div>
    </div>
  );
};
