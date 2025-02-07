/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { withAuth } from "~/utils/withAuth";
import Image from "next/image";
import dynamic from "next/dynamic";
import { body, header } from "@fonts";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const Countdown = dynamic(() => import("~/components/countdown"), {
  ssr: false,
});

const campusOptions = [
  "Kampus Ganesha",
  "Kampus Cirebon",
  "Kampus Jatinangor",
  "Dan Lain-lain",
];

const pelanggaranOptions = [
  "Calon K3M atau Calon MWA-WM ITB tidak dapat mendatangkan Promotor pada acara Kampanye sesuai dengan jumlah atau waktu yang ditentukan Panitia Pelaksana Pemira KM ITB 2024/2025;",
  "Tim Kampanye datang pada acara Kampanye yang wajib dihadirinya melebihi waktu yang ditentukan Komisi Disiplin Pemira KM ITB 2024/2025;",
  "Tim Kampanye menyerahkan catatan pemasukan dan pengeluaran dana Kampanye melebihi batas waktu yang ditentukan Panitia Pelaksana Pemira KM ITB 2024/2025;",
  "Tim Kampanye mengisi presensi kehadiran acara Kampanye, tetapi sebenarnya tidak hadir;",
  "Tim Kampanye tidak mengisi presensi pada saat pemungutan suara berlangsung;",
  "Tim Kampanye tidak mencelupkan tangannya pada tinta yang disediakan saat pemungutan suara;",
  "Calon K3M atau Calon MWA-WM ITB melakukan Kampanye di luar masa Kampanye yang telah ditetapkan oleh Panitia Pelaksana Pemira KM ITB 2024/2025;",
  "Promotor memprovokasi massa dalam Kampanye;",
  "Jumlah Promotor melebihi batas yang ditentukan;",
  "Sanksi pelanggaran ringan yang diberikan kepada Tim Kampanye tidak selesai dikerjakan hingga batas waktu yang ditentukan Komisi Disiplin;",
  "Calon K3M atau Calon MWA-WM ITB tidak datang pada acara Kampanye yang wajib dihadirinya tanpa mematuhi mekanisme yang ditentukan oleh Panitia Pelaksana Pemira KM ITB 2024/2025;",
  "Tim Kampanye menggunakan dana Kampanye melebihi batas atas pengeluaran Kampanye;",
  "Tim Kampanye melakukan pencelaan dan/atau provokasi yang tidak mengandung unsur Suku, Agama, Ras, dan Antargolongan terhadap pihak lain;",
  "Tim Kampanye melakukan Kampanye pada saat pemungutan suara berlangsung;",
  "Calon K3M atau Calon MWA-WM ITB dan/atau Promotornya melakukan penyuapan, kekerasan, dan pemerasan terhadap pihak manapun dalam rangkaian Pemira KM ITB 2024/2025;",
  "Calon K3M atau Calon MWA-WM ITB dan/atau Promotornya ditemukan melakukan kecurangan dalam memenuhi syarat-syarat yang telah ditentukan, baik sebelum maupun setelah melewati tahap verifikasi berkas;",
  "Tim Kampanye melakukan pencelaan dan/atau provokasi yang mengandung unsur Suku, Agama, Ras, dan Antargolongan terhadap pihak lain;",
  "Calon berafiliasi dengan partai politik, organisasi sayap, dan turunannya, serta dengan sengaja menerima bantuan yang diberikan oleh lembaga tersebut;",
  "Calon terbukti tersangkut kasus pidana, sanksi akademik, atau sanksi organisasi KM ITB;",
  "Tim Kampanye mengintervensi hak demokrasi orang lain;",
  "Calon maupun Tim Kampanye melakukan intervensi terkait perhitungan suara kepada Panitia Pelaksana Pemira KM ITB 2024/2025;",
  "Calon maupun Tim Kampanye menyabotase kegiatan Pemungutan dan Perhitungan Suara."
];


const Pelaporan = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
  });

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [programstudi, setProgramstudi] = useState("");
  const [contactinfo, setContactinfo] = useState("");
  const [extrapelanggaran, setExtrapelanggaran] = useState("");
  const [buktiinfo, setBuktiinfo] = useState("");
  const [deskripsiinfo, setDeskripsiinfo] = useState("");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [p3, setP3] = useState("");
  const [p4, setP4] = useState("");
  const [selectedCampuses, setSelectedCampuses] = useState<string[]>([]);
  const [selectedPelanggarans, setSelectedPelanggarans] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleCampusChange = (campus: string) => {
    setSelectedCampuses((prev) =>
      prev.includes(campus)
        ? prev.filter((item) => item !== campus)
        : [...prev, campus]
    );
  };

  const handlePelanggaranChange = (pelanggaran: string) => {
    setSelectedPelanggarans((prev) =>
      prev.includes(pelanggaran)
        ? prev.filter((item) => item !== pelanggaran)
        : [...prev, pelanggaran]
    );
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
    }
  }, [webcamRef]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/saveStudent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, studentId, programstudi, campuses: selectedCampuses, contactinfo, pelanggarans: selectedPelanggarans, extrapelanggaran, buktiinfo, deskripsiinfo, p1, p2, p3, p4, image }),
    });

    if (response.ok) {
      alert("Data submitted successfully!");
      setName("");
      setStudentId("");
      setProgramstudi("");
      setContactinfo("");
      setExtrapelanggaran("");
      setBuktiinfo("");
      setDeskripsiinfo("");
      setSelectedCampuses([]);
      setSelectedPelanggarans([]);
      setImage(null);
    } else {
      alert("Error submitting data! Pastikan semua field terisi/Pakta integritas ditulis dengan benar! (Jika terdapat kendala lebih lanjut, mohon hubungi michael.ballard di LINE)");
    }
  };

  return (
    <div className="relative z-0 flex flex-col items-center justify-center w-full overflow-hidden mb-[20vw]">
      <div
        className={`${header.className} w-[80%] flex text-center items-center justify-center mt-[100px] font-bold text-3xl md:text-5xl text-[#FA3A91]`}
      >
        SOP Pelaporan
      </div>
      <div className="w-[80%] h-[80vw] md:h-[40vw] border border-gray-200 shadow-lg mt-12">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div className="w-full h-full">
            <Viewer
              fileUrl="/soplapor.pdf"
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={SpecialZoomLevel.PageWidth}
            />
          </div>
        </Worker>
      </div>
      <div
        className={`${header.className} w-[80%] flex text-center items-center justify-center mt-[100px] font-bold text-3xl md:text-5xl text-[#FA3A91]`}
      >
        Form Pelaporan
      </div>

      <form
        className="flex flex-col items-center justify-center w-[80%] mt-12 space-y-4"
        onSubmit={handleSubmit}
      >
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[50px] font-bold text-xl md:text-3xl text-[#FA3A91]`}
        >
          Nama Lengkap
        </div>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Nama lengkap (isi sesuai KTM)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[50px] font-bold text-xl md:text-3xl text-[#FA3A91]`}
        >
          NIM
        </div>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="NIM (isi sesuai KTM, NIM Jurusan apabila ada)"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[50px] font-bold text-xl md:text-3xl text-[#FA3A91]`}
        >
          Program Studi
        </div>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Isi Program Studi (ex: Teknik Informatika/TPB)"
          value={programstudi}
          onChange={(e) => setProgramstudi(e.target.value)}
          required
        />
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[50px] font-bold text-xl md:text-3xl text-[#FA3A91]`}
        >
          Tempat Kejadian Pelanggaran
        </div>
        <div className="flex flex-col self-start space-y-2 mt-2 items-start">
          {campusOptions.map((campus) => (
            <label
              key={campus}
              className="items-center flex space-x-2 text-lg font-medium text-[#FA3A91]"
            >
              <input
                type="checkbox"
                className="items-center w-fit h-fit accent-pink-500"
                checked={selectedCampuses.includes(campus)}
                onChange={() => handleCampusChange(campus)}
              />
              <span>{campus}</span>
            </label>
          ))}
        </div>
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[50px] font-bold text-xl md:text-3xl text-[#FA3A91]`}
        >
          Contact Info
        </div>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Isi dengan nomor telepon/ ID Line yang bisa dihubungi"
          value={contactinfo}
          onChange={(e) => setContactinfo(e.target.value)}
          required
        />
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[50px] font-bold text-xl md:text-3xl text-[#FA3A91]`}
        >
          Jenis Pelanggaran
        </div>
        <div className="flex flex-col self-start space-y-2 mt-2 items-start">
          {pelanggaranOptions.map((pelanggaran) => (
            <label
              key={pelanggaran}
              className="items-center flex space-x-2 text-lg font-medium text-[#FA3A91]"
            >
              <input
                type="checkbox"
                className="items-center w-fit h-fit accent-pink-500"
                checked={selectedPelanggarans.includes(pelanggaran)}
                onChange={() => handlePelanggaranChange(pelanggaran)}
              />
              <span>{pelanggaran}</span>
            </label>
          ))}
        </div>
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[50px] font-bold text-xl md:text-3xl text-[#FA3A91]`}
        >
          Pelanggaran Lainnya
        </div>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Silahkan isi jika terdapat pelanggaran lain yang tidak terdapat di daftar pelanggaran"
          value={extrapelanggaran}
          onChange={(e) => setExtrapelanggaran(e.target.value)}
          required
        />
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[50px] font-bold text-xl md:text-3xl text-[#FA3A91]`}
        >
          Bukti Pelanggaran
        </div>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Isi dengan link tempat penyimpanan bukti pelanggaran (ex: Google Drive, OneDrive, Dropbox)"
          value={buktiinfo}
          onChange={(e) => setBuktiinfo(e.target.value)}
          required
        />
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[50px] font-bold text-xl md:text-3xl text-[#FA3A91]`}
        >
          Deskripsi Pelanggaran
        </div>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Jelas dan singkat, deskripsikan pelanggaran yang terjadi."
          value={deskripsiinfo}
          onChange={(e) => setDeskripsiinfo(e.target.value)}
          required
        />
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[50px] font-bold text-xl md:text-3xl text-[#FA3A91]`}
        >
          Pakta Integritas
        </div>
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[10px] font-bold text-sm md:text-sm text-[#FA3A91]`}
        >
          Mohon ketik ulang pernyataan-pernyataan di bawah ini (Angka di awal tidak perlu ditulis).
        </div>
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[10px] font-bold text-sm md:text-sm text-white`}
        >
          1. Menjunjung tinggi kejujuran, keadilan, dan transparansi dalam seluruh proses Pemilihan Umum Raya KM ITB 2024/2025.
        </div>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Tuliskan ulang."
          value={p1}
          onChange={(e) => setP1(e.target.value)}
          required
        />
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[10px] font-bold text-sm md:text-sm text-white`}
        >
          2. Mematuhi seluruh peraturan dan ketentuan yang berlaku terkait Pemilihan Umum Raya KM ITB 2024/2025, sesuai dengan TAP 042 KONGRES KM ITB 2024/2025.
        </div>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Tuliskan ulang."
          value={p2}
          onChange={(e) => setP2(e.target.value)}
          required
        />
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[10px] font-bold text-sm md:text-sm text-white`}
        >
          3. Menolak segala bentuk kecurangan, ketidakooperatifan, dan tindakan tidak etis lainnya yang dapat mencederai proses Pemilihan Umum Raya KM ITB 2024/2025.
        </div>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Tuliskan ulang."
          value={p3}
          onChange={(e) => setP3(e.target.value)}
          required
        />
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[10px] font-bold text-sm md:text-sm text-white`}
        >
          4. Mengunduh dan menceritakan bukti yang dicantumkan dengan sebenar-benarnya dan dapat dipertanggungjawabkan.
        </div>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Tuliskan ulang."
          value={p4}
          onChange={(e) => setP4(e.target.value)}
          required
        />
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[50px] font-bold text-xl md:text-3xl text-[#FA3A91]`}
        >
          Foto Bukti Wajah & KTM
        </div>
        <div
          className={`w-[100%] flex text-start items-start justify-start mt-[10px] font-bold text-sm md:text-sm text-[#FA3A91]`}
        >
          Mohon untuk mengambil foto wajah dan KTM anda sebagai bukti pelaporan.
        </div>
        <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="border w-64 h-48" />
        <button type="button" onClick={capture} className="px-4 py-2 bg-blue-500 text-white">Capture Image</button>
        {image && <img src={image} alt="Captured" className="w-32 h-24 border" />}
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default withAuth(Pelaporan, ["/pelaporan"]);