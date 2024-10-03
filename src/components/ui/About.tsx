import Image from "next/image";
import React from "react";
import { Button } from "./button";

const About = () => {
  return (
    // <div className="min-h-screen w-auto flex flex-col items-center">
    //   <div className="text-7xl text-white">About me</div>
    //   <div className="opacity-80 text-white my-8">My introduction</div>

    //   <div className="relative h-max w-max flex gap-72 mt-32">
    //     <div className="rounded-full w-80 h-80 bg-blue-300"></div>
    //     <Image src="/img/bubble.svg" width={300} height={300} alt="bubble" />
    //   </div>
    // </div>
    <div className="min-h-screen w-auto relative flex items-center">
      <div className="absolute left-52 w-1/3 flex flex-col gap-11">
        <div className="text-7xl text-white">
          About me
          {/* <br>
          </br>
          <div className="text-lg">
          &mdash;&mdash;   Get to know me
          </div> */}
          </div>
        <div className="text-white opacity-80 leading-8">
          I graduated from UNSW with an undergraduate degree in Mathematics and
          graduated from Master's degree in Computer Science at USYD. I have
          hands-on experience applying Javascript, Java, C, Python in academic
          course. One of my specialties and passions is full stack web
          development. Familiar with UI/UX design, good at developing with
          nextjs framework. In terms of front-end, able to create dynamic web
          pages with certain effects. For back-end, understand most of the
          database operations, and familiar with most of the back-end API
          interface integration.{" "}
        </div>
        <div className="flex gap-10 space-x-4">
        <Button className="text-white p-8 font-bold rounded-lg">Contact me</Button>
        <Button className="text-white p-8 font-bold rounded-lg">Learn more</Button>
        </div>

      </div>
      <div className="rounded-full w-96 h-96 bg-blue-300 absolute right-72 border-4 overflow-hidden flex justify-center items-center animate-border_animation">
        <Image src="/img/xft.png" width={400} height={100} alt="xft" />
      </div>
    </div>
  );
};

export default About;
