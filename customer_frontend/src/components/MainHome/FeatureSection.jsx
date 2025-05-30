import { PackageCheck, Headphones, Handshake } from 'lucide-react';

const features = [
  {
    title: 'PRODUCTS',
    icon: <PackageCheck size={40} className="text-primary mb-4" />,
    description:
      'At any one-time we have a large comprehensive range of widely known products, ranging from essential components through to highly sophisticated and complex devices. The range includes cable and accessories, electro heat technology, lamps and lighting, motor control and distribution products all suitable for both industrial and hazardous area markets.',
  },
  {
    title: 'SERVICE',
    icon: <Headphones size={40} className="text-primary mb-4" />,
    description:
      'We are dedicated to providing a simple, efficient service giving you an exceptional customer service. Our vastly experienced team are happy to work with you to investigate any concerns, challenges or queries you may have. Our buyers source electrical products from around the world, securing deals for quality products at the right price.',
  },
  {
    title: 'RELATIONSHIP',
    icon: <Handshake size={40} className="text-primary mb-4" />,
    description:
      'We are aware how important it is for you to have the products you need, when you need them, and as such every member of our team is dedicated to meeting your requirements. Coupled with our close relationships with industry leading brand names it allows us to supply market leading products suitable for the most demanding applications and environments.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 dark:bg-neutral-900 py-20 px-4 md:px-16">
      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-3 text-center">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-neutral-800 dark:text-neutral-200">
            {item.icon}
            <h3 className="text-xl font-bold tracking-wide mb-4">{item.title}</h3>
            <p className="text-sm md:text-base leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
