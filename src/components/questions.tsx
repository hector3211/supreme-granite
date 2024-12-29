import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";

export default function Questions() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion className="pt-5 max-w-4xl mx-auto" type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg md:text-2xl">
              What stone does Depot Granite carry?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-500 text-md md:text-lg">
              We currently carry a wide variety of over 200 colors of natural
              and engineered stones including but not limited to Granite,
              Marble, Quartzite, Quartz, Calcite and Marble.{" "}
              <a
                href={"/products"}
                className="font-medium text-zinc-900 hover:underline hover:underline-offset-2"
              >
                View our variety of products
              </a>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg md:text-2xl">
              Does heat damage granite?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-500 text-md md:text-lg">
              No, granite can withstand very high temperatures. Placing hot pans
              or a kot kettle will not cause any damage to the granite's color
              or stability.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg md:text-2xl">
              Whats the best way to clean natural stone?
            </AccordionTrigger>
            <AccordionContent className="text-zinc-500 text-md md:text-lg">
              We recommend the use of cleaning products designed specifically
              for natural stone. There are excellent stone-friendly products
              available in the the market. Never use any acidic products that
              may include substances with ammonia cleaner, or abrasive pads to
              clean your stone.{" "}
              <a
                href={"/maintenance"}
                className="font-medium hover:underline hover:underline-offset-2 text-zinc-900"
              >
                Check out our maintenance page
              </a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
