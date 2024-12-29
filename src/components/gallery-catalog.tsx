import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Img from "@/assets/depot-one.jpg";
import ImgTwo from "@/assets/depot-two.jpg";

const projects = [
  {
    id: 1,
    title: "Modern Kitchen Countertop",
    category: "kitchen",
    image: Img.src,
  },
  {
    id: 2,
    title: "Elegant Bathroom Vanity",
    category: "bathroom",
    image: ImgTwo.src,
  },
  {
    id: 3,
    title: "Outdoor BBQ Area",
    category: "outdoor",
    image: Img.src,
  },
  {
    id: 4,
    title: "Luxurious Fireplace Surround",
    category: "living",
    image: ImgTwo.src,
  },
  {
    id: 5,
    title: "Commercial Office Reception",
    category: "commercial",
    image: Img.src,
  },
  {
    id: 6,
    title: "Rustic Kitchen Island",
    category: "kitchen",
    image: ImgTwo.src,
  },
  {
    id: 7,
    title: "Spa-like Master Bath",
    category: "bathroom",
    image: ImgTwo.src,
  },
  {
    id: 8,
    title: "Outdoor Pool Surround",
    category: "outdoor",
    image: Img.src,
  },
  {
    id: 9,
    title: "Contemporary Living Room Floor",
    category: "living",
    image: ImgTwo.src,
  },
];

export default function GalleryCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category === selectedCategory)
    : projects;

  return (
    <div className="space-y-6">
      <div className="flex justify-end p-4">
        <Select
          onValueChange={(value) => {
            if (value === "all") {
              setSelectedCategory("");
              return;
            }
            setSelectedCategory(value);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="kitchen">Kitchen</SelectItem>
            <SelectItem value="bathroom">Bathroom</SelectItem>
            <SelectItem value="outdoor">Outdoor</SelectItem>
            <SelectItem value="living">Living Areas</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Dialog key={project.id}>
            <DialogTrigger asChild>
              <div className="cursor-pointer group">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[40rem] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">
                      {project.title}
                    </p>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{project.title}</DialogTitle>
                <DialogDescription>
                  Category:{" "}
                  {project.category.charAt(0).toUpperCase() +
                    project.category.slice(1)}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <p className="mt-4">
                This project showcases our expertise in {project.category}{" "}
                installations. We used high-quality granite to create a stunning
                and durable surface that will last for years to come.
              </p>
              <div className="mt-4">
                <Button className="w-full">Request a Similar Project</Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
