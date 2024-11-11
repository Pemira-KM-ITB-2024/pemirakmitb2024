import { header } from "@fonts";

import React from "react";

const Countdown = () => {
  return (
    <div className={`flex justify-center gap-8 md:gap-20 ${header.className}`}>
      <div className="flex flex-col items-center">
        <div className="text-[44px] text-white md:text-6xl lg:text-9xl">62</div>
        <div className="text-[11px] text-white md:text-base lg:text-xl">
          HARI
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-[44px] text-white md:text-6xl lg:text-9xl">13</div>
        <div className="text-[11px] text-white md:text-base lg:text-xl">
          JAM
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-[44px] text-white md:text-6xl lg:text-9xl">59</div>
        <div className="text-[11px] text-white md:text-base lg:text-xl">
          MENIT
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-[44px] text-white md:text-6xl lg:text-9xl">48</div>
        <div className="text-[11px] text-white md:text-base lg:text-xl">
          DETIK
        </div>
      </div>
    </div>
  );
};

export default Countdown;