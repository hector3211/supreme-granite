import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Img from "@/assets/crema-marble.jpg";
import ImgTwo from "@/assets/rainforest-dark-marble.jpg";
import ImgThree from "@/assets/soft-white-marble.jpg";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Loader2, Search, Send } from "lucide-react";
import { useDebounce } from "@/lib/hooks";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const products = [
  {
    id: 1,
    name: "Classic Gray Granite",
    price: 59.99,
    material: "Granite",
    image: Img.src,
  },
  {
    id: 2,
    name: "Elegant Black Granite",
    price: 79.99,
    material: "Marble",
    image: ImgThree.src,
  },
  {
    id: 3,
    name: "Luxurious White Granite",
    price: 89.99,
    material: "Granite",
    image: ImgTwo.src,
  },
  {
    id: 4,
    name: "Rustic Brown Granite",
    price: 69.99,
    material: "Granite",
    image: ImgThree.src,
  },
  {
    id: 5,
    name: "Speckled Beige Granite",
    price: 74.99,
    material: "Quartz",
    image: ImgTwo.src,
  },
  {
    id: 6,
    name: "Veined Gold Granite",
    price: 99.99,
    material: "Quartzite",
    image: Img.src,
  },
];

export default function Products() {
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const materials = ["all", ...new Set(products.map((p) => p.material))];

  const filteredProducts = products.filter((product) => {
    const matchesMaterial =
      selectedMaterial === "all" || product.material === selectedMaterial;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(debouncedSearchQuery.toLowerCase());
    return matchesMaterial && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen">
      <div className="flex justify-between gap-4 p-4 rounded-lg my-5">
        <div className="relative container mx-auto">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-10 top-2 size-6 text-gray-400" />
          {!sortedProducts.length && (
            <p className="mt-1 font-medium">No matches found...</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="min-w-[200px]">
            <Select
              value={selectedMaterial}
              onValueChange={setSelectedMaterial}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by material" />
              </SelectTrigger>
              <SelectContent>
                {materials.map((material) => (
                  <SelectItem key={material} value={material}>
                    {material.charAt(0).toUpperCase() + material.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {sortedProducts.length ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-3">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="container">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={product.image}
                  alt={product.name}
                  width={700}
                  height={600}
                  className="w-[700px] 2xl:w-full 2xl:h-[30rem] rounded-md object-cover"
                />
                <p className="mt-4 text-lg font-semibold">
                  ${product.price.toFixed(2)} per sq ft
                </p>
              </CardContent>
              <CardFooter>
                <QuoteDialog slabId={product.id} slabName={product.name} />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}

interface QuoteDialogProps {
  slabName: string;
  slabId: number;
}

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

function QuoteDialog({ slabId, slabName }: QuoteDialogProps) {
  const [open, setOpen] = useState(false);
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
          message: "Successfully sent message",
        });
        formReset();
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
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!open && status.type) {
      (status.type = ""), (status.message = "");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size={"lg"} className="w-full">
          Request Quote
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quote Request</DialogTitle>
          <DialogDescription>
            <strong>{slabName}</strong> Id: <strong>{slabId}</strong> request
            form
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 relative">
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

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? <Loader2 className="animate-spin" /> : <Send />}
            <span>{isPending ? "Sending Request" : "Send Request"}</span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
