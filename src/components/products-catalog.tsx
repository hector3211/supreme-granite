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
import { Button } from "@/components/ui/button";
import Img from "@/assets/crema-marble.jpg";
import ImgTwo from "@/assets/rainforest-dark-marble.jpg";
import ImgThree from "@/assets/soft-white-marble.jpg";
import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useDebounce } from "@/lib/hooks";

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
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="container">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-full h-[30rem] rounded-md object-cover"
                />
                <p className="mt-4 text-lg font-semibold">
                  ${product.price.toFixed(2)} per sq ft
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Request Quote</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}
