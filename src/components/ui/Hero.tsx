"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { Book } from "lucide-react";

const Hero: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState<number>(20);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const newScrollPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollPercentage(Math.min(100, Math.max(20, newScrollPercentage)));
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const clipPercentage =
    scrollPercentage >= 50 ? 100 : (scrollPercentage - 20) * (100 / 30);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen overflow-y-scroll"
      style={{ scrollSnapType: "y mandatory" }}
    >
      <div
        className="w-full h-[200vh] relative flex"
        style={{ scrollSnapAlign: "start" }}
      >
        <div className="hidden xl:flex h-screen w-1/2 sticky top-0 items-center overflow-hidden">
          <Image
            src="/img/home.png"
            width={500}
            height={650}
            alt="prof"
            className="absolute left-52 transition-all duration-300 ease-out z-30 rounded-lg ml-6
               xl:w-[254px] xl:h-[380px] 2xl:w-[450px] 2xl:h-[650px]"
            style={{
              clipPath: `inset(0 0 ${100 - clipPercentage}% 0)`,
              transform: `translateY(${(100 - clipPercentage) * 0.5}px)`,
            }}
          />
          <Image
            src="/img/ipad.svg"
            width={500}
            height={600}
            alt="ipad"
            className="absolute left-52 -z-0
               xl:w-[300px] xl:h-[600px] 2xl:w-[500px] 2xl:h-[690px]"
          />
        </div>
        {/* 第一个div */}
        {/* <div className="hidden xl:flex h-screen w-1/2 sticky top-0 items-center overflow-hidden">
        <Image
            src="/img/home.png"
            width={500}
            height={650}
            alt="prof"
            className="absolute left-52 transition-all duration-300 ease-out z-30 rounded-lg ml-6"
            style={{
              clipPath: `inset(0 0 ${100 - clipPercentage}% 0)`,
              transform: `translateY(${(100 - clipPercentage) * 0.5}px)`,
              width: "454px",
              height: "650px",
            }}
          />
          <Image
            src="/img/ipad.svg"
            width={500}
            height={600}
            alt="ipad"
            className="absolute left-52 -z-0"
          />

          <Image
            src="/img/home.png"
            width={500}
            height={650}
            alt="prof"
            className="absolute left-52 transition-all duration-300 ease-out z-30 rounded-lg ml-6"
            style={{
              clipPath: `inset(0 0 ${100 - clipPercentage}% 0)`,
              transform: `translateY(${(100 - clipPercentage) * 0.5}px)`,
              width: "254px",
              height: "380px",
            }}
          />
          <Image
            src="/img/ipad.svg"
            width={300}
            height={600}
            alt="ipad"
            className="absolute left-52 -z-0"
          />
        </div> */}
        {/* 第二个div */}
        <div className="h-screen sticky top-0 flex flex-col justify-center left-20 text-white gap-10">
          <div>
            <div className="text-7xl mb-5 text-bold">HI, I'M Xiaofeng Tang</div>
            <div className="opacity-80">
              &mdash;&mdash; FULL-STACK DEVELOPER
            </div>
          </div>
          <div className="opacity-80">
            And I am a recent graduate of the Master of Computer Science degree
            at the University of Sydney.
          </div>
          <div className="flex gap-10">
            <Image src="/img/facebook.png" width={50} height={10} alt="icon" />
            <Image src="/img/github.png" width={50} height={10} alt="icon" />
            <Image src="/img/linkedin.png" width={50} height={10} alt="icon" />
            <Image src="/img/twitter.png" width={50} height={10} alt="icon" />
          </div>

          <Button
            className="p-8 w-48 rounded-2xl font-bold flex gap-4 mt-10"
            onClick={scrollDown}
          >
            Learn more
            <Book />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
