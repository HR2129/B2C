"use client"
import Image from "next/image"
import { motion } from "framer-motion"

export default function ScrollingContent() {
  const products = [
    {
      id: 1,
      name: "Curved Engraved Sun Stacking Ring",
      price: "$1,500.00",
      image: "https://www.artemerstudio.com/cdn/shop/files/Sunbeam-Minimalist-18K-Gold-Ball-Earrings-Packshot-Side.jpg?v=1752485431",
    },
    {
      id: 2,
      name: "Sunbeam Minimalist 18K Gold Ball Earrings",
      price: "from $600.00",
      image: "https://www.artemerstudio.com/cdn/shop/files/Gold-Embroidery-Pattern-Band-with-Roosters-_-Rubies-Packshot.jpg?v=1752472427",
    },
    {
      id: 3,
      name: "Gold Embroidery Pattern Band with Roosters & Rubies",
      price: "$3,100.00",
      image: "https://www.artemerstudio.com/cdn/shop/files/Blue-Mist-East---West-Oval-Milky-Sapphire-Ring-Packshot.jpg?v=1751542180",
    },
  ]

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: index * 0.15, ease: "easeOut" },
    }),
  }




  return (
    <section className="relative min-h-[150vh] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://www.artemerstudio.com/cdn/shop/files/artemer-jewelry-design.jpg?v=1636872895')`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
        
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10">
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <motion.div
              className="text-center mb-12"
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <motion.h2
                className="text-4xl lg:text-5xl font-light text-gray-800 mb-2"
                variants={titleVariants}
              >
                New Arrivals
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: false }}
              >
                EXPLORE THE JEWELS
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.id}
                  className="flex flex-col items-center text-center group cursor-pointer"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  custom={index}
                  viewport={{ once: false }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                >
                  <div className="relative aspect-square w-full max-w-[300px] mx-auto mb-4 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <motion.h3
                    className="text-gray-900 font-medium text-base leading-tight mb-1 group-hover:text-red-400 transition-colors"
                    whileHover={{ y: -2 }}
                  >
                    {product.name}
                  </motion.h3>
                  <motion.p
                    className="text-gray-700 text-lg font-semibold"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
                    viewport={{ once: false }}
                  >
                    {product.price}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}