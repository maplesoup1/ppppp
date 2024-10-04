import React from "react";
import ShowCard from "./_component/ShowCard";
import { Button } from "./button";

const Footer = () => {
  return (
    <div className="min-h-screen w-auto flex flex-col justify-center items-center gap-10">
      <div className="text-8xl text-white mb-16">Learn More</div>
      <div className="h-auto w-auto flex gap-32 justify-center">
        <ShowCard title="projects" imageUrl="/img/pc.png" />
        <ShowCard title="contact" imageUrl="/img/phone.png" />
        <ShowCard title="educate" imageUrl="/img/cup.png" />
      </div>
    </div>
  );
};

export default Footer;
