"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const page = () => {
  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="w-[1080px] grid grid-cols-2 gap-14 mt-20">
        <div className="flex flex-col items-center ">
          <a
            href="https://gooday-own-contribution.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div className="inline-block" whileHover={{ scale: 1.05 }}>
              <Image
                src="/img/gd.png"
                width={600}
                height={400}
                alt="gd"
                className="w-[550px] h-[350px] object-cover rounded-2xl border-4 border-blue-500 cursor-pointer"
              />
            </motion.div>
          </a>
          <div className="flex justify-between w-full mt-4 text-white text-3xl">
            <div className="opacity-70">01</div>
            <div className="text-right font-bold">GOODAY</div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-20 ">
          <a
            href="https://gooday-own-contribution.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div className="inline-block" whileHover={{ scale: 1.05 }}>
              <Image
                src="/img/ct.png"
                width={600}
                height={400}
                alt="ct"
                className="w-[550px] h-[350px] object-cover rounded-2xl border-4 border-blue-500 cursor-pointer"
              />
            </motion.div>
          </a>

          <div className="flex justify-between w-full mt-4 text-white text-3xl">
            <div className="opacity-70">02</div>
            <div className="text-right font-bold">CARTOONOPIA</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <a
            href="https://firebase-kindle-backend-making-event-app.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div className="inline-block" whileHover={{ scale: 1.05 }}>
              <Image
                src="/img/ffb.png"
                width={600}
                height={400}
                alt="ffb"
                className="w-[550px] h-[350px] object-cover rounded-2xl border-4 border-blue-500 cursor-pointer"
              />
            </motion.div>
          </a>
          <div className="flex justify-between w-full mt-4 text-white text-3xl">
            <div className="opacity-70">03</div>
            <div className="text-right font-bold">SCHEDULE-MEETING</div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-20">
          <a
            href="https://timmy-s-playground-pcx8-hh0pzr902-maplesoup1s-projects.vercel.app/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div className="inline-block" whileHover={{ scale: 1.05 }}>
              <Image
                src="/img/pp.png"
                width={600}
                height={400}
                alt="pp"
                className="w-[550px] h-[350px] object-cover rounded-2xl border-4 border-green-500 cursor-pointer"
              />
            </motion.div>
          </a>
          <div className="flex justify-between w-full mt-4 text-white text-3xl ">
            <div className="opacity-70">04</div>
            <div className="text-right font-bold">GAME-PLAYGROUND</div>
          </div>
        </div>

        <div className="flex flex-col items-center ">
          <a
            href="https://chatbot-4b7bhlw3a-maplesoup1s-projects.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div className="inline-block" whileHover={{ scale: 1.05 }}>
              <Image
                src="/img/chatbot.png"
                width={600}
                height={400}
                alt="gd"
                className="w-[550px] h-[350px] object-cover rounded-2xl border-4 border-blue-500 cursor-pointer"
              />
            </motion.div>
          </a>
          <div className="flex justify-between w-full mt-4 text-white text-3xl">
            <div className="opacity-70">05</div>
            <div className="text-right font-bold">OPENAI INTERFACE</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
