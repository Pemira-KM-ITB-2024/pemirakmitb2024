import React from "react";

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
  events,
}) => {
  return (
    <div className="relative min-h-[100px] w-full pl-4 pr-8">
      {/* Desktop: 2 rows */}
      <div className="hidden md:block">
        {/* First row */}
        <div className="relative px-8">
          <div className="absolute left-10 right-5 top-5 h-1 bg-[#e9e84f]" />
          <div className="relative pt-4">
            {events.slice(0, 5).map((event, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  left: `${(index * 100) / (Math.min(events.length, 5) - 1)}%`,
                }}
              >
                <div className="h-4 w-4 rounded-full border-4 border-[#e9e84f] bg-[#e9e84f]" />
                <div className="absolute left-[-6px] mt-[-22px] h-7 w-7 rounded-full border-4 border-[#e9e84f] bg-transparent" />
                <div className="absolute ml-2 mt-4 min-w-[120px] -translate-x-1/2">
                  <p className="text-xs font-bold text-[#FA3A91]">
                    {event.date}
                  </p>
                  <p className="mt-1 text-xs font-bold text-white">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-[-10px] mt-1 h-[122px] w-[62.5px] overflow-hidden rounded-r-full border-r-4 border-[#e9e84f] bg-transparent">
          <div className="h-[122px] w-[125px] translate-x-[-50%] rounded-full border-4 border-[#e9e84f] bg-transparent" />
        </div>

        {/* Second row */}
        <div className="relative px-8">
          <div className="absolute left-10 right-5 mt-[25px] h-1 bg-[#e9e84f]" />
          <div className="relative mt-[100px] pt-4">
            {events
              .slice(5, 10)
              .reverse()
              .map((event, index) => (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${
                      (index * 100) / (Math.min(events.length, 5) - 1)
                    }%`,
                  }}
                >
                  <div className="h-4 w-4 rounded-full border-4 border-[#e9e84f] bg-[#e9e84f]" />
                  <div className="absolute left-[-6px] mt-[-22px] h-7 w-7 rounded-full border-4 border-[#e9e84f] bg-transparent" />
                  <div className="absolute ml-2 mt-4 min-w-[120px] -translate-x-1/2">
                    <p className="text-xs font-bold text-[#FA3A91]">
                      {event.date}
                    </p>
                    <p className="mt-1 text-xs font-bold text-white">
                      {event.description}
                    </p>
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
            {events.slice(0, 3).map((event, index) => (
              <div
                key={index}
                className="absolute"
                style={{ left: `${(index * 100) / 2}%` }}
              >
                <div className="h-4 w-4 rounded-full border-4 border-[#e9e84f] bg-[#e9e84f]" />
                <div className="absolute left-[-6px] mt-[-22px] h-7 w-7 rounded-full border-4 border-[#e9e84f] bg-transparent" />

                <div className="absolute ml-2 mt-4 min-w-[100px] -translate-x-1/2">
                  <p className="text-xs font-bold text-[#FA3A91]">
                    {event.date}
                  </p>
                  <p className="mt-1 text-xs font-bold text-white">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-[-45px] mt-1 h-[122px] w-[62.5px] overflow-hidden rounded-r-full border-r-4 border-[#e9e84f] bg-transparent">
          <div className="h-[122px] w-[125px] translate-x-[-50%] rounded-full border-4 border-[#e9e84f] bg-transparent" />
        </div>

        {/* Second row */}
        <div className="relative">
          <div className="absolute left-3 right-[-3px] mt-[22px] h-1 bg-[#e9e84f]" />
          <div className="relative mt-[100px] pt-4">
            {events.slice(3, 6).reverse().map((event, index) => (
              <div
                key={index}
                className="absolute"
                style={{ left: `${(index * 100) / 2}%` }}
              >
                <div className="h-4 w-4 rounded-full border-4 border-[#e9e84f] bg-[#e9e84f]" />
                <div className="absolute left-[-6px] mt-[-22px] h-7 w-7 rounded-full border-4 border-[#e9e84f] bg-transparent" />
                <div className="absolute ml-2 mt-4 min-w-[100px] -translate-x-1/2">
                  <p className="text-xs font-bold text-[#FA3A91]">
                    {event.date}
                  </p>
                  <p className="mt-1 text-xs font-bold text-white">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-[-45px] mt-[6px] h-[122px] w-[62.5px] overflow-hidden bg-transparent">
          <div className="h-[122px] w-[125px] rounded-full border-4 border-[#e9e84f] bg-transparent" />
        </div>

        {/* Third row */}
        <div className="relative">
          <div className="absolute left-3 right-[-3px] mt-[23px] h-1 bg-[#e9e84f]" />
          <div className="relative mt-[100px] pt-4">
            {events.slice(6, 9).map((event, index) => (
              <div
                key={index}
                className="absolute"
                style={{ left: `${(index * 100) / 2}%` }}
              >
                <div className="h-4 w-4 rounded-full border-4 border-[#e9e84f] bg-[#e9e84f]" />
                <div className="absolute left-[-6px] mt-[-22px] h-7 w-7 rounded-full border-4 border-[#e9e84f] bg-transparent" />
                <div className="absolute ml-2 mt-4 min-w-[100px] -translate-x-1/2">
                  <p className="text-xs font-bold text-[#FA3A91]">
                    {event.date}
                  </p>
                  <p className="mt-1 text-xs font-bold text-white">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-[-45px] mt-2 h-[118px] w-[62.5px] overflow-hidden rounded-r-full border-r-4 border-[#e9e84f] bg-transparent">
          <div className="h-[118px] w-[125px] translate-x-[-50%] rounded-full border-4 border-[#e9e84f] bg-transparent" />
        </div>

        <div className="relative">
          <div className="relative mt-[100px] pt-4">
            {events
              .slice(9, 10)
              .reverse()
              .map((event, index) => (
                <div key={index} className="absolute right-[-15px]">
                  <div className="h-4 w-4 rounded-full border-4 border-[#e9e84f] bg-[#e9e84f]" />
                  <div className="absolute left-[-6px] mt-[-22px] h-7 w-7 rounded-full border-4 border-[#e9e84f] bg-transparent" />
                  <div className="absolute ml-2 mt-4 min-w-[100px] -translate-x-1/2">
                    <p className="text-xs font-bold text-[#FA3A91]">
                      {event.date}
                    </p>
                    <p className="mt-1 text-xs font-bold text-white">
                      {event.description}
                    </p>
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