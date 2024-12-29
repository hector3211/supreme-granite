import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Img from "@/assets/depot-one.jpg";
import ImgTwo from "@/assets/depot-two.jpg";

const galleryItems = [
  {
    id: 1,
    src: Img.src,
    alt: "Kitchen countertop",
    title: "Modern Kitchen Countertop",
  },
  {
    id: 2,
    src: ImgTwo.src,
    alt: "Bathroom vanity",
    title: "Elegant Bathroom Vanity",
  },
  {
    id: 3,
    src: Img.src,
    alt: "Fireplace surround",
    title: "Luxurious Fireplace Surround",
  },
  {
    id: 4,
    src: ImgTwo.src,
    alt: "Outdoor kitchen",
    title: "Durable Outdoor Kitchen",
  },
  {
    id: 5,
    src: Img.src,
    alt: "Office reception desk",
    title: "Impressive Office Reception Desk",
  },
  {
    id: 6,
    src: ImgTwo.src,
    alt: "Granite stairs",
    title: "Elegant Granite Staircase",
  },
];

export default function GallerySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <div className="cursor-pointer group">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={item.src}
                      alt={item.alt}
                      width={800}
                      height={600}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <img
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
                <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
