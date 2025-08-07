"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { ChevronRight, Home, Play, ChevronDown, Check } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ringsData from "@/data/rings.json"

// Simple Button component to replace shadcn/ui
function Button({ children, className = "", variant = "default", ...props }) {
  const baseClasses = "px-4 py-2 rounded font-medium transition-colors"
  const variantClasses = {
    default: "bg-black text-white hover:bg-gray-800",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  }

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// Add this at the very beginning of the component, right after the imports
console.log("🔧 ProductDetail module loaded")
console.log("📊 Rings data available:", ringsData?.length || 0, "products")

// Helper function to get product by slug
function getProductBySlug(slug) {
  console.log("🔍 Looking for product with slug:", slug)
  console.log(
    "📊 Available products:",
    ringsData.map((r) => ({ id: r.id, name: r.name, slug: r.slug })),
  )

  // Try to find by slug first
  let product = ringsData.find((ring) => ring.slug === slug)

  // If not found by slug, try to find by ID (in case someone uses numeric ID)
  if (!product && !isNaN(Number(slug))) {
    console.log("🔍 Slug is numeric, trying to find by ID:", Number(slug))
    product = ringsData.find((ring) => ring.id === Number(slug))
  }

  console.log("✅ Found product:", product ? product.name : "NOT FOUND")
  return product
}

// Helper to get image based on selected shape & metal
function getImage(ring, shape, metal) {
  if (Array.isArray(ring.images)) {
    const found = ring.images.find((img) => img.shape === shape && img.metal === metal)
    if (found) return found.url

    // Fallback: try to find by shape only
    const shapeMatch = ring.images.find((img) => img.shape === shape)
    if (shapeMatch) return shapeMatch.url

    // Fallback: try to find by metal only
    const metalMatch = ring.images.find((img) => img.metal === metal)
    if (metalMatch) return metalMatch.url

    // Final fallback: return first image
    return ring.images[0]?.url
  }
  return "/placeholder.svg?height=600&width=600"
}

function getThumbnail(ring, shape, metal) {
  if (Array.isArray(ring.images)) {
    const found = ring.images.find((img) => img.shape === shape && img.metal === metal)
    if (found) return found.thumbnail || found.url

    // Fallback: return first thumbnail
    return ring.images[0]?.thumbnail || ring.images[0]?.url
  }
  return "/placeholder.svg?height=100&width=100"
}

function getAvailableShapes(ring) {
  if (Array.isArray(ring.images)) {
    return [...new Set(ring.images.map((img) => img.shape))]
  }
  return []
}

function getAvailableMetals(ring) {
  if (Array.isArray(ring.metals)) {
    return ring.metals
  }
  return []
}

// Shape icons mapping
const shapeIcons = {
  round: "●",
  princess: "◆",
  emerald: "▭",
  asscher: "◇",
  radiant: "◈",
  oval: "○",
  pear: "◐",
  marquise: "◊",
  heart: "♡",
  cushion: "◘",
}

// Metal color mapping
const metalColors = {
  "yellow gold": "#FFD700",
  "white gold": "#E8E8E8",
  "rose gold": "#E8B4A0",
  platinum: "#E5E4E2",
  silver: "#C0C0C0",
}

export default function ProductDetail({ slug }) {
  console.log("🚀 ProductDetail component mounted with slug:", slug)
  console.log("📍 Current pathname:", typeof window !== "undefined" ? window.location.pathname : "SSR")
  console.log("📍 Current search params:", typeof window !== "undefined" ? window.location.search : "SSR")

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const product = getProductBySlug(slug)

  const [selectedCombinationId, setSelectedCombinationId] = useState("")
  const [selectedCarat, setSelectedCarat] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [isScrollingTogether, setIsScrollingTogether] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isZoomed, setIsZoomed] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const containerRef = useRef(null)
  const leftSideRef = useRef(null)
  const rightSideRef = useRef(null)
  const mainImageRef = useRef(null)

  // Memoize the combinations calculation to prevent infinite loops
  const allCombinations = useMemo(() => {
    if (!product) return []

    const shapes = getAvailableShapes(product)
    const metals = getAvailableMetals(product)
    const combinations = []

    for (const shape of shapes) {
      for (const metal of metals) {
        const image = getImage(product, shape, metal.value)
        const thumbnail = getThumbnail(product, shape, metal.value)
        combinations.push({
          shape,
          metal: metal.value,
          metalName: metal.name,
          image,
          thumbnail,
          id: `${shape}-${metal.value}`,
          price: product.price + (metal.value === "platinum" ? 500 : 0),
          originalPrice: product.originalPrice + (metal.value === "platinum" ? 600 : 0),
          sku: `${product.sku}-${shape.toUpperCase()}-${metal.value.toUpperCase().replace(" ", "")}`,
          shipsIn: metal.value === "platinum" ? "4-6 weeks" : product.shipsIn,
        })
      }
    }

    return combinations
  }, [product])

  // Get the selected combination object
  const selectedCombination = useMemo(() => {
    return allCombinations.find((combo) => combo.id === selectedCombinationId) || allCombinations[0]
  }, [allCombinations, selectedCombinationId])

  // Get all images for the current combination (for thumbnails)
  const currentCombinationImages = useMemo(() => {
    if (!product || !selectedCombination) return []

    const filtered = product.images.filter(
      (img) => img.shape === selectedCombination.shape && img.metal === selectedCombination.metal,
    )

    return filtered.length > 0
      ? filtered
      : [{ url: selectedCombination.image, thumbnail: selectedCombination.thumbnail }]
  }, [product, selectedCombination])

  // Media items including images, video, and 3D model
  const mediaItems = useMemo(() => {
    if (!product || !selectedCombination) return []
    
    const images = currentCombinationImages.map((img, index) => ({
      type: 'image',
      url: img.url,
      thumbnail: img.thumbnail || img.url,
      alt: `${product.name} ${selectedCombination.shape} ${selectedCombination.metalName} ${index + 1}`
    }))
    
    return [
      {
        type: '360',
        url: '/360-placeholder.mp4',
        thumbnail: '/placeholder.svg?height=100&width=100&text=360',
        alt: '360° View'
      },
      {
        type: 'video',
        url: '/video-placeholder.mp4',
        thumbnail: '/placeholder.svg?height=100&width=100&text=Video',
        alt: 'Product Video'
      },
      ...images,
      {
        type: 'model',
        url: '/model-placeholder.glb',
        thumbnail: '/placeholder.svg?height=100&width=100&text=Model',
        alt: '3D Model'
      }
    ]
  }, [product, selectedCombination, currentCombinationImages])

  // Function to update URL with current selections
  const updateURL = (shape, metal, carat, size) => {
    const params = new URLSearchParams()
    params.set("shape", shape)
    params.set("metal", metal)
    if (carat) {
      params.set("carat", carat)
    }
    if (size) {
      params.set("size", size)
    }

    const newUrl = `${pathname}?${params.toString()}`
    router.replace(newUrl)
  }

  // Initialize selections from URL params or defaults
  useEffect(() => {
    if (product && allCombinations.length > 0) {
      const shapeFromUrl = searchParams.get("shape")
      const metalFromUrl = searchParams.get("metal")
      const caratFromUrl = searchParams.get("carat")
      const sizeFromUrl = searchParams.get("size")

      let selectedComboId = allCombinations[0].id
      if (shapeFromUrl && metalFromUrl) {
        const foundCombo = allCombinations.find((combo) => combo.shape === shapeFromUrl && combo.metal === metalFromUrl)
        if (foundCombo) selectedComboId = foundCombo.id
      }

      setSelectedCombinationId(selectedComboId)
      setSelectedCarat(caratFromUrl || product.carats?.[0] || "")
      setSelectedSize(sizeFromUrl || product.sizes?.[0] || "")

      if (!shapeFromUrl || !metalFromUrl || !sizeFromUrl) {
        const combo = allCombinations.find((c) => c.id === selectedComboId) || allCombinations[0]
        updateURL(combo.shape, combo.metal, caratFromUrl || product.carats?.[0] || "", sizeFromUrl || product.sizes?.[0] || "")
      }
    }
  }, [product, allCombinations, searchParams])

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (leftSideRef.current && rightSideRef.current && containerRef.current) {
        const container = containerRef.current
        const rightSide = rightSideRef.current

        const containerScrollTop = container.scrollTop

        const expandableSections = rightSide.querySelector(".space-y-4:last-child")
        const freeShippingSection = expandableSections?.children[1]

        if (freeShippingSection) {
          const freeShippingSectionTop = freeShippingSection.offsetTop
          const rightSideTop = rightSide.offsetTop

          const absoluteFreeShippingTop = rightSideTop + freeShippingSectionTop

          const shouldStartScrollingTogether = containerScrollTop >= absoluteFreeShippingTop - 100

          if (shouldStartScrollingTogether && !isScrollingTogether) {
            setIsScrollingTogether(true)
          } else if (!shouldStartScrollingTogether && isScrollingTogether) {
            setIsScrollingTogether(false)
          }
        }
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [isScrollingTogether])

  // Zoom and drag handlers
  const handleImageClick = (e) => {
    if (!mainImageRef.current || mediaItems[currentMediaIndex]?.type !== 'image') return

    setIsZoomed(!isZoomed)
    if (!isZoomed) {
      const rect = mainImageRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setZoom(2)
      setZoomPosition({ x: x * 100, y: y * 100 })
    } else {
      setZoom(1)
      setZoomPosition({ x: 50, y: 50 })
    }
  }

  const handleMouseMove = (e) => {
    if (!mainImageRef.current || mediaItems[currentMediaIndex]?.type !== 'image' || !isZoomed) return

    const rect = mainImageRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    setZoomPosition({
      x: Math.max(0, Math.min(100, x * 100)),
      y: Math.max(0, Math.min(100, y * 100))
    })

    if (isDragging) {
      const dx = (e.clientX - dragStart.x) / (rect.width * zoom)
      const dy = (e.clientY - dragStart.y) / (rect.height * zoom)

      setZoomPosition((prev) => {
        const newX = Math.max(0, Math.min(100, prev.x - dx * 100))
        const newY = Math.max(0, Math.min(100, prev.y - dy * 100))
        return { x: newX, y: newY }
      })

      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseDown = (e) => {
    if (isZoomed && mediaItems[currentMediaIndex]?.type === 'image') {
      setIsDragging(true)
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setIsZoomed(false)
    setZoom(1)
    setZoomPosition({ x: 50, y: 50 })
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size)
    if (selectedCombination) {
      updateURL(selectedCombination.shape, selectedCombination.metal, selectedCarat, size)
    }
  }

  const handleAddToCart = () => {
    setIsAddedToCart(true)
    toast.success(`${product.name} has been added to your cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const handleContinueShopping = () => {
    router.push("/rings")
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (!product || !selectedCombination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>
              <strong>Slug:</strong> {slug}
            </p>
            <p>
              <strong>Available products:</strong>
            </p>
            <ul className="list-disc list-inside">
              {ringsData.map((r) => (
                <li key={r.id}>
                  ID: {r.id}, Slug: {r.slug}, Name: {r.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }


  const handleCaratSelect = (carat) => {
    setSelectedCarat(carat)
    if (selectedCombination) {
      updateURL(selectedCombination.shape, selectedCombination.metal, carat, selectedSize)
    }
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <ToastContainer />
      <div className="border-b border-gray-200 py-16 px-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center text-sm text-gray-600">
            <button
              className="hover:text-gray-900 cursor-pointer flex items-center gap-1"
              onClick={() => router.push("/")}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-4 h-4 mx-2" />
            <button className="hover:text-gray-900 cursor-pointer" onClick={() => router.push("/rings")}>
              Rings
            </button>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium">
              {product.name} Lab Grown Diamonds Bracelet - {selectedCombination.shape} {selectedCombination.metalName}
            </span>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="max-w-7xl mx-auto overflow-y-auto scrollbar-hide"
        style={{ height: "calc(100vh - 80px)", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="grid grid-cols-12 gap-8 p-6">
          <div ref={leftSideRef} className={`col-span-7 ${isScrollingTogether ? "relative" : "sticky top-6"} h-fit`}>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-2">
                <div className="space-y-4">
                  {mediaItems.map((media, index) => (
                    <div
                      key={index}
                      className={`aspect-square border-2 rounded-lg cursor-pointer overflow-hidden ${
                        currentMediaIndex === index ? "border-gray-900" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setCurrentMediaIndex(index)}
                    >
                      {media.type === '360' ? (
                        <img
                          src={media.thumbnail}
                          alt={media.alt}
                          className="w-full h-full object-cover"
                        />
                      ) : media.type === 'video' ? (
                        <div className="flex items-center justify-center bg-gray-50 h-full">
                          <Play className="w-6 h-6 text-gray-400" />
                        </div>
                      ) : (
                        <img
                          src={media.thumbnail}
                          alt={media.alt}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-10">
                <div
                  ref={mainImageRef}
                  className={`lg:h-[30rem] lg:w-[30rem] aspect-square bg-gray-50 rounded-lg overflow-hidden relative ${
                    mediaItems[currentMediaIndex]?.type === 'image' ? 'cursor-zoom-in' : 'cursor-default'
                  }`}
                  onClick={handleImageClick}
                  onMouseMove={handleMouseMove}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                >
                  {mediaItems[currentMediaIndex]?.type === 'image' && (
                    <img
                      src={mediaItems[currentMediaIndex].url}
                      alt={mediaItems[currentMediaIndex].alt}
                      className="w-full h-full object-contain transition-transform duration-200"
                      style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                      }}
                    />
                  )}
                  {mediaItems[currentMediaIndex]?.type === '360' && (
                    <img
                      src={mediaItems[currentMediaIndex].url}
                      alt={mediaItems[currentMediaIndex].alt}
                      className="w-full h-full object-contain transition-transform duration-200"
                      style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                      }}
                    />
                  )}
                  {mediaItems[currentMediaIndex]?.type === 'video' && (
                    <video
                      className="w-full h-full object-contain"
                      controls
                    >
                      <source src={mediaItems[currentMediaIndex].url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {mediaItems[currentMediaIndex]?.type === 'model' && (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-600">3D Model Placeholder (GLB not rendered in this example)</span>
                    </div>
                  )}
                </div>
                <div className="text-center mt-4 text-sm text-gray-600">
                  {selectedCombination.shape} {selectedCombination.metalName} - {selectedCarat} Total Carat - {selectedSize}
                </div>
              </div>
            </div>
          </div>

          <div ref={rightSideRef} className="col-span-5">
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name} Lab Grown Diamonds Bracelet</h1>
                <div className="text-lg text-gray-600 mb-4">
                  {selectedCombination.shape} Cut in {selectedCombination.metalName}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <span>SKU: {selectedCombination.sku}</span>
                  <span>|</span>
                  <span>Lab Grown Diamond</span>
                  <span>|</span>
                  <span>Gemological certificate included</span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">
                      ${selectedCombination.originalPrice?.toLocaleString()}
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${selectedCombination.price.toLocaleString()}
                    </span>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">{product.discount}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-6">Ships in {selectedCombination.shipsIn} ⓘ</div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-gray-900">SIZE</span>
                  <span className="text-sm text-gray-600">{selectedSize}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 rounded-full text-sm border transition-all ${
                        selectedSize === size
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-gray-900">TOTAL CARAT</span>
                  <span className="text-sm text-gray-600">{selectedCarat} Carat</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.carats?.map((carat) => (
                    <button
                      key={carat}
                      className={`px-4 py-2 rounded-full text-sm border transition-all ${
                        selectedCarat === carat
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                      onClick={() => handleCaratSelect(carat)}
                    >
                      {carat} ct
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {isAddedToCart ? (
                  <div className="flex gap-4">
                    <Button 
                      className="flex-1 bg-black text-black border border-gray-300 py-3 text-lg font-medium hover:bg-gray-50"
                      onClick={handleContinueShopping}
                    >
                      CONTINUE SHOPPING
                    </Button>
                    <Button 
                      className="flex-1 bg-black text-white py-3 text-lg font-medium hover:bg-gray-800"
                      onClick={handleCheckout}
                    >
                      CHECKOUT
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-black text-white py-3 text-lg font-medium hover:bg-gray-800"
                    onClick={handleAddToCart}
                  >
                    ADD TO CART - ${selectedCombination.price.toLocaleString()}
                  </Button>
                )}
                <div className="text-center text-sm text-gray-600">
                  Starting at $39/mo or 0% APR with <span className="font-medium">Affirm</span>
                  <br />
                  See if you qualify
                </div>
              </div>

              {product.freeGift && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.freeGift.image || "/placeholder.svg"}
                      alt="Free gift"
                      className="w-12 h-12 rounded"
                    />
                    <div>
                      <div className="font-medium text-gray-900">FREE GIFT</div>
                      <div className="text-sm text-gray-600">{product.freeGift.title}</div>
                      <div className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded inline-block">
                        Free Gift valued at {product.freeGift.value}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-medium text-gray-900 mb-4">SETTINGS</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-800">Metal</div>
                    <div className="font-medium text-gray-400">{selectedCombination.metalName}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Shape</div>
                    <div className="font-medium capitalize text-gray-400">{selectedCombination.shape}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Style</div>
                    <div className="font-medium text-gray-400">{product.settings.style}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">SKU</div>
                    <div className="font-medium text-gray-400">{selectedCombination.sku}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-gray-600">Sustainable, ethical, and recycled</div>
                    <div className="text-gray-600">Trendy appearance</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Side Diamonds Quality</div>
                    <div className="font-medium text-gray-400">{product.settings.sideDiamondsQuality}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Side Diamonds Origin</div>
                    <div className="font-medium text-gray-400">{product.settings.sideDiamondsOrigin}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-gray-600">Superior grade</div>
                    <div className="text-gray-600">Eco-friendly diamond</div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex -space-x-2">
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white"
                      src="/placeholder.svg?height=32&width=32&text=1"
                      alt="Expert 1"
                    />
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white"
                      src="/placeholder.svg?height=32&width=32&text=2"
                      alt="Expert 2"
                    />
                    <img
                      className="w-8 h-8 rounded-full border-2 border-white"
                      src="/placeholder.svg?height=32&width=32&text=3"
                      alt="Expert 3"
                    />
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>

                <div className="mb-4">
                  <div className="font-medium text-gray-900 mb-1">SET A VIRTUAL APPOINTMENT</div>
                  <div className="text-sm text-gray-600 mb-2">✓ Free of charge</div>
                  <div className="text-sm text-gray-600">
                    Meet one of our experts who can help you Explore engagement rings, Diamonds and fine jewellery in
                    person at your device
                  </div>
                </div>

                <Button variant="outline" className="w-full mb-4 bg-transparent">
                  📅 BOOK APPOINTMENT
                </Button>
              </div>

              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div>
                <div className="font-medium text-gray-900 mb-3">Safe Checkout</div>
                <div className="flex items-center gap-2">
                  <img src="/placeholder.svg?height=24&width=40&text=VISA" alt="Visa" className="h-6" />
                  <img src="/placeholder.svg?height=24&width=40&text=MC" alt="Mastercard" className="h-6" />
                  <img src="/placeholder.svg?height=24&width=40&text=AMEX" alt="American Express" className="h-6" />
                  <img src="/placeholder.svg?height=24&width=40&text=PP" alt="PayPal" className="h-6" />
                </div>
              </div>

              <div className="space-y-4">
                <details className="border-t pt-4">
                  <summary className="flex items-center justify-between cursor-pointer font-medium text-gray-900">
                    Why Choose Our Lab-Grown Diamonds?
                    <ChevronDown className="w-4 h-4" />
                  </summary>
                  <div className="mt-4 text-sm text-gray-600">
                    Our lab-grown diamonds are created using advanced technology that replicates the natural diamond
                    formation process...
                  </div>
                </details>

                <details className="border-t pt-4">
                  <summary className="flex items-center justify-between cursor-pointer font-medium text-gray-900">
                    Free Shipping & Returns
                    <ChevronDown className="w-4 h-4" />
                  </summary>
                  <div className="mt-4 text-sm text-gray-600">
                    We offer free shipping on all orders and free returns within 30 days...
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 border-t">
          <div className="text-center mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              THE STORY OF {product.name.toUpperCase()} LAB GROWN DIAMONDS BRACELET
            </h2>
            <p className="text-gray-600 mb-4">{product.story}</p>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 items-center mb-8">
            <div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VvnhF9gFcmal8EqjpVW7cBkqJGegGw.png"
                alt="Jewelry craftsmanship"
                className="w-full rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Where Craftsmanship Meets Elite Quality</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <p>
                  Our master artisans pour their skills and passion into designing each piece of jewelry, setting new
                  benchmarks in craftsmanship.
                </p>
                <p>
                  <strong>Handcrafted luxury:</strong> By meticulously selecting only the crème de la crème, the top 1%
                  of diamonds and gemstones, we ensure that you adorn yourself with unparalleled excellence.
                </p>
                <p>
                  <strong>Tailored to Perfection:</strong> Your vision is our muse. We craft each detail precisely,
                  transforming your unique aspirations into a bespoke masterpiece that's exclusively yours.
                </p>
                <p>
                  Become a part of the Best Brilliance legacy and immerse yourself in the unmatched quality, artistry,
                  and customization that define us. Let your story unfold through our exquisitely tailored creations.
                </p>
              </div>
              <div className="flex gap-4 mt-6">
                <Button variant="outline">LET'S TALK</Button>
                <Button variant="outline">BOOK APPOINTMENT</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 text-center border-t">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Other Questions?</h3>
          <p className="text-gray-600 mb-6">We are here 24/7 to answer question you may have.</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline">FAQS</Button>
            <Button variant="outline">CALL +1 332 232 8444</Button>
            <Button variant="outline">LIVE CHAT</Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}