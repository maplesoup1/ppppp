import React from "react";
import ShowCard from "./_component/ShowCard";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="min-h-screen w-auto flex flex-col justify-center items-center gap-10">
      <div className="text-8xl text-white mb-16">Learn More</div>
      <div className="h-auto w-auto flex flex-col md:flex-row gap-8 md:gap-32 items-center md:justify-center">
        <Link href="/Project">
          <ShowCard title="projects" imageUrl="/img/pc.png" />
        </Link>
        <Link href="/Contact">
          <ShowCard title="contact" imageUrl="/img/phone.png" />
        </Link>
        <Link href="/Education">
          <ShowCard title="educate" imageUrl="/img/cup.png" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
