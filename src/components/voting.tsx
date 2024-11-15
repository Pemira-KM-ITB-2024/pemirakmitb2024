import Image from "next/image";
import bintang from "../../public/guidevoting/bintang.png";
import orang from "../../public/guidevoting/orang.png";
import kamera from "../../public/guidevoting/kamera.png";
import { anisette, clashDisplay } from "~/styles/fonts";

const GuideVote = () => {
  return (
    <div className="relative w-full h-[600px] lg:min-h-screen overflow-auto lg:overflow-hidden">  
      <div className="lg:absolute lg:-top-20 lg:right-0 lg:w-[450px] absolute w-[96px] right-0 -top-4">
        <Image src={bintang} alt="Star" layout="responsive"/>
      </div>

      <div className="lg:absolute lg:bottom-0 z-10 lg:left-40 lg:w-[350px] lg:h-[375px] lg:rotate-6 absolute top-14 right-2 w-[80px] h-[96px] rotate-6 lg:opacity-0 opacity-85">
        <Image src={kamera} alt="Person" layout="responsive" />
      </div>

      <div className="lg:absolute lg:w-[50%] lg:px-4 lg:left-96 lg:top-8 absolute top-8">
        <div className="lg:flex lg:flex-row lg:justify-start flex flex-row justify-center">
          <h1
            className={`${anisette.variable} text-3xl md:text-4xl lg:text-6xl font-bold text-[#FA3A91] [text-shadow:_4px_4px_0_rgb(0_0_0_/_80%)] -skew-x-12 mr-2 lg:mr-4 mt-4 sm:mt-8 md:mt-16 lg:mt-32`}
          >
            GUIDE
          </h1>
          <h1
            className={`${anisette.variable} text-3xl md:text-4xl lg:text-6xl font-bold text-[#FA3A91] [text-shadow:_4px_4px_0_rgb(0_0_0_/_80%)] skew-x-12 ml-2 lg:ml-4 mt-4 sm:mt-8 md:mt-16 lg:mt-32`}
          >
            VOTING
          </h1>
        </div>
        <div className="bg-[#3957D1] bg-opacity-40 lg:p-6 lg:mx-0 lg:mt-0 lg:mb-0 lg:rounded-lg lg:pr-[1000px] lg:overflow-x-auto lg:w-[2000px] p-4 mx-8 mt-2 mb-8 rounded-2xl">
          <ol
            className={`${clashDisplay.variable} text-sm sm:text-base md:text-lg lg:text-xl text-white font-extralight lg:py-4`}
          >
            <li className="mb-2">
              1. Sebelum vote, pastiin dulu buat baca-baca seputar para calon
              yaaa. <span className="text-red-600">Jangan asal vote!</span>
            </li>
            <li className="mb-2">
              2. Kalo udah baca, langsung dateng ke TPS sesuai dengan lokasi
              multikampus kamu yaa!!
            </li>
            <li className="mb-2">
              3. Jangan lupa bawa <span className="text-red-600">KTM asli</span>{" "}
              sebagai bukti identitas, jangan sampe ga bawa!
            </li>
          </ol>
          <ol
            className={`${clashDisplay.variable} text-sm sm:text-base md:text-lg lg:text-xl text-white font-extralight lg:ml-20 mt-4 lg:mt-0`}
          >
            <li className="mb-2">
              4. Ikuti arahan panitia di TPS, tunjukin KTM, dan minta{" "}
              <span className="text-red-600">token unik</span> buat vote.
            </li>
            <li className="mb-2">
              5. Bagian terpenting, langsung vote sesuai urutan pilihan kamu di{" "}
              <span className="text-red-600">
                laptop yang udah disediain panitia
              </span>
              . Dari yang paling cocok sampe yang paling ga cocok menurut kamu.
              Perhatiin bahwa kamu juga{" "}
              <span className="text-red-600">
                boleh milih hanya 1 atau 2 calon
              </span>{" "}
              atau bahkan kotak kosong aja.
            </li>
            <li className="mb-2">
              6. Voting harus dilakukan secepatnya, jangan sampe habis waktu yaa
              karena token hanya berlaku{" "}
              <span className="text-red-600">1.5 menit!!</span>
            </li>
          </ol>
        </div>
      </div>

      <div className="lg:absolute lg:bottom-0 lg:left-40 lg:w-[350px] lg:h-[375px] lg:rotate-6 absolute top-[470px] left-2 w-[80px] h-[96px] rotate-6 lg:opacity-100 opacity-60">
        <Image src={orang} alt="Person" layout="responsive" />
      </div>
    </div>
  );
};

export default GuideVote;
