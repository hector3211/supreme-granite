import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Send } from "lucide-react";
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
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

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
      setSubmitted(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsPending(true);

    try {
      // Here you would typically send the data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      setSubmitted(true);
      formReset();
    } catch (error) {
      setErrors({
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (submitted) {
      const counter = setTimeout(() => {
        setSubmitted(false);
      }, 3000);
      return () => clearTimeout(counter);
    }
  }, [submitted]);

  return (
    <div id="contact" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Get In Contact Today
        </h2>
      </div>
      <Card className="container mx-auto max-w-4xl bg-transparent border-none shadow-none">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="my-2">Name</Label>
              <Input
                name="name"
                placeholder="Enter your name here"
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
                placeholder="Enter your email here"
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
                placeholder="Enter your phone number here"
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

            <Button
              type="submit"
              disabled={isPending}
              className="w-full md:w-32 gap-2"
            >
              {isPending ? <Loader2 className="animate-spin" /> : <Send />}
              <span>{isPending ? "Sending" : "Send"}</span>
            </Button>
          </form>

          {submitted && (
            <Alert className="mt-4">
              <AlertDescription>
                Thank you for your message. We'll get back to you soon!
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
