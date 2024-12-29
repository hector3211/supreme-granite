import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Must be at least two characters lonng" })
    .max(100, { message: "Only a hundred characters long is valid" }),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^\+?[\d\s-]{10,}$/, "Please enter a valid phone number"),
  message: z
    .string()
    .max(400, { message: "Message must be within 400 characters long" }),
  honeypot: z.string().optional(),
});

type ContactFormType = z.infer<typeof formSchema>;

export default function ContactForm() {
  const form = useForm<ContactFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const [isPending, setIsPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  function onSubmit(values: ContactFormType) {
    setIsPending(true);

    // If honeypot field is filled, silently reject
    if (values.honeypot) {
      setSubmitted(true);
      return;
    }
    // Here you would typically send the data to your backend
    // console.log('Form submitted:', formData);
    setSubmitted(true);
    form.reset();
    setIsPending(false);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="lg:text-lg">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="lg:text-lg">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="lg:text-lg">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number here"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Include area code</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="lg:text-lg">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="I have 45 sqft I'm wondering...."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Make sure to add your estimated square footage!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Honeypot field (hidden to users) */}
            <Input
              type="text"
              {...form.register("honeypot")}
              style={{ display: "none" }} // Hidden input
              tabIndex={-1}
              autoComplete="off"
            />

            <Button disabled={isPending} className="w-full md:w-28">
              {isPending ? (
                <Loader2 className="animate-spin size-5" />
              ) : (
                <Send className="size-5" />
              )}
              {isPending ? "Sending" : "Send"}
            </Button>
          </form>
        </Form>
        {submitted && (
          <Alert className="mt-4">
            <AlertDescription>
              Thank you for your message. We'll get back to you soon!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
