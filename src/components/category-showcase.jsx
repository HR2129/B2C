import Image from "next/image"
import { Sparkles } from "lucide-react" // Import Sparkles icon

export default function CategoryShowcase() {
  const categories = [
    {
      name: "BRACELET",
      image: "https://d1iozornmesg9y.cloudfront.net/admin/Bracelet.jpg?w=1920&q=70",
      gradientFrom: "from-gray-700",
      gradientTo: "to-gray-900",
    },
    {
      name: "RINGS",
      image: "https://d1iozornmesg9y.cloudfront.net/admin/Ring.jpg?w=1920&q=70",
      gradientFrom: "from-amber-700",
      gradientTo: "to-amber-900",
    },
    {
      name: "NECKLACE",
      image: "https://d1iozornmesg9y.cloudfront.net/admin/Necklace.jpg?w=1920&q=70",
      gradientFrom: "from-stone-200",
      gradientTo: "to-stone-400",
    },
    {
      name: "EARRING",
      image: "https://d1iozornmesg9y.cloudfront.net/admin/Earring.jpg?w=1920&q=70",
      gradientFrom: "from-rose-800",
      gradientTo: "to-rose-950",
    },
    {
      name: "PENDANT",
      image: "https://www.zivar.in/cdn/shop/products/auria-diamond-pendant-259301.jpg?v=1638186944&width=1445",
      gradientFrom: "from-rose-800",
      gradientTo: "to-rose-950",
    },
  ]

  return (
    <section className="bg-white py-16 lg:py-24 ">
      <div className=" px-4 lg:px-8">
        {/* Shop by Categories Title */}
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-800">
            <span className="font-serif italic text-red-400/70 mr-2">Shop by</span>
            <span className="font-serif font-normal text-gray-900">Categories</span>
            <Sparkles className="inline-block ml-2 w-8 h-8 text-red-400/70" /> {/* Replaced emoji with icon */}
          </h2>
        </div>

        {/* Category Grid */}
        <div className="flex max-lg:flex-wrap justify-center items-center gap-6 mb-20 p-10">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative h-[24rem] w-[25rem] rounded-lg overflow-hidden shadow-lg aspect-square group cursor-pointer drop-shadow-lg"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
               fill
                className="object-cover  transition-transform duration-300 group-hover:scale-105"
              />
              {/* Added a subtle overlay that darkens on hover */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
              <div
                className={`absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t ${category.gradientFrom}/80 ${category.gradientTo}/80 flex items-end justify-center p-4`}
              >
                <h3 className="text-white text-lg font-semibold tracking-wider">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lab Grown vs Mined Diamonds Title */}
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-800">
            Lab Grown vs <span className="font-serif font-normal text-gray-900">Mined Diamonds</span>
          </h2>
          <p className="text-2xl lg:text-3xl font-serif italic text-red-400/70 mt-4">Discover the Difference</p>
        </div>
      </div>
    </section>
  )
}
