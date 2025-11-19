"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const Header2: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "About", href: "/#" },
    { name: "Communities", href: "/#" },
    { name: "Properties", href: "/#" },
    { name: "Media Center", href: "/#" },
  ];

  return (
    <>
      {/* ========================= HEADER ========================= */}
      <div className="fixed top-[20px] w-full z-[999] left-1/2 -translate-x-1/2 container">
        <header className="overflow-hidden 3xl:h-[80px] w-full">
          <div className="bg-white/10 backdrop-blur-[30px] w-full flex items-center justify-between rounded-[150px] py-[15px] !px-4 lg:!px-[25px] 2xl:!px-[31px]">
            {/* ------- LEFT MENU (DESKTOP ONLY) ------- */}
            <div className="hidden lg:flex gap-[32px] text-white uppercase text-[16px] font-[400] font-[avenir] w-[33.33%]">
              {menuItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  {item.name}
                </Link>
              ))}
            </div>

            {/* ------- MOBILE HAMBURGER ------- */}
            <button
              className="lg:hidden p-2 flex items-center justify-center w-[40px] h-[40px] bg-white/20 rounded-full"
              onClick={() => setIsMenuOpen(true)}
            >
              <Image
                src="/images/hamburger.svg"
                alt="menu"
                width={22}
                height={22}
                className="invert"
              />
            </button>

            {/* ------- CENTER LOGO ------- */}
            <div>
              <Image
                src="/icons/logo_header_white.svg"
                alt="imtiaz logo"
                width={183}
                height={50}
                className="h-[30px] lg:h-[45px] 2xl:h-[50px] w-auto"
              />
            </div>

            {/* ------- RIGHT SIDE ICONS (DESKTOP ONLY) ------- */}
            <div className="w-[33.33%] flex justify-end">
              <div className="flex items-center gap-[10px]">
                <button className="flex items-center justify-center w-[32px] h-[32px] bg-white/25 backdrop-blur-[30px] rounded-full">
                  <Image
                    src="/images/account.svg"
                    alt="account"
                    className="invert"
                    width={14}
                    height={15}
                  />
                </button>

                <button className="flex items-center justify-center w-[61px] gap-[8px] h-[32px] bg-white/25 backdrop-blur-[30px] rounded-full">
                  <Image
                    src="/images/map.svg"
                    alt="map"
                    width={24}
                    height={24}
                    className="invert"
                  />
                  <ChevronDown size={17} className="invert" />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* ========================= MOBILE SIDEBAR ========================= */}

      {/* DARK BACKDROP */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* SLIDE-IN MENU */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full w-[350px] bg-black/80 backdrop-blur-md transition-transform duration-500 z-[999] flex flex-col justify-center pl-[60px] p-10",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-8 text-[24px] font-[200] uppercase font-[avenir] w-full">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={clsx(
                "group flex items-center justify-between text-white/60 hover:text-white transition-all duration-300 ease-out transform translate-y-4 opacity-0",
                isMenuOpen && "translate-y-0 opacity-100"
              )}
            >
              <span>{item.name}</span>

              <Image
                src="/images/icons/chevron-right.svg"
                alt="arrow"
                width={22}
                height={22}
                className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 invert"
              />
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header2;
