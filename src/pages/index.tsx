import Image from "next/image";
import Bg from "~/components/background";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/ui/card";
import { body,header } from "@fonts"
import Timeline from "~/components/dashboard/timeline";
import Timeline2 from "@/dashboard/timeline2";
import Timeline3 from "@/dashboard/timeline3";

const Countdown = dynamic(() => import("~/components/countdown"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative z-0 flex flex-col items-center w-full min-h-screen overflow-hidden">
      <Bg />
      <div className="flex justify-center mx-auto mt-[-100px]">
        <Image 
          src="/pemira-landing-page.png"
          width={500}
          height={500}
          alt="Gambar Pemira"
          className="justify-center mx-auto absolute z-[-1] md:w-[600px] lg:w-[700px] xl:w-[800px] mt-[-30px]"
        />
      </div>
      <div className="mt-[210px] md:mt-[260px] lg:mt-[310px] xl:mt-[360px] flex-row items-center text-center">
        <h3 className={`${header.className} mt-[50px] lg:mt-[75px] justify-center flex font-bold text-lg md:text-3xl text-[#FFF859]`}>
          Pemilihan Ketua Kabinet KM ITB dan
        </h3>
        <h3 className={`${header.className} justify-center flex font-bold text-lg md:text-3xl text-[#FFF859]`}>
          MAJELIS WALI AMANAT WAKIL MAHASISWA ITB 
        </h3>
      </div>
      <div className="w-full snap-center mt-[-180px] md:mt-[-150px]">
        <Image
          src="/jam-dinding.png"
          width={150}
          height={150}
          alt="jam-dinding"
          className="absolute justify-start mt-[210px] overflow-hidden ml-[-30px] xsm:ml-[80px] sm:ml-[90px] md:w-[200px] lg:w-[250px] md:mt-[140px] 2xl:ml-[160px]"
        />
        <div className="ch isolate flex h-[calc(100vh-4rem)] w-full flex-col justify-center gap-6 text-center">
          <Countdown />
        </div>
        <Image 
          src="/jam-tangan.png"
          width={200}
          height={200}
          alt="jam-tangan"
          className="absolute  mt-[-380px] mr-5 ml-[340px] z-[-1] overflow-hidden md:w-[200px] lg:w-[250px] lg:ml-[900px] 2xl:ml-[1075px] lg:mt-[-400px] md:ml-[650px] sm:ml-[450px] xsm:ml-[350px]"
        />
      </div>
      <h1 className={`${header.className} text-center items-center flex text-6xl text-[#FA3A91] font-extrabold mt-[-150px]`}>
        CALON K3M
      </h1>
      <div className="w-full overflow-x-auto flex justify-start md:justify-center gap-x-6 px-4">
        <div className="flex gap-6 mt-3">
          <Card className="bg-[#FA3A91] rounded-xl">
            <CardContent className="mt-5">
              <Image 
                src="/no-1.png"
                width={400}
                height={400}
                alt="calon-1"
                className="rounded-xl"
              />
            </CardContent>
            <CardFooter className="justify-center flex">
              <p className={`${header.className} flex justify-center font-extrabold text-4xl text-[#FFE859]`}>Flori Marvine</p>
            </CardFooter>
            <CardFooter className="justify-center flex">
              <p className={`${header.className} text-[#FFE859] font-extrabold text-xl mt-[-30px]`}>STI'23</p>
            </CardFooter>
            <CardFooter className="justify-center flex">
              <button className="text-[#FFE859] border-2 border-[#FFE859] rounded-xl flex items-center hover:bg-[#FFE859] hover:text-[#FA3A91]">
                <div className="rounded-full bg-[#FFE859] mx-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FA3A91" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
                <p className={`${body.className} mt-1 mx-2 items-center`}>pelajari lebih lanjut</p>
              </button>
            </CardFooter>
          </Card>

          <Card className="bg-[#BEEF62]">
            <CardContent className="mt-5">
              <Image 
                src="/no-1.png"
                width={400}
                height={400}
                alt="calon-1"
                className="rounded-xl"
              />
            </CardContent>
            <CardFooter className="justify-center flex">
              <p className={`${header.className} flex justify-center font-extrabold text-4xl text-[#FA3A91]`}>Kenley Widjaja</p>
            </CardFooter>
            <CardFooter className="justify-center flex">
              <p className={`${header.className} font-bold text-lg text-[#FA3A91] mt-[-30px]`}>TK'23</p>
            </CardFooter>
            <CardFooter className="justify-center flex">
              <button className="text-[#FA3A91] border-2 border-[#FA3A91] rounded-xl flex items-center hover:bg-[#FA3A91] hover:text-[#BEEF62]">
                <div className="rounded-full bg-[#FA3A91] mx-3"> 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#BEEF62" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
                <p className={`${body.className} mt-1 mx-2 items-center`}>pelajari lebih lanjut</p>
              </button>
            </CardFooter>
          </Card>

          <Card className="bg-[#FFE859]">
            <CardContent className="mt-5">
              <Image 
                src="/no-1.png"
                width={400}
                height={400}
                alt="calon-1"
                className="rounded-xl"
              />
            </CardContent>
            <CardFooter className="justify-center flex">
              <p className={`${header.className} flex justify-center font-extrabold text-4xl text-[#1B1A80]`}>Justin Widjaja</p>
            </CardFooter>
            <CardFooter className="justify-center flex">
              <p className={`${header.className} font-extrabold text-xl mt-[-30px]`}>STI'23</p>
            </CardFooter>
            <CardFooter className="justify-center flex">
              <button className="text-[#1B1A80] border-2 border-[#1B1A80] rounded-xl flex items-center justify-center hover:bg-[#1B1A80] hover:text-[#FFE859]">
                <div className="rounded-full bg-[#1B1A80] mx-1"> 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFE859" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
                <p className={`${body.className} mt-1 mx-2 items-center`}>pelajari lebih lanjut</p>
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="mt-[150px]">
        <Image 
          src="/orang-1.png"
          width={200}
          height={200}
          alt="gambarorang"
          className="absolute z-[-1] ml-[-140px] mt-[30px] md:mt-[-90px] md:w-[200px] lg:w-[250px] sm:ml-[-180px] md:ml-[-300px]"
        />
        <p className={`${header.className} font-extrabold text-6xl text-[#FA3A91]`}>Tentukan</p>
        <p className={`${header.className} font-extrabold text-6xl text-[#BEEF62]`}>Pilihanmu</p>
        <Image 
          src="/orang-2.png"
          width={275}
          height={275}
          alt="gambarorang2"
          className="absolute z-[-1] ml-[200px] overflow-hidden mt-[-170px] md:w-[350px] md:ml-[300px]"
        />
      </div>
      <div className="mt-3">
        <button className="bg-[#FFF859] text-[#FA3A91] rounded-3xl hover:bg-[#FFAAB7] hover:text-[#FFF19A]">
          <p className={`${body.className}  mx-8 my-2 text-3xl font-extrabold`}>Cara Vote</p>
        </button>
      </div>
      <div className={`${header.className} mt-[100px] font-bold text-5xl text-[#FA3A91]`}>
        LINI MASA
      </div>
      <div className="w-full h-full mt-[125px]">
        <div
          className={`ch isolate flex min-h-screen w-full flex-col justify-start gap-6 text-center`}
        >
          <div className="mt-12 flex h-auto flex-1 justify-center md:mt-0 md:items-center mb-[600px]">
            <Image 
              src="/bintanghijau.png"
              width={200}
              height={200}
              alt="bintanghijau"
              className="absolute z-[-1] ml-[-330px] sm:ml-[-400px] sm:w-[250px] sm:mt-[60px] md:mt-[-950px] md:ml-[-525px] lg:ml-[-800px] lg:mt-[-1350px] lg:w-[400px] xl:ml-[-1200px]"
            />
            <Image
              src="/background-landing2.png"
              width={700}
              height={700}
              alt="background1"
              className="absolute z-[-2] overflow-hidden w-full md:mt-[-600px]"
            />
            <Image 
              src="/bintangbiru.png"
              width={200}
              height={200}
              alt="bintanghijau"
              className="absolute z-[-1] mt-[150px] mr-[-330px] sm:mr-[-400px] sm:w-[250px] sm:mt-[350px] md:mt-[-400px] md:mr-[-525px] lg:mr-[-600px] lg:mt-[-600px] lg:w-[400px] xl:mr-[-900px] 2xl:mr-[-1200px]"
            />
            <Image 
              src="/bintangpink.png"
              width={200}
              height={200}
              alt="bintanghijau"
              className="absolute z-[-1] mt-[250px] ml-[-330px] sm:ml-[-400px] sm:w-[250px] sm:mt-[600px] md:mt-[50px] md:ml-[-525px] lg:ml-[-700px] lg:w-[400px] lg:mt-[150px] xl:ml-[-900px] 2xl:ml-[-1050px]"
            />
            <Image 
              src="/mikrofon.png"
              width={100}
              height={100}
              alt="mikrofon"
              className="absolute z-[-1] mt-[425px] ml-[-375px] lg:w-[200px]  sm:mt-[820px] sm:ml-[-500px] md:mt-[400px] md:w-[130px] md:ml-[-600px] lg:ml-[-800px] xl:ml-[-1200px] xl:mt-[550px]"
            />
            <Image 
              src="/bintangkuning.png"
              width={200}
              height={200}
              alt="bintangkuning"
              className="absolute z-[-1] mt-[400px] ml-[280px] sm:mr-[-100px] sm:w-[250px] sm:mt-[850px] md:mt-[600px] md:mr-[-210px] lg:mr-[-300px] lg:mt-[900px] lg:w-[400px]  xl:mr-[-600px] 2xl:mr-[-900px]"
            />
            <Image 
              src="/bintangbirutua.png"
              width={200}
              height={200}
              alt="bintanghijau"
              className="absolute z-[-1] mt-[525px] ml-[-310px] sm:ml-[-400px] sm:w-[250px] sm:mt-[1125px] md:mt-[1100px] md:ml-[-525px] lg:ml-[-700px] lg:mt-[1670px] lg:w-[400px] xl:ml-[-900px] 2xl:ml-[-1050px]"
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
          </div>
          <div className="w-full h-full mt-[125px]">
            <div
              className={`ch isolate flex min-h-screen w-full flex-col justify-start gap-6 text-center`}
            >
              <div className="mt-[-450px] md:mt-[-400px] flex h-auto flex-1 justify-center md:items-center mb-[700px]">
              <Image 
                  src="/bintanghijau.png"
                  width={200}
                  height={200}
                  alt="bintanghijau"
                  className="absolute z-[-1] ml-[-330px] sm:ml-[-400px] sm:w-[250px] sm:mt-[60px] md:mt-[-200px] md:ml-[-525px] lg:ml-[-800px] lg:mt-[-200px] lg:w-[400px] xl:ml-[-900px] 2xl:ml-[-1100px]"
              />
              <Image 
              src="/bintangbiru.png"
              width={200}
              height={200}
              alt="bintanghijau"
              className="absolute z-[-1] mt-[150px] mr-[-330px] sm:mr-[-400px] sm:w-[250px] sm:mt-[350px] md:mt-[375px] md:mr-[-525px] lg:mr-[-600px] lg:mt-[500px] lg:w-[400px] xl:mr-[-900px] 2xl:mr-[-1200px]"
              />
              <Image 
                src="/background-landing1.png"
                width={300}
                height={300}
                alt="background2"
                className="absolute z-[-2] w-full sm:mt-[100px] md:mt-[400px]"
              />
                <Timeline2/>
              </div>
            </div>
          </div>
          <div className="w-full h-full mt-[125px]">
            <div
              className={`ch isolate flex min-h-screen w-full flex-col justify-start gap-6 text-center`}
            >
              <div className="mt-[-700px] md:mt-[-700px] flex h-auto flex-1 justify-center md:items-center mb-[700px]">
              <Image 
                  src="/bintangpink.png"
                  width={200}
                  height={200}
                  alt="bintanghijau"
                  className="absolute z-[-1] ml-[-330px] sm:ml-[-400px] sm:w-[250px] sm:mt-[60px] md:mt-[100px] md:ml-[-525px] lg:ml-[-650px] lg:mt-[150px] lg:w-[400px] xl:ml-[-900px] 2xl:ml-[-1100px]"
              />
              <Image 
                src="/pengumuman.png"
                width={200}
                height={200}
                alt="pengumumantoa"
                className="absolute z-[-1] mr-[-250px] mt-[300px] md:mr-[-450px] md:w-[250px] md:mt-[50px] lg:w-[300px] lg:mr-[-600px] xl:mr-[-700px]"
              />
                <Timeline3/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
