/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  if (req.method === "POST") {
    const { name, studentId, programstudi, kontak, tempatKejadian, photo, pelanggaranRingan, pelanggaranSedang, pelanggaranBerat, bukti, deskripsi, p1, p2, p3, p4 } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Nama tidak boleh kosong." });
    }
    if (!studentId) {
      return res.status(400).json({ error: "NIM tidak boleh kosong." });
    }
    if (!programstudi) {
      return res.status(400).json({ error: "Program Studi tidak boleh kosong." });
    }
    if (!kontak) {
      return res.status(400).json({ error: "Kontak tidak boleh kosong." });
    }
    if(!photo) {
      return res.status(400).json({ error: "Foto tidak boleh kosong." });
    }
    if(!bukti) {
      return res.status(400).json({ error: "Bukti tidak boleh kosong." });
    }
    if(!deskripsi) {
      return res.status(400).json({ error: "Deskripsi tidak boleh kosong." });
    }
    if(!p1) {
      return res.status(400).json({ error: "P1 tidak boleh kosong." });
    }
    if(!p2) {
      return res.status(400).json({ error: "P2 tidak boleh kosong." });
    }
    if(!p3) {
      return res.status(400).json({ error: "P3 tidak boleh kosong." });
    }
    if(!p4) {
      return res.status(400).json({ error: "P4 tidak boleh kosong." });
    }
    try {
      const client = await clientPromise;
      const db = client.db("PemiraReports"); 
      const collection = db.collection("Reports"); 

      const result = await collection.insertOne({ name, studentId, programstudi, kontak, tempatKejadian, photo, pelanggaranRingan, pelanggaranSedang, pelanggaranBerat, bukti, deskripsi, p1, p2, p3, p4, createdAt: new Date() });

      return res.status(201).json({ message: "Pelaporan berhasil dilakukan!", data: result });
    } catch (error) {
      console.error("Error melakukan pelaporan!", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Anda nakal. Saya sudah memprediksi hal ini akan terjadi, dan saya tahu identitas asli anda. Laporkan diri ke pihak berwenang sebelum saya mendatangi anda." });
  }
}