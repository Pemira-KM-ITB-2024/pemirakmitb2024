"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../public/Logo Transparan.png";
import { clashDisplay } from "@fonts";
import { useState } from "react";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/profil-calon", label: "Profil Calon" },
    { href: "/guide-voting", label: "Guide Voting" },
    { href: "/statistik", label: "Statistik" },
    { href: "/hasil", label: "Hasil Voting" },
  ];

  return (
    <>
      <nav className="fixed z-[999] flex !h-16 w-full items-center justify-between bg-[#BEEF62] pl-4 pr-6 text-[#FA3A91] shadow-lg md:pl-10 md:pr-24">
        <Link href="/">
          <Image className="mr-2" src={Logo} height={60} alt="Logo" />
        </Link>
        <ul
          className={`${clashDisplay.className} flex items-center font-black *:px-4 *:transition-colors *:duration-300`}
        >
          {navLinks.map((link) => (
            <li key={link.href} className="relative hidden md:block">
              <Link href={link.href}>
                <span className="group relative inline-block">
                  <span className="relative transition-colors duration-300 group-hover:text-[#FFAAB7]">
                    {link.label}
                  </span>
                  {pathname.startsWith(link.href) && (
                    <span className="absolute bottom-[-2px] left-0 h-[3px] w-full bg-[#FA3A91] transition-all duration-300 group-hover:bg-[#FFAAB7]"></span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex flex-col gap-[5.5px] md:hidden"
        >
          <div
            className={`h-[4px] w-[32px] bg-[#FA3A91] transition-all duration-300 ${
              isExpanded ? "translate-y-[10px] rotate-45" : ""
            }`}
          ></div>
          <div
            className={`h-[4px] w-[32px] bg-[#FA3A91] transition-all duration-300 ${
              isExpanded ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`h-[4px] w-[32px] bg-[#FA3A91] transition-all duration-300 ${
              isExpanded ? "translate-y-[-8px] -rotate-45" : ""
            }`}
          ></div>
        </button>
      </nav>
    </>
  );
};

export default Navbar;
