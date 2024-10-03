import React from "react";
import Link from "next/link";
import { body } from "@fonts";

const Portofolio = ({ linkPorto }: { linkPorto: string }) => {
  return (
    <Link href={linkPorto} className="w-full" download target='_blank'>
      <div className="box-border w-full items-center justify-center rounded-2xl border-[3px] border-black bg-brown-4 py-2 transition-colors hover:bg-brown-4/90">
        <div
          className={`${body.className} flex justify-center text-lg text-brown-1 text-stroke-width-1 text-stroke-color-red-4 md:text-3xl`}
        >
          Portofolio
        </div>
      </div>
    </Link>
  );
};

export default Portofolio;
