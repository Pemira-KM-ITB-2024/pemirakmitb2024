import { header } from "@fonts";
import Image from "next/image";
import Link from "next/link";
import Bg from "~/components/background";
import Card from "~/components/dashboard/card";
import dynamic from "next/dynamic";
import { k3m } from "~/data/k3m";
import Timeline from "~/components/dashboard/timeline";

const Countdown = dynamic(() => import("~/components/countdown"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="dusty-bg flex h-screen w-full flex-1 flex-col items-center justify-center [&_.ch]:px-[10vw]">
      <Bg className="top-0 h-[calc(100vh)] bg-gradient-to-b from-cream from-85% to-brown-1" />
      <Bg className="top-[calc(100vh)] h-screen bg-brown-1" />
      <Bg className="top-[calc(200vh)] h-screen bg-brown-1" />
      <Bg className="top-[calc(300vh)] h-screen bg-gradient-to-b from-brown-1 to-cream to-30%" />
      <div className="w-full snap-center">
        <div
          className={`ch isolate flex h-[calc(100vh-4rem)] w-full flex-col justify-center gap-6 text-center`}
        >
          <h1
            className={`${header.className} text-center text-4xl text-oren shadow-teal-4 text-shadow text-stroke-width-1 text-stroke-color-cream md:text-6xl`}
          >
            PEMILU RAYA KM ITB 2023/2024
          </h1>
          <h4 className="text-sm text-navy md:text-xl">
            Pemilihan Ketua Kabinet KM ITB dan Majelis Wali Amanat Wakil
            Mahasiswa ITB
          </h4>
          <h4
            className={`${header.className} mb-12 text-red-4 drop-shadow md:mb-24`}
          >
            {"#GERAKINKLUSIF"}
          </h4>
          <Countdown />
          <div className="text-red-4">
            {new Date() >= new Date("2024-03-13T07:00:00+07:00")
              ? "PEMIRA sudah selesai!"
              : "sampai vote dimulai!"}
          </div>
        </div>
      </div>
      <div className="w-full">
        <div
          className={`ch isolate flex min-h-screen w-full flex-col justify-start gap-6 text-center`}
        >
          <h1
            className={`text-custom md:text-6xl ${header.className} pt-12 md:pt-32`}
          >
            Linimasa
          </h1>
          <div className="mt-12 flex h-full flex-1 justify-center pb-20 md:mt-0 md:items-center">
            <Timeline />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="ch isolate z-[1] flex min-h-screen w-full flex-col justify-center gap-16 py-[8vh] *:space-y-8 md:gap-24">
          <div className="">
            <h1 className="text-custom __className_318c95 md:text-6xl">K3M</h1>
            <div className="flex flex-wrap justify-center gap-4 md:gap-[7vw]">
              {k3m.map((k3m, i) => (
                <Card
                  key={i}
                  name={k3m.name}
                  major={k3m.jurusan}
                  batch="21"
                  variant="k3m"
                  motto={k3m.motto}
                  nomor={k3m.no}
                  photo={k3m.photo}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full">
        <div className="ch relative z-[1] flex h-screen flex-col items-center justify-center gap-10 overflow-hidden text-center md:justify-end md:gap-16">
          <h1 className="text-custom __className_318c95 md:text-6xl">
            Gunakan Suaramu!
          </h1>
          <Link
            href="/guide-voting"
            className="w-fit rounded border border-red-5 bg-brown-4/85 px-4 py-2 text-teal-5 transition-colors text-stroke-width-[0.1px] text-stroke-color-blue-1 hover:bg-brown-4"
          >
            Guide Voting
          </Link>
          <Image
            src="/jengga/blocks.png"
            alt="logo"
            width={1800}
            height={1800}
            className="absolute  bottom-0 max-h-[40vh] object-contain md:static md:max-w-[60vw]"
          />
          <Image
            src="/bintang/5.png"
            alt=""
            width={800}
            height={800}
            className="absolute left-1/4  top-1/4 h-14 w-14 -rotate-12 object-contain md:h-24 md:w-24"
          />
          <Image
            src="/bintang/11.png"
            alt=""
            width={800}
            height={800}
            className="absolute right-1/4  top-1/4 h-14 w-14 rotate-12 object-contain md:h-24 md:w-24"
          />
        </div>
      </div>
    </div>
  );
}
