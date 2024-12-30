import { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";
import { Button } from "./ui/button";

interface HolidaySalesBannerProps {
  cookieName?: string;
  expirationDays?: number;
}

export default function SalesBanner({
  cookieName = "holiday-sales-banner",
  expirationDays = 14,
}: HolidaySalesBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check banner visibility status via API
    const checkBannerVisibility = async () => {
      try {
        const response = await fetch("/api/banner", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch banner status");
        }

        const data = await response.json();
        setIsVisible(data.showBanner);
      } catch (error) {
        console.error("Error checking banner status:", error);
        // Fallback to showing banner if API call fails
        setIsVisible(true);
      }
    };

    checkBannerVisibility();
  }, []);

  const handleDismiss = async () => {
    try {
      const response = await fetch("/api/banner", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "dismiss",
          cookieName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to dismiss banner");
      }

      setIsVisible(false);
    } catch (error) {
      console.error("Error dismissing banner:", error);
    }
  };

  const handleBookNow = async () => {
    try {
      const response = await fetch("/api/banner", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "book",
          cookieName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process booking");
      }

      // Redirect to booking page
      window.location.href = "#contact";
    } catch (error) {
      console.error("Error booking:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-5 left-4 right-4 z-[100] max-w-2xl mx-auto"
      aria-live="polite"
    >
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-4 rounded-lg shadow-2xl flex items-center justify-between relative">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-1 right-1 text-white hover:text-white/80 transition-colors"
          aria-label="Close holiday sales banner"
        >
          <X className="size-5" />
        </button>

        {/* Banner Content */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Gift className="h-10 w-10 text-white" />
            <div>
              <h3 className="font-bold text-lg">
                New Year Special: Get 20% Off Today!
              </h3>
              <p className="text-sm mt-1">
                Order now and get 20% off on level two or level Three materials.
                Limited time offer!
              </p>
            </div>
          </div>

          {/* Book Now Button */}
          <Button
            size={"lg"}
            variant={"secondary"}
            onClick={handleBookNow}
            className="font-bold"
          >
            Contact Now
          </Button>
        </div>
      </div>
    </div>
  );
}
