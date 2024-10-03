import { type ReactNode } from 'react';
import { header } from "~/styles/fonts";

const GuideVote = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1
        className={`${header.className} z-[1] text-4xl text-oren shadow-teal-4 text-shadow text-stroke-width-1 text-stroke-color-cream`}
      >
        Guide Voting
      </h1>
      <div className="isolate mt-10 flex w-[80vw] flex-col rounded-xl bg-teal-1 p-4 md:w-[60vw] md:flex-row ">
        <div className="flex-container flex-1">
          <ol className="list-inside text-sm text-black *:rounded">
            <Li>
              1. Sebelum vote, pastiin dulu buat baca-baca seputar para calon
              yaaa. <span className="text-red-600">Jangan asal vote!</span>
            </Li>
            <Li>
              2. Kalo udah baca, langsung dateng ke TPS sesuai dengan lokasi
              multikampus kamu yaa!!
            </Li>
            <Li>
              3. Jangan lupa bawa <span className="text-red-600">KTM asli</span>{" "}
              sebagai bukti identitas, jangan sampe ga bawa!
            </Li>
            <Li>
              4. Ikuti arahan panitia di TPS, tunjukin KTM, dan minta{" "}
              <span className="text-red-600">token unik</span> buat vote.
            </Li>
            <Li>
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
            </Li>
            <Li>
              6. Voting harus dilakukan secepatnya, jangan sampe habis waktu yaa
              karena token hanya berlaku{" "}
              <span className="text-red-600">1.5 menit!!</span>
            </Li>
          </ol>
        </div>
        <div className="flex items-center justify-center p-4">
          <p className="text-white md:text-2xl">#GERAKINKLUSIF</p>
        </div>
      </div>
    </div>
  );
};

const Li = ({children}: {children?: ReactNode}) => {
  return (
    <li className="m-2 mb-3 min-h-[30px] flex-grow bg-white p-1.5 sm:min-w-[250px] ">
      {children}
    </li>
  );
}

export default GuideVote;
