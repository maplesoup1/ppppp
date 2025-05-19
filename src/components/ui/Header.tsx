import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onGetInTouchClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGetInTouchClick }) => {
  const lastScrollY = useRef<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLinks = () => (
    <>
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
      <Link href="/Blogs">
        <div className={`font-bold hover:text-red-400 ${isActive('/Contact')}`}>BLOGS</div>
      </Link>
    </>
  );

  return (
    <header
      className={`w-full h-20 p-4 md:p-7 flex bg-black text-white items-center shadow-2xl transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } sticky top-0 left-0 z-40`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2 md:gap-5 items-center font-bold">
          <Image src="/img/resume.png" width={30} height={30} alt="logo" />
          <span className="text-sm md:text-base">Xiaofeng Tang</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 lg:gap-20">
          <NavLinks />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Get in Touch Button */}
        <div className="hidden md:block">
          <Button
            variant="secondary"
            className="p-4 md:p-6 rounded-md bg-white text-black font-bold text-sm md:text-base"
            onClick={onGetInTouchClick}
          >
            GET IN TOUCH
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black p-4 flex flex-col gap-4">
          <NavLinks />
          <Button
            variant="secondary"
            className="p-4 rounded-md bg-white text-black font-bold w-full"
            onClick={() => {
              onGetInTouchClick();
              setIsMobileMenuOpen(false);
            }}
          >
            GET IN TOUCH
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;