import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheck, Loader2, Send, XCircle } from "lucide-react";
import { Label } from "./ui/label";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  honeypot?: string;
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

export default function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [popUp, setPopUp] = useState(false);

  const formReset = (): void => {
    formData.name = "";
    formData.email = "";
    formData.phone = "";
    formData.message = "";
    formData.honeypot = "";
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (formData.name.length < 2) {
      newErrors.name = "Must be at least two characters long";
    } else if (formData.name.length > 100) {
      newErrors.name = "Only a hundred characters long is valid";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Message validation
    if (formData.message.length > 400) {
      newErrors.message = "Message must be within 400 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If honeypot field is filled, silently reject
    if (formData.honeypot) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsPending(true);
    try {
      setTimeout(() => {
        setStatus({
          type: "success",
          message: "Message sent!",
        });
        formReset();
        setPopUp(true);
      }, 1000);
    } catch (error) {
      setErrors({
        message: "Failed to send message. Please try again.",
      });
      setStatus({
        type: "error",
        message: "Something went wrong, Please try again later",
      });
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (popUp) {
      const timmer = setTimeout(() => {
        status.type = "";
        status.message = "";
        setPopUp(false);
      }, 3000);
      return () => clearTimeout(timmer);
    }
  }, [popUp]);

  return (
    <Card
      id="contact"
      className="contianer mx-auto max-w-4xl border-none shadow-none bg-transparent py-16"
    >
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
        <CardDescription>Get in touch with our granite experts</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="my-2">Name</Label>
            <Input
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label className="my-2">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Johndoe@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label className="my-2">Phone Number</Label>
            <Input
              name="phone"
              type="tel"
              placeholder="123-456-7890"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <Label className="my-2">Message</Label>
            <Textarea
              name="message"
              placeholder="I have 45 sqft I'm wondering...."
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Honeypot field (hidden to users) */}
          <Input
            name="honeypot"
            type="text"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={handleChange}
          />

          <Button type="submit" disabled={isPending} className="w-28">
            {isPending ? <Loader2 className="animate-spin" /> : <Send />}
            <span>{isPending ? "Sending" : "Send"}</span>
          </Button>
        </form>

        <Alert
          className={`fixed bottom-5 right-0 max-w-md h-[5rem] transition-all duration-500 ease-in-out transform ${
            popUp ? "-translate-x-10 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          {status.type === "error" ? <XCircle /> : <CircleCheck />}
          <AlertTitle>
            {status.type === "error" ? "Oops" : "Success"}
          </AlertTitle>
          <AlertDescription className="font-medium">
            {status.message}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
