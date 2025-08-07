"use client"
import { useState } from "react"
import { ChevronRight, Filter, ArrowUpDown, X, Home } from "lucide-react"
import ringsData from "@/data/rings.json"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Helper to get image based on selected shape & metal
function getImage(ring, shape, metal) {
  if (Array.isArray(ring.images)) {
    const found = ring.images.find((img) => img.shape === shape && img.metal === metal)
    if (found) return found.url
    const shapeMatch = ring.images.find((img) => img.shape === shape)
    if (shapeMatch) return shapeMatch.url
    const metalMatch = ring.images.find((img) => img.metal === metal)
    if (metalMatch) return metalMatch.url
    return ring.images[0]?.url
  }
  return ring.image || "/placeholder.svg?height=200&width=200"
}

function getAvailableShapes(ring) {
  if (Array.isArray(ring.images)) {
    return [...new Set(ring.images.map((img) => img.shape))]
  }
  return ring.shapes || []
}

function getAvailableMetals(ring) {
  if (Array.isArray(ring.images)) {
    return [...new Set(ring.images.map((img) => img.metal))]
  }
  return ring.metals || []
}

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

const metalColors = {
  "yellow gold": "#FFD700",
  "white gold": "#E8E8E8",
  "rose gold": "#E8B4A0",
  platinum: "#E5E4E2",
  silver: "#C0C0C0",
}

export default function Rings() {
  const router = useRouter()
  const [selections, setSelections] = useState(() =>
    ringsData.reduce((acc, ring) => {
      const shapes = getAvailableShapes(ring)
      const metals = getAvailableMetals(ring)
      return {
        ...acc,
        [ring.id]: {
          shape: shapes[0] || "",
          metal: metals[0] || "",
          carat: ring.carats ? ring.carats[0] : "",
        },
      }
    }, {}),
  )

  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState({
    shapes: [],
    metals: [],
    stones: ["Diamond"],
    priceRange: [795, 22995],
    caratRange: [0, 10],
  })

  const [showSort, setShowSort] = useState(false)
  const [sortBy, setSortBy] = useState("Best Sellers")

  const sortOptions = ["Best Sellers", "Newest", "Price: Low to High", "Price: High to Low"]

  const applySorting = (rings) => {
    const sortedRings = [...rings]
    switch (sortBy) {
      case "Price: Low to High":
        return sortedRings.sort((a, b) => a.price - b.price)
      case "Price: High to Low":
        return sortedRings.sort((a, b) => b.price - a.price)
      case "Newest":
        return sortedRings.sort((a, b) => b.id - a.id)
      case "Best Sellers":
      default:
        return sortedRings
    }
  }

  const handleSelect = (ringId, type, value, event) => {
    event?.stopPropagation()
    setSelections((s) => ({
      ...s,
      [ringId]: { ...s[ringId], [type]: value },
    }))
  }

  const handleFilterChange = (category, value, checked) => {
    setFilters((prev) => ({
      ...prev,
      [category]: checked ? [...prev[category], value] : prev[category].filter((item) => item !== value),
    }))
  }

  const handleRangeChange = (category, values) => {
    setFilters((prev) => ({
      ...prev,
      [category]: values,
    }))
  }

  const resetFilters = () => {
    setFilters({
      shapes: [],
      metals: [],
      stones: ["Diamond"],
      priceRange: [795, 22995],
      caratRange: [0, 10],
    })
  }

  const applyFilters = (rings) => {
    return rings.filter((ring) => {
      // Price filter
      if (ring.price < filters.priceRange[0] || ring.price > filters.priceRange[1]) {
        return false
      }
      // Shape filter
      if (filters.shapes.length > 0) {
        const ringShapes = getAvailableShapes(ring)
        if (!filters.shapes.some((shape) => ringShapes.includes(shape))) {
          return false
        }
      }
      // Metal filter
      if (filters.metals.length > 0) {
        const ringMetals = getAvailableMetals(ring)
        if (!filters.metals.some((metal) => ringMetals.includes(metal))) {
          return false
        }
      }
      return true
    })
  }

  // Show 4*rowsToShow products, start with 4 rows
  const [rowsToShow, setRowsToShow] = useState(4)
  const filteredAndSortedRings = applySorting(applyFilters(ringsData))
  const ringsToDisplay = filteredAndSortedRings.slice(0, rowsToShow * 4)

  // Header Section Component (same as before)
  const HeaderSection = () => (
    <div className="w-full bg-white border-b border-gray-200 py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link
          href="/" 
            className="hover:text-gray-900 cursor-pointer flex items-center gap-1"
           
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">Rings</span>
        </div>
        <div className="text-center mb-8">
          <div className="text-3xl text-gray-600 font-bold mb-2">Lab-Grown Diamond Rings</div>
          <h1 className="text-sm font-light text-gray-900">
            Ready for whatever hand you prefer, we proudly offer a stunning collection of lab-grown diamond rings and
            bands for every occasion. Discover sparkling eternity bands, right hand rings, fashion bands, anniversary
            and stacking rings, each uniquely designed to express your style and values with elegance.
          </h1>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">{filteredAndSortedRings.length} Items</div>
          <div className="flex items-center gap-6">
            <button
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <div className="relative">
              <button
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowSort(!showSort)
                }}
              >
                <ArrowUpDown className="w-4 h-4" />
                <span>Sort</span>
              </button>
              {showSort && (
                <div
                  className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSortBy(option)
                          setShowSort(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          sortBy === option ? "bg-gray-100 font-medium text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Filter Dropdown - unchanged */}
      {showFilter && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50">
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Filter Options</h3>
              <div className="flex items-center gap-4">
                <button onClick={resetFilters} className="text-sm text-gray-600 hover:text-gray-900">
                  RESET
                </button>
                <button onClick={() => setShowFilter(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-8">
              {/* Shape Filter */}
              <div>
                <h4 className="font-medium mb-4">Shape</h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(shapeIcons).map(([shape, icon]) => (
                    <button
                      key={shape}
                      onClick={() => handleFilterChange("shapes", shape, !filters.shapes.includes(shape))}
                      className={`w-12 h-12 rounded border-2 flex items-center justify-center text-lg transition-all ${
                        filters.shapes.includes(shape)
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              {/* Metal Filter */}
              <div>
                <h4 className="font-medium mb-4">Metal</h4>
                <div className="space-y-3">
                  {["Platinum", "Yellow Gold", "Rose Gold", "White Gold"].map((metal) => (
                    <label key={metal} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.metals.includes(metal.toLowerCase())}
                        onChange={(e) => handleFilterChange("metals", metal.toLowerCase(), e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{metal}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Stone Filter */}
              <div>
                <h4 className="font-medium mb-4">Stone</h4>
                <div className="space-y-3">
                  {["Diamond", "Color Diamond", "Gemstone"].map((stone) => (
                    <label key={stone} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.stones.includes(stone)}
                        onChange={(e) => handleFilterChange("stones", stone, e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{stone}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Price Filter */}
              <div>
                <h4 className="font-medium mb-4">Price</h4>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) =>
                        handleRangeChange("priceRange", [Number.parseInt(e.target.value), filters.priceRange[1]])
                      }
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        handleRangeChange("priceRange", [filters.priceRange[0], Number.parseInt(e.target.value)])
                      }
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Max"
                    />
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      handleRangeChange("priceRange", [filters.priceRange[0], Number.parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                </div>
              </div>
              {/* Carat Filter */}
              <div>
                <h4 className="font-medium mb-4">Carat</h4>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={filters.caratRange[0]}
                      onChange={(e) =>
                        handleRangeChange("caratRange", [Number.parseFloat(e.target.value), filters.caratRange[1]])
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Min"
                      step="0.1"
                    />
                    <input
                      type="number"
                      value={filters.caratRange[1]}
                      onChange={(e) =>
                        handleRangeChange("caratRange", [filters.caratRange[0], Number.parseFloat(e.target.value)])
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Max"
                      step="0.1"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={filters.caratRange[1]}
                    onChange={(e) =>
                      handleRangeChange("caratRange", [filters.caratRange[0], Number.parseFloat(e.target.value)])
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowFilter(false)}
                className="px-8 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                VIEW {filteredAndSortedRings.length} DESIGNS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // Card component (unchanged)
  const RingCard = ({ ring }) => {
    const sel = selections[ring.id] || {}
    const shapes = getAvailableShapes(ring)
    const metals = getAvailableMetals(ring)
    const carats = ring.carats || []
    const img = getImage(ring, sel.shape, sel.metal)

    const ringSlug = ring.slug || ring.name.toLowerCase().replace(/\s+/g, "-")

    const handleCardClick = () => {
      const params = new URLSearchParams({
        shape: sel.shape || "",
        metal: sel.metal || "",
        carat: sel.carat || "",
      })
      router.push(`/rings/${ringSlug}?${params.toString()}`)
    }

    return (
      <div
        className="bg-white rounded-2xl p-6 flex flex-col items-center hover:shadow-lg transition-all duration-300 cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="w-full aspect-square mb-6 flex items-center justify-center ">
          <img
            src={img || "/placeholder.svg?height=128&width=128"}
            alt={`${ring.name} - ${sel.shape} ${sel.metal}`}
            className="object-contain transition-transform w-96 h-96 duration-300 hover:scale-105"
          />
        </div>
        <div className="text-lg font-medium text-gray-900 mb-2 text-center">{ring.name}</div>
        <div className="text-xl font-semibold text-gray-900 mb-6">
          {typeof ring.price === "number" ? (
            `$${ring.price.toLocaleString()}`
          ) : (
            <span className="text-red-500">Price unavailable</span>
          )}
        </div>
        {shapes.length > 0 && (
          <div className="w-full mb-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">Shape</div>
              <div className="flex gap-2">
                {shapes.map((shape) => (
                  <button
                    key={shape}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-lg transition-all ${
                      sel.shape === shape
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                    }`}
                    onClick={(e) => handleSelect(ring.id, "shape", shape, e)}
                    title={shape}
                  >
                    {shapeIcons[shape.toLowerCase()] || "●"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {metals.length > 0 && (
          <div className="w-full mb-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">Metal</div>
              <div className="flex gap-2">
                {metals.map((metal) => (
                  <button
                    key={metal}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      sel.metal === metal ? "border-gray-900 scale-110" : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{
                      backgroundColor: metalColors[metal.toLowerCase()] || "#E8E8E8",
                    }}
                    onClick={(e) => handleSelect(ring.id, "metal", metal, e)}
                    title={metal}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {carats.length > 0 && (
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">Carat</div>
              <div className="flex gap-1 flex-wrap">
                {carats.map((carat) => (
                  <button
                    key={carat}
                    className={`px-3 py-1 rounded-full text-sm border transition-all ${
                      sel.carat === carat
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                    onClick={(e) => handleSelect(ring.id, "carat", carat, e)}
                  >
                    {carat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Split ringsToDisplay into rows of 4
  const rows = []
  for (let i = 0; i < ringsToDisplay.length; i += 4) {
    rows.push(ringsToDisplay.slice(i, i + 4))
  }

  // Button text logic
  const allShown = ringsToDisplay.length >= filteredAndSortedRings.length
  const handleShowMoreOrTop = () => {
    if (allShown) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setRowsToShow((r) => r + 1)
    }
  }

  return (
    <div className="w-full py-20 min-h-screen bg-white">
      <HeaderSection />
      <div className="py-20 px-2">
        <div className="flex flex-col gap-14">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-4 gap-8 mb-12">
              {row.map((ring) => (
                <RingCard key={ring.id} ring={ring} />
              ))}
            </div>
          ))}
          <div className="flex justify-center">
            <button
              onClick={handleShowMoreOrTop}
              className="px-8 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium text-lg transition-colors"
            >
              {allShown ? "Go to Top" : "Show More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}