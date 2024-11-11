import React from 'react';
import { body } from "@fonts";

interface TimelineEvent {
  date: string;
  description: string;
  backgroundImage: string;
  textColor: string;
  transform: string; // Add transform property
}

const Timeline: React.FC = () => {
  // Hardcoded events data
  const events: TimelineEvent[] = [
    { date: '2 Desember 2024', description: 'debat', backgroundImage: 'url(/abstract/abstract3.svg)', textColor: 'text-blue-400', transform: 'translateX(-10%)' },
  ];

  return (
    <div className="relative w-[440px] sm:w-full py-4 my-2"> {/* Reduce padding at the bottom */}
      {/* Middle white line with dots */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 sm:w-2 h-[105%] bg-white my-[4px]">
        <div className="absolute -top-6  left-1/2 transform -translate-x-1/2 w-8 h-8 border-8 border-white rounded-full"></div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-8 border-8 border-white rounded-full"></div>
      </div>

      {/* Starting month */}
      <div className={`${body.className} text-xl md:text-3xl absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-12 px-4 py-2 text-white font-bold rounded-full`}>
        Desember
      </div>

      {/* Timeline events */}
      <div className="">
        {events.map((event, index) => (
          <div
            key={index}
            className={`flex justify-between items-center w-full -mb-[50px] sm:-mb-[100px] lg:-mb-[160px] ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`} // Apply negative margin for overlap
          >
            {/* Date and description box */}
            <div 
              className={`text-white p-2 flex items-center justify-center w-[180px] h-[180px] sm:w-[360px] sm:h-[360px] lg:w-[540px] lg:h-[540px] ${event.textColor}`}
              style={{ 
                backgroundImage: event.backgroundImage, 
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center', 
                transform: event.transform, // Use transform from event data
              }}
            >
              <div className='flex flex-col w-full text-white'>
                <h3 className={`${body.className} font-extrabold text-lg`}>{event.date}</h3>
                <p className={`${body.className} text-md font-bold`}>{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/*PEMBATAS*/}
      <div className={`${body.className} text-xl md:text-3xl absolute mt-[600px] sm:mt-[600px] md:mt-[150px] lg:mt-[200px] left-1/2 transform -translate-x-1/2 px-4 py-2 text-white font-bold mb-[150px]`}>
        To Be Announced...
      </div>
      
    </div>
    
  );
};

export default Timeline;