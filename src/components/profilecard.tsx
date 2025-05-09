import React from "react";
import Image from "next/image";
import { header } from "~/styles/fonts";
import Link from "next/link";

export const KProfileCard = () => {
  return (
    <div className="relative flex w-[90vw] flex-row items-start justify-center gap-6 p-8">
      <div className="flex h-full w-full flex-col gap-12 xl:flex-row xl:gap-4">
        {/* left part */}
        <div className="relative flex w-full flex-col xl:w-[40vw]">
          <div className="flex w-full aspect-square h-[440px] flex-col items-center justify-center rounded-xl bg-[#3957D1] xl:h-full">
            <div className="relative mb-4 mt-12 flex h-[75%] w-[80%] rounded-lg">
              <Image
                src="/k3m.jpg"
                alt="profile picture"
                layout="fill"
                className="rounded-lg flex items-center justify-start object-[50%_35%] object-cover"
              />
            </div>
            <h1
              className={`${header.variable} mb-12 text-2xl font-bold text-[#FA3A91] xl:mb-0`}
            >
              CALON
            </h1>
          </div>

          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#BEEF62]">
              <span className="text-2xl font-bold">01</span>
            </div>
          </div>
        </div>

        {/* right part */}
        <div className="flex h-full flex-col">
          <div className="flex h-full w-full flex-col rounded-xl  bg-[#3957D1] p-8">
            <div className="mb-2">
              <div
                className={`${header.variable} mb-2 text-center text-xl md:text-5xl font-bold text-[#BEEF62]`}
              >
                Farell Faiz Firmansyah
              </div>
              <div
                className={`${header.variable} mb-2 text-center text-md md:text-2xl font-bold text-[#FFE859]`}
              >
                Teknik Geodesi dan Geomatika 2021
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div
                  className={`${header.variable} mb-2 text-center text-xl md:text-2xl font-bold text-white`}
                >
                  VISI
                </div>
                <div className="rounded-3xl border-4 border-gray-400 bg-[#5A8AF9] p-4">
                  <p
                    className={`${header.variable} text-center text-md md:text-xl font-semibold text-white`}
                  >
                    Ameliorasi KM ITB menjadi ruang gerak bersama dalam
                    keberdampakan secara progresif, inklusif, dan solutif untuk
                    Tuhan, bangsa, dan almamater
                  </p>
                </div>
              </div>

              <div>
                <div
                  className={`${header.variable} mb-3 text-center text-xl md:text-2xl font-bold text-white`}
                >
                  MISI
                </div>
                <div className="space-y- text-justify">
                  <div className="rounded-3xl border-4 border-gray-400 bg-[#5A8AF9] flex flex-col gap-2 text-md md:text-xl p-6">
                    <p
                      className={`${header.variable} font-semibold text-white`}
                    >
                      1. Mengoptimalkan tata kelola internal Kabinet KM ITB untuk
                      meningkatkan efektivitas dan akuntabilitas organisasi
                    </p>
                    <p
                      className={`${header.variable} font-semibold text-white`}
                    >
                      2. Membangun ekosistem media, informasi, dan teknologi yang
                      terintegrasi guna mendukung knowledge management dan
                      pengarusutamaan informasi di KM ITB
                    </p>
                    <p
                      className={`${header.variable} font-semibold text-white`}
                    >
                      3. Merekatkan elemen internal dan eksternal KM ITB melalui
                      dinamisasi dan kolaborasi yang sinergis dan berkelanjutan
                    </p>
                    <p
                      className={`${header.variable} font-semibold text-white`}
                    >
                      4. Mereformasi pemenuhan kebutuhan dasar secara proaktif dan
                      kolaboratif, memastikan kesejahteraan mahasiswa yang lebih
                      inklusif
                    </p>
                    <p
                      className={`${header.variable} font-semibold text-white`}
                    >
                      5. Menjadi katalisator bagi individu dan lembaga di KM ITB
                      untuk terus berkembang, berdaya, dan berkontribusi bagi
                      lingkungan sekitar
                    </p>
                    <p
                      className={`${header.variable} font-semibold text-white`}
                    >
                      6. Mentransformasi lini pergerakan KM ITB menjadi lebih
                      inklusif, adaptif, dan relevan dalam menjawab tantangan
                      zaman
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio and Instagram section */}
          <div className="mt-4 flex items-center justify-between">
            <Link
              target="_blank"
              className="w-full"
              href="https://drive.google.com/file/d/18Dqu_omeuZangOZ4HHu2f9vN54-GQnqo/view?usp=drive_link"
            >
              <button className="hover: w-full flex-grow rounded-full bg-[#FFE859] px-12 py-2 font-semibold text-black transition-transform hover:scale-[1.01]">
                PORTOFOLIO
              </button>
            </Link>
            <Link target="_blank" href="https://www.instagram.com/farellfaiz/">
              <div className="ml-4 rounded-lg bg-[#FA3A91] p-2 transition-transform hover:scale-[1.05]">
                <svg
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MProfileCard = () => {
  return (
    <div className="relative flex w-[90vw] flex-row items-start justify-center gap-6 p-8">
      <div className="flex h-full w-full flex-col gap-12 xl:flex-row xl:gap-4">
        {/* left part */}
        <div className="relative flex w-full flex-col xl:w-[40vw]">
          <div className="relative w-full flex aspect-square h-[440px] flex-col items-center justify-center rounded-xl bg-[#FFA5B380] xl:h-full">
            <div className="relative mb-4 mt-12 flex h-[75%] w-[80%] rounded-lg">
              <Image
                src="/mwam.jpg"
                alt="profile picture"
                layout="fill"
                className="rounded-lg flex items-center justify-start object-[50%_30%] object-cover"
              />
            </div>
            <h1
              className={`${header.variable} mb-12 text-2xl font-bold text-[#3957D1]`}
            >
              CALON
            </h1>
          </div>

          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFE859]">
              <span className="text-2xl font-bold">01</span>
            </div>
          </div>
        </div>

        {/* right part */}
        <div className="flex h-full flex-col">
          <div className="flex h-full w-full flex-col rounded-xl bg-[#FFA5B380] p-8">
            <div className="mb-2">
              <div
                className={`${header.variable} mb-2 text-center text-xl md:text-5xl font-bold text-[#FFE859]`}
              >
                Putri Dzakiyah Suharyono
              </div>
              <div
                className={`${header.variable} mb-2 text-center text-xl md:text-2xl font-bold text-[#BEEF62]`}
              >
                Kewirausahaan 2022
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div
                  className={`${header.variable} mb-2 text-center text-xl md:text-2xl font-bold text-white`}
                >
                  VISI
                </div>
                <div className="rounded-3xl border-4 border-gray-400 bg-[#FFAAB7] p-4">
                  <p
                    className={`${header.variable} text-center text-md md:text-xl  font-semibold text-white`}
                  >
                    MWA WM ITB sebagai media akselerasi suara mahasiswa yang
                    mendorong perubahan secara inklusif dan kolaboratif untuk
                    mewujudkan ITB lebih progresif.
                  </p>
                </div>
              </div>

              <div>
                <div
                  className={`${header.variable} mb-3 text-center text-xl md:text-2xl font-bold text-white`}
                >
                  MISI
                </div>
                <div className="space-y- text-justify">
                  <div className="rounded-3xl border-4 border-gray-400 bg-[#FFAAB7] p-6 flex flex-col gap-2 text-md md:text-xl">
                    <p
                      className={`${header.variable}  font-semibold text-white`}
                    >
                      1. Mengakselarasi penyaluran aspirasi mahasiswa secara
                      inklusif dan akuntabel
                    </p>
                    <p
                      className={`${header.variable}  font-semibold text-white`}
                    >
                      2. Mendorong dan mengawal kebijakan yang berkelanjutan
                    </p>
                    <p
                      className={`${header.variable}  font-semibold text-white`}
                    >
                      3. Meningkatkan sinergi antara mahasiswa, lembaga
                      kemahasiswaan, dan organ ITB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio and Instagram section */}
          <div className="mt-4 flex items-center justify-between">
            <Link
              target="_blank"
              className="w-full"
              href="https://drive.google.com/file/d/1ItlOtrYvrBrF67djffCoQAn3SUfer97M/view?usp=drive_link"
            >
              <button className="w-full flex-grow rounded-full bg-[#BEEF62] px-12  py-2 font-semibold text-black transition-transform hover:scale-[1.01]">
                PORTOFOLIO
              </button>
            </Link>
            <Link target="_blank" href="https://www.instagram.com/putriedz/">
              <div className="ml-4 rounded-lg bg-[#3957D1] p-2 transition-transform hover:scale-[1.05]">
                <svg
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
