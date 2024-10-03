import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import DataCalonCarouselItem from "./data-calon-carousel-item";
import { k3m } from "~/data/k3m";

const DataCalonCarousel = ({ section }: { section: string }) => {
  const nextButtonID = section === "k3m" ? "data-next-k3m" : "data-next-MWA-WM";
  const prevButtonID = section === "k3m" ? "data-prev-k3m" : "data-prev-MWA-WM";

  if (section === "K3M") {
    return (
      <Carousel id={"data-carousel" + section} opts={{ watchDrag: false }}>

      </Carousel>
    );
  } else {
    return (
      <Carousel id={"data-carousel" + section} opts={{ watchDrag: false }}>
        <CarouselContent>
          {k3m.map((calon) => (
            <DataCalonCarouselItem /* Contoh Data Calon */
              section={"k3m"}
              namaCalon={calon.name} /* Contoh Nama Calon */
              jurusanAngkatan={calon.jurusan}
              visi={calon.visi}
              misi={calon.misi}
              linkPorto={calon.porto}
              key={calon.name}
              linkIG={calon.ig}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="absolute -left-6 hidden h-14 w-14"
          id={prevButtonID}
        />
        <CarouselNext
          className="absolute -right-6 hidden h-14 w-14"
          id={nextButtonID}
        />
      </Carousel>
    );
  }
};

export default DataCalonCarousel;
