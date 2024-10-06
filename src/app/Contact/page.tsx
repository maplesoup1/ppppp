import Image from "next/image";
import React from "react";

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
              <h2 className="hover:text-red-400 cursor-pointer">timmy000728@gmail.com</h2>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="opacity-60">Profile</h1>
              <h2 className="hover:text-red-400 cursor-pointer">timmy000728@gmail.com</h2>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="opacity-60">Phone</h1>
              <h2 className="hover:text-red-400 cursor-pointer">+61415480728</h2>
            </div>

            <div className="flex gap-3">
              <Image src='/img/linkedin.png' width={30} height={100} alt="linin"/>
              <Image src='/img/twitter.png' width={30} height={100} alt="tw"/>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/2 h-full pl-20">
        <Image src='/img/phone.png' width={800} height={600} alt="phone"/>
        </div>
      </div>
    </div>
  );
};

export default page;
