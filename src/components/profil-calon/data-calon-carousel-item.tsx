import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import PointDesc from "./pointDesc";
import { CarouselItem } from "~/components/ui/carousel";
import FaInstagram from "./faInstagram";
import Portofolio from "./portofolio";
import { body } from "@fonts";
type DataCalonCardProps = {
  section: string;
  namaCalon: string;
  jurusanAngkatan: string;
  visi: string;
  misi: Array<string>;
  linkPorto: string;
  linkIG: string;
};

const DataCalonCarouselItem = ({
  section,
  namaCalon,
  jurusanAngkatan,
  visi,
  misi,
  linkPorto,
  linkIG,
}: DataCalonCardProps) => {
  const bgColor = section === "K3M" ? "bg-blue-4" : "bg-red-4";
  const bgDesc = section === "K3M" ? "bg-blue-3" : "bg-red-3";

  return (
    <CarouselItem /* Data Calon */>
      <Card
        className={`box-border flex-grow rounded-2xl border-4 border-black ${bgColor}`}
      >
        <CardHeader className="flex flex-col items-baseline md:flex-row">
          <CardTitle
            className={`${body.className} w-fit text-base text-brown-1 md:text-3xl`}
          >
            {namaCalon}
          </CardTitle>
          <CardDescription className="align-bottom text-sm text-brown-3 drop-shadow-lg md:pl-3 md:text-base">
            {jurusanAngkatan}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle
            className={`${body.className} flex justify-center text-sm text-brown-1 md:text-3xl`}
          >
            Visi
          </CardTitle>
          <PointDesc
            tipe={"visi"}
            bgDesc={bgDesc}
            point={visi}
            section={section}
          />
          <CardTitle
            className={`${body.className} flex justify-center pt-2 text-sm text-brown-1 md:text-3xl`}
          >
            Misi
          </CardTitle>
          <div className="flex flex-col space-y-1">
            {misi.map((misiItem, index) => (
              <PointDesc
                section={section}
                key={index}
                tipe={"misi"}
                bgDesc={bgDesc}
                point={misiItem}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-grow flex-row items-center pt-1">
        <Portofolio linkPorto={linkPorto} />
        <FaInstagram linkIG={linkIG} />
      </div>
    </CarouselItem>
  );
};

export default DataCalonCarouselItem;
