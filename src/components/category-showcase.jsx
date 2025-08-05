"use client"
import Image from "next/image"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function CategoryShowcase() {
  const categories = [
    {
      name: "BRACELET",
      slug: "bracelets",
      image: "https://d1iozornmesg9y.cloudfront.net/admin/Bracelet.jpg?w=1920&q=70",
      gradientFrom: "from-gray-700",
      gradientTo: "to-gray-900",
    },
    {
      name: "RINGS",
      slug: "rings",
      image: "https://d1iozornmesg9y.cloudfront.net/admin/Ring.jpg?w=1920&q=70",
      gradientFrom: "from-amber-700",
      gradientTo: "to-amber-900",
    },
    {
      name: "NECKLACE",
      slug: "necklaces",
      image: "https://d1iozornmesg9y.cloudfront.net/admin/Necklace.jpg?w=1920&q=70",
      gradientFrom: "from-stone-200",
      gradientTo: "to-stone-400",
    },
    {
      name: "EARRING",
      slug: "earrings",
      image: "https://d1iozornmesg9y.cloudfront.net/admin/Earring.jpg?w=1920&q=70",
      gradientFrom: "from-rose-800",
      gradientTo: "to-rose-950",
    },
    {
      name: "PENDANT",
      slug: "pendants",
      image: "https://www.zivar.in/cdn/shop/products/auria-diamond-pendant-259301.jpg?v=1638186944&width=1445",
      gradientFrom: "from-rose-800",
      gradientTo: "to-rose-950",
    },
  ]

  // Animation variants for the section titles
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  // Animation variants for category cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, delay: index * 0.1, ease: "easeOut" },
    }),
  }

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="px-4 lg:px-8">
        {/* Shop by Categories Title */}
        <motion.div
          className="max-w-7xl mx-auto text-center mb-12"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          
        >
          <h2 className="text-4xl lg:text-5xl font-light text-gray-800">
            <span className="font-serif italic text-red-400/70 mr-2">Shop by</span>
            <span className="font-serif font-normal text-gray-900">Categories</span>
            <motion.span
              className="inline-block ml-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            >
              <Sparkles className="w-8 h-8 text-red-400/70" />
            </motion.span>
          </h2>
        </motion.div>

        {/* Category Grid */}
        <div className="flex max-lg:flex-wrap justify-center items-center gap-6 mb-20 p-10">
          {categories.map((category, index) => (
            <Link key={index} href={`/${category.slug}`}>
              <motion.div
                className="relative h-[24rem] w-[20rem] rounded-lg overflow-hidden shadow-lg aspect-square group cursor-pointer drop-shadow-lg"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                custom={index}
                
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <motion.div
                  className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"
                  initial={{ opacity: 0.2 }}
                  whileHover={{ opacity: 0.4 }}
                />
                <div
                  className={`absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t ${category.gradientFrom}/80 ${category.gradientTo}/80 flex items-end justify-center p-4`}
                >
                  <motion.h3
                    className="text-white text-lg font-semibold tracking-wider"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    
                  >
                    {category.name}
                  </motion.h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Lab Grown vs Mined Diamonds Title */}
        <motion.div
          className="text-center"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          
        >
          <h2 className="text-4xl lg:text-5xl font-light text-gray-800">
            Lab Grown vs <span className="font-serif font-normal text-gray-900">Mined Diamonds</span>
          </h2>
          <motion.p
            className="text-2xl lg:text-3xl font-serif italic text-red-400/70 mt-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            
          >
            Discover the Difference
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}