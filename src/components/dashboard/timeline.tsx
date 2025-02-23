import React from 'react';

interface TimelineEvent {
  date: string;
  description: string;
}

interface TimelineProps {
  showCircle?: boolean;
  showTurn?: boolean;
  month?: string;
  endingMonthState?: boolean;
  endingMonth?: string;
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({
  showCircle = true,
  showTurn = false,
  month,
  endingMonthState = false,
  endingMonth,
  events
}) => {
  return (
    <div className="relative w-full min-h-[100px] px-8">
      {/* Desktop: 2 rows */}
      <div className="hidden md:block">
        {/* First row */}
        <div className="relative px-8">
          <div className="absolute left-10 right-5 top-5 h-1 bg-[#e9e84f]" />
          <div className="relative pt-4">
            {events.slice(0, 5).map((event, index) => (
              <div key={index} className="absolute" style={{ left: `${(index * 100) / (Math.min(events.length, 5) - 1)}%` }}>
                 <div className="w-4 h-4 border-4 border-[#e9e84f] rounded-full bg-[#e9e84f]" />
                 <div className="absolute mt-[-22px] left-[-7px] w-7 h-7 border-4 border-[#e9e84f] rounded-full bg-transparent" />
                <div className="absolute mt-4 -translate-x-1/2 min-w-[120px]">
                  <p className="text-[#FA3A91] text-sm font-bold">{event.date}</p>
                  <p className="text-white text-sm font-bold mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-1 absolute w-[62.5px] h-[125px] border-r-4 border-[#e9e84f] rounded-r-full bg-transparent right-[-10px] overflow-hidden">
          <div className="w-[125px] h-[125px] border-4 border-[#e9e84f] rounded-full bg-transparent translate-x-[-50%]" />
        </div>

        {/* Second row */}
        <div className="relative px-8">
          <div className="absolute left-10 right-5 mt-[25px] h-1 bg-[#e9e84f]" />
          <div className="relative pt-4 mt-[100px]">
            {events.slice(5, 10).reverse().map((event, index) => (
              <div key={index} className="absolute" style={{ left: `${(index * 100) / (Math.min(events.length, 5) - 1)}%` }}>
                <div className="w-4 h-4 border-4 border-[#e9e84f] rounded-full bg-[#e9e84f]" />
                <div className="absolute mt-[-22px] left-[-7px] w-7 h-7 border-4 border-[#e9e84f] rounded-full bg-transparent" />
                <div className="absolute mt-4 -translate-x-1/2 min-w-[120px]">
                  <p className="text-[#FA3A91] text-sm font-bold">{event.date}</p>
                  <p className="text-white text-sm font-bold mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: 3 rows */}
      <div className="block md:hidden">
        {/* First row */}
        <div className="relative ">
          <div className="absolute left-3 right-[-3px] top-5 h-1 bg-[#e9e84f]" />
          <div className="relative pt-4">
            {events.slice(0, 4).map((event, index) => (
              <div key={index} className="absolute" style={{ left: `${(index * 100) / 3}%` }}>
                <div className="w-4 h-4 border-4 border-[#e9e84f] rounded-full bg-[#e9e84f]" />
                <div className="absolute mt-[-22px] left-[-7px] w-7 h-7 border-4 border-[#e9e84f] rounded-full bg-transparent" />

                <div className="absolute mt-4 -translate-x-1/2 min-w-[120px]">
                  <p className="text-[#FA3A91] text-sm font-bold">{event.date}</p>
                  <p className="text-white text-sm font-bold mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-1 absolute w-[62.5px] h-[125px] border-r-4 border-[#e9e84f] rounded-r-full bg-transparent right-[-45px] overflow-hidden">
          <div className="w-[125px] h-[125px] border-4 border-[#e9e84f] rounded-full bg-transparent translate-x-[-50%]" />
        </div>

        {/* Second row */}
        <div className="relative">
          <div className="absolute left-3 right-[-3px] mt-[22px] h-1 bg-[#e9e84f]" />
          <div className="relative pt-4 mt-[100px]">
            {events.slice(4, 7).map((event, index) => (
              <div key={index} className="absolute" style={{ left: `${(index * 100) / 2}%` }}>
                <div className="w-4 h-4 border-4 border-[#e9e84f] rounded-full bg-[#e9e84f]" />
                <div className="absolute mt-[-22px] left-[-7px] w-7 h-7 border-4 border-[#e9e84f] rounded-full bg-transparent" />
                <div className="absolute mt-4 -translate-x-1/2 min-w-[120px]">
                  <p className="text-[#FA3A91] text-sm font-bold">{event.date}</p>
                  <p className="text-white text-sm font-bold mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-1 absolute w-[62.5px] h-[125px] bg-transparent left-[-28px] overflow-hidden">
          <div className="w-[125px] h-[125px] border-4 border-[#e9e84f] rounded-full bg-transparent" />
        </div>


        {/* Third row */}
        <div className="relative">
          <div className="absolute left-3 right-[-3px] mt-[23px] h-1 bg-[#e9e84f]" />
          <div className="relative pt-4 mt-[100px]">
            {events.slice(7, 9).map((event, index) => (
              <div key={index} className="absolute" style={{ left: `${(index * 100) / 1}%` }}>
                <div className="w-4 h-4 border-4 border-[#e9e84f] rounded-full bg-[#e9e84f]" />
                <div className="absolute mt-[-22px] left-[-7px] w-7 h-7 border-4 border-[#e9e84f] rounded-full bg-transparent" />
                <div className="absolute mt-4 -translate-x-1/2 min-w-[120px]">
                  <p className="text-[#FA3A91] text-sm font-bold">{event.date}</p>
                  <p className="text-white text-sm font-bold mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-1 absolute w-[62.5px] h-[125px] border-r-4 border-[#e9e84f] rounded-r-full bg-transparent right-[-45px] overflow-hidden">
          <div className="w-[125px] h-[125px] border-4 border-[#e9e84f] rounded-full bg-transparent translate-x-[-50%]" />
        </div>

        <div className="relative">
          <div className="relative pt-4 mt-[100px]">
            {events.slice(9, 10).reverse().map((event, index) => (
              <div key={index} className="absolute right-[-15px]">
                <div className="w-4 h-4 border-4 border-[#e9e84f] rounded-full bg-[#e9e84f]" />
                <div className="absolute mt-[-22px] left-[-7px] w-7 h-7 border-4 border-[#e9e84f] rounded-full bg-transparent" />
                <div className="absolute mt-4 -translate-x-1/2 min-w-[120px]">
                  <p className="text-[#FA3A91] text-sm font-bold">{event.date}</p>
                  <p className="text-white text-sm font-bold mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;