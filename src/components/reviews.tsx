import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  bg: string;
  comment: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Danielle D",
    rating: 5,
    bg: "bg-pink-500",
    comment:
      "Absolutely beautiful product!!  Armando and Antonio did a wonderful job with installation,  they were very professional and patient with my questions.  Thank you!!!",
  },
  {
    id: 2,
    name: "Cynthia Wingard",
    rating: 5,
    bg: "bg-blue-300",
    comment:
      "I was very impressed with the quality, workmanship and especially the installation. Antonio and Armando did an exceptional job installing my countertop. They were very efficient, courteous and cleaned up when they were finished. Kudos to them and Depot Granite.",
  },
  {
    id: 3,
    name: "Jeff N",
    rating: 5,
    bg: "bg-teal-500",
    comment:
      "Just had our kitchen and master bath installed with new granite counter tops. They look amazing! We worked with Mily and she was great and super helpful.. Their granite selection is unbelievable. Antonio and his crew did the install and they were very meticulous and courteous. We were super happy with their attention to detail on the install. Thanks again!",
  },
  {
    id: 4,
    name: "Shannon A",
    rating: 5,
    bg: "bg-blue-500",
    comment:
      "Antonio and George did a stunning and meticulous installation of quartzite in our kitchen. They were thoughtful and knowledgeable as they worked and completely professional.  Milly was also a big part of the success of our project, helping us to create the layout for our complex design. The outcome is truly beautiful!",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div
                  className={`w-12 h-12 ${review.bg} text-primary-foreground rounded-full flex items-center justify-center mr-4`}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
