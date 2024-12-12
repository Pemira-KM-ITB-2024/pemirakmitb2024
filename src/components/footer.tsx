import Image from "next/image";
import Asap from "public/asapbos.png"; // Ensure the path is correct
import Logo from "public/logopemira.png";
import Pemira from "public/gambarpemira.png";
import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { type ReactNode } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { body } from "@fonts";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="h-fit w-[100%] flex flex-col">
      <div className="relative flex flex-col items-center">
        <div className="absolute flex-col items-center z-0 h-full md:h-[60vw] w-full scale-x-[1.2] rounded-t-[80%] bg-[#FA3A91] md:scale-x-[1.1]"></div>
        <div className="absolute w-full -top-[30vw] md:-top-[18vw] z-10 flex justify-between p-4 flex-row">
          {/* Left Smoke Image */}
          <div className="relative justify-start md:justify-start w-[100vw] h-[60vw] md:w-[40vw] md:h-[45vw]">
            <Image
              src={Asap}
              layout="fill"
              alt="Asap"
              className="scale-x-[-1]"
            />
          </div>
    
          <div className="relative justify-end md:justify-end w-[100vw] h-[60vw] md:w-[40vw] md:h-[45vw]">
            <Image
              src={Asap}
              layout="fill"
              alt="Asap"
              className=""
            />
          </div>
        </div>

      {/* Center Logo and Pemira Images */}
      <div className="relative z-10 flex-col justify-evenly text-center hidden">
        <div className="flex flex-col items-center justify-center max-w-[220px]">
          <div className="relative w-[12vw] h-[14vw]">
            <Image src={Logo} layout="fill" alt="Logo" className="" />
          </div>
          <div className="w-[20vw] h-[12vw] relative -mt-[2vw]">
            <Image
              src={Pemira}
              layout="fill"
              alt="Logo bawah"
              className=""
            />
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
        <div className="w-[80vw] md:w-[45vw] flex flex-col items-center justify-center md:items-start md:justify-center md:flex-row md:gap-4 mt-12 z-10 mb-6">
          <div className="md:hidden flex flex-col items-center justify-center max-w-[14vw]">
            <div className="relative w-[30vw] h-[30vw]">
              <Image src={Logo} layout="fill" alt="Logo" className="" />
            </div>
            <div className="w-[80vw] h-[48vw] relative -mt-[12vw] -mb-[6vw]">
              <Image
                src={Pemira}
                layout="fill"
                alt="Logo bawah"
                className=""
              />
            </div>
          </div>
          <div className="flex justify-center md:justify-end w-full md:w-[12vw] leading-[1]">
            <div className="flex flex-col h-fit md:h-[40%] w-full md:justify-between md:mt-6 md:gap-4">
              <LinkIcon href="https://www.instagram.com/pemirakmitb2025/">
                <div className="text-[4vw] md:text-[1vw]">
                  <FaInstagram/>{" "}
                </div>
                <span className={``}>PEMIRA KM ITB 2025</span>
              </LinkIcon>
              <LinkIcon href="https://www.twitter.com/pemirakmitb/">
                <div className="text-[4vw] md:text-[1vw]">
                  <FaXTwitter />{" "}
                </div>
                <span className={``}>PEMIRA KM ITB 2025</span>
              </LinkIcon>
              {/* <LinkIcon href="https://www.tiktok.com/@pemirakmitb2024/">
                <FaTiktok />{" "}
                <span className={``}>PEMIRA KM ITB 2024</span>
              </LinkIcon> */}
            </div>
          </div> 
          <div className="hidden md:flex flex-col items-center justify-center max-w-[14vw]">
            <div className="relative w-[14vw] h-[14vw]">
              <Image src={Logo} layout="fill" alt="Logo" className="" />
            </div>
            <div className="w-[20vw] h-[12vw] relative -mt-[2vw] -mb-[2vw] -z-10">
              <Image
                src={Pemira}
                layout="fill"
                alt="Logo bawah"
                className=""
              />
            </div>
            <div className="text-[12px] md:text-[1vw] flex items-center justify-center gap-2 p-2 font-bold text-white">
              <IoIosMail />
              pemirakmitb2425@gmail.com
            </div>
          </div>
          <div className="flex justify-center md:justify-start w-full md:w-[12vw] leading-[1]">
            <div className="flex flex-col h-fit md:h-[40%] w-fit md:justify-between md:mt-6 md:gap-4">
              <LinkIcon href="https://www.instagram.com/km.itb/">
                <div className="text-[4vw] md:text-[1vw]">
                  <FaInstagram className="w-5 h-5 object-cover"/>{" "}
                </div>
                <span className={``}>Kabinet KM ITB</span>
              </LinkIcon>
              <LinkIcon href="https://www.twitter.com/KM_ITB/">
                <div className="text-[4vw] md:text-[1vw]">
                  <FaXTwitter className="text-lg"/>{" "}
                </div>
                <span className={``}>Kabinet KM ITB</span>
              </LinkIcon>
              <LinkIcon href="https://www.instagram.com/mwawm_itb/">
                <div className="text-[4vw] md:text-[1vw]">
                  <FaInstagram />{" "}
                </div>
                <span className={``}>MWA-WM ITB</span>
              </LinkIcon>
              <div className="md:hidden text-[12px] md:text-[1vw] flex items-center justify-center gap-2 p-2 font-bold text-white">
                <IoIosMail />
                pemirakmitb2425@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Copyright */}
      <div
          className={`${body.className} relative z-10 w-full flex items-center justify-center bg-[#FFE859] py-4  text-sm font-bold md:text-lg md:font-extrabold`}
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
      <div className="text-[12px] md:text-[1vw] flex items-center justify-center gap-2 p-2 font-bold text-white transition-colors hover:text-teal-2">
        {children}
      </div>
    </Link>
  );
};

export default Footer;
