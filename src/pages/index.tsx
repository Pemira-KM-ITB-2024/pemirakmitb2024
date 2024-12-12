import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/ui/card";
import { body,header } from "@fonts"
import Timeline from "~/components/dashboard/timeline";
import Link from "next/link";
import { Description } from "@radix-ui/react-dialog";

const Countdown = dynamic(() => import("~/components/countdown"), {
  ssr: false,
});

const events1 = [
  { date: '16-18 Desember 2024', description: 'Open Berkas' },
  { date: '19-21 Desember 2024', description: 'Pengambilan Berkas' },
];

const events2 = [
  { date: '17 Februari 2025', description: 'Verifikasi Berkas' },
  { date: '18 Februari 2025', description: 'Pembekalan Calon K3M dan Calon MWA-WM ITB' },
  { date: '19-28 Februari 2025', description: 'Hearing Zona dan Hearing by Request'},
  { date: '1-2 Maret 2025', description: 'Debat dan Uji Panelis' },
]

const events3 = [
  { date: '19 Maret 2025', description: 'Perhitungan Suara' },
  { date: '20 Maret 2025', description: 'Pengumuman Hasil Perhitungan Suara' },
]

export default function Home() {
  return (
    <div className="relative z-0 flex flex-col items-center w-full min-h-screen overflow-hidden">
      <section className="w-full flex flex-col items-center justify-center h-fit my-[8vw]">
        <div className="relative w-[80%] h-[40vw] lg:h-[20vw] flex items-center justify-center">
          <Image 
            src="/landing-logo.svg"
            layout="fill"
            objectFit="contain"
            alt="Gambar Pemira"
            className="absolute z-[-1]"
          />
          <div className="bottom-0 absolute w-[70%] lg:h-[3vw] h-[6vw]">
            <Image 
              src="/landing-text.svg"
              layout="fill"
              objectFit="contain"
              alt="Gambar Pemira"
              className="absolute z-[-1]"
            />
          </div>
        </div>
        
        {/* <div className="absolute bottom-0 flex-row items-center text-center max-w-[80%] tracking-widest">
          <h3 className={`${header.className} justify-center flex font-bold text-[36px] text-[#FFF859] w-full`}>
            Pemilihan Ketua Kabinet KM ITB dan <br/> MAJELIS WALI AMANAT WAKIL MAHASISWA ITB 
          </h3>
        </div> */}
        {/* <div className="w-full snap-center mt-[-180px] md:mt-[-150px]">
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
        </div> */}
      </section>
      {/* <section className="w-full snap-center flex items-center justify-center">
        <div
          className={`ch isolate flex mt-[240px] h-fit w-[80%] flex-col justify-center gap-6 text-center`}
        >
          <Countdown />
        </div>
      </section> */}
      {/* <h1 className={`${header.className} text-center items-center flex text-6xl text-[#FA3A91] font-extrabold mt-[-150px]`}>
        CALON K3M
      </h1>
      <div className="w-[80%] overflow-x-auto flex justify-start md:justify-center gap-x-6 px-4">
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

          <Card className="bg-[#FFE859]"
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
      </div> */}
      {/* <section className="my-[120px]">
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
      </section> */}
      {/* forsos */}
      <section className="w-[80%] my-[8vw] flex flex-col items-center justify-center">
        <div className={`${header.className} font-bold text-3xl md:text-5xl text-[#FA3A91] flex items-center justify-center text-center`}>
          FORUM SOSIALISASI
        </div>
        <div className="flex flex-row justify-center items-center gap-4 mt-6">
          <Link href={"/forsos"}>
            <button className="bg-[#FFF859] text-[#FA3A91] rounded-3xl hover:bg-[#FA3A91] hover:text-[#FFF859]">
              <p className={`${body.className} mx-4 md:mx-8 my-2 text-xs md:text-3xl font-extrabold leading-2`}>Materi Forsos</p>
            </button>
          </Link>
          <Link href="https://bit.ly/NotulForSas" target="_blank">
            <button className="bg-[#FFF859] text-[#FA3A91] rounded-3xl hover:bg-[#FA3A91] hover:text-[#FFF859]">
              <p className={`${body.className} mx-4 md:mx-8 my-2 text-xs md:text-3xl font-extrabold`}>Notulensi Forsos</p>
            </button>
          </Link>
        </div>
      </section>

      <section className="my-[8vw] w-full flex flex-col justify-center items-center">
        <div className={`${header.className} font-bold text-3xl md:text-5xl text-[#FA3A91]`}>
          LINI MASA
        </div>
        <div className="w-[80%] h-full mt-[60px] md:mt-[100px]">
          <div
            className={`relative ch isolate flex min-h-screen w-full flex-col justify-start gap-6 text-center`}
          >
            <div className="mt-12 flex flex-col h-auto flex-1 justify-center md:mt-0 mb-[240px] md:mb-[440px]">
              <Image
                src="/background-landing2.png"
                width={700}
                height={700}
                alt="background1"
                className="absolute z-[-2] overflow-hidden w-full md:mt-[-2000px] scale-125"
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
              <Timeline events={events1} month="Desember 2024"/>
              <div className="mt-[20vw] mb-[10vw]">
                <h1 className="font-bold text-white text-[36px] sm:text-[54px] md:text-[78px] lg:text-[100px] xl:text-[128px] leading-[1]">Pengembalian Berkas</h1>
                <p className="-mt-[1.5vw] text-[#FA3A91] font-bold md:text-[28px] lg:text-[36px] xl:text-[48px]">17 Februari 2025</p>
              </div>
              <Timeline events={events2} endingMonthState={true} showCircle={true}/>
              <div className="mt-[20vw] mb-[10vw]">
                <h1 className="font-bold text-white text-[36px] sm:text-[54px] md:text-[78px] lg:text-[100px] xl:text-[128px] leading-[1]">Pemungutan Suara</h1>
                <p className="-mt-[1.5vw] text-[#FA3A91] font-bold md:text-[28px] lg:text-[36px] xl:text-[48px]">10-18 Maret 2025</p>
              </div>
              <Timeline events={events3} endingMonth="Maret 2025" endingMonthState={true} showCircle={true}/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
