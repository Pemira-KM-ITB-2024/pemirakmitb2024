import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/ui/card";
import { body,header } from "@fonts"
import Timeline from "~/components/dashboard/timeline";

const Countdown = dynamic(() => import("~/components/countdown"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-1 flex-col items-center justify-center [&_.ch]:px-[10vw]">
      <div className="w-full snap-center">
        <div
          className={`ch isolate flex h-[calc(100vh-4rem)] w-full flex-col justify-center gap-6 text-center`}
        >
          <Countdown />
        </div>
      </div>

      <div className="w-full">
        <div
          className={`ch isolate flex min-h-screen w-full flex-col justify-start gap-6 text-center`}
        >
          <div className="mt-12 flex flex-col h-auto flex-1 justify-center md:mt-0 md:items-center mb-[600px]">
            <Image
              src="/background-landing2.png"
              width={700}
              height={700}
              alt="background1"
              className="absolute z-[-2] overflow-hidden w-full md:mt-[-2000px]"
            />
            <Image 
              src="/mikrofon.png"
              width={100}
              height={100}
              alt="mikrofon"
              className="absolute z-[-1] mt-[425px] ml-[-375px] lg:w-[200px]  sm:mt-[820px] sm:ml-[-500px] md:mt-[400px] md:w-[130px] md:ml-[-600px] lg:ml-[-800px] xl:ml-[-1200px] xl:mt-[550px]"
            />
            <Image 
              src="/koran.png"
              width={150}
              height={150}
              alt="koran"
              className="absolute mt-[575px] mr-[-275px] sm:mt-[1150px] sm:w-[200px] sm:mr-[-350px] lg:mt-[1650px] lg:mr-[-550px] lg:w-[300px] "
            />
            <Image
              src="/toapemira.png"
              width={120}
              height={120}
              alt="toa"
              className="absolute mt-[750px] ml-[-300px] sm:mt-[1450px] sm:ml-[-450px] md:mt-[1750px] md:w-[200px] md:ml-[-550px] lg:mt-[2400px] lg:ml-[-650px]"
            />
            <Image
              src="/suratpemira.png"
              width={120}
              height={120}
              alt="toa"
              className="absolute mt-[750px] mr-[-300px] sm:mt-[1450px] sm:mr-[-450px] md:mt-[1750px] md:w-[200px] md:mr-[-550px] lg:mt-[2400px] lg:mr-[-650px]"
            />
            <Timeline/>
            <div>
              <h1 className="mt-[300px] font-bold text-white text-[128px]">AMBIL BERKAS</h1>
              <p className="-mt-12 mb-[160px] text-[#FA3A91] font-bold text-[48px]">23 Oktober 2024 - 24 November 2024</p>
            </div>
            <Timeline showCircle={false}/>
          </div>
        </div>
      </div>
    </div>
  );
}
