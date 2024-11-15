import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "~/components/ui/accordion"
import { body } from '~/styles/fonts'
import Pertanyaan from '~/questions.json'
import Image from 'next/image'
import bg from '../../public/guidevoting/bg-faq.png'
import bintang1 from '../../public/guidevoting/bintang-biru-faq.png'
import bintang2 from '../../public/guidevoting/bintang-hijau-faq.png'
import { anisette } from '~/styles/fonts'

const FaQ = () => {
    return (
        <div className="z-[1] flex justify-center items-center mt-32 mb-10 lg:mb-[460px] w-full flex-col">
            <div className="w-full absolute top-[1500px] ">
                <Image src={bg} alt="bg" layout="responsive"/>
            </div>
            <div className="lg:w-[400px] absolute w-[150px] left-0 top-[1400px] lg:top-[1850px]">
                <Image src={bintang1} alt="Star" layout="responsive"/>
            </div>
            <div className="lg:w-[200px] absolute w-[75px] right-0 lg:top-[2300px]">
                <Image src={bintang2} alt="Camera" layout="responsive"/>
            </div>
            <div className="flex flex-row mb-5">
                <h1
                    className={`${anisette.variable} text-3xl md:text-4xl lg:text-6xl font-bold text-[#BEEF62] [text-shadow:_4px_4px_0_rgb(0_0_0_/_80%)] -skew-x-6 `}
                >
                    F
                </h1>
                <h1
                    className={`${anisette.variable} text-3xl md:text-4xl lg:text-6xl font-bold text-[#BEEF62] [text-shadow:_4px_4px_0_rgb(0_0_0_/_80%)]`}
                >
                    A
                </h1>
                <h1
                    className={`${anisette.variable} text-3xl md:text-4xl lg:text-6xl font-bold text-[#BEEF62] [text-shadow:_4px_4px_0_rgb(0_0_0_/_80%)] skew-x-6 `}
                >
                    Q
                </h1>
            </div>
            <Accordion type="single" collapsible className="md:w-[60vw] w-[80vw] flex flex-col md:gap-8 gap-6 z-10">
                {Pertanyaan.map((name,key)=>(
                    <AccordionItem value={`${key}`} key={key} className="bg-[#FFE859] bg-opacity-50 lg:rounded-[1rem] rounded-[.9rem] shadow-md">
                        <AccordionTrigger className={`bg-[#FFE859] text-[#05051A] lg:text-lg md:text-base antialiased tracking-wider md:px-6 px-3 md:py-2 py-[.5em] lg:rounded-[1rem] rounded-[.9rem]`}>
                            {name.question}
                        </AccordionTrigger>
                        <AccordionContent className={`${body.className} text-white mx-5 md:mt-3 mt-[.6em] tracking-wide lg:text-lg md:text-base `}>
                            {name.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default FaQ
