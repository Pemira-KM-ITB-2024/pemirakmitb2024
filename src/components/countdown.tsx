"use client";

import { useEffect, useState } from "react";
import { header } from "@fonts";

const Countdown = () => {
  const electionDate = new Date("2024-12-25T00:00:00+07:00");
  const [timeLeft, setTimeLeft] = useState(
    Math.floor((electionDate.getTime() - new Date().getTime()) / 1000),
  );

  const getTimeLeft = {
    days: Math.max(0, Math.floor(timeLeft / (60 * 60 * 24)))
      .toString()
      .padStart(2, "0"),
    hours: Math.max(0, Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60)))
      .toString()
      .padStart(2, "0"),
    minutes: Math.max(0, Math.floor((timeLeft % (60 * 60)) / 60))
      .toString()
      .padStart(2, "0"),
    seconds: Math.max(0, timeLeft % 60)
      .toString()
      .padStart(2, "0"),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex justify-between ${header.className}`}>
      <div className="flex flex-col items-center">
        <div className="text-[52px] sm:text-[82px] lg:text-9xl text-white">{getTimeLeft.days}</div>
        <div className="sm:text-[16px] lg:text-xl text-white">HARI</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-[52px] sm:text-[82px] lg:text-9xl text-white">{getTimeLeft.hours}</div>
        <div className="sm:text-[16px] lg:text-xl text-white">JAM</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-[52px] sm:text-[82px] lg:text-9xl text-white">{getTimeLeft.minutes}</div>
        <div className="sm:text-[16px] lg:text-xl text-white">MENIT</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-[52px] sm:text-[82px] lg:text-9xl text-white">{getTimeLeft.seconds}</div>
        <div className="sm:text-[16px] lg:text-xl text-white">DETIK</div>
      </div>
    </div>
  );
};

export default Countdown;
