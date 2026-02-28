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
  const storageKey = `${cookieName}-dismissed-at`;

  useEffect(() => {
    const dismissedAt = window.localStorage.getItem(storageKey);

    if (!dismissedAt) {
      setIsVisible(true);
      return;
    }

    const dismissedAtMs = Number(dismissedAt);
    if (Number.isNaN(dismissedAtMs)) {
      window.localStorage.removeItem(storageKey);
      setIsVisible(true);
      return;
    }

    const expirationMs = expirationDays * 24 * 60 * 60 * 1000;
    const isExpired = Date.now() - dismissedAtMs >= expirationMs;

    if (isExpired) {
      window.localStorage.removeItem(storageKey);
      setIsVisible(true);
      return;
    }

    setIsVisible(false);
  }, [expirationDays, storageKey]);

  const handleDismiss = () => {
    window.localStorage.setItem(storageKey, String(Date.now()));
    setIsVisible(false);
  };

  const handleBookNow = () => {
    window.location.href = "/#contact";
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-5 left-4 right-4 z-[100] max-w-2xl mx-auto"
      aria-live="polite"
    >
      <div className="bg-gradient-to-br from-gray-300 to-gray-400 p-4 rounded-lg shadow-2xl flex items-center justify-between relative">
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
            <Gift className="size-10" />
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
