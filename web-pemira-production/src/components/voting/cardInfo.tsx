import Image from "next/image";
import { body } from "~/styles/fonts";

interface CardInfoProps {
  name: string;
  jurusan: string;
  angkatan: string;
  visi: string;
  moto: string;
  photoSrc: string;
}

const CardInfo = ({
  name,
  jurusan,
  angkatan,
  visi,
  moto,
  photoSrc,
}: CardInfoProps) => {
  return (
    <div className=" relative flex w-full rounded-xl border-[3px] border-red-5 shadow-lg shadow-black/25 ">
      <div className="flex w-full xl:max-w-[6.75rem] md:max-w-24 flex-1 items-center justify-center bg-brown-1 rounded-l-lg">
        <Image
          src={photoSrc}
          alt="calon"
          width={150}
          height={150}
          className="flex-1 border-y border-red-3 rounded-lg shadow-lg shadow-oren/40"
        />
      </div>
      <div
        className={`${body.className} *:text-center flex flex-1 flex-col rounded-br-xl rounded-tr-xl bg-brown-1 text-center text-red-5 py-[calc(.25rem+.75vh)] border-l-2 border-red-4`}
      >
        <Image
          src="/bintang/16.png"
          alt="bintang"
          width={70}
          height={70}
          className="absolute -left-8 -top-8 rotate-45"
        />
        <h1 className="text-xl">{name}</h1>
        {/* <p className="text-sm">{`${jurusan}'${angkatan}`}</p> */}
        <p className="text-xs">{visi}</p>
        <div className="flex-1"></div>
        <p className="text-xs">{moto}</p>
      </div>
    </div>
  );
};

export default CardInfo;
