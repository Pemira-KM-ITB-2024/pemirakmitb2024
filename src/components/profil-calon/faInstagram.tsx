import React from "react";
import { FaInstagram as Icon} from "react-icons/fa6";
import Link from "next/link";

const FaInstagram = ({ linkIG }: { linkIG: string }) => {
  return (
    <div /*logo ig */
      className="relative ml-1 flex items-center justify-center aspect-square "
    >
      <Link href={linkIG} aria-label='instagram' download={linkIG} target='_blank' className='h-full w-full text-brown-3 hover:text-brown-3/90 text-5xl md:text-6xl'>
        <Icon />
      </Link>
    </div>
  );
};

export default FaInstagram;
