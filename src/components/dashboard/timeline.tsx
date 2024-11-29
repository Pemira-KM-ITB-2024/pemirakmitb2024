import React from 'react';

interface TimelineEvent {
  date: string;
  description: string;
  backgroundImage: string;
  textColor: string;
  transform: string; // Add transform property
}
interface TimelineProps {
  showCircle?: boolean;
  month?: string;
  endingMonthState?: boolean;
  endingMonth?: string;
}


const Timeline: React.FC<TimelineProps> = ({ showCircle = true, month, endingMonthState = false, endingMonth}) => {
  // Hardcoded events data
  const events: TimelineEvent[] = [
    { date: '14 Oktober 2024', description: 'Wall of Aspiration', backgroundImage: 'url(/abstract/abstract1.svg)', textColor: 'text-blue-400', transform: 'translateX(-20%)' },
    { date: '15 Oktober 2024', description: 'Orasi Pensu', backgroundImage: 'url(/abstract/abstract2.svg)', textColor: 'text-blue-400', transform: 'translateX(10%)' },
    { date: 'October 19', description: 'Prototyping phase begins', backgroundImage: 'url(/abstract/abstract3.svg)', textColor: 'text-blue-400', transform: 'translateX(-10%)' },
    { date: 'October 26', description: 'review and adjustments', backgroundImage: 'url(/abstract/abstract4.svg)', textColor: 'text-blue-400', transform: 'translateX(15%)' },
    { date: 'November 2', description: 'Beta testing starts', backgroundImage: 'url(/abstract/abstract5.svg)', textColor: 'text-blue-400', transform: 'translateX(-20%)' },
    { date: 'November 16', description: 'review and QA', backgroundImage: 'url(/abstract/abstract1.svg)', textColor: 'text-blue-400', transform: 'translateX(10%)' },
    { date: 'November 23', description: 'candidate ready', backgroundImage: 'url(/abstract/abstract2.svg)', textColor: 'text-blue-400', transform: 'translateX(-15%)' },
    { date: 'December 1', description: 'Deployment and wrap-up', backgroundImage: 'url(/abstract/abstract3.svg)', textColor: 'text-blue-400', transform: 'translateX(15%)' },
  ];

  const bacgkroundImages = [
    'url(/abstract/abstract1.svg)',
    'url(/abstract/abstract2.svg)',
    'url(/abstract/abstract3.svg)',
    'url(/abstract/abstract4.svg)',
    'url(/abstract/abstract5.svg)',
  ];
  
  const getBackgroundImage = (index: number) => {
    return bacgkroundImages[index % bacgkroundImages.length];
  };

  return (
    <div className="relative w-auto sm:w-full py-4 my-2"> {/* Reduce padding at the bottom */}
      {/* Middle white line with dots */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 sm:w-2 h-[105%] bg-white my-[4px]">
        <div className="absolute -top-6  left-1/2 transform -translate-x-1/2 w-8 h-8 border-8 border-white rounded-full"></div>
        {showCircle && (
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-8 border-8 border-white rounded-full"></div>
        )}
      </div>

      {/* Starting month */}
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-12 px-4 py-2 text-white text-[22px] md:text-[42px] font-bold rounded-full">
        {month}
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
              className={`text-white flex items-center justify-center w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] md:w-[420px] md:h-[420px] lg:w-[540px] lg:h-[540px] xl:w-[680px] xl:h-[680px] ${event.textColor}`}
              style={{ 
                backgroundImage: getBackgroundImage(index), 
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center', 
                transform: event.transform, // Use transform from event data
              }}
            >
              <div className='flex flex-col w-full max-w-[140px] md:max-w-[240px]'>
                <h3 className={`font-bold text-[9px] sm:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[24px ${event.textColor}`}>{event.date}</h3>
                <p className='font-bold text-[12px] sm:text-[18px] md:text-[24px] lg:text-[32px] xl:text-[36px] text-shadow-md'>{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ending month */}
      {endingMonthState && (
        <div className="absolute mt-24 sm:mt-[150px] lg:mt-[200px] xl:mt-[240px] left-1/2 transform -translate-x-1/2 px-4 py-2 text-white text-[22px] md:text-[42px] font-bold rounded-full">
          {endingMonth}
        </div>
      )}
    </div>
  );
};

export default Timeline;
