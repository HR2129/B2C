import Image from "next/image"
import Link from "next/link"

export default function ScrollingContent() {
  // Removed Embla Carousel logic and state
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

  // Removed carousel-specific functions and useEffect

  return (
    <section className="relative min-h-[150vh] overflow-hidden">
      {/* Background div with fixed attachment - this creates the parallax effect within this section */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://www.artemerstudio.com/cdn/shop/files/artemer-jewelry-design.jpg?v=1636872895')`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/20" /> {/* Overlay */}
      {/* WhatsApp Float Button - Kept here as it's a fixed element relative to the viewport */}
      
      {/* Scrolling Content Container */}
      <div className="relative z-10">
        {/* Initial Hero Content Overlay (transparent over fixed background) */}
        

        {/* New Arrivals Section - This will scroll over the fixed background */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-2">New Arrivals</h2>
              <p className="text-lg text-gray-600">EXPLORE THE JEWELS</p>
            </div>

            {/* Grid for 3 product cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.slice(0, 3).map(
                (
                  product, // Slice to show only the first 3 products
                ) => (
                  <div key={product.id} className="flex flex-col items-center text-center group cursor-pointer">
                    <div className="relative aspect-square w-full max-w-[300px] mx-auto mb-4 overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-gray-900 font-medium text-base leading-tight mb-1 group-hover:text-red-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-700 text-lg font-semibold">{product.price}</p>
                  </div>
                ),
              )}
            </div>

            {/* Removed carousel navigation buttons */}
          </div>
        </section>
      </div>
    </section>
  )
}
