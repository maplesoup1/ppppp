'use client'
import Image from "next/image";
import React from "react";
import { Button } from "./button";
import { Smartphone, Star } from "lucide-react";
import Link from "next/link";
import { ABOUT_ME } from "@/lib/content";

const About = () => {

  const handleDownload = () => {
    const fileUrl = '/static/Xiaofeng_Tang_Resume.pdf';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', 'Xiaofeng_Tang_Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen w-auto relative flex flex-col md:flex-row items-center justify-center md:justify-start">
      <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-blue-300 mb-8 md:mb-0 md:absolute md:right-72 border-4 overflow-hidden flex justify-center items-center animate-border_animation order-first md:order-last">
        <Image src="/img/xft.png" width={400} height={100} alt="xft" />
      </div>

      <div className="w-full md:w-1/3 md:absolute md:left-52 flex flex-col gap-11 p-4 md:p-0">
        <div className="text-5xl md:text-7xl text-white">About me</div>
        <div className="text-white opacity-80 leading-8">
          {ABOUT_ME}
        </div>
        <div className="flex gap-10 space-x-4">
          <Link href="/Contact">
            <Button className="text-white p-6 md:p-8 font-bold rounded-lg flex gap-4">
              Contact me
              <Smartphone />
            </Button>
          </Link>
          <Button className="text-white p-6 md:p-8 font-bold rounded-lg flex gap-4" onClick={handleDownload}>
            Download CV
            <Star />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
