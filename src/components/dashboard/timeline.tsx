import React from 'react';

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
    { date: 'October 5', description: 'Event 1: Planning the project', backgroundImage: 'url(/abstract/abstract1.svg)', textColor: 'text-blue-400', transform: 'translateX(-20%)' },
    { date: 'October 12', description: 'Event 2: Initial design and requirements', backgroundImage: 'url(/abstract/abstract2.svg)', textColor: 'text-blue-400', transform: 'translateX(10%)' },
    { date: 'October 19', description: 'Event 3: Prototyping phase begins', backgroundImage: 'url(/abstract/abstract3.svg)', textColor: 'text-blue-400', transform: 'translateX(-10%)' },
    { date: 'October 26', description: 'Event 4: Mid-project review and adjustments', backgroundImage: 'url(/abstract/abstract4.svg)', textColor: 'text-blue-400', transform: 'translateX(10%)' },
    { date: 'November 2', description: 'Event 5: Beta testing starts', backgroundImage: 'url(/abstract/abstract5.svg)', textColor: 'text-blue-400', transform: 'translateX(-10%)' },
    { date: 'November 16', description: 'Event 6: Final review and QA', backgroundImage: 'url(/abstract/abstract1.svg)', textColor: 'text-blue-400', transform: 'translateX(10%)' },
    { date: 'November 23', description: 'Event 7: Release candidate ready', backgroundImage: 'url(/abstract/abstract2.svg)', textColor: 'text-blue-400', transform: 'translateX(-10%)' },
    { date: 'December 1', description: 'Event 8: Project deployment and wrap-up', backgroundImage: 'url(/abstract/abstract3.svg)', textColor: 'text-blue-400', transform: 'translateX(10%)' },
  ];

  return (
    <div className="relative w-[440px] sm:w-full py-4 my-2"> {/* Reduce padding at the bottom */}
      {/* Middle white line with dots */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 sm:w-2 h-[105%] bg-white my-[4px]">
        <div className="absolute -top-6  left-1/2 transform -translate-x-1/2 w-8 h-8 border-8 border-white rounded-full"></div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-8 border-8 border-white rounded-full"></div>
      </div>

      {/* Starting month */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-12 px-4 py-2 text-black font-bold rounded-full">
        October
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
              <div className='flex flex-col w-full'>
                <h3 className="font-bold text-[12px]">{event.date}</h3>
                <p className='text-[10px]'>{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ending month */}
      <div className="absolute mt-24 sm:mt-[150px] lg:mt-[200px] left-1/2 transform -translate-x-1/2 px-4 py-2 text-black font-bold rounded-full">
        December
      </div>
    </div>
  );
};

export default Timeline;
