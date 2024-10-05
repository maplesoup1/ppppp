'use client';

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const imageVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 15, duration: 0.5 },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: '-100vw' },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 },
  },
};

const Unsw: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center gap-4 p-4">
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <Image src="/img/unsw.png" width={300} height={300} alt="unsw" />
      </motion.div>
      <motion.div
        className="text-6xl text-center"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        Bachelor Degree Of Mathematic
      </motion.div>
    </div>
  );
};

export default Unsw;
