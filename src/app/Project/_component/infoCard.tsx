"use client";
import { CircleX } from "lucide-react";
import React, { useState } from "react";

const infoCard = () => {
  const [cardVisable, setCardVisable] = useState(true);
  return (
    <div className="fixed top-1/2 left-1/2 w-1/2 h-1/2 flex flex-col bg-slate-900 rounded-lg">
      <div className="flex justify-end">
        <CircleX onClick={() => setCardVisable(false)} />
      </div>
      <div className="text-6xl text-white">GOODAY</div>
      <div>
        <div>Description:</div>
        <br></br>
        <div>
          Gooday is productivity app, using AI personal assistants to
          proactively organise life admin bookings between businesses, consumers
          and networks. It is also a B2C/B2B Artificial Intelligence SaaS
          product with innovative, beautiful, informative and creative pages!
        </div>
      </div>
    </div>
  );
};

export default infoCard;
