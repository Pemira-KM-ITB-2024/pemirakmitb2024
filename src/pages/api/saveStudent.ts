/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  if (req.method === "POST") {
    const { name, studentId, programstudi, campuses, contactinfo, pelanggarans, extrapelanggaran, buktiinfo, deskripsiinfo, p1, p2, p3, p4, image } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Nama tidak boleh kosong." });
    }
    if (!studentId) {
      return res.status(400).json({ error: "NIM tidak boleh kosong." });
    }
    if (!programstudi) {
      return res.status(400).json({ error: "Program Studi tidak boleh kosong." });
    }
    if (!campuses || campuses.length === 0) {
      return res.status(400).json({ error: "Minimal pilih satu kampus." });
    }
    if (!contactinfo) {
      return res.status(400).json({ error: "Contact info tidak boleh kosong." });
    }
    if (!pelanggarans || pelanggarans.length === 0) {
      return res.status(400).json({ error: "Minimal pilih satu jenis pelanggaran." });
    }
    if (!buktiinfo) {
      return res.status(400).json({ error: "Bukti tidak boleh kosong." });
    }
    if (!deskripsiinfo) {
      return res.status(400).json({ error: "Deskripsi tidak boleh kosong." });
    }
    if (!p1) {
      return res.status(400).json({ error: "Pakta Integritas tidak lengkap." });
    }
    if (!p2) {
      return res.status(400).json({ error: "Pakta Integritas tidak lengkap." });
    }
    if (!p3) {
      return res.status(400).json({ error: "Pakta Integritas tidak lengkap." });
    }
    if (!p4) {
      return res.status(400).json({ error: "Pakta Integritas tidak lengkap." });
    }
    if (!image) {
      return res.status(400).json({ error: "Foto KTM tidak boleh kosong." });
    }
    try {
      const client = await clientPromise;
      const db = client.db("PemiraReports"); 
      const collection = db.collection("Reports"); 

      const result = await collection.insertOne({ name, studentId, programstudi, campuses, contactinfo, pelanggarans, extrapelanggaran, buktiinfo, deskripsiinfo, p1, p2, p3, p4, image, createdAt: new Date() });

      return res.status(201).json({ message: "Pelaporan berhasil dilakukan!", data: result });
    } catch (error) {
      console.error("Error melakukan pelaporan!", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Anda nakal. Saya sudah memprediksi hal ini akan terjadi, dan saya tahu identitas asli anda. Laporkan diri ke pihak berwenang sebelum saya mendatangi anda." });
  }
}