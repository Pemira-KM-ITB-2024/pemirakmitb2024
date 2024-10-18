import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "~/components/ui/accordion"
import { body } from '~/styles/fonts'
import Pertanyaan from '~/questions.json'


const FaQ = () => {
    return (
        <div className="z-[1] mb-[3em]">
            <Accordion type="single" collapsible className="md:w-[60vw] w-[80vw] flex flex-col md:gap-8 gap-6">
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
