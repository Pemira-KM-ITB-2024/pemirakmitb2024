import { useEffect, useState } from "react";
import { header } from "~/styles/fonts";

const Countdown = () => {
  const now = new Date();
  const electionDate = new Date("2024-03-13T07:00:00+07:00");
  const [timeLeft, setTimeLeft] = useState(
    Math.floor((electionDate.getTime() - now.getTime()) / 1000),
  );
  const getTimeLeft = {
    days: (Math.floor(timeLeft / (60 * 60 * 24)) >= 0 ? Math.floor(timeLeft / (60 * 60 * 24)) : 0)
      .toString()
      .padStart(2, "0"),
    hours: (Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60)) >= 0 ? Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60)) : 0)
      .toString()
      .padStart(2, "0"),
    minutes: (Math.floor((timeLeft % (60 * 60)) / 60) >= 0 ? Math.floor((timeLeft % (60 * 60)) / 60) : 0)
      .toString()
      .padStart(2, "0"),
    seconds: Math.floor(timeLeft % 60),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);
  return (
    <div className={`gap-20 md:flex mx-auto space-y-2 md:text-sm text-xs`}>
      <div className="space-y-2">
        <div className="flex gap-2 leading-none ">
          <Com str={getTimeLeft.days[0]} />
          <Com str={getTimeLeft.days[1]} />
        </div>
        <div className={`${header.className}`}>Days</div>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2 leading-none">
          <Com str={getTimeLeft.hours[0]} />
          <Com str={getTimeLeft.hours[1]} />
        </div>
        <div className={`${header.className}`}>Hours</div>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2 leading-none">
          <Com str={getTimeLeft.minutes[0]} />
          <Com str={getTimeLeft.minutes[1]} />
        </div>
        <div className={`${header.className}`}>Minutes</div>
      </div>
    </div>
  );
};

export default Countdown;

const Com = ({ str }: { str?: string }) => {
  const before =
    "before:absolute before:bg-gradient-to-b before:from-brown-2 before:rounded before:to-brown-1 before:from-50% before:w-full before:h-1/2 before:md:rounded-b-xl before:border-t before:border-brown-5 before:bottom-0";
  const after = "";
  return (
    <div
      className={` ${before} ${after} relative flex flex-col items-center justify-center border border-brown-5 bg-gradient-to-b from-brown-1 from-15% to-brown-2 md:py-5 py-3 drop-shadow-lg w-14 md:w-24 md:rounded-xl text-4xl rounded md:text-7xl`}
    >
      <div className="relative w-full overflow-hidden h-[3.5rem] md:h-[5.25rem]">
        <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {str}
        </div>
      </div>
    </div>
  );
};
