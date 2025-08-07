"use client";

import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  // Animation variants for text
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  // Animation variants for images
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: 'easeOut' },
    },
    hover: { scale: 1.02, transition: { duration: 0.3 } },
  };

  // Animation variants for secondary images
  const secondaryImageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: i * 0.2, ease: 'easeOut' },
    }),
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <section className="bg-gradient-to-b from-white  via-orange-200  to-white   py-20 md:py-32 ">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/2"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            
            whileHover="hover"
          >
            <div className="relative">
              <img
                src="https://diamondatelier.in/images/homepageimages/Web-Banner-DA-7-7-2022.jpg"
                alt="Exquisite jewelry craftsmanship"
                className="w-full h-[450px] object-cover rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="w-full md:w-1/2"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            
          >
            <h2 className="text-5xl md:text-6xl font-serif text-amber-300 mb-8 tracking-tight">
              Our Legacy
            </h2>
            <p className="text-lg text-black leading-relaxed mb-6 font-light">
              At Indian B2C, we weave timeless elegance into every piece of jewelry, celebrating individuality with unparalleled craftsmanship. Our creations marry the finest materials with artistry, transforming moments into cherished heirlooms.
            </p>
            <p className="text-lg text-black leading-relaxed mb-8 font-light">
              Rooted in a vision to elevate luxury, we ethically source gems and collaborate with master artisans to craft perfection. Explore our collections, where every jewel narrates a story of sophistication and brilliance.
            </p>
            <motion.a
              href="/about"
              className="inline-block bg-amber-400 text-gray-900 py-3 px-8 rounded-full font-medium hover:bg-amber-300 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discover Our Craft
            </motion.a>
          </motion.div>
        </div>

        {/* Secondary Image Row for Visual Appeal */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              src: 'https://zariyajewellery.in/cdn/shop/files/Moissanite_diamond_statement_necklace_for_women.jpg?v=1740825458',
              alt: 'Jewelry craftsmanship',
            },
            {
              src: 'https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/18263934/2022/11/21/d93302d4-7e17-42c7-bc21-3856c473d3c91669009990160-PANASH-Rhodium-Plated-White-American-Diamonds-Studded-Handcr-1.jpg',
              alt: 'Sparkling gemstones',
            },
            {
              src: 'https://5.imimg.com/data5/SELLER/Default/2024/6/426046674/BF/BI/ON/55522542/115-b-500x500.png',
              alt: 'Elegant design process',
            },
          ].map((image, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={secondaryImageVariants}
              initial="hidden"
              whileInView="visible"
              
              custom={index}
              whileHover="hover"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-[250px] object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;