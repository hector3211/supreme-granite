import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { CircleCheck, XCircle } from "lucide-react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isPending, setIsPending] = useState(false);
  const [popUp, setPopUp] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);
    setStatus({ type: "", message: "" });

    // Simulate form submission with timeout
    setTimeout(() => {
      setStatus({
        type: "success",
        message: "Successfully subscribed to the newsletter!",
      });
      setEmail("");
      setIsPending(false);
      setPopUp(true);
    }, 1000);
  }

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

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setStatus({ type: "", message: "" });
  //
  //   try {
  //     const response = await fetch("/api/subscribe", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email }),
  //     });
  //
  //     if (response.ok) {
  //       setStatus({
  //         type: "success",
  //         message: "Successfully subscribed to the newsletter!",
  //       });
  //       setEmail("");
  //       return;
  //     }
  //     throw new Error("Subscription failed");
  //   } catch (error) {
  //     setStatus({
  //       type: "error",
  //       message: "Failed to subscribe. Please try again.",
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // }
  //
  return (
    <div>
      <form onSubmit={handleSubmit} className="relative">
        <div className="container mx-auto mb-3 items-center space-y-4 sm:flex sm:space-y-0">
          <div className="relative w-full">
            <label className="mb-2 hidden text-sm font-medium text-zinc-900 dark:text-zinc-300">
              Email address
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <Input
              className="rounded-r-none pl-10"
              placeholder="Enter your email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="z-40">
            <Button
              type="submit"
              className="w-full rounded-md md:h-10 md:w-fit md:rounded-l-none"
            >
              {isPending ? "Subscribing" : "Subscribe"}
            </Button>
          </div>
        </div>
        <p className="relative left-9 -top-2 text-sm text-muted-foreground">
          Subscribe now to get notified about exclusive discounts. Unsubscribe
          any time.
        </p>
      </form>
      <Alert
        className={`fixed bottom-5 right-0 max-w-md h-[5rem] transition-all duration-500 ease-in-out transform ${
          popUp ? "-translate-x-10 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {status.type === "error" ? <XCircle /> : <CircleCheck />}
        <AlertTitle>{status.type === "error" ? "Oops" : "Success"}</AlertTitle>
        <AlertDescription className="font-medium">
          {status.message}
        </AlertDescription>
      </Alert>
    </div>
  );
}
