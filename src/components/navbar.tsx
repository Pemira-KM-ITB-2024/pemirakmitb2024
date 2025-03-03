"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../public/Logo Transparan.png";
import { body } from "@fonts";
import { useState } from "react";
import LoginButton from "./login";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/profil-calon", label: "Profil Calon" },
    { href: "/statistik", label: "Statistik" },
    { href: "/forsos", label: "Forsos" },
    { href: "/pelaporan", label: "Pelaporan" },
    { href: "https://bit.ly/dokumenTAP", label: "Dokumen TAP" },
  ];

  const handleOverlayClick = () => {
    setIsExpanded(false);
    setIsProfileDropdownOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 z-[999] flex !h-16 w-full items-center justify-between bg-[#BEEF62] px-4 text-[#FA3A91] md:px-10">
        <Link href="/">
          <Image className="mr-2" src={Logo} height={60} alt="Logo" />
        </Link>
        <ul
          className={`${body.className} flex items-center font-black *:px-4 *:transition-colors *:duration-300`}
        >
          {navLinks.map((link) => (
            <li key={link.href} className="relative hidden md:block ">
              <Link href={link.href}>
                <span className="group relative">
                  <span className="transition-colors duration-300 hover:text-[#FFAAB7]">
                    {link.label}
                  </span>
                  {pathname === link.href && (
                    <span
                      className={`absolute bottom-[-4px] left-0 h-[3px] w-full bg-[#FA3A91] transition-all duration-300 group-hover:bg-[#FFAAB7]`}
                    ></span>
                  )}
                </span>
              </Link>
            </li>
          ))}
          <li className="hidden md:block">
            <LoginButton
              isDropdownOpen={isProfileDropdownOpen}
              setIsDropdownOpen={setIsProfileDropdownOpen}
              closeMenu={() => setIsExpanded(false)}
            />
          </li>
        </ul>
        <div className="flex flex-row md:hidden items-center justify-between gap-4">
          <div className="md:hidden">
            <LoginButton
              isDropdownOpen={isProfileDropdownOpen}
              setIsDropdownOpen={setIsProfileDropdownOpen}
              closeMenu={() => setIsExpanded(false)}
            />
          </div>
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
              setIsProfileDropdownOpen(false);
            }}
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
        </div>
      </nav>

      {isExpanded && (
        <div
          className="fixed inset-0 z-[998] bg-black opacity-70 transition-opacity duration-300 md:hidden"
          onClick={handleOverlayClick}
        ></div>
      )}

      <div
        className={`fixed left-0 right-0 z-[999] rounded-b mt-16 bg-[#BEEF62] transition-opacity duration-300 ease-in-out md:hidden ${
          isExpanded
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <ul className={`flex flex-col text-[#FA3A91] ${body.className}`}>
          {navLinks.map((link) => (
            <li
              key={link.href}
              className={`group w-full  ${
                pathname === link.href ? "bg-[#b3e251]" : ""
              }`}
            >
              <Link
                href={link.href}
                className="relative flex w-full items-center justify-center px-6 py-5 text-lg font-black transition-all duration-300"
                onClick={() => {
                  setIsExpanded(false);
                }}
              >
                <span className="relative z-10 transition-colors duration-300 ">
                  {link.label}
                  {pathname === link.href && (
                    <span
                      className={`absolute bottom-0 left-0 h-[3px] w-full bg-[#FA3A91] transition-all duration-300 group-hover:bg-[#FFAAB7]`}
                    ></span>
                  )}
                </span>
                
                <span className="absolute inset-0 bg-[#b3e251] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;