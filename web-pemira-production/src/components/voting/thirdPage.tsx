import { type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";
import Card from "./cardSelect";
import { useSearchParams } from "next/navigation";
import { k3m as data } from "~/data/k3m";

const ThirdPage = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const searchParams = useSearchParams();
  const k3m = searchParams.get("k3m")?.split("-") ?? [];
  return (
    <div
      className={cn(
        "relative flex w-[calc(100vw-6rem)] flex-col items-center gap-3",
        className,
      )}
    >
      <h1 className="text-4xl">Apakah sudah yakin dengan pilihan Anda?</h1>
      <h1 className="text-4xl text-blue-5 drop-shadow-xl">k3m</h1>
      <div className="mt-8 grid w-full flex-1 grid-cols-4 gap-8 px-32">
        {k3m.map((nomor, index) => {
          if (nomor === "") {
            return null;
          } else if (nomor === "04") {
            return (
              <Card
                href='#'
                order={index}
                variant="blue"
                key={index}
                nomor={nomor}
                className='hover:bg-cream cursor-default'
                isKotakKosong
                isK3M
              />
            );
          }
          return (
            <Card
              href='#'
              order={index}
              foto={data[parseInt(nomor) - 1]?.photo}
              nama={data[parseInt(nomor) - 1]?.name}
              variant="blue"
              key={index}
              nomor={nomor}
              className="hover:bg-cream cursor-default"
              isK3M
            />
          );
        })}
        {["01", "02", "03", "04"].map((nomor, index) => {
          if (k3m.includes(nomor)) {
            return null;
          }
          return (
            <Card
              href='#'
              order={null}
              variant="blue"
              key={index}
              nomor={""}
              nama="Tidak Memilih"
              className="hover:bg-cream cursor-default"
              isK3M
            />
          );
        })}
      </div>
    </div>
  );
};

export default ThirdPage;
