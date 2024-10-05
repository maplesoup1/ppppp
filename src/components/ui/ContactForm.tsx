"use client";
import { CircleX } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./button";

const ContactForm = () => {
  const [vis, setVis] = useState(true);
  if (!vis) {
    return null;
  }
  return (
    <div className="w-1/4 h-screen bg-slate-800 fixed top-0 right-0 z-50 flex flex-col gap-10 p-8 rounded-md shadow-2xl">
      <div>
        <CircleX
          onClick={() => setVis(false)}
          className="cursor-pointer text-white"
        />
      </div>

      <div className="text-6xl text-white text-center">Let's meet</div>

      <div className="grid w-full max-w-sm items-center gap-4">
        <Label className="text-white text-2xl" htmlFor="name">
          YOUR NAME
        </Label>
        <Input
          type="Name"
          id="Name"
          className="opacity-60 hover:opacity-100 caret-white focus:opacity-100 text-white"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-4">
        <Label className="text-white text-2xl" htmlFor="email">
          EMAIL
        </Label>
        <Input
          type="Name"
          id="Name"
          className="opacity-60 hover:opacity-100 caret-white focus:opacity-100 text-white"
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-4">
        <Label className="text-white text-2xl" htmlFor="name">
          WHO ARE YOU?
        </Label>
        <Select>
          <SelectTrigger className="opacity-60 hover:opacity-100 caret-white focus:opacity-100 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Relationship to me</SelectLabel>
              <SelectItem value="friend">Friends</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Vister">Vister</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid w-full max-w-sm items-center gap-4">
      <Label className="text-white text-2xl" htmlFor="email">
          MESSAGES
        </Label>
        <Textarea className="h-32 text-white opacity-60 hover:opacity-100 caret-white focus:opacity-100 "/>
        <p className="text-sm text-muted-foreground">
        Your message will send to me by email.
      </p>
      </div>

      <Button className="bg-white text-black rounded-lg p-3 w-1/3 font-bold">SUBMIT</Button>
    </div>
  );
};

export default ContactForm;
