import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

const Card = ({
  nama,
  nomor,
  foto,
  isKotakKosong = false,
  variant = "red",
  isSelected,
  className,
  order,
  href,
  isK3M = false,
  ...props
}: {
  nama?: string;
  nomor: string;
  foto?: string;
  isKotakKosong?: boolean;
  variant?: "red" | "blue";
  isSelected?: boolean;
  order?: number | null;
  href?: string;
  isK3M?: boolean;
} & HTMLAttributes<HTMLAnchorElement>) => {
  const seacrhParams = useSearchParams();
  const k3m = seacrhParams.get("k3m");
  const mwawm = seacrhParams.get("mwa_wm");
  const params = isK3M ? k3m : mwawm;
  const array = params?.split("-");
  const link = !array?.includes(nomor)
    ? `${params ?? ""}-${nomor}`
    : `${params?.replace(`-${nomor}`, "")}`;
  isSelected = !isSelected
    ? isK3M
      ? k3m?.includes(nomor)
      : mwawm?.includes(nomor)
    : isSelected;
  isSelected = nama === "Tidak Memilih" ? false : isSelected;
  order =
    !order
      ? isSelected
        ? array?.indexOf(nomor) === 0
          ? null
          : array?.indexOf(nomor)
        : null
      : order;

  const bgColor = isSelected
    ? variant === "red"
      ? "bg-red-3"
      : "bg-blue-5"
    : "bg-gray-500/75";
  const textColor = isSelected
    ? variant === "red"
      ? "text-red-4"
      : "text-navy"
    : "text-gray-500/75";
  const borderColor = isSelected
    ? variant === "red"
      ? "border-red-3 "
      : "border-blue-5"
    : "border-gray-500/75";

  if (isKotakKosong) {
    return (
      <Link
        href={
          href ??
          `?${new URLSearchParams(
            isK3M
              ? [
                  ["k3m", link],
                ]
              : [
                  ["mwa_wm", link],
                  ["k3m", k3m ?? ""],
                ],
          )}`
        }
        className={cn(
          " flex h-full w-full cursor-pointer flex-col items-center overflow-hidden rounded-xl border-[4px] border-b-0 bg-cream/40 shadow-lg shadow-black/30 transition-colors hover:bg-brown-2/90",
          borderColor,
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "flex flex-1 items-center text-2xl *:transition-colors text-center px-4 py-6",
            textColor,
          )}
        >
          Kotak Kosong
        </div>
        <div
          className={cn(
            "flex h-8 w-full items-center justify-center text-xl text-brown-1 transition-colors",
            bgColor,
          )}
        >
          {order}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={
        href ??
        `?${new URLSearchParams(
          isK3M
            ? [
                ["k3m", link],
              ]
            : [
                ["mwa_wm", link],
                ["k3m", k3m ?? ""],
              ],
        )}`
      }
      className={cn(
        "flex h-full w-full cursor-pointer flex-col items-center overflow-hidden rounded-xl border-[4px] border-b-0 bg-cream/40 shadow-lg shadow-black/30 transition-colors hover:bg-brown-2/90",
        borderColor,
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 flex-col items-center justify-center py-6 px-4">
        <Image
          src={foto ?? "/logo.png"}
          alt="avatar"
          width={75}
          height={75}
          className="mb-4 rounded-full"
        />
        <div className="flex flex-col items-center *:transition-colors *:text-center">
          <h1 className={cn("text-2xl", textColor)}>{nama}</h1>
          <h1 className={cn("text-lg", textColor)}>{nomor}</h1>
        </div>
      </div>
      <div
        className={cn(
          "flex h-8 w-full items-center justify-center text-xl text-brown-1 transition-colors",
          bgColor,
        )}
      >
        {order}
      </div>
    </Link>
  );
};

export default Card;
