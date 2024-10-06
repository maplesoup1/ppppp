import Image from "next/image";
import React from "react";
import { Button } from "./button";
import { Smartphone, Star } from "lucide-react";
import Link from "next/link";

const About = () => {
  return (
    <div className="min-h-screen w-auto relative flex flex-col md:flex-row items-center justify-center md:justify-start">
      <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-blue-300 mb-8 md:mb-0 md:absolute md:right-72 border-4 overflow-hidden flex justify-center items-center animate-border_animation order-first md:order-last">
        <Image src="/img/xft.png" width={400} height={100} alt="xft" />
      </div>

      <div className="w-full md:w-1/3 md:absolute md:left-52 flex flex-col gap-11 p-4 md:p-0">
        <div className="text-5xl md:text-7xl text-white">About me</div>
        <div className="text-white opacity-80 leading-8">
          I graduated from UNSW with an undergraduate degree in Mathematics and
          graduated from Master degree in Computer Science at USYD. I have
          hands-on experience applying Javascript, Java, C, Python in academic
          course. One of my specialties and passions is full stack web
          development. Familiar with UI/UX design, good at developing with
          nextjs framework. In terms of front-end, able to create dynamic web
          pages with certain effects. For back-end, understand most of the
          database operations, and familiar with most of the back-end API
          interface integration.
        </div>
        <div className="flex gap-10 space-x-4">
          <Link href="/Contact">
            <Button className="text-white p-6 md:p-8 font-bold rounded-lg flex gap-4">
              Contact me
              <Smartphone />
            </Button>
          </Link>
          <Button className="text-white p-6 md:p-8 font-bold rounded-lg flex gap-4">
            Download CV
            <Star />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
