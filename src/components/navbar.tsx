import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png";
import { body, header } from "@fonts";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Separator } from "./ui/separator";
import { useState } from "react";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav
      className={
        isExpanded
          ? "z-[999] flex !h-16 items-center justify-between bg-red-5 pl-4 pr-6 text-cream md:pl-8 md:pr-10"
          : "z-[999] flex !h-16 items-center justify-between bg-red-5 pl-4 pr-6 text-cream md:pl-8 md:pr-10"
      }
    >
      <ul
        className={`${body.className} flex items-center *:px-4 *:transition-colors`}
      >
        <li>
          <Link href="/">
            <Image className="mr-2" src={Logo} height={48} alt="Logo" />
          </Link>
        </li>
        <li className="hidden hover:text-oren md:block">
          <Link href="/profil-calon">Profil Calon</Link>
        </li>
        <li className="hidden hover:text-oren md:block">
          <Link href="/guide-voting">Guide Voting</Link>
        </li>
        <li className="hidden hover:text-oren md:block">
          <Link href="/statistik">Statistik</Link>
        </li>
        <li className="hidden hover:text-oren md:block">
          <Link href="/hasil">Hasil Voting</Link>
        </li>
      </ul>
      <div className={`${header.className} hidden md:block`}>
        {"#GerakInklusif"}
      </div>
      <div className="flex h-full items-center md:hidden">
        <Drawer
          open={isExpanded}
          onClose={() => setIsExpanded(false)}
          onOpenChange={setIsExpanded}
        >
          <DrawerTrigger>
            <div className="flex flex-col gap-[5.5px] *:transition-all">
              <div
                className={
                  isExpanded
                    ? "h-[3px] w-[25px] translate-y-[8.5px] rotate-45 bg-white"
                    : "h-[3px] w-[22px] bg-white"
                }
              ></div>
              <div
                className={
                  isExpanded
                    ? "h-[3px] w-[22px] translate-x-6 bg-white opacity-0"
                    : "h-[3px] w-[22px] bg-white"
                }
              ></div>
              <div
                className={
                  isExpanded
                    ? "h-[3px] w-[25px] translate-y-[-8.5px] -rotate-45 bg-white"
                    : "h-[3px] w-[22px] bg-white"
                }
              ></div>
            </div>
          </DrawerTrigger>
          <DrawerContent className="bg-red-5">
            <DrawerHeader>
              <DrawerTitle className={`${header.className} text-lg text-cream`}>
                Menu
              </DrawerTitle>
              <Separator />
            </DrawerHeader>
            <ul
              className={`mb-4 flex flex-col items-center text-cream *:py-3 ${body.className}`}
            >
              <li onClick={() => setIsExpanded(false)}>
                <Link href="/">Home</Link>
              </li>
              <li onClick={() => setIsExpanded(false)}>
                <Link href="/profil-calon">Profil Calon</Link>
              </li>
              <li onClick={() => setIsExpanded(false)}>
                <Link href="/guide-voting">Guide Voting</Link>
              </li>
              <li onClick={() => setIsExpanded(false)}>
                <Link href="/statistik">Statistik</Link>
              </li>
              <li onClick={() => setIsExpanded(false)}>
                <Link href="/hasil">Hasil Voting</Link>
              </li>
            </ul>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
