import { header } from "@fonts";

const Countdown = () => {
  return (
    <div className={`flex justify-center gap-20 ${header.className}`}>
      <div className="flex flex-col items-center">
        <div className="text-9xl text-white">62</div>
        <div className="text-xl text-white">HARI</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-9xl text-white">13</div>
        <div className="text-xl text-white">JAM</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-9xl text-white">59</div>
        <div className="text-xl text-white">MENIT</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-9xl text-white">48</div>
        <div className="text-xl text-white">DETIK</div>
      </div>
    </div>
  );
};

export default Countdown;
