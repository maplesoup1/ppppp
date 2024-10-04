"use client";
import Image from "next/image";
import React, { useState } from "react";

interface ShowCardProps {
  imageUrl?: string;
  title?: string;
  className?: string;
}

const ShowCard: React.FC<ShowCardProps> = ({ imageUrl, title }) => {

  return (
    <div className="h-[485px] w-[340px] rounded-3xl border-2 border-white bg-slate-800 overflow-hidden relative cursor-pointer transition duration-300 ease-in-out
      hover:shadow-[0_0_60px_-5px_rgba(255,255,255,0.3)]">
      {imageUrl && (
        <Image 
        src={imageUrl} 
        width={400} 
        height={400} 
        alt="ct" 
        className="absolute bottom-1 -left-32 hover:translate-x-20 transition-smooth-transform duration-smooth ease-smooth "
        />
        )}
      <div className="absolute -rotate-90 left-28 bottom-40 text-6xl text-white whitespace-nowrap">
        &mdash; {title}
      </div>
    </div>
  );
};

export default ShowCard;
