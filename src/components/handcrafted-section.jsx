"use client"

import { useState } from "react"
import Image from "next/image"

export default function HandcraftedSection() {
  const [activeCategory, setActiveCategory] = useState("NECKLACES")

  const categories = [
    { name: "NECKLACES", label: "NECKLACES" },
    { name: "EARRINGS", label: "EARRINGS" },
    { name: "ACCESSORIES", label: "ACCESSORIES" },
  ]

  const necklaceItems = [
    {
      id: 1,
      image: "https://cdnmedia-breeze.vaibhavjewellers.com/media/catalog/product/cache/69e73e668f7bd7d908ce61f8ab11fca4/image/119491c0d/18kt-diamond-u-shape-designer-necklace-159vg4549-159vg4549.jpg",
      title: "U NECKLACES",
    },
    {
      id: 2,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa61NHG0dlSd9YePaApXSkfKC_2fJ96XFDWw&s",
      title: "CHOKERS",
    },
    {
      id: 3,
      image: "https://dusoul.ae/media/catalog/product/cache/d9648ae2d9c49ba61d921fbbef463425/d/j/djsn2919.jpg",
      title: "LONG NECKLACES",
    },
  ]

  const earringItems = [
    {
      id: 4,
      image: "https://assets.ajio.com/medias/sys_master/root/20240109/sig3/659c800674cb305fe00d25cc/-473Wx593H-466964161-silver-MODEL.jpg",
      title: "STUD EARRINGS",
    },
    {
      id: 5,
      image: "https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwab3c7c0e/images/Mia/hi-res/3824HAI.jpg?sw=640&sh=640",
      title: "HOOP EARRINGS",
    },
    {
      id: 6,
      image: "https://www.miabytanishq.com/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw265601dd/images/hi-res/3023DEV.jpg",
      title: "DROP EARRINGS",
    },
  ]

  const accessoryItems = [
    {
      id: 7,
      image: "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1403/1716958878_ad0be18d82d902291d2f.jpg",
      title: "BANGLES",
    },
    {
      id: 8,
      image: "https://www.brilliance.com/cdn-cgi/image/f=webp,width=1440,height=1440,quality=90/sites/default/files/vue/collections/engagement-rings-diamond_og.jpg",
      title: "RINGS",
    },
    {
      id: 9,
      image: "https://tyaani.com/cdn/shop/files/OSMT00033MODEL.jpg?v=1721198080&width=1100",
      title: "MAANGTIKAS",
    },
  ]

  let currentDisplayItems = []
  switch (activeCategory) {
    case "NECKLACES":
      currentDisplayItems = necklaceItems
      break
    case "EARRINGS":
      currentDisplayItems = earringItems
      break
    case "ACCESSORIES":
      currentDisplayItems = accessoryItems
      break
    default:
      currentDisplayItems = necklaceItems
  }

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Title */}
        <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-8">
          <span className="font-serif font-normal text-gray-900">Handcrafted</span>{" "}
          <span className="font-serif italic text-red-400/70">For You</span>
        </h2>

        {/* Category Buttons */}
        <div className="flex space-x-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeCategory === category.name
                  ? "bg-lime-200 text-gray-800"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category.name)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentDisplayItems.map((item) => (
            <div key={item.id} className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
              <div className="aspect-[3/4] relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Gradient overlay matching the image background */}
                
                {/* Darkening overlay on hover */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300"></div>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-md">
                <h3 className="text-gray-800 text-sm font-semibold tracking-wider">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
