import React from 'react';

interface TimelineEvent {
  date: string;
  description: string; // Add transform property
}
interface TimelineProps {
  showCircle?: boolean;
  month?: string;
  endingMonthState?: boolean;
  endingMonth?: string;
  events: TimelineEvent[];
}


const Timeline: React.FC<TimelineProps> = ({ showCircle = true, month, endingMonthState = false, endingMonth, events}) => {
  const transform = [
    'translateX(-20%)',
    'translateX(10%)',
    'translateX(-10%)',
    'translateX(15%)',
    'translateX(-20%)',
    'translateX(10%)',
    'translateX(-15%)',
    'translateX(15%)',
  ];

  const bacgkroundImages = [
    'url(/abstract/abstract1.svg)',
    'url(/abstract/abstract2.svg)',
    'url(/abstract/abstract3.svg)',
    'url(/abstract/abstract4.svg)',
    'url(/abstract/abstract5.svg)',
  ];

  const textColor = [
    'text-[#5A8AF9]',
    'text-[#FA3A91]',
    'text-[#BEEF62]',
    'text-[#FA3A91]',
    'text-[#BEEF62]',
  ];
  
  const getTransform = (index: number) => {
    return transform[index % transform.length];
  };

  const getBackgroundImage = (index: number) => {
    return bacgkroundImages[index % bacgkroundImages.length];
  };

  const getTextColor = (index: number) => {
    return textColor[index % textColor.length];
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
              className={`text-white flex items-center justify-center w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] md:w-[420px] md:h-[420px] lg:w-[540px] lg:h-[540px] xl:w-[680px] xl:h-[680px]`}
              style={{ 
                backgroundImage: getBackgroundImage(index), 
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center', 
                transform: getTransform(index) // Use transform from event data
              }}
            >
              <div className='flex flex-col w-full max-w-[140px] md:max-w-[240px]'>
                <h3 className={`font-bold text-[9px] sm:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[24px] ${getTextColor(index)}`}>{event.date}</h3>
                <p className='text-white leading-[1] font-bold text-[12px] sm:text-[18px] md:text-[24px] lg:text-[32px] xl:text-[36px] md:text-shadow-md text-shadow-[0.5px_1px_1px_rgba(0,0,0,0.2)]'>{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ending month */}
      {endingMonthState && (
        <div className="absolute mt-[15vw] left-1/2 transform -translate-x-1/2 text-white text-[22px] md:text-[42px] font-bold rounded-full">
          {endingMonth}
        </div>
      )}
    </div>
  );
};

export default Timeline;
