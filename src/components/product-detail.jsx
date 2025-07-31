"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { ChevronRight, Home, Play, ChevronDown, Check } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
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

// Add this inside the ProductDetail function, right at the start
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isScrollingTogether, setIsScrollingTogether] = useState(false)

  const containerRef = useRef(null)
  const leftSideRef = useRef(null)
  const rightSideRef = useRef(null)

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
          // Each combination can have different pricing/data
          price: product.price + (metal.value === "platinum" ? 500 : 0), // Example: platinum costs more
          originalPrice: product.originalPrice + (metal.value === "platinum" ? 600 : 0),
          sku: `${product.sku}-${shape.toUpperCase()}-${metal.value.toUpperCase().replace(" ", "")}`,
          shipsIn: metal.value === "platinum" ? "4-6 weeks" : product.shipsIn, // Platinum takes longer
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

    // If no specific images for this combination, show all images
    return filtered.length > 0
      ? filtered
      : [{ url: selectedCombination.image, thumbnail: selectedCombination.thumbnail }]
  }, [product, selectedCombination])

  // Function to update URL with current selections
  const updateURL = (shape, metal, carat) => {
    const params = new URLSearchParams()
    params.set("shape", shape)
    params.set("metal", metal)
    if (carat) {
      params.set("carat", carat)
    }

    // Update URL without causing a page reload
    const newUrl = `${pathname}?${params.toString()}`
    router.replace(newUrl)
  }

  // Initialize selections from URL params or defaults
  useEffect(() => {
    if (product && allCombinations.length > 0) {
      const shapeFromUrl = searchParams.get("shape")
      const metalFromUrl = searchParams.get("metal")
      const caratFromUrl = searchParams.get("carat")

      // Find the matching combination or use the first one
      let selectedComboId = allCombinations[0].id
      if (shapeFromUrl && metalFromUrl) {
        const foundCombo = allCombinations.find((combo) => combo.shape === shapeFromUrl && combo.metal === metalFromUrl)
        if (foundCombo) selectedComboId = foundCombo.id
      }

      setSelectedCombinationId(selectedComboId)
      setSelectedCarat(caratFromUrl || product.carats?.[0] || "")

      // If URL doesn't have params, update it with current selection
      if (!shapeFromUrl || !metalFromUrl) {
        const combo = allCombinations.find((c) => c.id === selectedComboId) || allCombinations[0]
        updateURL(combo.shape, combo.metal, caratFromUrl || product.carats?.[0] || "")
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

        // Find the "Free Shipping & Returns" section
        const expandableSections = rightSide.querySelector(".space-y-4:last-child")
        const freeShippingSection = expandableSections?.children[1] // Second details element (Free Shipping & Returns)

        if (freeShippingSection) {
          const freeShippingSectionTop = freeShippingSection.offsetTop
          const rightSideTop = rightSide.offsetTop

          // Calculate the absolute position of the Free Shipping section
          const absoluteFreeShippingTop = rightSideTop + freeShippingSectionTop

          // Check if we've scrolled past the Free Shipping section
          const shouldStartScrollingTogether = containerScrollTop >= absoluteFreeShippingTop - 100 // 100px buffer

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

  const handleCombinationSelect = (combo) => {
    setSelectedCombinationId(combo.id)
    setCurrentImageIndex(0) // Reset to first image

    // Update URL with new combination
    updateURL(combo.shape, combo.metal, selectedCarat)
  }

  const handleCaratSelect = (carat) => {
    setSelectedCarat(carat)

    // Update URL with new carat
    if (selectedCombination) {
      updateURL(selectedCombination.shape, selectedCombination.metal, carat)
    }
  }

  return (
    <div className="min-h-screen bg-white py-20">
      {/* Debug Info */}
      {/* <div className="bg-yellow-100 p-2 text-xs">
        <strong>Debug:</strong> Slug: {slug} | Product: {product?.name} | Combinations: {allCombinations.length}
      </div> */}

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-4 px-6">
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

      {/* Main Product Section */}
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto overflow-y-auto scrollbar-hide"
        style={{ height: "calc(100vh - 80px)", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="grid grid-cols-12 gap-8 p-6">
          {/* Left Side - Product Images */}
          <div ref={leftSideRef} className={`col-span-7 ${isScrollingTogether ? "relative" : "sticky top-6"} h-fit`}>
            <div className="grid grid-cols-12 gap-4">
              {/* Thumbnails */}
              <div className="col-span-2">
                <div className="space-y-4">
                  {/* 360 View */}
                  <div className="aspect-square border-2 border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:border-gray-300">
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-1 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">360°</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Thumbnail */}
                  <div className="aspect-square border-2 border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:border-gray-300">
                    <Play className="w-6 h-6 text-gray-400" />
                  </div>

                  {/* Product Images for Current Combination */}
                  {currentCombinationImages.map((image, index) => (
                    <div
                      key={index}
                      className={`aspect-square border-2 rounded-lg cursor-pointer overflow-hidden ${
                        currentImageIndex === index ? "border-gray-900" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={image.thumbnail || image.url}
                        alt={`${product.name} ${selectedCombination.shape} ${selectedCombination.metalName} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}

                  {/* Model Images */}
                  <div className="aspect-square border-2 border-gray-200 rounded-lg cursor-pointer overflow-hidden hover:border-gray-300">
                    <img
                      src="/placeholder.svg?height=100&width=100&text=Model"
                      alt="Model wearing ring"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="col-span-10">
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={currentCombinationImages[currentImageIndex]?.url || selectedCombination.image}
                    alt={`${product.name} - ${selectedCombination.shape} ${selectedCombination.metalName}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center mt-4 text-sm text-gray-600">
                  {selectedCombination.shape} {selectedCombination.metalName} - {selectedCarat} Total Carat
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div ref={rightSideRef} className="col-span-5">
            <div className="space-y-8">
              {/* Product Title and Price */}
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

              {/* All Combinations Display */}
              {/* <div>
                <h3 className="font-medium text-gray-900 mb-4">CHOOSE YOUR COMBINATION</h3>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {allCombinations.map((combo) => (
                    <div
                      key={combo.id}
                      className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                        selectedCombination.id === combo.id
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      onClick={() => handleCombinationSelect(combo)}
                    >
                      <div className="aspect-square mb-2 rounded overflow-hidden">
                        <img
                          src={combo.thumbnail || combo.image}
                          alt={`${combo.shape} ${combo.metalName}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <span className="text-lg">{shapeIcons[combo.shape.toLowerCase()] || "●"}</span>
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: metalColors[combo.metal] || "#E8E8E8" }}
                          />
                        </div>
                        <div className="text-xs text-gray-600 capitalize">{combo.shape}</div>
                        <div className="text-xs text-gray-600">{combo.metalName}</div>
                        <div className="text-sm font-medium text-gray-900 mt-1">${combo.price.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Carat Selection */}
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

              {/* Add to Cart */}
              <div className="space-y-4">
                <Button className="w-full bg-black text-white py-3 text-lg font-medium hover:bg-gray-800">
                  ADD TO CART - ${selectedCombination.price.toLocaleString()}
                </Button>
                <div className="text-center text-sm text-gray-600">
                  Starting at $39/mo or 0% APR with <span className="font-medium">Affirm</span>
                  <br />
                  See if you qualify
                </div>
              </div>

              {/* Free Gift */}
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

              {/* Settings */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4">SETTINGS</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Metal</div>
                    <div className="font-medium">{selectedCombination.metalName}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Shape</div>
                    <div className="font-medium capitalize">{selectedCombination.shape}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Style</div>
                    <div className="font-medium">{product.settings.style}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">SKU</div>
                    <div className="font-medium">{selectedCombination.sku}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-gray-600">Sustainable, ethical, and recycled</div>
                    <div className="text-gray-600">Trendy appearance</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Side Diamonds Quality</div>
                    <div className="font-medium">{product.settings.sideDiamondsQuality}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Side Diamonds Origin</div>
                    <div className="font-medium">{product.settings.sideDiamondsOrigin}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-gray-600">Superior grade</div>
                    <div className="text-gray-600">Eco-friendly diamond</div>
                  </div>
                </div>
              </div>

              {/* Virtual Appointment */}
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

              {/* Features */}
              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Payment Options */}
              <div>
                <div className="font-medium text-gray-900 mb-3">Safe Checkout</div>
                <div className="flex items-center gap-2">
                  <img src="/placeholder.svg?height=24&width=40&text=VISA" alt="Visa" className="h-6" />
                  <img src="/placeholder.svg?height=24&width=40&text=MC" alt="Mastercard" className="h-6" />
                  <img src="/placeholder.svg?height=24&width=40&text=AMEX" alt="American Express" className="h-6" />
                  <img src="/placeholder.svg?height=24&width=40&text=PP" alt="PayPal" className="h-6" />
                </div>
              </div>

              {/* Expandable Sections */}
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

        {/* Story Section - Below the main product area */}
        <div className="max-w-7xl mx-auto px-6 py-16 border-t">
          <div className="text-center mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              THE STORY OF {product.name.toUpperCase()} LAB GROWN DIAMONDS BRACELET
            </h2>
            <p className="text-gray-600 mb-4">{product.story}</p>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Craftsmanship Section */}
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

        {/* Questions Section */}
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
