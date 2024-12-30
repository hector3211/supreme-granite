export default function ProcessSection() {
  const steps = [
    {
      title: "Consultation",
      description:
        "We help you choose the best design according to your vision and your home. If you have a very specific idea, bring in examples of your desired look, such as photos of cabinets, bathroom vanities, and furniture. Or let our decades of experience help shape your design concept into a beautiful new addition",
    },
    {
      title: "Selection",
      description:
        "With over 200 colors in our inventory, we make finding the perfect match for your project seamless. Our experts guide you through the selection process, ensuring you explore options that fit your style, needs, and budget. Whether it's granite, quartz, or marble, we help you visualize how each stone will enhance your space.",
    },
    {
      title: "Measurement",
      description:
        "Our skilled technicians visit your home to create a precise digital template, ensuring custom countertops fit seamlessly into your space. We pride ourselves on delivering craftsmanship that exceeds expectations.",
    },
    {
      title: "Fabrication",
      description:
        "Using the highest quality materials and cutting edge machinery, we craft and polish your chosen countertop into a masterpiece. Every countertop is thoroughly inspected before installation to ensure that you are receiving the highest quality product.",
    },
    {
      title: "Installation",
      description:
        "Our meticulous and highly skilled installation crew puts the finishing touches on your project by quickly and cleanly installing your countertops. In just a few hours, you are ready to enjoy your dream kitchen!",
    },
  ];

  return (
    <section className="py-16 bg-white min-h-[35rem]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
