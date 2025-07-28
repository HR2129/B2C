"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const VideoShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(2)
  const [innerActiveIndex, setInnerActiveIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef(null)
  const totalItems = 5
  const innerTotalItems = 5

  const carouselItems = [
    {
      id: 1,
      type: "image",
      title: "Elegant Evenings",
      src: "https://www.thejewelleryeditor.com/media/images_thumbnails/filer_public_thumbnails/filer_public/dd/7b/dd7b69a8-ea16-486b-8e7a-b8a6662d7224/the_diamond_foundry_engagement_rings_.jpg__1536x0_q75_crop-scale_subsampling-2_upscale-false.jpg",
      innerItems: [
        {
          id: 1,
          title: "Diamond Pendant",
          image: "https://th.bing.com/th/id/OIP.7bon8fLn3HMYj3opt1NSLgHaHa?rs=1&pid=ImgDetMain",
        },
        {
          id: 2,
          title: "Teardrop Earrings",
          image:
            "https://www.helzberg.com/on/demandware.static/-/Sites-master-catalog-helzberg/default/dw30a2a505/images/2617361/2617361.jpg",
        },
        {
          id: 3,
          title: "Tennis Bracelet",
          image: "https://th.bing.com/th/id/OIP.yCzl8F1FYBu_KEx7DVN9IQHaHa?rs=1&pid=ImgDetMain",
        },
        {
          id: 4,
          title: "Statement Ring",
          image: "https://th.bing.com/th/id/OIP.iXbwj647S4KpyJajuQ9RMAHaLH?rs=1&pid=ImgDetMain",
        },
        {
          id: 5,
          title: "Diamond Choker",
          image:
            "https://5.imimg.com/data5/SELLER/Default/2022/11/CC/BW/JF/47143257/marquise-round-cut-lab-grown-diamond-choker-necklace-for-wife-1000x1000.jpg",
        },
      ],
    },
    {
      id: 2,
      type: "image",
      title: "Statement Pieces",
      src: "https://i.pinimg.com/736x/b3/24/5c/b3245ce67cbe33ad4e30fa04a839ced6.jpg",
      innerItems: [
        { id: 1, title: "Chandelier Earrings", image: "https://a.1stdibscdn.com/ruchi-new-york-diamond-chandelier-earrings-for-sale/1121189/j_65268021556599787321/6526802_master.jpg?disable=upscale&auto=webp&quality=60&width=960" },
        { id: 2, title: "Cocktail Ring", image: "https://th.bing.com/th/id/OIP.ECrW3MMYbmfYkrFLAboCTQHaE8?rs=1&pid=ImgDetMain" },
        { id: 3, title: "Diamond Brooch", image: "https://5.imimg.com/data5/SELLER/Default/2023/11/360216233/AM/TP/NY/29692670/diamond-brooches-1000x1000.jpg" },
        { id: 4, title: "Tiara", image: "https://th.bing.com/th/id/OIP.gzk2xra7x89UxayB4zQNyQHaEv?w=1735&h=1111&rs=1&pid=ImgDetMain" },
        { id: 5, title: "Bib Necklace", image: "https://th.bing.com/th/id/OIP.nwPpzFJWrp2ouoRjQSIkFAHaHa?rs=1&pid=ImgDetMain" },
      ],
    },
    {
      id: 3,
      type: "video",
      title: "#MarkYourMoment with diamonds",
      src: "/video.mp4",
      innerItems: [
        {
          id: 1,
          title: "Vintage Charm Diamond Finger Ring",
          image: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dwfe5f2cb1/images/hi-res/50G4B1FFXAA02_1.jpg",
        },
        { id: 2, title: "Infinity Floral Diamond Pendant", image: "https://th.bing.com/th/id/R.c441dec0c54674ee0c21ee68e3cfba8f?rik=ei5mAuBkuuRQAw&riu=http%3a%2f%2fhyoufinejewelry.com%2fcdn%2fshop%2ffiles%2f31101032-01100_4432fe12-e5eb-431c-a180-29e027095e55.jpg%3fv%3d1708497513&ehk=RnG%2fPcusZylNW9j2wvxlgX1%2b%2bwo4y3%2bTu1hAk9%2flYcw%3d&risl=&pid=ImgRaw&r=0" },
        { id: 3, title: "Eternity Diamond Band", image: "/placeholder.svg?height=80&width=80&text=Eternity" },
        { id: 4, title: "Solitaire Engagement Ring", image: "/placeholder.svg?height=80&width=80&text=Solitaire" },
        { id: 5, title: "Diamond Tennis Bracelet", image: "/placeholder.svg?height=80&width=80&text=Tennis" },
      ],
    },
    {
      id: 4,
      type: "image",
      title: "YOUR IS DIAMOND HOUR",
      src: "https://i.pinimg.com/736x/d7/50/90/d750904065585c1af5ac275f5d51995c.jpg",
      innerItems: [
        { id: 1, title: "Diamond Watch", image: "https://cdn.luxatic.com/wp-content/uploads/2021/12/Jacob-Co.-Crystal-Tourbillon-Diamond-768x768.jpg" },
        { id: 2, title: "Cufflinks", image: "https://th.bing.com/th/id/OIP.kLxLZkGLSQUUWTrwFxDoxgHaHc?rs=1&pid=ImgDetMain" },
        { id: 3, title: "Tie Pin", image: "https://eragem.com/media/catalog/product/cache/c2fb63ffd95716d7203d239cc0869f9d/7/3/73368a.jpg" },
        { id: 4, title: "Money Clip", image: "https://imgix-prod.ebth.com/2023/11/09/14/20/28/1bff38a1-4747-406a-b96b-a2bea8d599c8/1699557584114-86e248173ed73bb13b451c338fa7c20cc81003f71e5ea53e98b72cf7e3c655d8.JPG?ixlib=rb-3.1.0&w=880&h=880&fit=max&crop=&auto=format" },
        { id: 5, title: "Lapel Pin", image: "/placeholder.svg?height=80&width=80&text=LapelPin" },
      ],
    },
    {
      id: 5,
      type: "image",
      title: "Everyday Elegance",
      src: "https://www.astleyclarke.com/media/catalog/category/diamond.jpg",
      innerItems: [
        { id: 1, title: "Stud Earrings", image: "/placeholder.svg?height=80&width=80&text=Studs" },
        { id: 2, title: "Simple Pendant", image: "/placeholder.svg?height=80&width=80&text=Pendant" },
        { id: 3, title: "Stackable Rings", image: "/placeholder.svg?height=80&width=80&text=Stackable" },
        { id: 4, title: "Diamond Bangle", image: "/placeholder.svg?height=80&width=80&text=Bangle" },
        { id: 5, title: "Delicate Bracelet", image: "/placeholder.svg?height=80&width=80&text=Bracelet" },
      ],
    },
  ] 

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalItems)
  }

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems)
  }

  const nextInnerSlide = () => {
    setInnerActiveIndex((prevIndex) => (prevIndex + 1) % innerTotalItems)
  }

  // Auto-advance inner carousel every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextInnerSlide()
    }, 2000)

    return () => clearInterval(interval)
  }, [innerActiveIndex])

  // Handle video when active slide changes
  useEffect(() => {
    const currentItem = carouselItems[activeIndex]
    if (currentItem.type === "video" && videoRef.current) {
      // Only play if not already playing to avoid play/pause race
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => {
          setIsVideoPlaying(true)
        }).catch(() => {})
      }
    } else if (videoRef.current) {
      // Pause if not paused
      if (!videoRef.current.paused) {
        videoRef.current.pause()
        setIsVideoPlaying(false)
      }
    }
  }, [activeIndex, carouselItems])

  const getZIndex = (index) => {
    const diff = (index - activeIndex + totalItems) % totalItems
    if (diff === 0) return 40 // Active item
    if (diff === 1 || diff === totalItems - 1) return 30 // Items next to active
    if (diff === 2 || diff === totalItems - 2) return 20 // Items 2 steps away
    return 20 // Rest of the items
  }

  const getTransform = (index) => {
    const diff = (index - activeIndex + totalItems) % totalItems
    if (diff === 0) return "translateX(0) scale(1)" // Active item
    if (diff === 1) return "translateX(40%) scale(0.9)" // Next item
    if (diff === totalItems - 1) return "translateX(-40%) scale(0.9)" // Previous item
    if (diff === 2) return "translateX(70%) scale(0.8)" // 2 steps ahead
    if (diff === totalItems - 2) return "translateX(-70%) scale(0.8)" // 2 steps behind
    return "translateX(0) scale(0.7)" // Rest of the items
  }

  const getOpacity = (index) => {
    const diff = (index - activeIndex + totalItems) % totalItems
    if (diff === 0) return 1 // Active item
    if (diff === 1 || diff === totalItems - 1) return 0.7 // Items next to active
    if (diff === 2 || diff === totalItems - 2) return 0.5 // Items 2 steps away
    return 0.3 // Rest of the items
  }

  // Play/pause handler with guard and async/await

  return (
    <section className=" py-20 overflow-hidden min-h-screen bg-white"  >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Styling 101 With Diamonds</h2>
          <p className="text-xl text-[#887d69]">Trendsetting diamond jewellery suited for every occasion</p>
        </div>

        {/* Main Carousel */}
        <div className="relative h-[600px] my-12">
          {/* Carousel Items */}
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className="absolute left-1/2 top-0 w-full max-w-md rounded-lg overflow-hidden transition-all duration-500 ease-in-out cursor-pointer"
              style={{
                transform: `translateX(-50%) ${getTransform(index)}`,
                zIndex: getZIndex(index),
                opacity: getOpacity(index),
              }}
              onClick={() => setActiveIndex(index)}
            >
              {/* Card Content */}
              <div className="relative bg-[#835d2d] rounded-lg overflow-hidden shadow-2xl">
                {/* Video or Image */}
                {item.type === "video" ? (
  <div className="relative aspect-[8/11] ">
    <video
      key={item.id} // <--- ensure React remounts video when slide changes
      ref={index === activeIndex ? videoRef : null}
      className="w-full h-full object-cover z-10"
      muted
      loop
      playsInline
      onLoadedData={(e) => {
        if (index === activeIndex && e.currentTarget.paused) {
          e.currentTarget.play().then(() => {
            setIsVideoPlaying(true)
          }).catch(() => {});
        }
      }}
   
    >
      <source src={item.src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    {/* Title bar, play/pause button, etc. */}
    <div className="flex items-center p-4 bg-gradient-to-b from-black/70 to-transparent">
      <h3 className="text-white font-medium">{item.title}</h3>
    </div>
    
  </div>
) : (
                  <div className="aspect-[8/11] relative">
                    <img loading="lazy" src={item.src || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                    {/* Overlay text for non-video items */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* <h3 className="text-white text-2xl font-bold bg-black/30 px-4 py-2 rounded">{item.title}</h3> */}
                    </div>

                    {/* Inner Carousel for Image items - Only shown for active item */}
                    {index === activeIndex && (
                      <div className="absolute bottom-0 left-0 right-0">
                        <div className="bg-black/80 p-4">
                          <div className="relative overflow-hidden">
                            <div
                              className="flex transition-transform duration-300 ease-in-out"
                              style={{ transform: `translateX(-${innerActiveIndex * 100}%)` }}
                            >
                              {item.innerItems.map((innerItem) => (
                                <div key={innerItem.id} className="min-w-full flex gap-4">
                                  <div className="flex-shrink-0">
                                    <img loading="lazy"
                                      src={innerItem.image || "/placeholder.svg"}
                                      alt={innerItem.title}
                                      className="w-16 h-16 rounded-md object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-white text-sm font-medium">{innerItem.title}</h4>
                                    <p className="text-[#835d2d] text-xs mt-1">Diamond Collection</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Inner Carousel Navigation Dots */}
                          <div className="flex justify-center space-x-2 mt-4">
                            {item.innerItems.map((_, idx) => (
                              <button
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  idx === innerActiveIndex ? "bg-white w-6" : "bg-[#835d2d]"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setInnerActiveIndex(idx)
                                }}
                              ></button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevSlide()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextSlide()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  )
}