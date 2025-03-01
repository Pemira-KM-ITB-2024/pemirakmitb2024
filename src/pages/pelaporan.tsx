/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @next/next/no-img-element */
import { IoDocumentText } from "react-icons/io5";
import abstract1 from "public/abstract/abstract3.svg";
import abstract2 from "public/abstract/abstract4.svg";
import fplogo from "public/abstract/fplogo.png";
import React, { useCallback, useRef } from 'react';
import { withAuth } from "~/utils/withAuth";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { body, bodyBold } from "~/styles/fonts";
import Webcam from "react-webcam";

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
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>();
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
        body: JSON.stringify({...data, photo}),
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
    <div className="flex flex-col items-center self-center w-full md:bg-black md:bg-opacity-20 md:w-[80%] mb-[20vh] md:items-start md:px-4">
      <img src={abstract1.src} alt="Abstract 1" className="absolute top-0 left-0 w-[50%] h-[50%] object-cover -translate-x-[50%] -translate-y-[30%]" />
      <img src={abstract2.src} alt="Abstract 2" className="absolute top-0 right-0 w-[50%] h-[50%] object-cover translate-x-[50%] -translate-y-[30%]" />
      <img src={fplogo.src} alt="FP Logo" className="object-contain h-full w-[55%] md:w-[70%] self-center mt-12" />
      <div className="text-white font-semibold text-3xl md:text-6xl mt-12 self-center">SOP</div>
      <button className="flex flex-row justify-center items-center bg-yellow-500 border border-[#B6B258] h-fit w-[40%] self-center mt-6 rounded-lg hover:cursor-pointer">
        <div className="flex flex-row bg-[#FFE859] w-full rounded-lg items-center justify-center mx-1 my-1 hover:cursor-pointer px-2 py-4">
          <IoDocumentText color="#FA3A91" size="2em" />
          <div className="text-2xl text-[#FA3A91] underline ml-2 hover:cursor-pointer">SOP Pelaporan</div>
        </div>
      </button>
      

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 p-6 rounded-lg shadow-md w-[90%] md:w-[90%] z-50 self-center">
        <label className={`${bodyBold.className} block text-white text-xl`}>NAMA LENGKAP</label>
        <div className={`${body.className} block mb-2 text-[#FA3A91] text-sm`}>(Isi selengkap-lengkapnya, tidak ada singkatan pada nama yang dicantumkan atau sesuai yang tertulis pada KTM)</div>
        <input 
          {...register("name", { required: "Nama wajib diisi." })} 
          className="w-full p-2 text-white border border-gray-300 rounded-md bg-opacity-40 bg-[#3957D1] placeholder:text-slate-300" 
          placeholder="Masukkan nama"
        />
        {errors.name && <p className="text-red-500 text-sm">{String(errors.name.message)}</p>}
        <label className={`${bodyBold.className} block mt-6 text-white text-xl`}>NIM</label>
        <div className={`${body.className} block mb-2 text-[#FA3A91] text-sm`}>(Isi dengan NIM Jurusan apabila sudah mendapatkan, NIM TPB jika belum)</div>
        <input 
          {...register("studentId", { required: "NIM wajib diisi." })} 
          className="w-full p-2 text-white border border-gray-300 rounded-md bg-opacity-40 bg-[#3957D1] placeholder:text-slate-300" 
          placeholder="Masukkan NIM"
        />
        {errors.studentId && <p className="text-red-500 text-sm">{String(errors.studentId.message)}</p>}
        <label className={`${bodyBold.className} block mt-6 text-white text-xl`}>PROGRAM STUDI</label>
        <div className={`${body.className} block mb-2 text-[#FA3A91] text-sm`}>(Isi dengan program studi, TPB jika belum ada.)</div>
        <input 
          {...register("programstudi", { required: "Program Studi wajib diisi." })} 
          className="w-full p-2 text-white border border-gray-300 rounded-md bg-opacity-40 bg-[#3957D1] placeholder:text-slate-300" 
          placeholder="Masukkan Program Studi"
        />
        {errors.programstudi && <p className="text-red-500 text-sm">{String(errors.programstudi.message)}</p>}
        <label className={`${bodyBold.className} block mt-6 text-white text-xl`}>KONTAK PELAPOR</label>
        <div className={`${body.className} block mb-2 text-[#FA3A91] text-sm`}>(Isi dengan Nomor Whatsapp atau ID Line, selain itu tidak valid.)</div>
        <input 
          {...register("kontak", { required: "Program Studi wajib diisi." })} 
          className="w-full p-2 text-white border border-gray-300 rounded-md bg-opacity-40 bg-[#3957D1] placeholder:text-slate-300" 
          placeholder="Masukkan Program Studi"
        />
        {errors.kontak && <p className="text-red-500 text-sm">{String(errors.kontak.message)}</p>}
        <label className={`${bodyBold.className} block mt-6 text-white text-xl`}>TEMPAT KEJADIAN</label>
        <div className="flex flex-col space-y-2">
          {["Kampus Ganesha", "Kampus Jatinangor", "Kampus Cirebon", "Tempat lain"].map((campus) => (
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
        {tempatKejadian.length === 0 && <p className="text-red-500 text-sm">Minimal satu tempat kejadian harus dipilih.</p>}
        <label className={`${bodyBold.className} block mt-6 text-white text-xl`}>BUKTI KTM/KSM</label>
        <div className={`${body.className} block mb-2 text-[#FA3A91] text-sm`}>(Ambillah foto diri anda dengan KTM dengan muka anda juga berada di dalam foto)</div>
        <div className="flex flex-col items-center">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-[80%] md:w-[50%] h-auto border border-gray-300 rounded-lg"
          />
          <button type="button" onClick={capture} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Ambil Foto
          </button>
          {photo && <img src={photo} alt="Captured" className="mt-4 w-[60%] md:w-[30%] border border-gray-300 rounded-lg" />}
        </div>
        <label className={`${bodyBold.className} block mt-6 text-white text-xl mb-4`}>JENIS PELANGGARAN</label>

        <div className="flex flex-col gap-2 items-center mx-auto bg-[#FA3A91] rounded-lg w-[90%] bg-opacity-30">
          <div className={`${bodyBold.className} bg-[#FA3A91] rounded-lg w-full text-[#FFE859] self-center flex items-center justify-center mb-4 py-4`}>
            Pelanggaran Ringan
          </div>
          
          {["Calon K3M atau Calon MWA-WM ITB tidak dapat mendatangkan Promotor pada acara Kampanye sesuai dengan jumlah atau waktu yang ditentukan Panitia Pelaksana Pemira KM ITB 2024/2025;", "Tim Kampanye datang pada acara Kampanye yang wajib dihadirinya melebihi waktu yang ditentukan Komisi Disiplin Pemira KM ITB 2024/2025;", "Tim Kampanye menyerahkan catatan pemasukan dan pengeluaran dana Kampanye melebihi batas waktu yang ditentukan Panitia Pelaksana Pemira KM ITB 2024/2025;", "Tim Kampanye mengisi presensi kehadiran acara Kampanye, tetapi sebenarnya tidak hadir;", "Tim Kampanye tidak mengisi presensi pada saat pemungutan suara berlangsung;", "Tim Kampanye tidak mencelupkan tangannya pada tinta yang disediakan saat pemungutan suara."].map((option) => (
            <label key={option} className="flex items-center w-[95%] bg-[#FA3A91] rounded-lg border border-white text-white p-2 mb-2">
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
        {errors.pelanggaranRingan && <p className="text-red-500 text-sm">{String(errors.pelanggaranRingan.message)}</p>}

        <div className="flex flex-col gap-2 mt-12 mx-auto items-center bg-[#FFE859] rounded-lg w-[90%] bg-opacity-60">
          <div className={`${bodyBold.className} bg-[#FFE859] rounded-lg w-full text-[#FA3A91] self-center flex items-center justify-center mb-4 py-4`}>
            Pelanggaran Sedang
          </div>
          
          {["Calon K3M atau Calon MWA-WM ITB melakukan Kampanye di luar masa Kampanye yang telah ditetapkan oleh Panitia Pelaksana Pemira KM ITB 2024/2025;", "Promotor memprovokasi massa dalam Kampanye;", "Jumlah Promotor melebihi batas yang ditentukan;", "Sanksi pelanggaran ringan yang diberikan kepada Tim Kampanye tidak selesai dikerjakan hingga batas waktu yang ditentukan Komisi Disiplin;", "Calon K3M atau Calon MWA-WM ITB tidak datang pada acara Kampanye yang wajib dihadirinya tanpa mematuhi mekanisme yang ditentukan oleh Panitia Pelaksana Pemira KM ITB 2024/2025;", "Tim Kampanye menggunakan dana Kampanye melebihi batas atas pengeluaran Kampanye;", "Tim Kampanye melakukan pencelaan dan/atau provokasi yang tidak mengandung unsur Suku, Agama, Ras, dan Antargolongan terhadap pihak lain;", "Tim Kampanye melakukan Kampanye pada saat pemungutan suara berlangsung."].map((option) => (
            <label key={option} className="flex items-center w-[95%] bg-[#FFE859] bg-opacity-40 rounded-lg border border-white text-white p-2 mb-2">
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
        {errors.pelanggaranSedang && <p className="text-red-500 text-sm">{String(errors.pelanggaranSedang.message)}</p>}

        <div className="flex flex-col gap-2 mt-12 mx-auto items-center bg-[#5A8AF9] rounded-lg w-[90%] bg-opacity-60">
          <div className={`${bodyBold.className} bg-[#5A8AF9] rounded-lg w-full text-[#BEEF62] self-center flex items-center justify-center mb-4 py-4`}>
            Pelanggaran Berat
          </div>
          
          {["Calon K3M atau Calon MWA-WM ITB dan/atau Promotornya melakukan penyuapan, kekerasan, dan pemerasan terhadap pihak manapun dalam rangkaian Pemira KM ITB 2024/2025;", "Calon K3M atau Calon MWA-WM ITB dan/atau Promotornya ditemukan melakukan kecurangan dalam memenuhi syarat-syarat yang telah ditentukan, baik sebelum maupun setelah melewati tahap verifikasi berkas;", "Tim Kampanye melakukan pencelaan dan/atau provokasi yang mengandung unsur Suku, Agama, Ras, dan Antargolongan terhadap pihak lain;", "Calon berafiliasi dengan partai politik, organisasi sayap, dan turunannya, serta dengan sengaja menerima bantuan yang diberikan oleh lembaga tersebut;", "Calon terbukti tersangkut kasus pidana, sanksi akademik, atau sanksi organisasi KM ITB;", "Tim Kampanye mengintervensi hak demokrasi orang lain;", "Calon maupun Tim Kampanye melakukan intervensi terkait perhitungan suara kepada Panitia Pelaksana Pemira KM ITB 2024/2025 Pemira KM ITB 2024/2025;", "Calon maupun Tim Kampanye menyabotase kegiatan Pemungutan dan Perhitungan Suara"].map((option) => (
            <label key={option} className="flex items-center w-[95%] bg-[#5A8AF9] bg-opacity-40 rounded-lg border border-white text-white p-2 mb-2">
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
        {errors.pelanggaranBerat && <p className="text-red-500 text-sm">{String(errors.pelanggaranBerat.message)}</p>}

        <label className={`${bodyBold.className} block text-white text-xl mt-12`}>BUKTI PELANGGARAN</label>
        <div className={`${body.className} block mb-2 text-[#FA3A91] text-sm`}>(Cantumkan link yang berisi kumpulan bukti/foto dalam bentuk link Google Drive/OneDrive/etc.)</div>
        <input 
          {...register("bukti", { required: "Bukti sangat wajib diisi." })} 
          className="w-full p-2 text-white border border-gray-300 rounded-md bg-opacity-40 bg-[#3957D1] placeholder:text-slate-300" 
          placeholder="Masukkan link bukti pelanggaran"
        />
        {errors.bukti && <p className="text-red-500 text-sm">{String(errors.bukti.message)}</p>}

        <label className={`${bodyBold.className} block text-white text-xl mt-6`}>DESKRIPSI PELANGGARAN</label>
        <div className={`${body.className} block mb-2 text-[#FA3A91] text-sm`}>(Deskripsikan pelanggaran yang terjadi, atau jika terdapat pelanggaran yang tidak ada di opsi)</div>
        <input 
          {...register("deskripsi", { required: "Deskripsi wajib diisi" })} 
          className="w-full p-2 text-white border border-gray-300 rounded-md bg-opacity-40 bg-[#3957D1] placeholder:text-slate-300" 
          placeholder="Masukkan link bukti pelanggaran"
        />
        {errors.deskripsi && <p className="text-red-500 text-sm">{String(errors.deskripsi.message)}</p>}

        <label className={`${bodyBold.className} block text-white text-xl mt-12`}>Pakta Integritas</label>
        <div className={`${body.className} block mb-2 text-[#FA3A91] text-sm`}>KETIK ULANG 4 PERNYATAAN DI BAWAH INI:</div>
        <div className={`${bodyBold.className} block mb-2 text-white text-sm`}>1. Menjunjung tinggi kejujuran, keadilan, dan transparansi dalam seluruh proses Pemilihan Umum Raya KM ITB 2024/2025</div>
        <input 
          {...register("p1", { required: "Pakta wajib diisi." })} 
          className="w-full p-2 text-white border border-gray-300 rounded-md bg-opacity-40 bg-[#3957D1] placeholder:text-slate-300" 
          placeholder="Menjunjung tinggi kejujuran, keadilan, dan transparansi dalam seluruh proses Pemilihan Umum Raya KM ITB 2024/2025."
        />
        {errors.p1 && <p className="text-red-500 text-sm">{String(errors.p1.message)}</p>}
        <div className={`${bodyBold.className} block mb-2 text-white text-sm mt-4`}>2. Mematuhi seluruh peraturan dan ketentuan yang berlaku terkait Pemilihan Umum Raya KM ITB 2024/2025, sesuai dengan TAP 042 KONGRES KM ITB 2024/2025</div>
        <input 
          {...register("p2", { required: "Pakta wajib diisi." })} 
          className="w-full p-2 text-white border border-gray-300 rounded-md bg-opacity-40 bg-[#3957D1] placeholder:text-slate-300" 
          placeholder="Mematuhi seluruh peraturan dan ketentuan yang berlaku terkait Pemilihan Umum Raya KM ITB 2024/2025, sesuai dengan TAP 042 KONGRES KM ITB 2024/2025"
        />
        {errors.p2 && <p className="text-red-500 text-sm">{String(errors.p2.message)}</p>}
        <div className={`${bodyBold.className} block mb-2 text-white text-sm mt-4`}>3. Menolak segala bentuk kecurangan, ketidakooperatifan, dan tindakan tidak etis lainnya yang dapat mencederai proses Pemilihan Umum Raya KM ITB 2024/2025</div>
        <input 
          {...register("p3", { required: "Pakta wajib diisi." })} 
          className="w-full p-2 text-white border border-gray-300 rounded-md bg-opacity-40 bg-[#3957D1] placeholder:text-slate-300" 
          placeholder="Menolak segala bentuk kecurangan, ketidakooperatifan, dan tindakan tidak etis lainnya yang dapat mencederai proses Pemilihan Umum Raya KM ITB 2024/2025"
        />
        {errors.p3 && <p className="text-red-500 text-sm">{String(errors.p3.message)}</p>}
        <div className={`${bodyBold.className} block mb-2 text-white text-sm mt-4`}>4. Mengunduh dan menceritakan bukti yang dicantumkan dengan sebenar-benarnya dan dapat dipertanggungjawabkan</div>
        <input 
          {...register("p4", { required: "Pakta wajib diisi." })} 
          className="w-full p-2 text-white border border-gray-300 rounded-md bg-opacity-40 bg-[#3957D1] placeholder:text-slate-300" 
          placeholder="Mengunduh dan menceritakan bukti yang dicantumkan dengan sebenar-benarnya dan dapat dipertanggungjawabkan"
        />
        {errors.p4 && <p className="text-red-500 text-sm">{String(errors.p4.message)}</p>}

        <div className="flex items-center justify-center">
          <button type="submit" className="items-center mt-4 text-[#FA3A91] font-semibold text-xl bg-[#BEEF62] px-10 md:px-28 py-3 rounded-lg hover:bg-[#FF82BB] hover:text-white">
            SUBMIT!
          </button>
        </div>
      </form>
      {message && <p className="mt-2 self-center text-center text-white bg-gray-800 p-3 rounded-md">{message}</p>}
    </div>
  );
};

export default withAuth(Pelaporan, ["/pelaporan"]);
