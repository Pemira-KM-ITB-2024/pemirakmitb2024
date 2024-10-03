import Image from "next/image";
import { CarouselItem } from "~/components/ui/carousel";
import { k3m } from "~/data/k3m";

const FotoCalonCarouselItem = () => {
  return (
    <>
      {k3m.map((calon, index: number) => (
        <CarouselItem key={index} className="md:h-96">
          <div className={`flex-col flex h-full min-w-60 relative`}>
            <div className="flex h-fit w-fit">
              <Image
                src={calon.photo}
                alt={`Foto calon ke-${index + 1}`}
                height={2000}
                width={2000}
                className="rounded-xl"
              />
            </div>
            <h1 className="text-3xl hidden md:block pt-6 text-brown-1 text-center">{calon.name}</h1>
          </div>
        </CarouselItem>
      ))}
    </>
  );
};

export default FotoCalonCarouselItem;
