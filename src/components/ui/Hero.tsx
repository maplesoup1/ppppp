"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./button";
import { Book } from "lucide-react";
import Link from "next/link";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/content";

const Hero: React.FC = () => {
  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-screen relative flex">
        <div className="hidden xl:flex h-screen w-1/2 sticky top-0 items-center overflow-hidden">
          <Image
            src="/img/home.png"
            width={500}
            height={650}
            alt="prof"
            className="absolute left-52 z-30 rounded-lg ml-6
               xl:w-[254px] xl:h-[380px] 2xl:w-[450px] 2xl:h-[650px]"
          />
          <Image
            src="/img/iPad.svg"
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
            <div className="text-7xl mb-5 text-bold">{PERSONAL_INFO.greeting}</div>
            <div className="opacity-80">
              &mdash;&mdash; {PERSONAL_INFO.subtitle}
            </div>
          </div>
          <div className="opacity-80">
            {PERSONAL_INFO.tagline}
          </div>
          <div className="flex gap-10">
            <Link href={SOCIAL_LINKS.facebook}>
              <Image src="/img/facebook.png" width={50} height={10} alt="icon" />
            </Link>
            <Link href={SOCIAL_LINKS.github}>
              <Image src="/img/github.png" width={50} height={10} alt="icon" />
            </Link>
            <Link href={SOCIAL_LINKS.linkedin}>
              <Image src="/img/linkedin.png" width={50} height={10} alt="icon" />
            </Link>
            <Link href={SOCIAL_LINKS.twitter}>
              <Image src="/img/twitter.png" width={50} height={10} alt="icon" />
            </Link>
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
