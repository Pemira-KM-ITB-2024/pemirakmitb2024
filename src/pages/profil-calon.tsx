import { header } from "@fonts";
import Bg from "~/components/background";
import FotoCalonCarousel from "~/components/profil-calon/foto-calon-carousel";
import { useEffect, useState } from "react";
import { k3m } from "~/data/k3m";
import {
  Carousel,
  type CarouselApi,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import PointDesc from "../components/profil-calon/pointDesc";
import FaInstagram from "../components/profil-calon/faInstagram";
import Portofolio from "../components/profil-calon/portofolio";
import { body } from "@fonts";
import { ScrollArea } from "~/components/ui/scroll-area";

const ProfilCalon = () => {
  const [no, setNo] = useState(1);
  const [api, setApi] = useState<CarouselApi>();
  useEffect(() => {
    if (!api) return;

    setNo(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setNo(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  const data = k3m[no - 1];

  return (
    <div className="justify-content dusty-bg relative w-full flex-1 items-center pb-16">
      <Bg />
      <div className="">
        <div
          className={`${header.className} pt-10 text-center text-4xl text-oren shadow-teal-4 drop-shadow-sm text-shadow text-stroke-width-1 text-stroke-color-cream md:pt-16 md:text-6xl`}
        >
          {"K3M"}
        </div>
        <div className="isolate  flex h-full space-y-6 md:space-y-0 w-full flex-1 flex-col px-14 pt-8 md:h-[30rem] md:flex-row md:space-x-16 md:pt-12 ">
          <div /* Photo Carousel */
            className=" relative mx-auto mb-5 flex h-full max-h-[20rem] w-full justify-center rounded-xl border-4 border-navy bg-red-4 p-4 md:h-[30rem] md:max-h-full md:w-80 "
          >
            <Carousel
              className="w-full"
              id={"photo-carousel-k3m"}
              opts={{ watchDrag: false }}
              setApi={setApi}
            >
              <div className="rounded-xl ">
                <FotoCalonCarousel />
              </div>
              <CarouselPrevious
                className="absolute -left-10 h-14 w-14 border-4 border-black"
                id={"photo-prev-k3m"}
              />
              <CarouselNext
                className="absolute -right-10 h-14 w-14 border-4 border-black"
                id={"photo-next-k3m"}
              />
            </Carousel>
            <div className="absolute bottom-0 z-0 flex h-20 w-28 translate-y-10 items-center justify-center">
              <Image
                src="/properti/oval_2.png"
                width={1000}
                height={1000}
                alt="oval"
                className="absolute z-0 h-14 w-28 object-contain md:h-20"
              />
              <h1
                className={`${header.className} absolute bottom-5 z-10 text-2xl text-brown-1 text-stroke-width-1 text-stroke-color-red-4 md:bottom-4 md:text-4xl`}
              >
                {no}
              </h1>
            </div>
          </div>
          <div /* data calon */
            className="flex h-full flex-1 flex-col justify-between rounded-xl border-4 border-navy bg-red-4"
          >
            <Card
              className={`box-border rounded-2xl border-0 bg-transparent shadow-transparent md:px-4`}
            >
              <CardHeader className="flex flex-col items-baseline md:flex-row">
                <CardTitle
                  className={`${body.className} w-fit text-base text-brown-1 md:text-3xl md:hidden`}
                >
                  {data?.name}
                </CardTitle>
                <CardDescription className="align-bottom text-sm text-brown-3 drop-shadow-lg md:pl-3 md:text-base">
                  {data?.jurusan}
                </CardDescription>
              </CardHeader>
              <ScrollArea className="h-60 md:h-72">
                <CardContent className="space-y-2">
                  <CardTitle
                    className={`${body.className} flex justify-center text-sm text-brown-1 md:text-3xl`}
                  >
                    Visi
                  </CardTitle>
                  <PointDesc
                    tipe={"visi"}
                    bgDesc={"bg-red-3"}
                    point={data?.visi ?? ""}
                    section={"K3M"}
                  />
                  <CardTitle
                    className={`${body.className} flex justify-center pt-2 text-sm text-brown-1 md:pt-6 md:text-3xl`}
                  >
                    Misi
                  </CardTitle>
                  <div className="flex flex-col space-y-1 ">
                    {data?.misi.map((misiItem, index) => (
                      <PointDesc
                        section={"K3M"}
                        key={index}
                        tipe={"misi"}
                        bgDesc={"bg-red-3"}
                        point={misiItem}
                        no={index + 1}
                      />
                    ))}
                  </div>
                </CardContent>
              </ScrollArea>
            </Card>
            <div className="flex flex-grow flex-row items-center px-4 md:px-10 pb-3 pt-2">
              <Portofolio linkPorto={data?.porto ?? ""} />
              <FaInstagram linkIG={data?.ig ?? ""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilCalon;
