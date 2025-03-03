/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @next/next/no-img-element */
import { IoDocumentText } from "react-icons/io5";
import abstract1 from "public/abstract/abstract3.svg";
import abstract2 from "public/abstract/abstract4.svg";
import fplogo from "public/abstract/fplogo.png";
import React, { useCallback, useRef } from "react";
import { withAuth } from "~/utils/withAuth";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { body, bodyBold } from "~/styles/fonts";
import Webcam from "react-webcam";
import Link from "next/link";

interface FormData {
  name: string;
  studentId: string;
  programstudi: string;
  kontak: string;
  tempatKejadian: string[];
  photo?: string;
  pelanggaranRingan: string[];
  pelanggaranSedang: string[];
  pelanggaranBerat: string[];
  bukti: string;
  deskripsi: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
}

const Pelaporan: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>();
  const [message, setMessage] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const webcamRef = useRef<Webcam | null>(null);
  const tempatKejadian = watch("tempatKejadian", []);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setPhoto(imageSrc);
      }
    }
  }, [webcamRef]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.tempatKejadian.length === 0) {
      setMessage("Minimal satu tempat kejadian harus dipilih.");
      return;
    }
    if (!photo) {
      setMessage("Silakan ambil foto sebagai bukti KTM/KSM.");
      return;
    }
    setMessage(null);
    try {
      const response = await fetch("/api/saveStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, photo }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setMessage(result.message);
      reset();
      setPhoto(null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Terjadi kesalahan.");
    }
  };

  return (
    <div className="mb-[20vh] flex w-full max-w-[100vw] flex-col items-center self-center overflow-x-hidden md:w-[80%] md:items-start md:bg-black md:bg-opacity-20 md:px-4">
      <img
        src={abstract1.src}
        alt="Abstract 1"
        className="absolute left-0 top-0 h-[50%] w-[50%] -translate-x-[50%] -translate-y-[30%] object-contain"
      />
      <div className="absolute right-0 top-0 h-[50%] w-[50%]">
        <div className="relative h-full w-full overflow-hidden">
          <img
            src={abstract2.src}
            alt="Abstract 2"
            className="h-full w-full -translate-y-[30%] translate-x-[50%] object-contain"
          />
        </div>
      </div>
      <img
        src={fplogo.src}
        alt="FP Logo"
        className="mt-12 h-full w-[55%] self-center object-contain md:w-[70%]"
      />
      <div className="mt-12 self-center text-3xl font-semibold text-white md:text-6xl">
        SOP
      </div>
      <Link
        target="_blank"
        href="https://drive.google.com/file/d/1EghOXs8UTd9uTPI2MYnSb8s1hgt8snih/view?usp=sharing"
        className="flex w-full items-center justify-center hover:scale-[1.01]"
      >
        <button className="mt-6 flex h-fit w-[80%] flex-row items-center justify-center self-center rounded-lg border border-[#B6B258] bg-yellow-500 hover:cursor-pointer">
          <div className="mx-1 my-1 flex w-full flex-row items-center justify-center rounded-lg bg-[#FFE859] px-2 py-4 hover:cursor-pointer">
            <IoDocumentText color="#FA3A91" size="2em" />
            <div className="ml-2 text-2xl text-[#FA3A91] underline hover:cursor-pointer">
              SOP Pelaporan
            </div>
          </div>
        </button>
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="z-50 mt-6 w-[90%] self-center rounded-lg p-6 shadow-md md:w-[90%]"
      >
        <label className={`${bodyBold.className} block text-xl text-white`}>
          NAMA LENGKAP
        </label>
        <div className={`${body.className} mb-2 block text-sm text-[#FA3A91]`}>
          (Isi selengkap-lengkapnya, tidak ada singkatan pada nama yang
          dicantumkan atau sesuai yang tertulis pada KTM)
        </div>
        <input
          {...register("name", { required: "Nama wajib diisi." })}
          className="w-full rounded-md border border-gray-300 bg-[#3957D1] bg-opacity-40 p-2 text-white placeholder:text-slate-300"
          placeholder="Masukkan nama"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{String(errors.name.message)}</p>
        )}
        <label
          className={`${bodyBold.className} mt-6 block text-xl text-white`}
        >
          NIM
        </label>
        <div className={`${body.className} mb-2 block text-sm text-[#FA3A91]`}>
          (Isi dengan NIM Jurusan apabila sudah mendapatkan, NIM TPB jika belum)
        </div>
        <input
          {...register("studentId", { required: "NIM wajib diisi." })}
          className="w-full rounded-md border border-gray-300 bg-[#3957D1] bg-opacity-40 p-2 text-white placeholder:text-slate-300"
          placeholder="Masukkan NIM"
        />
        {errors.studentId && (
          <p className="text-sm text-red-500">
            {String(errors.studentId.message)}
          </p>
        )}
        <label
          className={`${bodyBold.className} mt-6 block text-xl text-white`}
        >
          PROGRAM STUDI
        </label>
        <div className={`${body.className} mb-2 block text-sm text-[#FA3A91]`}>
          (Isi dengan program studi, TPB jika belum ada.)
        </div>
        <input
          {...register("programstudi", {
            required: "Program Studi wajib diisi.",
          })}
          className="w-full rounded-md border border-gray-300 bg-[#3957D1] bg-opacity-40 p-2 text-white placeholder:text-slate-300"
          placeholder="Masukkan Program Studi"
        />
        {errors.programstudi && (
          <p className="text-sm text-red-500">
            {String(errors.programstudi.message)}
          </p>
        )}
        <label
          className={`${bodyBold.className} mt-6 block text-xl text-white`}
        >
          KONTAK PELAPOR
        </label>
        <div className={`${body.className} mb-2 block text-sm text-[#FA3A91]`}>
          (Isi dengan Nomor Whatsapp atau ID Line, selain itu tidak valid.)
        </div>
        <input
          {...register("kontak", { required: "Program Studi wajib diisi." })}
          className="w-full rounded-md border border-gray-300 bg-[#3957D1] bg-opacity-40 p-2 text-white placeholder:text-slate-300"
          placeholder="Masukkan Program Studi"
        />
        {errors.kontak && (
          <p className="text-sm text-red-500">
            {String(errors.kontak.message)}
          </p>
        )}
        <label
          className={`${bodyBold.className} mt-6 block text-xl text-white`}
        >
          TEMPAT KEJADIAN
        </label>
        <div className="flex flex-col space-y-2">
          {[
            "Kampus Ganesha",
            "Kampus Jatinangor",
            "Kampus Cirebon",
            "Tempat lain",
          ].map((campus) => (
            <label key={campus} className="text-white">
              <input
                type="checkbox"
                value={campus}
                {...register("tempatKejadian")}
                className="mr-2 accent-[#FA3A91]"
              />
              {campus}
            </label>
          ))}
        </div>
        {tempatKejadian.length === 0 && (
          <p className="text-sm text-red-500">
            Minimal satu tempat kejadian harus dipilih.
          </p>
        )}
        <label
          className={`${bodyBold.className} mt-6 block text-xl text-white`}
        >
          BUKTI KTM/KSM
        </label>
        <div className={`${body.className} mb-2 block text-sm text-[#FA3A91]`}>
          (Ambillah foto diri anda dengan KTM dengan muka anda juga berada di
          dalam foto)
        </div>
        <div className="flex flex-col items-center">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="h-auto w-[80%] rounded-lg border border-gray-300 md:w-[50%]"
          />
          <button
            type="button"
            onClick={capture}
            className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            Ambil Foto
          </button>
          {photo && (
            <img
              src={photo}
              alt="Captured"
              className="mt-4 w-[60%] rounded-lg border border-gray-300 md:w-[30%]"
            />
          )}
        </div>
        <label
          className={`${bodyBold.className} mb-4 mt-6 block text-xl text-white`}
        >
          JENIS PELANGGARAN
        </label>

        <div className="mx-auto flex w-full flex-col items-center gap-2 rounded-lg bg-[#FA3A91] bg-opacity-30 pb-6">
          <div
            className={`${bodyBold.className} mb-4 flex w-full items-center justify-center self-center rounded-lg bg-[#FA3A91] py-4 text-[#FFE859]`}
          >
            Pelanggaran Ringan
          </div>

          {[
            "Calon K3M atau Calon MWA-WM ITB tidak dapat mendatangkan Promotor pada acara Kampanye sesuai dengan jumlah atau waktu yang ditentukan Panitia Pelaksana Pemira KM ITB 2024/2025;",
            "Tim Kampanye datang pada acara Kampanye yang wajib dihadirinya melebihi waktu yang ditentukan Komisi Disiplin Pemira KM ITB 2024/2025;",
            "Tim Kampanye menyerahkan catatan pemasukan dan pengeluaran dana Kampanye melebihi batas waktu yang ditentukan Panitia Pelaksana Pemira KM ITB 2024/2025;",
            "Tim Kampanye mengisi presensi kehadiran acara Kampanye, tetapi sebenarnya tidak hadir;",
            "Tim Kampanye tidak mengisi presensi pada saat pemungutan suara berlangsung;",
            "Tim Kampanye tidak mencelupkan tangannya pada tinta yang disediakan saat pemungutan suara.",
          ].map((option) => (
            <label
              key={option}
              className="mb-2 flex w-[95%] items-center rounded-lg border border-white bg-[#FA3A91] p-2 text-white"
            >
              <input
                type="checkbox"
                value={option}
                {...register("pelanggaranRingan")}
                className="mr-2 accent-white"
              />
              {option}
            </label>
          ))}
        </div>
        {errors.pelanggaranRingan && (
          <p className="text-sm text-red-500">
            {String(errors.pelanggaranRingan.message)}
          </p>
        )}

        <div className="mx-auto mt-12 flex w-full flex-col items-center gap-2 rounded-lg bg-[#FFE859] bg-opacity-60 pb-6">
          <div
            className={`${bodyBold.className} mb-4 flex w-full items-center justify-center self-center rounded-lg bg-[#FFE859] py-4 text-[#FA3A91]`}
          >
            Pelanggaran Sedang
          </div>

          {[
            "Calon K3M atau Calon MWA-WM ITB melakukan Kampanye di luar masa Kampanye yang telah ditetapkan oleh Panitia Pelaksana Pemira KM ITB 2024/2025;",
            "Promotor memprovokasi massa dalam Kampanye;",
            "Jumlah Promotor melebihi batas yang ditentukan;",
            "Sanksi pelanggaran ringan yang diberikan kepada Tim Kampanye tidak selesai dikerjakan hingga batas waktu yang ditentukan Komisi Disiplin;",
            "Calon K3M atau Calon MWA-WM ITB tidak datang pada acara Kampanye yang wajib dihadirinya tanpa mematuhi mekanisme yang ditentukan oleh Panitia Pelaksana Pemira KM ITB 2024/2025;",
            "Tim Kampanye menggunakan dana Kampanye melebihi batas atas pengeluaran Kampanye;",
            "Tim Kampanye melakukan pencelaan dan/atau provokasi yang tidak mengandung unsur Suku, Agama, Ras, dan Antargolongan terhadap pihak lain;",
            "Tim Kampanye melakukan Kampanye pada saat pemungutan suara berlangsung.",
          ].map((option) => (
            <label
              key={option}
              className="mb-2 flex w-[95%] items-center rounded-lg border border-white bg-[#FFE859] bg-opacity-40 p-2 text-white"
            >
              <input
                type="checkbox"
                value={option}
                {...register("pelanggaranSedang")}
                className="mr-2 accent-white"
              />
              {option}
            </label>
          ))}
        </div>
        {errors.pelanggaranSedang && (
          <p className="text-sm text-red-500">
            {String(errors.pelanggaranSedang.message)}
          </p>
        )}

        <div className="mx-auto mt-12 flex w-full flex-col items-center gap-2 rounded-lg bg-[#5A8AF9] bg-opacity-60 pb-6">
          <div
            className={`${bodyBold.className} mb-4 flex w-full items-center justify-center self-center rounded-lg bg-[#5A8AF9] py-4 text-[#BEEF62]`}
          >
            Pelanggaran Berat
          </div>

          {[
            "Calon K3M atau Calon MWA-WM ITB dan/atau Promotornya melakukan penyuapan, kekerasan, dan pemerasan terhadap pihak manapun dalam rangkaian Pemira KM ITB 2024/2025;",
            "Calon K3M atau Calon MWA-WM ITB dan/atau Promotornya ditemukan melakukan kecurangan dalam memenuhi syarat-syarat yang telah ditentukan, baik sebelum maupun setelah melewati tahap verifikasi berkas;",
            "Tim Kampanye melakukan pencelaan dan/atau provokasi yang mengandung unsur Suku, Agama, Ras, dan Antargolongan terhadap pihak lain;",
            "Calon berafiliasi dengan partai politik, organisasi sayap, dan turunannya, serta dengan sengaja menerima bantuan yang diberikan oleh lembaga tersebut;",
            "Calon terbukti tersangkut kasus pidana, sanksi akademik, atau sanksi organisasi KM ITB;",
            "Tim Kampanye mengintervensi hak demokrasi orang lain;",
            "Calon maupun Tim Kampanye melakukan intervensi terkait perhitungan suara kepada Panitia Pelaksana Pemira KM ITB 2024/2025 Pemira KM ITB 2024/2025;",
            "Calon maupun Tim Kampanye menyabotase kegiatan Pemungutan dan Perhitungan Suara",
          ].map((option) => (
            <label
              key={option}
              className="mb-2 flex w-[95%] items-center rounded-lg border border-white bg-[#5A8AF9] bg-opacity-40 p-2 text-white"
            >
              <input
                type="checkbox"
                value={option}
                {...register("pelanggaranBerat")}
                className="mr-2 accent-white"
              />
              {option}
            </label>
          ))}
        </div>
        {errors.pelanggaranBerat && (
          <p className="text-sm text-red-500">
            {String(errors.pelanggaranBerat.message)}
          </p>
        )}

        <label
          className={`${bodyBold.className} mt-12 block text-xl text-white`}
        >
          BUKTI PELANGGARAN
        </label>
        <div className={`${body.className} mb-2 block text-sm text-[#FA3A91]`}>
          (Cantumkan link yang berisi kumpulan bukti/foto dalam bentuk link
          Google Drive/OneDrive/etc.)
        </div>
        <input
          {...register("bukti", { required: "Bukti sangat wajib diisi." })}
          className="w-full rounded-md border border-gray-300 bg-[#3957D1] bg-opacity-40 p-2 text-white placeholder:text-slate-300"
          placeholder="Masukkan link bukti pelanggaran"
        />
        {errors.bukti && (
          <p className="text-sm text-red-500">{String(errors.bukti.message)}</p>
        )}

        <label
          className={`${bodyBold.className} mt-6 block text-xl text-white`}
        >
          DESKRIPSI PELANGGARAN
        </label>
        <div className={`${body.className} mb-2 block text-sm text-[#FA3A91]`}>
          (Deskripsikan pelanggaran yang terjadi, atau jika terdapat pelanggaran
          yang tidak ada di opsi)
        </div>
        <input
          {...register("deskripsi", { required: "Deskripsi wajib diisi" })}
          className="w-full rounded-md border border-gray-300 bg-[#3957D1] bg-opacity-40 p-2 text-white placeholder:text-slate-300"
          placeholder="Masukkan link bukti pelanggaran"
        />
        {errors.deskripsi && (
          <p className="text-sm text-red-500">
            {String(errors.deskripsi.message)}
          </p>
        )}

        <label
          className={`${bodyBold.className} mt-12 block text-xl text-white`}
        >
          Pakta Integritas
        </label>
        <div className={`${body.className} mb-2 block text-sm text-[#FA3A91]`}>
          KETIK ULANG 4 PERNYATAAN DI BAWAH INI:
        </div>
        <div className={`${bodyBold.className} mb-2 block text-sm text-white`}>
          1. Menjunjung tinggi kejujuran, keadilan, dan transparansi dalam
          seluruh proses Pemilihan Umum Raya KM ITB 2024/2025
        </div>
        <input
          {...register("p1", { required: "Pakta wajib diisi." })}
          className="w-full rounded-md border border-gray-300 bg-[#3957D1] bg-opacity-40 p-2 text-white placeholder:text-slate-300"
          placeholder="Menjunjung tinggi kejujuran, keadilan, dan transparansi dalam seluruh proses Pemilihan Umum Raya KM ITB 2024/2025."
        />
        {errors.p1 && (
          <p className="text-sm text-red-500">{String(errors.p1.message)}</p>
        )}
        <div
          className={`${bodyBold.className} mb-2 mt-4 block text-sm text-white`}
        >
          2. Mematuhi seluruh peraturan dan ketentuan yang berlaku terkait
          Pemilihan Umum Raya KM ITB 2024/2025, sesuai dengan TAP 042 KONGRES KM
          ITB 2024/2025
        </div>
        <input
          {...register("p2", { required: "Pakta wajib diisi." })}
          className="w-full rounded-md border border-gray-300 bg-[#3957D1] bg-opacity-40 p-2 text-white placeholder:text-slate-300"
          placeholder="Mematuhi seluruh peraturan dan ketentuan yang berlaku terkait Pemilihan Umum Raya KM ITB 2024/2025, sesuai dengan TAP 042 KONGRES KM ITB 2024/2025"
        />
        {errors.p2 && (
          <p className="text-sm text-red-500">{String(errors.p2.message)}</p>
        )}
        <div
          className={`${bodyBold.className} mb-2 mt-4 block text-sm text-white`}
        >
          3. Menolak segala bentuk kecurangan, ketidakooperatifan, dan tindakan
          tidak etis lainnya yang dapat mencederai proses Pemilihan Umum Raya KM
          ITB 2024/2025
        </div>
        <input
          {...register("p3", { required: "Pakta wajib diisi." })}
          className="w-full rounded-md border border-gray-300 bg-[#3957D1] bg-opacity-40 p-2 text-white placeholder:text-slate-300"
          placeholder="Menolak segala bentuk kecurangan, ketidakooperatifan, dan tindakan tidak etis lainnya yang dapat mencederai proses Pemilihan Umum Raya KM ITB 2024/2025"
        />
        {errors.p3 && (
          <p className="text-sm text-red-500">{String(errors.p3.message)}</p>
        )}
        <div
          className={`${bodyBold.className} mb-2 mt-4 block text-sm text-white`}
        >
          4. Mengunduh dan menceritakan bukti yang dicantumkan dengan
          sebenar-benarnya dan dapat dipertanggungjawabkan
        </div>
        <input
          {...register("p4", { required: "Pakta wajib diisi." })}
          className="w-full rounded-md border border-gray-300 bg-[#3957D1] bg-opacity-40 p-2 text-white placeholder:text-slate-300"
          placeholder="Mengunduh dan menceritakan bukti yang dicantumkan dengan sebenar-benarnya dan dapat dipertanggungjawabkan"
        />
        {errors.p4 && (
          <p className="text-sm text-red-500">{String(errors.p4.message)}</p>
        )}

        <div className="my-12 flex items-center justify-center">
          <button
            type="submit"
            className="mt-4 items-center rounded-lg bg-[#BEEF62] px-10 py-3 text-xl font-semibold text-[#FA3A91] hover:bg-[#FF82BB] hover:text-white md:px-28"
          >
            SUBMIT!
          </button>
        </div>
      </form>
      {message && (
        <p className="mt-2 self-center rounded-md bg-gray-800 p-3 text-center text-white">
          {message}
        </p>
      )}
    </div>
  );
};

export default withAuth(Pelaporan, ["/pelaporan"]);
