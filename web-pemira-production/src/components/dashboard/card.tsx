import Image from "next/image";
import Link from "next/link";
import { FaAngleDoubleRight } from "react-icons/fa";
import { cn } from "~/lib/utils";

type CardProps = {
  name?: string;
  major?: string;
  batch?: string;
  motto?: string;
  variant?: "k3m" | "mwa-wm";
  photo?: string;
  link?: string;
  nomor?: number;
};

const Card: React.FC<CardProps> = ({
  name,
  motto,
  link,
  variant = "mwa-wm",
  photo,
}) => {
  const bg = variant === "k3m" ? "bg-teal-2" : "bg-red-1";
  const bg_dark =
    variant === "k3m"
      ? "bg-teal-3/85 hover:bg-teal-3"
      : "bg-red-2/85 hover:bg-red-2";
  const text_c = variant === "k3m" ? "text-brown-1" : "text-yellow-100";
  return (
    <div
      className={cn(
        "flex max-w-[38vw] flex-col items-center gap-4 md:gap-6 rounded-lg border-2 md:px-4 border-navy p-3 md:h-[50vh] md:w-[20vw] md:items-stretch md:pt-8 md:pb-4",
        bg,
        text_c,
      )}
    >
      <div className="md:w-full flex justify-center">
        <Image
          src={photo ?? "/logo.png"}
          alt={name ?? ""}
          width={1000}
          height={1000}
          className='w-[100px] h-[100px] md:w-[175px] md:h-[175px] rounded-full object-cover'
        />
      </div>
      <div className="flex flex-1 flex-col justify-between text-center">
        <div className="md:flex flex-col gap-2">
          <h1 className="text-lg md:text-xl leading-tight">{`${name}`}</h1>
          {/* <h2 className="text-sm md:text-base">{`${major}'${batch}`}</h2> */}
          <h3 className="text-xs md:text-sm">{motto}</h3>
        </div>
        <Link
          href={link ?? "/profil-calon"}
          className="flex w-full justify-end pt-2 md:pt-0"
        >
          <button
            className={cn(
              "float-end mt-3 flex w-32 items-center justify-end gap-3 rounded-md py-1.5 pr-4 text-sm transition-all duration-300 ease-in-out hover:pr-2 md:mt-5 md:w-36 md:pr-6 hover:md:pr-4",
              bg_dark,
            )}
          >
            <div
              className={cn(
                "rounded-full p-1.5 text-brown-5",
                variant === "k3m" ? "bg-brown-1" : "bg-yellow-100",
              )}
            >
              <FaAngleDoubleRight fontSize={12} />
            </div>
            See More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
