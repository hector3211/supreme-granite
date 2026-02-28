import { useEffect, useMemo, useState } from "react";
import {
  GalleryHorizontalEnd,
  Home,
  Mail,
  Menu,
  Tag,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  return (
    <nav
      className={`
        fixed top-0 z-50 w-full p-2 border-b transition-all duration-300
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
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="size-11 rounded-full border-zinc-300 bg-white/90 shadow-sm"
                  aria-label={menuAriaLabel}
                >
                  <Menu className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[calc(100vw-1rem)] max-w-xs rounded-xl border-zinc-200 bg-white/95 p-2 shadow-xl backdrop-blur"
                align="end"
              >
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Navigate
                </p>
                {navItems.map((item) => (
                  <DropdownMenuItem
                    key={item.name}
                    asChild
                    onSelect={() => setIsOpen(false)}
                  >
                    <a
                      href={item.href}
                      className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-base font-medium text-zinc-800 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon />
                      {item.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
