'use client'
import { CircleX } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"
import axios from "axios";
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

interface ContactFormProps {
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [relationship, setRelationship] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async () => {
    setError(null);

    if (!name || !email || !relationship || !message) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);

    const formData = {
      firstName: name,
      email,
      relationship,
      message,
    };

    try {
      const response = await axios.post("/api/send", formData);

      alert('Send successfully!');
      toast({
        description: "Email sent successfully!",
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to send email");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/4 h-screen bg-slate-800 fixed top-0 right-0 z-50 flex flex-col gap-10 p-8 rounded-md shadow-2xl">
      <div>
        <CircleX onClick={onClose} className="cursor-pointer text-white" />
      </div>

      <div className="text-6xl text-white text-center">Let's meet</div>

      <div className="grid w-full max-w-sm items-center gap-4">
        <Label className="text-white text-2xl" htmlFor="name">
          YOUR NAME
        </Label>
        <Input
          type="text"
          id="name"
          className="opacity-60 hover:opacity-100 caret-white focus:opacity-100 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-4">
        <Label className="text-white text-2xl" htmlFor="email">
          EMAIL
        </Label>
        <Input
          type="email"
          id="email"
          className="opacity-60 hover:opacity-100 caret-white focus:opacity-100 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-4">
        <Label className="text-white text-2xl" htmlFor="who">
          WHO ARE YOU?
        </Label>
        <Select onValueChange={(value) => setRelationship(value)}>
          <SelectTrigger className="opacity-60 hover:opacity-100 caret-white focus:opacity-100 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Relationship to me</SelectLabel>
              <SelectItem value="friend">Friends</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="visitor">Visitor</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid w-full max-w-sm items-center gap-4">
        <Label className="text-white text-2xl" htmlFor="message">
          MESSAGES
        </Label>
        <Textarea
          className="h-32 text-white opacity-60 hover:opacity-100 caret-white focus:opacity-100"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p className="text-sm text-muted-foreground">
          Your message will send to me by email.
        </p>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <Button
        className="bg-white text-black rounded-lg p-3 w-1/3 font-bold flex"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Sending..." : "SUBMIT"}
      </Button>
    </div>
  );
};

export default ContactForm;
