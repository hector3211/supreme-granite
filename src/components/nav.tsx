import { useEffect, useMemo, useState } from "react";
import {
  GalleryHorizontalEnd,
  Home,
  Mail,
  Menu,
  Tag,
  User,
  X,
} from "lucide-react";
import { Button } from "./ui/button";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Products", href: "/products", icon: Tag },
  { name: "Gallery", href: "/gallery", icon: GalleryHorizontalEnd },
  { name: "About", href: "/#about", icon: User },
  { name: "Contact", href: "/#contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const menuAriaLabel = useMemo(
    () => (isOpen ? "Close navigation menu" : "Open navigation menu"),
    [isOpen],
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setHasScrolled(scrollTop > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 z-[120] w-full p-2 border-b transition-all duration-300
        ${
          hasScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-extrabold">
              Supreme Granite
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <Button
              size={"icon"}
              variant={"outline"}
              className="size-11 rounded-full border-zinc-300 bg-white/90 shadow-sm"
              aria-label={menuAriaLabel}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-menu"
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 z-[125] bg-black/35 backdrop-blur-[1px] md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div
            id="mobile-nav-menu"
            className="absolute left-2 right-2 top-[4.8rem] z-[130] rounded-xl border border-zinc-200 bg-white p-2 shadow-xl md:hidden"
          >
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Navigate
            </p>
            <div className="flex flex-col gap-1 pb-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-base font-medium text-zinc-800 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon />
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
