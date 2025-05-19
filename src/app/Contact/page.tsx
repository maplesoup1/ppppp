"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex w-1/2">
        <div className="flex flex-col w-1/2 h-full text-white font-bold">
          <div className="text-6xl leading-tight mb-8">
            Ready <br></br>to roll?
          </div>
          <div className="flex flex-col gap-7 text-2xl">
            <div className="flex flex-col gap-2">
              <h1 className="opacity-60 ">Mail</h1>
              <h2 className="hover:text-red-400 cursor-pointer">
                timmy000728@gmail.com
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="opacity-60">Profile</h1>
              <h2 className="hover:text-red-400 cursor-pointer">
                timmy000728@gmail.com
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="opacity-60">Phone</h1>
              <h2 className="hover:text-red-400 cursor-pointer">
                +61415480728
              </h2>
            </div>

            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href="https://www.linkedin.com/in/xiaofeng-timmy-tang-77b550227"
                  target="_blank"
                >
                  <Image
                    src="/img/linkedin.png"
                    width={30}
                    height={100}
                    alt="linkedin"
                  />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link href="https://x.com/xiaofengtang3" target="_blank">
                  <Image
                    src="/img/twitter.png"
                    width={30}
                    height={100}
                    alt="twitter"
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
          <motion.div
            initial={{ rotate: -180, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{ rotate: 360, scale: 1.1 }}
            className="cursor-pointer"
          >
            <Image src="/img/phone.png" width={800} height={600} alt="phone" />
          </motion.div>
      </div>
    </div>
  );
};

export default page;
