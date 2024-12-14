import Image from "next/image";
import Asap from "public/asapbos.png"; // Ensure the path is correct
import Logo from "public/logopemira.png";
import Pemira from "public/gambarpemira.png";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { type ReactNode } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { body } from "@fonts";

const Footer = () => {
  return (
    <footer className="relative h-fit">
      <div className="absolute z-0 h-full w-full scale-x-[1.2] rounded-t-[50%] bg-[#FA3A91]" />
      <div className="relative z-10 flex flex-col p-4 md:flex-row">
        {/* Left Smoke Image */}
        <div className="relative flex-grow justify-start md:justify-start">
          <Image
            src={Asap}
            width={600}
            height={600}
            alt="Asap"
            className="absolute -bottom-[200px] -left-[15%] max-w-[60vw] scale-x-[-1] transform md:bottom-[-300px] md:left-[10%] md:ml-[-100px]"
          />
        </div>

        <div className="relative flex-grow justify-end md:justify-end">
          <Image
            src={Asap}
            width={600}
            height={600}
            alt="Asap"
            className="absolute -bottom-[200px] -right-[15%] max-w-[60vw] md:bottom-[-300px] md:right-[10%] md:mr-[-100px]"
          />
        </div>
      </div>

      {/* Center Logo and Pemira Images */}
      <div className="relative z-10 flex flex-grow flex-col justify-evenly text-center">
        <div className="flex flex-col items-center justify-center">
          <Image src={Logo} width={200} height={200} alt="Logo" className="" />
          <Image
            src={Pemira}
            width={600}
            height={600}
            alt="Logo bawah"
            className="px-20"
          />
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="relative z-10 grid grid-cols-1 justify-center gap-y-6 text-center 2xl:absolute 2xl:-bottom-[-250px] 2xl:right-[30%] 2xl:grid-cols-2 2xl:justify-evenly 2xl:gap-x-[210px]">
        <LinkIcon href="https://www.instagram.com/pemirakmitb2024/">
          <FaInstagram />{" "}
          <span className={`${body.className}`}>PEMIRA KM ITB 2024</span>
        </LinkIcon>
        <LinkIcon href="https://www.twitter.com/pemirakmitb/">
          <FaXTwitter />{" "}
          <span className={`${body.className}`}>PEMIRA KM ITB 2024</span>
        </LinkIcon>
        <LinkIcon href="https://www.tiktok.com/@pemirakmitb2024/">
          <FaTiktok />{" "}
          <span className={`${body.className}`}>PEMIRA KM ITB 2024</span>
        </LinkIcon>
        <LinkIcon href="https://www.instagram.com/km.itb/">
          <FaInstagram />{" "}
          <span className={`${body.className}`}>Kabinet KM ITB</span>
        </LinkIcon>
        <LinkIcon href="https://www.twitter.com/KM_ITB/">
          <FaXTwitter />{" "}
          <span className={`${body.className}`}>Kabinet KM ITB</span>
        </LinkIcon>
        <LinkIcon href="https://www.instagram.com/mwawm_itb/">
          <FaInstagram />{" "}
          <span className={`${body.className}`}>MWA-WM ITB</span>
        </LinkIcon>
      </div>

      {/* Footer Copyright */}
      <div
        className={`${body.className} relative z-10 flex items-center justify-center bg-[#FFE859] py-4 text-lg font-bold md:font-extrabold`}
      >
        <p>©2025 Copyright: Divisi IT KM ITB 2025</p>
      </div>
    </footer>
  );
};

const LinkIcon = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link href={href} target="_blank">
      <div className="flex items-center justify-center gap-2 p-2 font-bold text-white transition-colors hover:text-teal-2">
        {children}
      </div>
    </Link>
  );
};

export default Footer;
