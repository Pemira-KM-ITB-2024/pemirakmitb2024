/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from 'react'; 
import { ChevronRight,ChevronLeft } from "lucide-react"
import { Button } from "~/components/ui/button"
import { header,body } from '~/styles/fonts';
import Lokasi from '~/locationData.json'

const LokasiVoting = () => {
    const [currentIdx,setCurrentIdx] = useState(0);
  
    const cycleForward = () => {
      setCurrentIdx(a => (a + 1) % 3);
    }
  
    const cycleBackward = () => {
      if (currentIdx > 0){
        setCurrentIdx(a => Math.abs((a-1) % 3));
      } else {
        setCurrentIdx(Lokasi.src.length - 1);
      }
  
    }
    return (
      <div className='z-[1] flex items-center justify-center flex-col'>
        <h1
          className={`${header.className} text-custom mb-10`}
        >
            Lokasi
        </h1>
        <div className='bg-red-1 lg:pt-5 lg:px-5 md:w-[60vw] w-[80vw] md:rounded-[1.5rem] rounded-[.5em] overflow-clip shadow-md border border-oren'>
          <div>
            <iframe
              src={Lokasi.src[currentIdx]}
              height="400px"
              loading="lazy"
              className='md:rounded-[1rem] w-[100%] max-[500px]:w-[101%]'
            ></iframe>
          </div>
          <div className='flex flex-row justify-center'>
            <div className='mx-5 my-4 px-3 py-2 bg-red-3 rounded-lg w-fit flex flex-row justify-center items-center md:gap-6 gap-4'>
              {/* for carousel */}
                <Button onClick={cycleBackward} size="icon" variant="secondary" className='rounded-full py-1 max-[450px]:w-[25px] max-[450px]:h-[25px]'>
                  <ChevronLeft className="h-4 w-4 text-red-3" strokeWidth={3}/>
                </Button>
                <div className={`${body.className} text-white antialiased text-center lg:w-[100px] lg:text-base md:text-[13px] min-[320px]:text-[11px]`}>
                  {Lokasi.nama[currentIdx]}
                </div>
                <Button onClick={cycleForward} size="icon" variant="secondary" className='rounded-full max-[450px]:w-[25px] max-[450px]:h-[25px]'>
                  <ChevronRight className="h-4 w-4 text-red-3" strokeWidth={3}/>
                </Button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default LokasiVoting