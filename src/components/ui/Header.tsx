import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import Link from "next/link";
import { usePathname } from 'next/navigation';

interface HeaderProps {
  onGetInTouchClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGetInTouchClick }) => {
  const lastScrollY = useRef<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const pathname = usePathname();

  const controlHeader = (): void => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let ticking = false;
      const handleScroll = (): void => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            controlHeader();
            ticking = false;
          });

          ticking = true;
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const isActive = (path: string): string => {
    return pathname === path ? "shadow-[0_4px_6px_-1px_rgba(239,68,68,0.4)]" : "";
  };

  return (
    <header
      className={`w-full h-20 p-7 flex bg-black text-white items-center shadow-2xl transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } sticky top-0 left-0 z-40`}
    >
      <div className="absolute left-6 flex gap-5 items-center font-bold">
        <Image src="/img/resume.png" width={30} height={30} alt="logo" />
        Xiaofeng Tang
      </div>

      <nav className="text-white absolute left-1/3 flex items-center gap-20">
        <Link href="/">
          <div className={`font-bold hover:text-red-400 ${isActive('/')}`}>HOME</div>
        </Link>
        <Link href="/Project">
          <div className={`font-bold hover:text-red-400 ${isActive('/Project')}`}>PROJECT</div>
        </Link>
        <Link href="/Education">
          <div className={`font-bold hover:text-red-400 ${isActive('/Education')}`}>EDUCATION</div>
        </Link>
        <Link href="/Contact">
          <div className={`font-bold hover:text-red-400 ${isActive('/Contact')}`}>CONTACT</div>
        </Link>
      </nav>

      <div className="absolute right-4">
        <Button
          variant="secondary"
          className="p-6 rounded-md bg-white text-black font-bold"
          onClick={onGetInTouchClick}
        >
          GET IN TOUCH
        </Button>
      </div>
    </header>
  );
};

export default Header;
